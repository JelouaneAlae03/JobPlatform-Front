import { useState, useEffect } from 'react';
import { useAuth } from '~/context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';
import LoadingButton from '../LoadingButton';
import { useLoading } from '~/hooks/useLoading';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

interface JobType {
    id: number;
    Libelle: string;
}

interface OfferStatus {
    id: number;
    Libelle: string;
}

interface Skill {
    id?: number;
    name: string;
}

interface JobOffer {
    id: number;
    title: string;
    Job_Descriptin: string;
    date: string;
    expiration_date: string;
    max_applications: number;
    id_company: number;
    id_JobType: number;
    id_OffreStatus: number;
    created_at: string;
    updated_at: string;
    skills?: Skill[];
    company?: {
        id: number;
        name: string;
        address: string | null;
        email: string;
        date: string | null;
        country: string | null;
        ville: string | null;
        domain: string;
        is_verified: boolean;
        website: string | null;
        logo: string | null;
        description: string | null;
        id_rc: number;
        created_at: string;
    };
    jobtype?: {
        id: number;
        Libelle: string;
    };
    offrestatus?: {
        id: number;
        Libelle: string;
    };
}

export default function JobOffers() {
    const { user } = useAuth();
    const [offers, setOffers] = useState<JobOffer[]>([]);
    const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);
    const [offerStatuses, setOfferStatuses] = useState<OfferStatus[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState<JobOffer | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        Job_Descriptin: '',
        expiration_date: '',
        max_applications: 20,
        id_JobType: 1,
        id_OffreStatus: 1,
        skills: [] as Skill[]
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [offerToDelete, setOfferToDelete] = useState<JobOffer | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [offerToEdit, setOfferToEdit] = useState<JobOffer | null>(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        Job_Descriptin: '',
        skills: [] as Skill[],
        expiration_date: '',
        max_applications: 20,
        id_JobType: 1,
        id_OffreStatus: 1
    });
    const [error, setError] = useState('');
    const [deletingOffers, setDeletingOffers] = useState<Set<number>>(new Set());
    const [updatingOffers, setUpdatingOffers] = useState<Set<number>>(new Set());

    // Use the new loading hook
    const { isLoading, withLoading } = useLoading(true);

    // Get unique statuses from offers
    const getUniqueStatuses = () => {
        const statuses = new Set<string>();
        offers.forEach(offer => {
            if (offer.offrestatus?.Libelle) {
                statuses.add(offer.offrestatus.Libelle);
            }
        });
        return Array.from(statuses);
    };

    // Filter offers based on selected status
    useEffect(() => {
        if (selectedFilter === 'all') {
            setFilteredOffers(offers);
        } else {
            const filtered = offers.filter(offer =>
                offer.offrestatus?.Libelle.toLowerCase() === selectedFilter.toLowerCase()
            );
            setFilteredOffers(filtered);
        }
    }, [selectedFilter, offers]);

    // Fetch job offers
    const fetchOffers = async () => {
        await withLoading(async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/offers', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });

                // Check if response has the expected structure
                if (response.data && response.data.offers && Array.isArray(response.data.offers)) {
                    // Transform the offers to match our interface
                    const transformedOffers = response.data.offers.map((offer: any) => ({
                        ...offer,
                        skills: offer.skills ? offer.skills.split(',').map((skill: string) => ({
                            name: skill.trim()
                        })) : []
                    }));
                    setOffers(transformedOffers);
                    setError('');
                } else {
                    console.error('Invalid response format:', response.data);
                    setOffers([]);
                    setError('Invalid response format from server');
                    toast.error('Invalid response format from server');
                }
            } catch (error) {
                console.error('Error fetching offers:', error);
                setOffers([]);
                setError('Failed to fetch job offers');
                toast.error('Failed to fetch job offers');
            }
        });
    };

    // Fetch job types
    const fetchJobTypes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jobtypes', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            });
            if (Array.isArray(response.data)) {
                setJobTypes(response.data);
            } else {
                console.error('Expected array of job types but got:', response.data);
                setJobTypes([]);
                toast.error('Invalid response format from server');
            }
        } catch (error) {
            console.error('Error fetching job types:', error);
            setJobTypes([]);
            toast.error('Failed to fetch job types');
        }
    };

    // Fetch offer statuses
    const fetchOfferStatuses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/offrestatus', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            });
            if (Array.isArray(response.data)) {
                setOfferStatuses(response.data);
            } else {
                console.error('Expected array of offer statuses but got:', response.data);
                setOfferStatuses([]);
                toast.error('Invalid response format from server');
            }
        } catch (error) {
            console.error('Error fetching offer statuses:', error);
            setOfferStatuses([]);
            toast.error('Failed to fetch offer statuses');
        }
    };

    useEffect(() => {
        fetchJobTypes();
        fetchOfferStatuses();
        fetchOffers();
    }, []);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle skill selection
    const handleSkillChange = (skill: Skill) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.some(s => s.name === skill.name)
                ? prev.skills.filter(s => s.name !== skill.name)
                : [...prev.skills, skill]
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await withLoading(async () => {
            try {
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                };

                const submitData = {
                    ...formData,
                    skills: formData.skills.map(skill => skill.name).join(',')
                };

                if (editingOffer) {
                    await axios.put(`http://127.0.0.1:8000/api/offers/${editingOffer.id}`, submitData, { headers });
                    toast.success('Offer updated successfully');
                } else {
                    await axios.post('http://127.0.0.1:8000/api/offers', submitData, { headers });
                    toast.success('Offer created successfully');
                }

                setIsModalOpen(false);
                setEditingOffer(null);
                setFormData({
                    title: '',
                    Job_Descriptin: '',
                    expiration_date: '',
                    max_applications: 20,
                    id_JobType: 1,
                    id_OffreStatus: 1,
                    skills: []
                });
                fetchOffers(); // Refresh the list
            } catch (error: any) {
                console.error('Error saving offer:', error);
                if (error.response?.data?.errors) {
                    const errors = error.response.data.errors;
                    Object.values(errors).forEach((errorMessages: any) => {
                        toast.error(errorMessages[0]);
                    });
                } else {
                    toast.error(error.response?.data?.message || 'Failed to save offer');
                }
            }
        });
    };

    // Handle offer deletion
    const handleDelete = async (id: number) => {
        setDeletingOffers(prev => new Set(prev).add(id));

        try {
            await axios.delete(`http://127.0.0.1:8000/api/offers/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            });
            toast.success('Offer deleted successfully');
            fetchOffers(); // Refresh the list
        } catch (error: any) {
            console.error('Error deleting offer:', error);
            toast.error(error.response?.data?.message || 'Failed to delete offer');
        } finally {
            setDeletingOffers(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    // Handle edit button click
    const handleEdit = (offer: JobOffer) => {
        setEditingOffer(offer);
        setFormData({
            title: offer.title,
            Job_Descriptin: offer.Job_Descriptin,
            expiration_date: offer.expiration_date,
            max_applications: offer.max_applications,
            id_JobType: offer.id_JobType,
            id_OffreStatus: offer.id_OffreStatus,
            skills: offer.skills?.map(skill => ({ ...skill })) || []
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (offer: JobOffer) => {
        setOfferToDelete(offer);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!offerToDelete) return;

        await withLoading(async () => {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/offers/${offerToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });
                toast.success('Offer deleted successfully');
                setIsDeleteModalOpen(false);
                setOfferToDelete(null);
                fetchOffers(); // Refresh the list
            } catch (error: any) {
                console.error('Error deleting offer:', error);
                toast.error(error.response?.data?.message || 'Failed to delete offer');
            }
        });
    };

    const handleEditClick = (offer: JobOffer) => {
        setOfferToEdit(offer);
        // Format the expiration date to YYYY-MM-DD
        const formattedDate = offer.expiration_date ? new Date(offer.expiration_date).toISOString().split('T')[0] : '';

        setEditFormData({
            title: offer.title,
            Job_Descriptin: offer.Job_Descriptin,
            skills: offer.skills?.map(skill => ({ name: skill.name })) || [],
            expiration_date: formattedDate,
            max_applications: offer.max_applications,
            id_JobType: offer.id_JobType,
            id_OffreStatus: offer.id_OffreStatus
        });
        setIsEditModalOpen(true);
    };

    const handleEditSkillChange = (skill: Skill) => {
        setEditFormData(prev => ({
            ...prev,
            skills: prev.skills.some(s => s.name === skill.name)
                ? prev.skills.filter(s => s.name !== skill.name)
                : [...prev.skills, skill]
        }));
    };

    const handleEditConfirm = async () => {
        if (!offerToEdit) return;

        setUpdatingOffers(prev => new Set(prev).add(offerToEdit.id));

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            };

            const submitData = {
                ...editFormData,
                skills: editFormData.skills.map(skill => skill.name).join(',')
            };

            await axios.put(`http://127.0.0.1:8000/api/offers/${offerToEdit.id}`, submitData, { headers });
            toast.success('Offer updated successfully');
            setIsEditModalOpen(false);
            setOfferToEdit(null);
            fetchOffers(); // Refresh the list
        } catch (error: any) {
            console.error('Error updating offer:', error);
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                Object.values(errors).forEach((errorMessages: any) => {
                    toast.error(errorMessages[0]);
                });
            } else {
                toast.error(error.response?.data?.message || 'Failed to update offer');
            }
        } finally {
            setUpdatingOffers(prev => {
                const newSet = new Set(prev);
                newSet.delete(offerToEdit.id);
                return newSet;
            });
        }
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading job offers..." />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Toaster />
            {/* Offer Manager Navbar */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">Offer Manager</h1>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <nav className="flex space-x-4">
                                <button
                                    onClick={() => setSelectedFilter('all')}
                                    className={`font-medium ${selectedFilter === 'all'
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    All Offers
                                </button>
                                {getUniqueStatuses().map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedFilter(status)}
                                        className={`font-medium ${selectedFilter === status
                                            ? 'text-blue-600'
                                            : 'text-gray-600 hover:text-blue-600'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <LoadingButton
                            onClick={() => {
                                setEditingOffer(null);
                                setFormData({
                                    title: '',
                                    Job_Descriptin: '',
                                    expiration_date: '',
                                    max_applications: 20,
                                    id_JobType: 1,
                                    id_OffreStatus: 1,
                                    skills: []
                                });
                                setIsModalOpen(true);
                            }}
                            variant="primary"
                            size="md"
                        >
                            Create New Offer
                        </LoadingButton>
                    </div>
                </div>
            </div>

            {/* Job Offers List */}
            <div className="space-y-6">
                {filteredOffers.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${offer.offrestatus?.Libelle === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {offer.offrestatus?.Libelle}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">{offer.Job_Descriptin}</p>
                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Type:</span> {offer.jobtype?.Libelle}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Max Applications:</span> {offer.max_applications}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Expires:</span> {new Date(offer.expiration_date).toLocaleDateString()}
                            </p>
                            {offer.skills && offer.skills.length > 0 && (
                                <div className="mt-2">
                                    <span className="text-sm font-medium text-gray-500">Required Skills:</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {offer.skills.map(skill => (
                                            <span
                                                key={skill.id}
                                                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <LoadingButton
                                onClick={() => handleEditClick(offer)}
                                variant="secondary"
                                size="sm"
                                loading={updatingOffers.has(offer.id)}
                                loadingText="Updating..."
                                disabled={deletingOffers.has(offer.id)}
                            >
                                Edit
                            </LoadingButton>
                            <LoadingButton
                                onClick={() => handleDeleteClick(offer)}
                                variant="danger"
                                size="sm"
                                loading={deletingOffers.has(offer.id)}
                                loadingText="Deleting..."
                                disabled={updatingOffers.has(offer.id)}
                            >
                                Delete
                            </LoadingButton>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Create/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl">
                        <h2 className="text-xl font-bold mb-4">
                            {editingOffer ? 'Edit Job Offer' : 'Create New Job Offer'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="Job_Descriptin"
                                    value={formData.Job_Descriptin}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                                    <input
                                        type="date"
                                        name="expiration_date"
                                        value={formData.expiration_date}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Max Applications</label>
                                    <input
                                        type="number"
                                        name="max_applications"
                                        value={formData.max_applications}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Job Type</label>
                                    <select
                                        name="id_JobType"
                                        value={formData.id_JobType}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {jobTypes.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.Libelle}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        name="id_OffreStatus"
                                        value={formData.id_OffreStatus}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {offerStatuses.map(status => (
                                            <option key={status.id} value={status.id}>
                                                {status.Libelle}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                                        {formData.skills.map(skill => (
                                            <div
                                                key={skill.id}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                            >
                                                {skill.name}
                                                <button
                                                    type="button"
                                                    onClick={() => handleSkillChange(skill)}
                                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            name="skills_text"
                                            placeholder="Type a skill and press Enter"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    const input = e.target as HTMLInputElement;
                                                    const value = input.value.trim();
                                                    if (value) {
                                                        const newSkill = { name: value };
                                                        if (!formData.skills.some(s => s.name === value)) {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                skills: [...prev.skills, newSkill]
                                                            }));
                                                        }
                                                        input.value = '';
                                                    }
                                                }
                                            }}
                                            className="flex-1 min-w-[120px] outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <LoadingButton
                                    type="submit"
                                    loading={isLoading}
                                    loadingText={editingOffer ? 'Updating...' : 'Creating...'}
                                    variant="primary"
                                    size="md"
                                >
                                    {editingOffer ? 'Update' : 'Create'}
                                </LoadingButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && offerToEdit && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold mb-4">Edit Offer</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleEditConfirm(); }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editFormData.title}
                                    onChange={handleEditInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="Job_Descriptin"
                                    value={editFormData.Job_Descriptin}
                                    onChange={handleEditInputChange}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                                        {editFormData.skills.map(skill => (
                                            <div
                                                key={skill.name}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                            >
                                                {skill.name}
                                                <button
                                                    type="button"
                                                    onClick={() => handleEditSkillChange(skill)}
                                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            name="skills_text"
                                            placeholder="Type a skill and press Enter"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    const input = e.target as HTMLInputElement;
                                                    const value = input.value.trim();
                                                    if (value) {
                                                        const newSkill = { name: value };
                                                        if (!editFormData.skills.some(s => s.name === value)) {
                                                            setEditFormData(prev => ({
                                                                ...prev,
                                                                skills: [...prev.skills, newSkill]
                                                            }));
                                                        }
                                                        input.value = '';
                                                    }
                                                }
                                            }}
                                            className="flex-1 min-w-[120px] outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                                    <input
                                        type="date"
                                        name="expiration_date"
                                        value={editFormData.expiration_date}
                                        onChange={handleEditInputChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Max Applications</label>
                                    <input
                                        type="number"
                                        name="max_applications"
                                        value={editFormData.max_applications}
                                        onChange={handleEditInputChange}
                                        min="1"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Job Type</label>
                                    <select
                                        name="id_JobType"
                                        value={editFormData.id_JobType}
                                        onChange={handleEditInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {jobTypes.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.Libelle}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        name="id_OffreStatus"
                                        value={editFormData.id_OffreStatus}
                                        onChange={handleEditInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {offerStatuses.map(status => (
                                            <option key={status.id} value={status.id}>
                                                {status.Libelle}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setOfferToEdit(null);
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <LoadingButton
                                    type="submit"
                                    loading={updatingOffers.has(offerToEdit.id)}
                                    loadingText="Updating..."
                                    variant="primary"
                                    size="md"
                                >
                                    Update Offer
                                </LoadingButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && offerToDelete && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold mb-4">Delete Offer</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete the offer "{offerToDelete.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setOfferToDelete(null);
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <LoadingButton
                                onClick={handleDeleteConfirm}
                                loading={isLoading}
                                loadingText="Deleting..."
                                variant="danger"
                                size="md"
                            >
                                Delete
                            </LoadingButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 