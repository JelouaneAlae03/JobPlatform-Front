import { useState } from 'react';
import Pagination from './Pagination';

// Mock saved jobs data
const mockSavedJobs = [
    {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$120,000 - $150,000',
        savedDate: '2024-02-15',
        description: 'We are looking for a Senior Software Engineer to join our team...',
        requirements: ['5+ years of experience', 'React', 'Node.js', 'AWS'],
    },
    {
        id: 2,
        title: 'Frontend Developer',
        company: 'Web Solutions Inc',
        location: 'Remote',
        type: 'Full-time',
        salary: '$90,000 - $110,000',
        savedDate: '2024-02-10',
        description: 'Join our team as a Frontend Developer...',
        requirements: ['3+ years of experience', 'React', 'TypeScript', 'CSS'],
    },
    {
        id: 3,
        title: 'Full Stack Developer',
        company: 'Digital Innovations',
        location: 'San Francisco, CA',
        type: 'Contract',
        salary: '$100,000 - $130,000',
        savedDate: '2024-02-01',
        description: 'Looking for a Full Stack Developer...',
        requirements: ['4+ years of experience', 'React', 'Node.js', 'MongoDB'],
    },
];

export default function SavedJobs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    const totalPages = Math.ceil(mockSavedJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = mockSavedJobs.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">Saved Jobs</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search saved jobs..."
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">All Types</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Saved Jobs List */}
            <div className="space-y-4">
                {currentJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
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
                                <span>Saved on {job.savedDate}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
                                    Apply Now
                                </button>
                                <button className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer">
                                    Remove
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