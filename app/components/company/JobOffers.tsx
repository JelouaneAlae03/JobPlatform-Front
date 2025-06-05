import { useState, useEffect } from 'react';
import { useAuth } from '~/context/AuthContext';
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
    id: number;
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
    };
    jobtype?: {
        id: number;
        name: string;
    };
    offrestatus?: {
        id: number;
        name: string;
    };
}

export default function JobOffers() {
    const { user } = useAuth();
    const [offers, setOffers] = useState<JobOffer[]>([]);
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);
    const [offerStatuses, setOfferStatuses] = useState<OfferStatus[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOffer, setEditingOffer] = useState<JobOffer | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        Job_Descriptin: '',
        expiration_date: '',
        max_applications: 20,
        id_JobType: 1,
        id_OffreStatus: 1,
        skills: [] as number[]
    });

    // Fetch skills
    const fetchSkills = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/skills');
            setSkills(response.data);
        } catch (error) {
            toast.error('Failed to fetch skills');
        }
    };

    // Fetch job types
    const fetchJobTypes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/job-types');
            setJobTypes(response.data);
        } catch (error) {
            toast.error('Failed to fetch job types');
        }
    };

    // Fetch offer statuses
    const fetchOfferStatuses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/offer-statuses');
            setOfferStatuses(response.data);
        } catch (error) {
            toast.error('Failed to fetch offer statuses');
        }
    };

    // Fetch job offers
    const fetchOffers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/company/job-offers', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`
                }
            });
            setOffers(response.data);
        } catch (error) {
            toast.error('Failed to fetch job offers');
        }
    };

    useEffect(() => {
        fetchSkills();
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
    const handleSkillChange = (skillId: number) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skillId)
                ? prev.skills.filter(id => id !== skillId)
                : [...prev.skills, skillId]
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const companyId = JSON.parse(Cookies.get('user') || '{}').id;
            const offerData = {
                id: editingOffer?.id || null,
                title: formData.title,
                Job_Descriptin: formData.Job_Descriptin,
                skills: formData.skills.map(id => skills.find(skill => skill.id === id)?.name).join(', '),
                date: new Date().toISOString(),
                expiration_date: formData.expiration_date,
                max_applications: formData.max_applications,
                id_company: companyId,
                id_JobType: formData.id_JobType,
                id_OffreStatus: formData.id_OffreStatus,
                created_at: null,
                company: {
                    id: companyId
                },
                jobtype: {
                    id: formData.id_JobType
                },
                offrestatus: {
                    id: formData.id_OffreStatus
                }
            };

            if (editingOffer) {
                // Update existing offer
                await axios.put(`http://127.0.0.1:8000/api/offers/${editingOffer.id}`, offerData, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Job offer updated successfully');
            } else {
                // Create new offer
                await axios.post('http://127.0.0.1:8000/api/offers', offerData, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                toast.success('Job offer created successfully');
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
            fetchOffers();
        } catch (error) {
            toast.error('Failed to save job offer');
        }
    };

    // Handle offer deletion
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this job offer?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/company/job-offers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access_token')}`
                    }
                });
                toast.success('Job offer deleted successfully');
                fetchOffers();
            } catch (error) {
                toast.error('Failed to delete job offer');
            }
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
            skills: offer.skills?.map(skill => skill.id) || []
        });
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Toaster />
            {/* Offer Manager Navbar */}
            <div className="bg-white shadow-md rounded-lg mb-8">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">Offer Manager</h1>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <nav className="flex space-x-4">
                                <a href="#" className="text-blue-600 font-medium">All Offers</a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">Active</a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">Draft</a>
                                <a href="#" className="text-gray-600 hover:text-blue-600">Archived</a>
                            </nav>
                        </div>
                        <button
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
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Create New Offer
                        </button>
                    </div>
                </div>
            </div>

            {/* Job Offers List */}
            <div className="space-y-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${offer.offrestatus?.name === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {offer.offrestatus?.name}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">{offer.Job_Descriptin}</p>
                        <div className="space-y-2 mb-4">
                            <p className="text-sm text-gray-500">
                                <span className="font-medium">Type:</span> {offer.jobtype?.name}
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
                            <button
                                onClick={() => handleEdit(offer)}
                                className="text-blue-600 hover:text-blue-800 focus:outline-none"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(offer.id)}
                                className="text-red-600 hover:text-red-800 focus:outline-none"
                            >
                                Delete
                            </button>
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
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {skills.map(skill => (
                                        <label
                                            key={skill.id}
                                            className="inline-flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.skills.includes(skill.id)}
                                                onChange={() => handleSkillChange(skill.id)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{skill.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {editingOffer ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 