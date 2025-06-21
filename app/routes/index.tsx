import { useAuth } from "~/context/AuthContext";

import Cookies from 'js-cookie';
import JobListings from "~/components/JobListings";
import Dashboard from "./dashboard";
import OfferManagerRoute from "./company/job-offers";
import LandingPage from './landing';


export default function Index() {
    const userType = Cookies.get('user_type');
    const token = Cookies.get('access_token');
    // const { user, logout } = useAuth();
    if (userType === "company")
        return (<OfferManagerRoute />);
    if (userType === "student")
        return (<Dashboard />);
    if (!token || !userType) {
        return <LandingPage />;
    }
}