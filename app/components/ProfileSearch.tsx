import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Profile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    ville: string;
    skills: string;
    profile_picture: string | null;
}

export default function ProfileSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        skills: '',
        location: ''
    });
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRandomProfiles = async () => {
        setIsLoading(true);
        try {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            };

            const response = await axios.get('http://127.0.0.1:8000/api/profiles/random', { headers });
            const profiles = response.data.profiles || [];
            setProfiles(profiles);
        } catch (error) {
            console.error('Error fetching random profiles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch random profiles on component mount
    useEffect(() => {
        fetchRandomProfiles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setProfiles([]);

        try {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            };

            // Build query parameters
            const params = new URLSearchParams();

            if (searchQuery.trim()) {
                params.append('name', searchQuery.trim());
            }

            if (filters.skills.trim()) {
                // Split skills by comma and add each as a separate parameter
                const skillsArray = filters.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
                skillsArray.forEach(skill => {
                    params.append('skills[]', skill);
                });
            }

            let response;
            // If no search parameters are provided, fetch random profiles
            if (!params.toString()) {
                response = await axios.get('http://127.0.0.1:8000/api/profiles/random', { headers });
            } else {
                response = await axios.get(`http://127.0.0.1:8000/api/profiles?${params.toString()}`, { headers });
            }

            const profiles = response.data.profiles || [];
            setProfiles(profiles);
        } catch (error) {
            console.error('Error searching profiles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContact = (email: string) => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <div className="space-y-6">
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Nom et Prénom"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Compétences (séparées par des virgules)"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.skills}
                            onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Recherche...' : 'Rechercher'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Profile Results Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Résultats de la recherche</h2>
                <div className="space-y-4">
                    {isLoading ? (
                        <p className="text-gray-600">Recherche en cours...</p>
                    ) : profiles.length > 0 ? (
                        <div className="grid gap-4">
                            {profiles.map((profile) => (
                                <div key={profile.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4">
                                        {/* Profile Picture */}
                                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                            {profile.profile_picture ? (
                                                <img
                                                    src={profile.profile_picture}
                                                    alt={`${profile.first_name} ${profile.last_name}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-2xl">
                                                    {profile.first_name[0]}{profile.last_name[0]}
                                                </div>
                                            )}
                                        </div>

                                        {/* Profile Information */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-medium text-blue-900">
                                                        {profile.first_name} {profile.last_name}
                                                    </h3>
                                                    <p className="text-gray-600">{profile.email}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleContact(profile.email)}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                                >
                                                    Contacter
                                                </button>
                                            </div>

                                            <div className="mt-3 space-y-2">
                                                {profile.phone && (
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        {profile.phone}
                                                    </div>
                                                )}
                                                {profile.ville && (
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {profile.ville}, {profile.country}
                                                    </div>
                                                )}
                                                {profile.skills && (
                                                    <div className="mt-2">
                                                        <span className="text-sm font-medium text-gray-700">Compétences: </span>
                                                        <span className="text-sm text-gray-600">{profile.skills}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">Recherchez des profils pour voir les résultats ici.</p>
                    )}
                </div>
            </div>
        </div>
    );
} 