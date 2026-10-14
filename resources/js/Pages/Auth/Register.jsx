import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

            <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-md">

                    <div className="mb-8 text-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-[#24231f]"
                        >
                            quiet walls
                        </Link>

                        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-[#8d543f]">
                            A space of your own
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-gray-900">
                            Create an Account
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Create an account to get your own anonymous message wall.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                        <form onSubmit={submit} className="space-y-5">

                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-2 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email Address"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-2 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="border-t border-gray-200 pt-5">

                                <PrimaryButton
                                    className="w-full justify-center bg-[#24231f] py-3 text-sm font-semibold hover:bg-[#49463e] focus:bg-[#49463e] active:bg-[#39372f]"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Creating Account...'
                                        : 'Create Account'}
                                </PrimaryButton>

                                <p className="mt-5 text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-[#8d543f] hover:text-[#693d2e]"
                                    >
                                        Log In
                                    </Link>
                                </p>

                            </div>

                        </form>

                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-500 hover:text-[#8d543f]"
                        >
                            Back to quiet walls
                        </Link>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}