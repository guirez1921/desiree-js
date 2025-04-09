import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "App.tsx", [
        index("pages/Home.tsx"),
        route("shop", "pages/Shop.tsx"),
        route("about", "pages/About.tsx"),
        route("cart", "pages/Cart.tsx"),
        route("product/:id", "pages/ProductDetails.tsx"),
        route("profile", "pages/Profile.tsx"),
    ]),
    route("auth", "Auth.tsx", [
        route("login", "pages/auth/Login.tsx"),
        route("register", "pages/auth/Register.tsx"),
    ]),
] satisfies RouteConfig;
