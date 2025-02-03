import { Head, usePage, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Auth from "../../Layouts/Auth";
import Button from "../../Components/Button";

const Register = () => {
    const { errors, application_name } = usePage().props;
    const [loading, setLoading] = useState(false);

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const registerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        router.post("/register", credentials, {
            // onSuccess: () => generateCaptcha(),
            onError: () => [setLoading(false)],
        });
    };

    function handleValues(e) {
        const key = e.target.id;
        const value = e.target.value;

        setCredentials((credential) => ({
            ...credential,
            [key]: value,
        }));
    }

    return (
        <div>
            <Head>
                <title>{`Register - ${application_name}`}</title>
            </Head>

            <div className="max-w-sm mx-auto h-screen w-full grid content-center">
                <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Your Name"
                        required
                        value={credentials.name}
                        onChange={handleValues}
                    />
                    {errors.name && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                            <span className="font-medium">Opps! </span>{" "}
                            {errors.name}
                        </p>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="john.doe@company.com"
                        required
                        value={credentials.email}
                        onChange={handleValues}
                    />
                    {errors.email && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                            <span className="font-medium">Opps! </span>{" "}
                            {errors.email}
                        </p>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Password"
                        required
                        value={credentials.password}
                        onChange={handleValues}
                    />
                    {errors.password && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                            <span className="font-medium">Opps! </span>{" "}
                            {errors.password}
                        </p>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Confirmation Password"
                        required
                        value={credentials.password_confirmation}
                        onChange={handleValues}
                    />
                    {errors.password_confirmation && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                            <span className="font-medium">Opps! </span>{" "}
                            {errors.password}
                        </p>
                    )}
                </div>
                <Button
                    btnType="submit"
                    type="warning"
                    text="Register"
                    optionalClass="w-full"
                    isLoading={loading}
                    onClick={registerSubmit}
                >
                </Button>
                <p className="text-gray-500 text-xs">
                    Already have an account?
                </p>
                <Link
                    href="/login"
                    className="text-orange-800 text-xs underline"
                >
                    Login here
                </Link>
            </div>
        </div>
    );
}

Register.layout = (page) => <Auth children={page} title="Register" />;

export default Register;