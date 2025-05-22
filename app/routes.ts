import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/dashboard.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
    // route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
