<?php

namespace App\Http\Controllers;

use App\Models\AnonymousMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class AnonymousMessageController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->wall_slug === null) {
            $user->forceFill(['wall_slug' => Str::random(24)])->save();
        }

        return Inertia::render('Dashboard', [
            'wallUrl' => route('walls.show', $user->wall_slug),
            'messages' => $user->anonymousMessages()
                ->latest()
                ->get(['id', 'content', 'created_at']),
        ]);
    }

    public function destroy(Request $request, int $message): RedirectResponse
    {
        $request->user()->anonymousMessages()->findOrFail($message)->delete();

        return to_route('dashboard')->with('success', 'Message deleted.');
    }
}
