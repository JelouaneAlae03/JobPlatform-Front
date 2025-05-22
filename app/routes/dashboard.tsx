import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router';
import { useState } from 'react';

// Mock job data - replace with actual API call
const mockJobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "New York, NY",
        salary: "$120,000 - $150,000",
        type: "Full-time",
        posted: "2 days ago",
        description: "We're looking for a Senior Software Engineer to join our team and help build scalable applications...",
        requirements: ["5+ years of experience", "React/Node.js", "AWS", "Microservices"]
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Digital Innovations",
        location: "Remote",
        salary: "$90,000 - $110,000",
        type: "Full-time",
        posted: "1 day ago",
        description: "Join our team as a Frontend Developer and work on cutting-edge web applications...",
        requirements: ["3+ years of experience", "React", "TypeScript", "CSS/SCSS"]
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "StartUp Vision",
        location: "San Francisco, CA",
        salary: "$100,000 - $130,000",
        type: "Full-time",
        posted: "3 days ago",
        description: "Exciting opportunity for a Full Stack Developer to work on innovative projects...",
        requirements: ["4+ years of experience", "JavaScript", "Python", "SQL"]
    }
];

// Sidebar navigation items
const navigationItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'My Applications', icon: '📝', path: '/applications' },
    { name: 'Saved Jobs', icon: '🔖', path: '/saved' },
    { name: 'Profile', icon: '👤', path: '/profile' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
];

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div
                className={`bg-white shadow-sm transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-20'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-4 flex items-center justify-between border-b">
                        {isSidebarExpanded ? (
                            <h1 className="text-xl font-semibold text-blue-600">JobPlatform</h1>
                        ) : (
                            <span className="text-2xl">JP</span>
                        )}
                        <button
                            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                            className="p-2 rounded-md hover:bg-gray-100"
                        >
                            {isSidebarExpanded ? '◀' : '▶'}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigationItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.path}
                                className="flex items-center space-x-3 p-3 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <span className="text-xl">{item.icon}</span>
                                {isSidebarExpanded && <span>{item.name}</span>}
                            </a>
                        ))}
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            {isSidebarExpanded && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Top Navigation Bar */}
                <nav className="bg-white shadow-sm">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h2 className="text-xl font-semibold text-gray-900">Job Listings</h2>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleLogout}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="p-6">
                    {/* Search and Filter Section */}
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Jobs List */}
                    <div className="space-y-4">
                        {mockJobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                                        <p className="text-blue-600 font-medium">{job.company}</p>
                                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                                            <span>{job.location}</span>
                                            <span>•</span>
                                            <span>{job.type}</span>
                                            <span>•</span>
                                            <span>{job.posted}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-900 font-medium">{job.salary}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-600">{job.description}</p>
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-900">Requirements:</h3>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {job.requirements.map((req, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                            >
                                                {req}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
} 