import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    posted: string;
    description: string;
    requirements: string[];
    company_email: string;
}

interface PaginationData {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export default function JobListings() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [savedOffers, setSavedOffers] = useState<number[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setSearchInput(searchQuery);
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [currentPage, itemsPerPage, searchQuery]);

    useEffect(() => {
        const checkSavedStatus = async () => {
            const token = Cookies.get('access_token');
            if (!token) return;

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/saved-offers', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const savedOfferIds = response.data.map((saved: any) => saved.id_offre);
                setSavedOffers(savedOfferIds);
            } catch (error) {
                console.error('Error fetching saved offers:', error);
            }
        };

        checkSavedStatus();
    }, []);

    const fetchJobs = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/job-listings', {
                params: {
                    page: currentPage,
                    per_page: itemsPerPage,
                    search: searchQuery
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                }
            });

            setJobs(response.data.jobs);
            setPagination(response.data.pagination);
            setError('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch lis of jobs');
            console.error('Error fetching jobs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const handleSaveOffer = async (offerId: number) => {
        const token = Cookies.get('access_token');

        if (!token) {
            toast.error('Please login to save offers');
            window.location.href = '/login';
            return;
        }

        try {
            if (savedOffers.includes(offerId)) {
                // Unsave the offer
                const response = await axios.delete(
                    `http://127.0.0.1:8000/api/saved-offers/${offerId}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.saved === false) {
                    setSavedOffers(prev => prev.filter(id => id !== offerId));
                    toast.success('Offer unsaved successfully!');
                }
            } else {
                // Save the offer
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/saved-offers',
                    { id_offre: offerId },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (response.data.saved) {
                    setSavedOffers(prev => [...prev, offerId]);
                    toast.success('Offer saved successfully!');
                }
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error('Please login to save offers');
                window.location.href = '/login';
            } else {
                toast.error(error.response?.data?.message || 'Failed to save/unsave offer');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setSearchQuery(searchInput);
                                    setCurrentPage(1);
                                }
                            }}
                        />
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => {
                                setSearchQuery(searchInput);
                                setCurrentPage(1);
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer">
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
                                <span>Posted {job.posted}</span>
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
                                    className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${savedOffers.includes(job.id)
                                        ? 'border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500'
                                        : 'border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
                                        }`}
                                    onClick={() => handleSaveOffer(job.id)}
                                >
                                    {savedOffers.includes(job.id) ? 'Saved' : 'Save'}
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