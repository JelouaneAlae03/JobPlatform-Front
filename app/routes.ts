import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // index("routes/auth/login.tsx"),
    route("login", "routes/auth/login.tsx"),
    index("routes/index.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("applications", "routes/applications.tsx"),
    route("saved", "routes/saved.tsx"),
    route("company-profile", "routes/profile.tsx"),
    route("student-profile", "routes/student-profile.tsx"),
    route("profile-search", "routes/profile-search.tsx"),
    route("settings", "routes/settings.tsx"),
    route("offer-manager", "routes/company/job-offers.tsx")


    // route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
