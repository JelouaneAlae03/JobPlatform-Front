import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/auth/login.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("applications", "routes/applications.tsx"),
    route("saved", "routes/saved.tsx"),
    route("profile", "routes/profile.tsx"),
    route("settings", "routes/settings.tsx")


    // route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
