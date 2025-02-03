import { Head, router, usePage, Link } from "@inertiajs/react";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

export default function Main({ children, title }) {
    // States
    const { application_name } = usePage().props;

    // Functions
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <div>
            <Head>
                <title>{title + " - " + application_name}</title>
            </Head>

            <div className="">
                {children}
            </div>
        </div>
    );
}
