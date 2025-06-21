import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import { useLoading } from '~/hooks/useLoading';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

interface SavedJob {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    company_email: string;
    created_at: string;
}

export default function SavedJobs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1
    });

    // Use the new loading hook
    const { isLoading, withLoading } = useLoading(true);

    useEffect(() => {
        fetchSavedJobs();
    }, [currentPage, itemsPerPage, searchQuery]);

    const fetchSavedJobs = async () => {
        await withLoading(async () => {
            try {
                const token = Cookies.get('access_token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/saved-offers', {
                    params: {
                        page: currentPage,
                        per_page: itemsPerPage,
                        search: searchQuery
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Transform the saved offers data to match our interface
                const transformedJobs = response.data.map((saved: any) => ({
                    id: saved.offer.id,
                    title: saved.offer.title,
                    company: saved.offer.company.name,
                    location: saved.offer.company.ville,
                    type: saved.offer.jobtype.Libelle,
                    salary: '', // Add if available in your data
                    description: saved.offer.Job_Descriptin,
                    requirements: saved.offer.skills ? saved.offer.skills.split(',') : [],
                    company_email: saved.offer.company.email,
                    created_at: saved.created_at
                }));

                setSavedJobs(transformedJobs);
                setPagination({
                    total: response.data.length,
                    per_page: itemsPerPage,
                    current_page: currentPage,
                    last_page: Math.ceil(response.data.length / itemsPerPage)
                });
                setError('');
            } catch (error: any) {
                if (error.response?.status === 401) {
                    window.location.href = '/login';
                } else {
                    setError(error.response?.data?.message || 'Failed to fetch saved jobs');
                    toast.error('Failed to fetch saved jobs');
                }
            }
        });
    };

    const handleRemoveJob = async (jobId: number) => {
        await withLoading(async () => {
            try {
                const token = Cookies.get('access_token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                await axios.delete(`http://127.0.0.1:8000/api/saved-offers/${jobId}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                setSavedJobs(prev => prev.filter(job => job.id !== jobId));
                toast.success('Job removed from saved jobs');
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Failed to remove job');
            }
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading saved jobs..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

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
                    </div>
                </div>
            </div>

            {/* Saved Jobs List */}
            <div className="space-y-4">
                {savedJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">{job.title}</h3>
                                <p className="text-gray-600">{job.company}</p>
                                <p className="text-gray-500 text-sm mt-1">
                                    <span className="font-medium">Email:</span> {job.company_email}
                                </p>
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
                                <span>Saved on {new Date(job.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                                    onClick={() => {
                                        const subject = `Candidature au poste de ${job.title}`;
                                        const mailtoLink = `mailto:${job.company_email}?subject=${encodeURIComponent(subject)}`;
                                        window.location.href = mailtoLink;
                                    }}
                                >
                                    Apply Now
                                </button>
                                <button
                                    className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                                    onClick={() => handleRemoveJob(job.id)}
                                >
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
                    currentPage={pagination.current_page}
                    totalPages={pagination.last_page}
                    onPageChange={handlePageChange}
                    itemsPerPage={pagination.per_page}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            </div>
        </div>
    );
} 