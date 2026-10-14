import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f7f5f0] text-[#24231f]">
            <nav className="border-b border-[#e9e5db] bg-[#f7f5f0]">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
                    <Link href="/" className="text-lg font-semibold tracking-tight">
                        quiet walls
                    </Link>
                    <Link
                        href="/"
                        className="text-sm text-[#6b685f] transition hover:text-[#24231f]"
                    >
                        A little room to be honest
                    </Link>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
