import { use, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { useAuth } from '~/context/AuthContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Index from '~/routes/index';

export default function Login() {
    const [isCompany, setIsCompany] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rc, setRc] = useState('');
    const [error, setError] = useState('');
    const { login, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the redirect path from location state or default to home
    // const from = location.state?.from || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isCompany) {
                // Handle company login
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    company_checkbox: true,
                    email_company: email,
                    password_company: password,
                    rc: rc
                });

                if (response.data && response.data.access_token) {
                    // Save access token and user data in cookies
                    Cookies.set('access_token', response.data.access_token, { expires: 1 });
                    Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
                    Cookies.set('user_type', response.data.user_type, { expires: 1 });
                    setIsAuthenticated(true);
                    // Show success toast with login approved message
                    toast.success(
                        <div>
                            <div className="font-bold text-lg mb-2">Login Successful! 🎉</div>
                            <div className="text-sm opacity-90">
                                Welcome back, {response.data.user.name}
                            </div>
                            <div className="text-xs opacity-75 mt-1">
                                Redirecting...
                            </div>
                        </div>,
                        {
                            duration: 2000,
                            position: 'top-center',
                            style: {
                                background: '#10B981',
                                color: '#fff',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            },
                            icon: '👋',
                        }
                    );


                    navigate("/")
                }
            } else {
                // Handle student login
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    student_checkbox: true,
                    email_student: email,
                    password_student: password
                });

                if (response.data && response.data.access_token) {
                    // Save access token and user data in cookies
                    Cookies.set('access_token', response.data.access_token, { expires: 1 });
                    Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
                    Cookies.set('user_type', response.data.user_type, { expires: 1 });
                    setIsAuthenticated(true);

                    // Show success toast with login approved message
                    toast.success(
                        <div>
                            <div className="font-bold text-lg mb-2">Login Successful! 🎉</div>
                            <div className="text-sm opacity-90">
                                Welcome back, {response.data.user.first_name} {response.data.user.last_name}
                            </div>
                            <div className="text-xs opacity-75 mt-1">
                                Redirecting...
                            </div>
                        </div>,
                        {
                            duration: 2000,
                            position: 'top-center',
                            style: {
                                background: '#10B981',
                                color: '#fff',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            },
                            icon: '👋',
                        }
                    );

                    navigate("/")
                }
            }
        } catch (err: any) {
            setError('Invalid credentials');
            console.error('Login error:', err);

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
                toast.error(err.response?.data?.message || 'Login failed. Please try again.', {
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


    useEffect(() => {
        const token = Cookies.get('access_token');
        const userType = Cookies.get('user_type');

        if (token && userType) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
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
                            // Company Login Fields
                            <>
                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Company Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="rc" className="sr-only">
                                        RC Number
                                    </label>
                                    <input
                                        id="rc"
                                        name="rc"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="RC Number"
                                        value={rc}
                                        onChange={(e) => setRc(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            // Student Login Fields
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                        <div className="text-center">
                            <span className="text-sm text-gray-600">Don't have an account? </span>
                            <Link
                                to="/register"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Register here
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
} 