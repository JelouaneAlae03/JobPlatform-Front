import { useAuth } from '~/context/AuthContext';
import { useNavigate, Link } from 'react-router';
import { useState } from 'react';

// Sidebar navigation items
const navigationItems = [
    { name: 'Dashboard', icon: '📊', path: '/' },
    { name: 'My Applications', icon: '📝', path: '/applications' },
    { name: 'Saved Jobs', icon: '🔖', path: '/saved' },
    { name: 'Profile', icon: '👤', path: '/profile' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
];

// Mock notifications data
const mockNotifications = [
    {
        id: 1,
        title: "New Job Match",
        message: "Senior Frontend Developer at Tech Corp matches your profile",
        time: "5 minutes ago",
        read: false
    },
    {
        id: 2,
        title: "Application Update",
        message: "Your application for Software Engineer has been viewed",
        time: "1 hour ago",
        read: false
    },
    {
        id: 3,
        title: "Profile View",
        message: "Your profile was viewed by 3 recruiters",
        time: "2 hours ago",
        read: false
    }
];

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <div className="min-h-screen bg-blue-50 flex">
            {/* Sidebar */}
            <div
                className={`bg-blue-900 text-white transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-4 flex items-center justify-between border-b border-blue-800">
                        {isSidebarExpanded ? (
                            <h1 className="text-xl font-semibold text-white">JobPlatform</h1>
                        ) : (
                            <span className="text-2xl">JP</span>
                        )}
                        <button
                            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                            className="p-2 rounded-md hover:bg-blue-800 text-white cursor-pointer"
                        >
                            {isSidebarExpanded ? '◀' : '▶'}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center space-x-3 p-3 rounded-md hover:bg-white hover:text-blue-900 text-blue-100 transition-colors cursor-pointer"
                            >
                                <span className="text-xl">{item.icon}</span>
                                {isSidebarExpanded && <span>{item.name}</span>}
                            </Link>
                        ))}
                    </nav>

                    {/* User Section */}
                    {/* <div className="p-4 border-t border-blue-800">
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
                    </div> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Top Navigation Bar */}
                <nav className="bg-white shadow-md">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
                            </div>
                            <div className="flex items-center space-x-4">
                                {/* Notification Icon with Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={toggleNotifications}
                                        className="relative p-2 text-gray-600 hover:text-blue-600 focus:outline-none cursor-pointer"
                                    >
                                        <span className="text-xl">🔔</span>
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                            {mockNotifications.filter(n => !n.read).length}
                                        </span>
                                    </button>

                                    {/* Notification Dropdown */}
                                    {isNotificationOpen && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                            <div className="p-4 border-b border-gray-200">
                                                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {mockNotifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''
                                                            }`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-900">
                                                                    {notification.title}
                                                                </h4>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {notification.message}
                                                                </p>
                                                            </div>
                                                            <span className="text-xs text-gray-500">
                                                                {notification.time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-4 border-t border-gray-200">
                                                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                                                    View All Notifications
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

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
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
} 