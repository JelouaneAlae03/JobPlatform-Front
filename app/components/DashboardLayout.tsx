import { useAuth } from '~/context/AuthContext';
import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col lg:flex-row">
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
                className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } ${isSidebarExpanded ? 'w-64' : 'w-20'} bg-blue-900 text-white`}
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
                            className="hidden lg:block p-2 rounded-md hover:bg-blue-800 text-white cursor-pointer"
                        >
                            {isSidebarExpanded ? '◀' : '▶'}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center space-x-3 p-3 rounded-md hover:bg-white hover:text-blue-900 text-blue-100 transition-colors cursor-pointer"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {isSidebarExpanded && <span>{item.name}</span>}
                            </Link>
                        ))}
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
            <div className="flex-1 flex flex-col min-h-screen">
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
                                    <span className="text-xl">🔔</span>
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