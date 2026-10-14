import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Show({ wallUrl }) {
    const success = usePage().props.flash?.success;
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    });

    function submit(event) {
        event.preventDefault();
        post(wallUrl, { onSuccess: () => reset() });
    }

    return (
        <GuestLayout>
            <Head title="Leave an anonymous message" />
            <main className="mx-auto max-w-2xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8d543f]">
                    A quiet wall
                </p>
                <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
                    Leave a message.
                </h1>
                <p className="mt-4 max-w-xl leading-7 text-[#6b685f]">
                    Say what you want to say. Your name and account are not requested
                    or attached to the saved message. The wall owner can read it after
                    logging in.
                </p>

                {success ? (
                    <div
                        role="status"
                        className="mt-9 rounded-2xl border border-[#d7e1d5] bg-[#f1f5ef] p-6"
                    >
                        <p className="font-medium text-[#38563d]">Your message was sent.</p>
                        <p className="mt-2 text-sm leading-6 text-[#526451]">{success}</p>
                        <p className="mt-4 text-sm text-[#526451]">
                            You can close this page whenever you&apos;re ready.
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={submit}
                        className="mt-9 rounded-2xl border border-[#e2ded4] bg-white p-5 sm:p-7"
                    >
                        <label htmlFor="content" className="text-sm font-medium">
                            Your message
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows="7"
                            maxLength="2000"
                            value={data.content}
                            onChange={(event) => setData('content', event.target.value)}
                            placeholder="Write what's on your mind..."
                            required
                            className="mt-3 block w-full resize-y rounded-xl border-[#e2ded4] bg-[#faf9f6] leading-6 placeholder:text-[#a29d92] focus:border-[#8d543f] focus:ring-[#8d543f]"
                        />
                        {errors.content && (
                            <p className="mt-2 text-sm text-red-700">{errors.content}</p>
                        )}
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                            <p className="max-w-xs text-xs leading-5 text-[#827e74]">
                                        Your name is not attached to the message. Please keep it
                                respectful.
                            </p>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-[#24231f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#49463e] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Send anonymously'}
                            </button>
                        </div>
                    </form>
                )}

                <p className="mt-7 text-xs leading-5 text-[#827e74]">
                    The sender is not shown in the inbox, and senders do not get a read
                    receipt or a way to track what happens next. Network or hosting
                    providers may still keep connection logs.
                </p>
            </main>
        </GuestLayout>
    );
}
