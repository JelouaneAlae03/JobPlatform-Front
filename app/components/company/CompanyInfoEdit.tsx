import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/AuthContext';
import toast from 'react-hot-toast';

const CompanyInfoEdit = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [form, setForm] = useState({
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
                const response = await axios.get('/api/company/profile');
                setForm(prevForm => ({
                    ...prevForm,
                    ...response.data
                }));
            } catch (error) {
                console.error('Error fetching company data:', error);
                toast.error('Failed to fetch company information');
            }
        };

        fetchCompanyData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put('/api/company/profile', form);
            toast.success('Company information updated successfully');
            navigate('/company-profile');
        } catch (error) {
            console.error('Error updating company info:', error);
            toast.error('Failed to update company information');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900">Company Information</h2>
                <p className="text-blue-600 mt-1">Update your company details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-blue-900">Company Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-900">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="rc" className="block text-sm font-medium text-blue-900">RC Number</label>
                            <input
                                type="text"
                                id="rc"
                                name="rc"
                                value={form.rc}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-blue-900">Date of Creation</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="domain" className="block text-sm font-medium text-blue-900">Domain</label>
                            <input
                                type="text"
                                id="domain"
                                name="domain"
                                value={form.domain}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium text-blue-900">Website</label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-blue-900">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="ville" className="block text-sm font-medium text-blue-900">City</label>
                            <input
                                type="text"
                                id="ville"
                                name="ville"
                                value={form.ville}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-blue-900">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-blue-900">Company Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
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
                                value={form.logo}
                                onChange={handleChange}
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
                                value={form.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-blue-900">Confirm Password</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/company-profile')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompanyInfoEdit; 