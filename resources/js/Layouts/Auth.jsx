import { initFlowbite } from "flowbite";
import { useEffect } from "react";

export default function Auth({ children }) {
    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <div>
            {children}
        </div>
    );
}
