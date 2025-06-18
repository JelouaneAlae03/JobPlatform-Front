import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export interface Company {
    id: string;
    name: string;
    rc: string;
    email: string;
    domain: string;
    address: string;
    country: string;
    ville: string;
    date: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    title?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
    // Company specific fields
    domain?: string;
    address?: string;
    country?: string;
    ville?: string;
    rc?: string;
}

interface AuthContextType {
    user: User | null;
    company: Company | null;
    login: (email: string, password: string, isCompany: boolean) => Promise<void>;
    register: (data: any) => Promise<{ message: string; company?: any; user?: any }>;
    logout: () => void;
    setIsAuthenticated: (val: boolean) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state from cookies
    useEffect(() => {
        const initializeAuth = () => {
            const token = Cookies.get('access_token');
            const userData = Cookies.get('user');
            const userType = Cookies.get('user_type');

            if (token && userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    setIsAuthenticated(true);

                    // If it's a company user, set company data
                    if (userType === 'company') {
                        setCompany(parsedUser);
                    }
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    // Clear invalid cookies
                    Cookies.remove('access_token');
                    Cookies.remove('user');
                    Cookies.remove('user_type');
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string, isCompany: boolean) => {
        try {
            if (isCompany) {
                // Handle company login
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    company_checkbox: true,
                    email_company: email,
                    password_company: password
                });

                if (response.data && response.data.access_token) {
                    Cookies.set('access_token', response.data.access_token, { expires: 1 });
                    Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
                    Cookies.set('user_type', response.data.user_type, { expires: 1 });
                    setUser(response.data.user);
                    setCompany(response.data.user);
                    setIsAuthenticated(true);
                }
            } else {
                // Handle student login
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    student_checkbox: true,
                    email_student: email,
                    password_student: password
                });

                if (response.data && response.data.access_token) {
                    Cookies.set('access_token', response.data.access_token, { expires: 1 });
                    Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });
                    Cookies.set('user_type', response.data.user_type, { expires: 1 });
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (data: any) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup', data);
            if (response.data) {
                // Registration successful
                return response.data;
            }
            throw new Error('No data received from registration');
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        // Show success message
        toast.success(
            <div>
                <div className="font-bold text-lg mb-2">Logged Out Successfully! 👋</div>
                <div className="text-sm opacity-90">
                    Thank you for using our platform. See you soon!
                </div>
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
                icon: '👋',
            }
        );

        // Remove all cookies
        Cookies.remove('access_token');
        Cookies.remove('user');
        Cookies.remove('user_type');

        // Clear state
        setUser(null);
        setCompany(null);
        setIsAuthenticated(false);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                company,
                login,
                register,
                logout,
                setIsAuthenticated,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 