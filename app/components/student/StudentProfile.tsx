import { useState, useEffect } from 'react';
import { useAuth } from '~/context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';
import LoadingButton from '../LoadingButton';
import { useLoading } from '~/hooks/useLoading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

interface StudentFormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    ville: string;
    address: string;
    date_of_birth: string;
    sex: string;
    skills: string[];
    profile_picture: string;
    password?: string;
    password_confirmation?: string;
}

export default function StudentProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<StudentFormData>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: '',
        ville: '',
        address: '',
        date_of_birth: '',
        sex: '',
        skills: [],
        profile_picture: '',
        password: '',
        password_confirmation: ''
    });
    const [currentSkill, setCurrentSkill] = useState('');
    const [error, setError] = useState('');

    // Use the new loading hook
    const { isLoading, withLoading } = useLoading(true);

    // Check for authentication cookie
    useEffect(() => {
        const token = Cookies.get('access_token');
        const userType = Cookies.get('user_type');

        if (!token) {
            toast.error('Please login to access your profile');
            navigate('/login');
            return;
        }

        if (userType !== 'student') {
            toast.error('Access denied. This page is for students only.');
            navigate('/dashboard');
            return;
        }
    }, [navigate]);

    useEffect(() => {
        const fetchStudentData = async () => {
            await withLoading(async () => {
                try {
                    const headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access_token')}`
                    };

                    const response = await axios.get('http://127.0.0.1:8000/api/student/profile', { headers });
                    // Convert skills string to array if it exists
                    const skills = response.data.skills ? response.data.skills.split(',').map((skill: string) => skill.trim()) : [];
                    setFormData(prevData => ({
                        ...prevData,
                        ...response.data,
                        skills
                    }));
                    setError('');
                } catch (error: any) {
                    console.error('Error fetching student data:', error);
                    if (error.response?.status === 401) {
                        toast.error('Your session has expired. Please login again.');
                        navigate('/login');
                    } else {
                        setError('Failed to fetch student information');
                        toast.error('Failed to fetch student information');
                    }
                }
            });
        };

        fetchStudentData();
    }, [navigate, withLoading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const skill = currentSkill.trim();
            if (skill && !formData.skills.includes(skill)) {
                setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, skill]
                }));
                setCurrentSkill('');
            }
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await withLoading(async () => {
            try {
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                };

                // Create a copy of formData without empty password fields
                const submitData: Partial<StudentFormData> = { ...formData };
                if (!submitData.password) {
                    delete submitData.password;
                    delete submitData.password_confirmation;
                }

                // Convert skills array to string for API submission
                if (submitData.skills) {
                    const skillsString = submitData.skills.join(',');
                    submitData.skills = skillsString as any; // Type assertion needed for API submission
                }

                console.log('Sending update request with data:', submitData);
                const response = await axios.put('http://127.0.0.1:8000/api/student/profile', submitData, { headers });
                console.log('Update response:', response.data);

                if (response.data) {
                    toast.success('Student information updated successfully');
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
                console.error('Error updating student info:', error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    toast.error(error.response.data.message || 'Failed to update student information');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    toast.error('No response received from server');
                } else {
                    console.error('Error message:', error.message);
                    toast.error('Error setting up the request');
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading student profile..." />
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
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900">Student Information</h2>
                <p className="text-blue-600 mt-1">Update your student details</p>
            </div>

            {/* Student Information Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium text-blue-900">First Name</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium text-blue-900">Last Name</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
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
                            <label htmlFor="phone" className="block text-sm font-medium text-blue-900">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="date_of_birth" className="block text-sm font-medium text-blue-900">Date of Birth</label>
                            <input
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="sex" className="block text-sm font-medium text-blue-900">Gender</label>
                            <select
                                id="sex"
                                name="sex"
                                value={formData.sex}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
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
                        <div>
                            <label htmlFor="profile_picture" className="block text-sm font-medium text-blue-900">Profile Picture URL</label>
                            <input
                                type="url"
                                id="profile_picture"
                                name="profile_picture"
                                value={formData.profile_picture}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="skills" className="block text-sm font-medium text-blue-900">Skills</label>
                            <div className="mt-1">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                    onKeyDown={handleSkillKeyDown}
                                    placeholder="Type a skill and press Enter or Space"
                                    className="block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
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
                    <LoadingButton
                        type="submit"
                        loading={isLoading}
                        loadingText="Saving changes..."
                        variant="primary"
                        size="md"
                    >
                        Save Changes
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
} 