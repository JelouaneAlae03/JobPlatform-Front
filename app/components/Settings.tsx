import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '~/context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

interface CompanyData {
    name: string;
    email: string;
    domain: string;
    address: string;
    country: string;
    ville: string;
    rc: string;
    password: string;
    password_confirmation: string;
}

export default function Settings() {
    const { user, company } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CompanyData>({
        name: '',
        email: '',
        domain: '',
        address: '',
        country: '',
        ville: '',
        rc: '',
        password: '',
        password_confirmation: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchCompanyData = async () => {
            // if (!user?.id) {
            //     toast.error('Please log in to access company settings');
            //     navigate('/login');
            //     return;
            // }

            try {
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                };

                // First try to get the company profile
                const response = await axios.get('http://127.0.0.1:8000/api/company/profile', { headers });
                const companyData = response.data;

                setFormData(prev => ({
                    ...prev,
                    name: companyData.name || '',
                    email: companyData.email || '',
                    domain: companyData.domain || '',
                    address: companyData.address || '',
                    country: companyData.country || '',
                    ville: companyData.ville || '',
                    rc: companyData.rc || ''
                }));
            } catch (error: any) {
                console.error('Error fetching company data:', error);
                // if (error.response?.status === 401) {
                //     toast.error('Please log in to access company settings');
                //     navigate('/login');
                // } else {
                //     toast.error(error.response?.data?.message || 'Failed to fetch company information');
                // }
            } finally {
                setIsFetching(false);
            }
        };

        fetchCompanyData();
    }, [user?.id, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            };

            // Create a copy of formData without empty password fields
            const submitData: Partial<CompanyData> = { ...formData };
            if (!submitData.password) {
                delete submitData.password;
                delete submitData.password_confirmation;
            }

            const response = await axios.put('http://127.0.0.1:8000/api/company/profile', submitData, { headers });

            toast.success('Company information updated successfully');

            // Clear password fields after successful update
            setFormData(prev => ({
                ...prev,
                password: '',
                password_confirmation: ''
            }));

        } catch (error: any) {
            console.error('Error updating company information:', error);
            if (error.response?.status === 401) {
                toast.error('Please log in to update company settings');
                navigate('/login');
            } else if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                Object.values(errors).forEach((errorMessages: any) => {
                    toast.error(errorMessages[0]);
                });
            } else {
                toast.error(error.response?.data?.message || 'Failed to update company information');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-blue-600">Loading company information...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Toaster position="top-right" />

            {/* Header Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900">Settings</h2>
                <p className="text-blue-600 mt-1">Update your app Settings</p>
            </div>


        </div>
    );
} 