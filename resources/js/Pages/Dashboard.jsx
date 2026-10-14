import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ wallUrl, messages }) {
    const success = usePage().props.flash?.success;

    return (
        <AuthenticatedLayout>
            <Head title="Your inbox" />
            <div className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
                <header>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8d543f]">
                        Your private space
                    </p>
                    <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
                        Your inbox
                    </h1>
                    <p className="mt-3 max-w-xl leading-7 text-[#6b685f]">
                        These messages are anonymous. Only you can read them here; senders
                        are not told if or when you open a message.
                    </p>
                </header>

                <section className="mt-9 rounded-2xl border border-[#e2ded4] bg-white p-5 sm:p-6">
                    <label htmlFor="wall-link" className="text-sm font-medium">
                        Your quiet wall link
                    </label>
                    <p className="mt-1 text-sm text-[#6b685f]">
                        Share this link so people can write to you without signing in.
                    </p>
                    <input
                        id="wall-link"
                        readOnly
                        value={wallUrl}
                        onFocus={(event) => event.target.select()}
                        className="mt-4 block w-full rounded-lg border-[#e2ded4] bg-[#faf9f6] text-sm text-[#49463e] focus:border-[#8d543f] focus:ring-[#8d543f]"
                    />
                    <a
                        href={wallUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-[#8d543f] underline decoration-[#d8b8a9] underline-offset-4 hover:text-[#693d2e]"
                    >
                        Preview your wall
                    </a>
                </section>

                {success && (
                    <p className="mt-6 rounded-xl border border-[#d7e1d5] bg-[#f1f5ef] px-4 py-3 text-sm text-[#38563d]">
                        {success}
                    </p>
                )}

                <section className="mt-12">
                    <div className="flex items-baseline justify-between gap-4">
                        <h2 className="text-xl font-medium tracking-tight">Messages</h2>
                        <span className="text-sm text-[#6b685f]">
                            {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                        </span>
                    </div>

                    {messages.length === 0 ? (
                        <div className="mt-5 rounded-2xl border border-dashed border-[#d7d1c5] px-6 py-12 text-center">
                            <p className="font-medium">Nothing here yet.</p>
                            <p className="mt-2 text-sm text-[#6b685f]">
                                Share your link and your first anonymous message will appear here.
                            </p>
                        </div>
                    ) : (
                        <ul className="mt-5 space-y-4">
                            {messages.map((message) => (
                                <li
                                    key={message.id}
                                    className="rounded-2xl border border-[#e2ded4] bg-white p-5 sm:p-6"
                                >
                                    <p className="whitespace-pre-wrap break-words leading-7">
                                        {message.content}
                                    </p>
                                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#f0ede6] pt-4">
                                        <time className="text-xs text-[#827e74]">
                                            {new Date(message.created_at).toLocaleString()}
                                        </time>
                                        <Link
                                            href={route('messages.destroy', message.id)}
                                            method="delete"
                                            as="button"
                                            className="text-xs font-medium text-[#8d543f] hover:underline"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <p className="mt-10 text-xs leading-5 text-[#827e74]">
                    Quiet Walls does not store sender names with messages. Hosting or
                    network logs may contain connection details. Avoid sharing passwords,
                    financial details, or other sensitive information in a message.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
