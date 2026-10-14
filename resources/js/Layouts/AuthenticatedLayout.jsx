import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-[#f7f5f0] text-[#24231f]">
            <nav className="border-b border-[#e9e5db] bg-[#f7f5f0]">
                <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
                    <Link href={route('dashboard')} className="text-lg font-semibold tracking-tight">
                        quiet walls
                    </Link>
                    <div className="flex items-center gap-5 text-sm">
                        <span className="hidden text-[#6b685f] sm:inline">{user.name}</span>
                        <Link
                            href={route('profile.edit')}
                            className="text-[#6b685f] transition hover:text-[#24231f]"
                        >
                            Profile
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="font-medium text-[#24231f] transition hover:text-[#8d543f]"
                        >
                            Log out
                        </Link>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
