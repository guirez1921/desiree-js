import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function Auth() {
    return (
        <div className="text-gray-900 bg-gray-50 min-h-screen flex flex-col">
            <Toaster position="top-center" richColors theme="light" closeButton={false} />
            <Outlet />
        </div>
    );
}