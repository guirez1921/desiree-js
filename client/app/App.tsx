import { Outlet } from "react-router";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header"
import { cartItems, data } from "./data/mockData";
import { Toaster } from "sonner";

export default function App() {
    // Check if cart is in local storage, if not, set it to an empty array
    return (
        <div className="text-gray-900 bg-gray-50 min-h-screen flex flex-col">
            {typeof window !== "undefined" && (
            <>
                {!localStorage.getItem("cart") &&
                localStorage.setItem("cart", JSON.stringify(cartItems))}
                {!localStorage.getItem("data") &&
                localStorage.setItem("data", JSON.stringify(data))}
                {!localStorage.getItem("user_id") &&
                localStorage.setItem("user_id", Math.random().toString().slice(2, 18))}
            </>
            )}
            {/* <Toaster position="top-center" richColors theme="light" closeButton={false} /> */}
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}