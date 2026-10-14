<?php

namespace Tests\Feature;

use App\Models\AnonymousMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuietWallTest extends TestCase
{
    use RefreshDatabase;

    public function test_anyone_can_open_a_wall_without_logging_in(): void
    {
        $user = User::factory()->create();

        $response = $this->get(route('walls.show', $user->wall_slug));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Walls/Show')
            ->where('auth.user', null));
        $this->assertGuest();
    }

    public function test_a_message_is_saved_without_sender_identity(): void
    {
        $user = User::factory()->create();

        $response = $this->post(route('walls.messages.store', $user->wall_slug), [
            'content' => 'I wanted to tell you this anonymously.',
        ]);

        $response->assertRedirect(route('walls.show', $user->wall_slug));
        $this->assertGuest();
        $this->assertDatabaseHas('anonymous_messages', [
            'user_id' => $user->id,
            'content' => 'I wanted to tell you this anonymously.',
        ]);

        $this->assertEqualsCanonicalizing(
            ['id', 'user_id', 'content', 'created_at', 'updated_at'],
            \Illuminate\Support\Facades\Schema::getColumnListing('anonymous_messages'),
        );
    }

    public function test_wall_owner_can_read_messages_after_logging_in(): void
    {
        $user = User::factory()->create();
        $message = $user->anonymousMessages()->create([
            'content' => 'A private anonymous note.',
        ]);

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard')
            ->where('messages.0.id', $message->id)
            ->where('messages.0.content', 'A private anonymous note.')
            ->missing('messages.0.sender_name'));
    }

    public function test_inbox_requires_a_login(): void
    {
        $this->get(route('dashboard'))
            ->assertRedirect(route('login'));
    }

    public function test_messages_cannot_be_read_or_deleted_by_another_user(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $message = $owner->anonymousMessages()->create(['content' => 'Owner only']);

        $this->actingAs($otherUser)->get(route('dashboard'))
            ->assertInertia(fn ($page) => $page->where('messages', []));

        $response = $this->delete(route('messages.destroy', $message->id));

        $response->assertNotFound();
        $this->assertDatabaseHas('anonymous_messages', ['id' => $message->id]);
        $this->assertSame(1, AnonymousMessage::count());
    }

    public function test_anonymous_messages_must_be_non_empty_and_at_most_2000_characters(): void
    {
        $user = User::factory()->create();

        $this->from(route('walls.show', $user->wall_slug))
            ->post(route('walls.messages.store', $user->wall_slug), ['content' => ''])
            ->assertSessionHasErrors('content');

        $this->from(route('walls.show', $user->wall_slug))
            ->post(route('walls.messages.store', $user->wall_slug), ['content' => str_repeat('a', 2001)])
            ->assertSessionHasErrors('content');

        $this->assertDatabaseCount('anonymous_messages', 0);
    }
}
