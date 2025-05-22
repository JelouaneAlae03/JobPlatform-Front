import { useState } from 'react';
import Pagination from './Pagination';

// Mock applications data
const mockApplications = [
    {
        id: 1,
        jobTitle: 'Senior Software Engineer',
        company: 'Tech Corp',
        status: 'Under Review',
        appliedDate: '2024-02-15',
        lastUpdated: '2024-02-16',
    },
    {
        id: 2,
        jobTitle: 'Frontend Developer',
        company: 'Web Solutions Inc',
        status: 'Interview Scheduled',
        appliedDate: '2024-02-10',
        lastUpdated: '2024-02-14',
    },
    {
        id: 3,
        jobTitle: 'Full Stack Developer',
        company: 'Digital Innovations',
        status: 'Rejected',
        appliedDate: '2024-02-01',
        lastUpdated: '2024-02-05',
    },
];

export default function MyApplications() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filter, setFilter] = useState('all');

    const totalPages = Math.ceil(mockApplications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentApplications = mockApplications.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'under review':
                return 'bg-yellow-100 text-yellow-800';
            case 'interview scheduled':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">My Applications</h2>
                    <div className="flex gap-2">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Applications</option>
                            <option value="under_review">Under Review</option>
                            <option value="interview">Interview Scheduled</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {currentApplications.map((application) => (
                    <div key={application.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">{application.jobTitle}</h3>
                                <p className="text-gray-600">{application.company}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
                                    {application.status}
                                </span>
                                <div className="text-sm text-gray-600">
                                    <p>Applied: {application.appliedDate}</p>
                                    <p>Last Updated: {application.lastUpdated}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
                                    View Details
                                </button>
                                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
                                    Withdraw
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