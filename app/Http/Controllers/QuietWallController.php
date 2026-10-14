<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuietWallController extends Controller
{
    public function show(User $user): Response
    {
        return Inertia::render('Walls/Show', [
            'wallUrl' => route('walls.messages.store', $user->wall_slug),
        ]);
    }

    public function store(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'content' => ['required', 'string', 'max:2000'],
        ]);

        $user->anonymousMessages()->create($validated);

        return to_route('walls.show', $user->wall_slug)
            ->with('success', 'Your message was sent anonymously. You will not receive a read receipt or reply.');
    }
}
