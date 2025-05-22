import { useState } from 'react';
import Pagination from './Pagination';

// Mock saved jobs data - replace with actual API call
const mockSavedJobs = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "New York, NY",
        salary: "$120,000 - $150,000",
        type: "Full-time",
        posted: "2 days ago",
        description: "We're looking for a Senior Software Engineer to join our team and help build scalable applications...",
        requirements: ["5+ years of experience", "React/Node.js", "AWS", "Microservices"],
        savedDate: "2024-03-15"
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
        requirements: ["3+ years of experience", "React", "TypeScript", "CSS/SCSS"],
        savedDate: "2024-03-14"
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
        requirements: ["4+ years of experience", "JavaScript", "Python", "SQL"],
        savedDate: "2024-03-13"
    }
];

interface SavedJob {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    savedDate: string;
}

export default function SavedJobs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Calculate pagination
    const totalPages = Math.ceil(mockSavedJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSavedJobs = mockSavedJobs.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of saved jobs list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (size: number) => {
        setItemsPerPage(size);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900">Saved Jobs</h2>
                <p className="text-blue-600 mt-1">Your bookmarked job opportunities</p>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search saved jobs..."
                        className="flex-1 px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                        Search
                    </button>
                </div>
            </div>

            {/* Saved Jobs List */}
            <div className="space-y-4">
                {currentSavedJobs.map((job) => (
                    <div key={job.id} className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:border-blue-300 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900">{job.title}</h3>
                                <p className="text-blue-600">{job.company}</p>
                            </div>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {job.type}
                            </span>
                        </div>
                        <div className="mt-2 text-gray-600">
                            <p>{job.location}</p>
                            <p className="text-green-600 font-medium">{job.salary}</p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm text-gray-500">Saved on {job.savedDate}</span>
                            <div className="space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                    View Details
                                </button>
                                <button className="text-red-600 hover:text-red-800 cursor-pointer">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            )}
        </div>
    );
} 