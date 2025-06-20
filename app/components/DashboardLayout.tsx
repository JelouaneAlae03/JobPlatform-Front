import { useAuth } from '~/context/AuthContext';
import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useLocation } from 'react-router';

// Role-based navigation items
const studentNavigationItems = [
    { name: 'Job List', icon: <HomeIcon />, path: '/' },
    { name: 'Saved Jobs', icon: <BookmarkIcon />, path: '/saved' },
    { name: 'Profile', icon: <PersonIcon />, path: '/student-profile' },
    { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const companyNavigationItems = [
    // { name: 'Dashboard', icon: '📊', path: '/' },
    { name: 'Offer Manager', icon: <WorkIcon />, path: '/offer-manager' },
    { name: 'Profile Search', icon: <SearchIcon />, path: '/profile-search' },
    { name: 'Company Info', icon: <BusinessIcon />, path: '/company-profile' },
    { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];


interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const Location = useLocation();

    // Check for authentication cookie
    useEffect(() => {
        const token = Cookies.get('access_token');
        const userType = Cookies.get('user_type');

        if (!token) {
            toast.error('Please login to access the dashboard');
            navigate('/login');
            return;
        }

        if (!userType || (userType !== 'student' && userType !== 'company')) {
            toast.error('Invalid user type. Please login again.');
            navigate('/login');
            return;
        }

    }, [navigate]);

    // Get navigation items based on user type
    const userType = Cookies.get('user_type');
    const navigationItems = userType === 'company' ? companyNavigationItems : studentNavigationItems;
    console.log(Cookies.get('user_type'));
    console.log(Cookies.get('user'));
    console.log(Cookies.get('access_token'));


    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
            if (userType === 'company') {
                navigate('/offer-manager');
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        Cookies.remove('user');
        Cookies.remove('user_type');
        Cookies.remove('access_token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col lg:flex-row">
            <Toaster />
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-md p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-blue-900">JobPlatform</h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none"
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } ${isSidebarExpanded ? 'w-64' : 'w-20'} bg-blue-900 text-white`}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-4 flex items-center justify-between border-b border-blue-800">
                        {isSidebarExpanded ? (
                            <h1 className="text-xl font-semibold text-white">JobPlatform</h1>
                        ) : (
                            <span className="text-2xl"></span>
                        )}
                        <button
                            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                            className="hidden lg:block p-2 rounded-md hover:bg-blue-800 text-white cursor-pointer"
                        >
                            {isSidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navigationItems.map((item) => {
                            const isActive = Location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center space-x-3 p-3 rounded-md transition-colors cursor-pointer ${isActive ? 'bg-white text-blue-900 font-semibold shadow' : 'hover:bg-white hover:text-blue-900 text-blue-100'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    {isSidebarExpanded && <span>{item.name}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t border-blue-800">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            {isSidebarExpanded && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-blue-200 truncate">{user?.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarExpanded ? 'lg:ml-64' : 'lg:ml-20'}`}>
                {/* Top Navigation Bar */}
                <nav className="bg-white shadow-md">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="hidden lg:flex items-center">
                                <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
                            </div>
                            <div className="flex items-center space-x-4">
                                {/* Notification Icon */}
                                <button className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none cursor-pointer">
                                    <span className="text-xl"><NotificationsIcon /></span>
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                        3
                                    </span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
} 