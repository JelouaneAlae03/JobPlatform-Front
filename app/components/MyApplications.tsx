import { useState } from 'react';
import Pagination from './Pagination';

// Mock applications data - replace with actual API call
const mockApplications = [
    {
        id: 1,
        jobTitle: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        appliedDate: "2024-03-15",
        status: "Under Review",
        location: "New York, NY",
        salary: "$120,000 - $150,000"
    },
    {
        id: 2,
        jobTitle: "Frontend Developer",
        company: "Digital Innovations",
        appliedDate: "2024-03-10",
        status: "Interview Scheduled",
        location: "Remote",
        salary: "$90,000 - $110,000"
    },
    {
        id: 3,
        jobTitle: "Full Stack Developer",
        company: "StartUp Vision",
        appliedDate: "2024-03-05",
        status: "Application Submitted",
        location: "San Francisco, CA",
        salary: "$100,000 - $130,000"
    }
];

export default function MyApplications() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Calculate pagination
    const totalPages = Math.ceil(mockApplications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentApplications = mockApplications.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of applications list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (size: number) => {
        setItemsPerPage(size);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'interview scheduled':
                return 'bg-green-100 text-green-800';
            case 'under review':
                return 'bg-blue-100 text-blue-800';
            case 'application submitted':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900">My Applications</h2>
                <p className="text-blue-600 mt-1">Track the status of your job applications</p>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {currentApplications.map((application) => (
                    <div
                        key={application.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-blue-100"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900">{application.jobTitle}</h3>
                                <p className="text-blue-600 font-medium">{application.company}</p>
                                <div className="mt-2 flex items-center space-x-4 text-sm text-blue-600">
                                    <span>{application.location}</span>
                                    <span>•</span>
                                    <span>{application.salary}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                    {application.status}
                                </span>
                                <p className="text-sm text-blue-600 mt-2">Applied on {application.appliedDate}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                View Details
                            </button>
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                                Withdraw
                            </button>
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