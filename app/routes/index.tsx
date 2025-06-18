import { useAuth } from "~/context/AuthContext";

import Cookies from 'js-cookie';
import JobListings from "~/components/JobListings";
import Dashboard from "./dashboard";
import OfferManagerRoute from "./company/job-offers";


export default function Index() {
    const userType = Cookies.get('user_type');
    // const { user, logout } = useAuth();
    if (userType === "company")
        return (<OfferManagerRoute />);
    if (userType === "student")
        return (<Dashboard />);
}