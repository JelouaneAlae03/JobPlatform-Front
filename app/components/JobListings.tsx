import { useState } from 'react';
import Pagination from './Pagination';

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
    },
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
    },
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
    },
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

export default function JobListings() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    // Calculate pagination
    const totalPages = Math.ceil(mockJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = mockJobs.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of job listings
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    return (
        <div className="space-y-6">
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">All Types</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">All Locations</option>
                            <option value="remote">Remote</option>
                            <option value="onsite">On-site</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
                {currentJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">{job.title}</h3>
                                <p className="text-gray-600">{job.company}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {job.type}
                                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    {job.location}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">{job.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {job.requirements.map((req, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                    >
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-gray-600">
                                <span className="font-medium">{job.salary}</span>
                                <span className="mx-2">•</span>
                                <span>Posted {job.posted}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
                                    Apply Now
                                </button>
                                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            </div>
        </div>
    );
} 