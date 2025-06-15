import { useState, useEffect } from 'react';
import { useAuth } from '~/context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

interface CompanyFormData {
    name: string;
    email: string;
    domain: string;
    address: string;
    country: string;
    ville: string;
    rc: string;
    date: string;
    website: string;
    logo: string;
    description: string;
    password?: string;
    password_confirmation?: string;
}

export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CompanyFormData>({
        name: '',
        email: '',
        domain: '',
        address: '',
        country: '',
        ville: '',
        rc: '',
        date: '',
        website: '',
        logo: '',
        description: '',
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                };

                const response = await axios.get('http://127.0.0.1:8000/api/company/profile', { headers });
                // Format the date to YYYY-MM-DD for the input field
                const formattedData = {
                    ...response.data,
                    date: response.data.date ? new Date(response.data.date).toISOString().split('T')[0] : ''
                };
                setFormData(prevData => ({
                    ...prevData,
                    ...formattedData
                }));
            } catch (error) {
                console.error('Error fetching company data:', error);
                toast.error('Failed to fetch company information');
            }
        };

        fetchCompanyData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            };

            // Create a copy of formData without empty password fields
            const submitData: Partial<CompanyFormData> = { ...formData };
            if (!submitData.password) {
                delete submitData.password;
                delete submitData.password_confirmation;
            }

            // Format the date to YYYY-MM-DD
            if (submitData.date) {
                const date = new Date(submitData.date);
                submitData.date = date.toISOString().split('T')[0];
            }

            console.log('Sending update request with data:', submitData);
            const response = await axios.put('http://127.0.0.1:8000/api/company/profile', submitData, { headers });
            console.log('Update response:', response.data);

            if (response.data) {
                toast.success('Company information updated successfully');
                // Clear password fields after successful update
                setFormData(prev => ({
                    ...prev,
                    password: '',
                    password_confirmation: ''
                }));
            } else {
                toast.error('No response data received from server');
            }
        } catch (error: any) {
            console.error('Error updating company info:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                toast.error(error.response.data.message || 'Failed to update company information');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                toast.error('No response received from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                toast.error('Error setting up the request');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900">Company Information</h2>
                <p className="text-blue-600 mt-1">Update your company details</p>
            </div>

            {/* Company Information Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Details Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-blue-900">Company Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-900">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="rc" className="block text-sm font-medium text-blue-900">RC Number</label>
                            <input
                                type="text"
                                id="rc"
                                name="rc"
                                value={formData.rc}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-blue-900">Date of Creation</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="domain" className="block text-sm font-medium text-blue-900">Domain</label>
                            <input
                                type="text"
                                id="domain"
                                name="domain"
                                value={formData.domain}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium text-blue-900">Website</label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-blue-900">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="ville" className="block text-sm font-medium text-blue-900">City</label>
                            <input
                                type="text"
                                id="ville"
                                name="ville"
                                value={formData.ville}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-blue-900">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-blue-900">Company Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="logo" className="block text-sm font-medium text-blue-900">Company Logo URL</label>
                            <input
                                type="url"
                                id="logo"
                                name="logo"
                                value={formData.logo}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Password Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-blue-900">New Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-blue-900">Confirm Password</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
} 