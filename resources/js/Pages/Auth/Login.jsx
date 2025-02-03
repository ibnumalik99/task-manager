import { useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Auth from "../../Layouts/Auth";
import Button from "../../Components/Button";

const Login = () => {
    const { errors, application_name } = usePage().props;
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit() {
        setLoading(true);
        router.post("/login", values, {
            onSuccess: () => [setLoading(false)],
            onError: () => [setLoading(false)],
        });
    }

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div>
            <Head>
                <title>{`Login - ${application_name}`}</title>
            </Head>

            <div className="max-w-sm mx-auto h-screen w-full grid content-center">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Enter your email"
                        required
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Opps! </span>{" "}
                            {errors.email}
                        </p>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Enter your password"
                        required
                        value={values.password}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Opps! </span>{" "}
                            {errors.password}
                        </p>
                    )}
                </div>
                <Button
                    btnType="submit"
                    type="warning"
                    text="Login"
                    optionalClass="w-full"
                    isLoading={loading}
                    onClick={handleSubmit}
                >
                </Button>

                <Link
                    href="/register"
                    className="text-orange-800 text-xs underline"
                >
                    Try to Register
                </Link>
            </div>
        </div>
    );
};

Login.layout = (page) => <Auth children={page} title="Login" />;

export default Login;
