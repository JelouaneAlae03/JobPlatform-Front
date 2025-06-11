import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '~/context/AuthContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const [isCompany, setIsCompany] = useState(false);
    const [formData, setFormData] = useState({
        // Company fields
        company_checkbox: false,
        name: '',
        rc: '',
        company_password: '',
        company_password_confirmation: '',
        email: '',
        domain: '',
        address: '',
        country: '',
        ville: '',
        date: '',
        // Student fields
        student_checkbox: true,
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
        phone: '',
        skills: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let response;
            if (isCompany) {
                // Handle company registration
                const companyData = {
                    company_checkbox: true,
                    name: formData.name,
                    rc: formData.rc,
                    company_password: formData.company_password,
                    company_password_confirmation: formData.company_password_confirmation,
                    email: formData.email,
                    domain: formData.domain,
                    address: formData.address,
                    country: formData.country,
                    ville: formData.ville,
                    date: formData.date
                };
                response = await register(companyData);
            } else {
                // Handle student registration
                const studentData = {
                    student_checkbox: true,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                    phone: formData.phone,
                    skills: formData.skills
                };
                response = await register(studentData);
            }

            // Show success message
            toast.success(
                <div>
                    <div className="font-bold text-lg mb-2">Success! 🎉</div>
                    <div className="text-sm opacity-90">{response.message}</div>
                </div>,
                {
                    duration: 3000,
                    position: 'top-center',
                    style: {
                        background: '#10B981',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    },
                    icon: '✅',
                }
            );

            // Wait for 3 seconds before redirecting
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err: any) {
            setError('Registration failed');
            console.error('Registration error:', err);

            // Handle API error response
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors as Record<string, string[]>;
                // Get the first error message from any field
                const firstError = Object.values(errors)[0][0];
                toast.error(firstError, {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#EF4444',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    },
                    icon: '❌',
                });
            } else {
                // Fallback error message if no specific error is provided
                toast.error(err.response?.data?.message || 'Registration failed. Please try again.', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#EF4444',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    },
                    icon: '❌',
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}

                    {/* User Type Selection */}
                    <div className="flex items-center justify-center space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                checked={!isCompany}
                                onChange={() => setIsCompany(false)}
                            />
                            <span className="ml-2 text-gray-700">Student</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-indigo-600"
                                checked={isCompany}
                                onChange={() => setIsCompany(true)}
                            />
                            <span className="ml-2 text-gray-700">Company</span>
                        </label>
                    </div>

                    <div className="rounded-md shadow-sm -space-y-px">
                        {isCompany ? (
                            // Company Registration Fields
                            <>
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Company Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="rc"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="RC Number"
                                        value={formData.rc}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Company Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="domain"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Company Domain"
                                        value={formData.domain}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="address"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Company Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="country"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="ville"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="City"
                                        value={formData.ville}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="date"
                                        type="date"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="company_password"
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={formData.company_password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="company_password_confirmation"
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Confirm Password"
                                        value={formData.company_password_confirmation}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        ) : (
                            // Student Registration Fields
                            <>
                                <div>
                                    <input
                                        name="first_name"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="First Name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="last_name"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Last Name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="skills"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Skills (comma-separated)"
                                        value={formData.skills}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        name="password_confirmation"
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Confirm Password"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                        <div className="text-center">
                            <span className="text-sm text-gray-600">Already have an account? </span>
                            <Link
                                to="/login"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
} 