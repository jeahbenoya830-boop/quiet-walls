import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const user = usePage().props.auth.user;

    return (
        <GuestLayout>
            <Head title="A quieter place to say it" />
            <main className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
                <section className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d543f]">
                        Your words, without your name
                    </p>
                    <h1 className="mt-6 text-5xl font-medium leading-[1.08] tracking-tight sm:text-7xl">
                        Some things are easier to say from behind a wall.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-[#6b685f]">
                        Make a quiet wall and share its link. Anyone can leave you an
                        anonymous message. Only you can sign in to read what comes in.
                    </p>
                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Link
                            href={user ? route('dashboard') : route('register')}
                            className="rounded-full bg-[#24231f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#49463e]"
                        >
                            {user ? 'Open your inbox' : 'Make your quiet wall'}
                        </Link>
                        {!user && (
                            <Link
                                href={route('login')}
                                className="px-3 py-3 text-sm font-medium text-[#6b685f] transition hover:text-[#24231f]"
                            >
                                Log in
                            </Link>
                        )}
                    </div>
                </section>

                <section className="mt-20 grid gap-10 border-t border-[#e2ded4] pt-8 sm:grid-cols-3">
                    <article>
                        <p className="text-sm font-medium">01 / Share your link</p>
                        <p className="mt-2 text-sm leading-6 text-[#6b685f]">
                            Your account gets its own private, shareable wall.
                        </p>
                    </article>
                    <article>
                        <p className="text-sm font-medium">02 / Hear from anyone</p>
                        <p className="mt-2 text-sm leading-6 text-[#6b685f]">
                            No account or name is needed to leave a message.
                        </p>
                    </article>
                    <article>
                        <p className="text-sm font-medium">03 / Read in private</p>
                        <p className="mt-2 text-sm leading-6 text-[#6b685f]">
                            Messages go to your login-only inbox. Senders never get a read
                            receipt or response.
                        </p>
                    </article>
                </section>
            </main>
        </GuestLayout>
    );
}
