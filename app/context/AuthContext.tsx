import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

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
}

interface AuthContextType {
    user: User | null;
    company: Company | null;
    login: (identifier: string, password: string, isCompany: boolean) => Promise<void>;
    registerCompany: (companyData: Omit<Company, 'id'> & { company_password: string }) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [company, setCompany] = useState<Company | null>(null);

    const login = async (identifier: string, password: string, isCompany: boolean) => {
        try {
            // TODO: Replace with actual API call
            const endpoint = isCompany ? '/api/auth/company-login' : '/api/auth/login';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...(isCompany ? { companyName: identifier, rc: password } : { email: identifier, password })
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            if (isCompany) {
                setCompany(data);
                localStorage.setItem('company', JSON.stringify(data));
            } else {
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const registerCompany = async (companyData: Omit<Company, 'id'> & { company_password: string }) => {
        try {
            // TODO: Replace with actual API call
            const response: Response = await fetch('/api/auth/register-company', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(companyData),
            });

            if (!response.ok) {
                throw new Error('Company registration failed');
            }

            const responseData: Company = await response.json();
            setCompany(responseData);
            localStorage.setItem('company', JSON.stringify(responseData));
        } catch (error) {
            console.error('Company registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setCompany(null);
        localStorage.removeItem('user');
        localStorage.removeItem('company');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                company,
                login,
                registerCompany,
                logout,
                isAuthenticated: !!(user || company),
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