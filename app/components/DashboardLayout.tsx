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

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
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