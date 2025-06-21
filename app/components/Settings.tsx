import { useState, useEffect } from 'react';
import { useAuth } from '~/context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import LoadingButton from './LoadingButton';
import { useLoading } from '~/hooks/useLoading';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

interface SettingsData {
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    privacy: {
        profile_visibility: 'public' | 'private' | 'connections';
        show_email: boolean;
        show_phone: boolean;
    };
    preferences: {
        language: string;
        timezone: string;
        theme: 'light' | 'dark' | 'auto';
    };
}

export default function Settings() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [settings, setSettings] = useState<SettingsData>({
        notifications: {
            email: true,
            push: true,
            sms: false
        },
        privacy: {
            profile_visibility: 'public',
            show_email: true,
            show_phone: false
        },
        preferences: {
            language: 'en',
            timezone: 'UTC',
            theme: 'light'
        }
    });
    const [error, setError] = useState('');

    // Use the new loading hook
    const { isLoading, withLoading } = useLoading(true);

    useEffect(() => {
        const fetchSettings = async () => {
            await withLoading(async () => {
                try {
                    const headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access_token')}`
                    };

                    // Fetch user settings from API
                    const response = await axios.get('http://127.0.0.1:8000/api/user/settings', { headers });
                    if (response.data) {
                        setSettings(prev => ({
                            ...prev,
                            ...response.data
                        }));
                    }
                    setError('');
                } catch (error: any) {
                    console.error('Error fetching settings:', error);
                    // If settings endpoint doesn't exist, use default settings
                    if (error.response?.status === 404) {
                        console.log('Settings endpoint not found, using default settings');
                    } else {
                        setError('Failed to load settings');
                        toast.error('Failed to load settings');
                    }
                }
            });
        };

        fetchSettings();
    }, [withLoading]);

    const handleNotificationChange = (key: keyof SettingsData['notifications']) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handlePrivacyChange = (key: keyof SettingsData['privacy'], value: any) => {
        setSettings(prev => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [key]: value
            }
        }));
    };

    const handlePreferenceChange = (key: keyof SettingsData['preferences'], value: any) => {
        setSettings(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }));
    };

    const handleSaveSettings = async () => {
        await withLoading(async () => {
            try {
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`
                };

                // Save settings to API
                await axios.put('http://127.0.0.1:8000/api/user/settings', settings, { headers });
                toast.success('Settings saved successfully');
            } catch (error: any) {
                console.error('Error saving settings:', error);
                if (error.response?.status === 404) {
                    // If settings endpoint doesn't exist, just show success
                    toast.success('Settings updated locally');
                } else {
                    toast.error('Failed to save settings');
                }
            }
        });
    };

    const handleResetSettings = async () => {
        await withLoading(async () => {
            const defaultSettings: SettingsData = {
                notifications: {
                    email: true,
                    push: true,
                    sms: false
                },
                privacy: {
                    profile_visibility: 'public',
                    show_email: true,
                    show_phone: false
                },
                preferences: {
                    language: 'en',
                    timezone: 'UTC',
                    theme: 'light'
                }
            };

            setSettings(defaultSettings);
            toast.success('Settings reset to default');
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading settings..." />
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
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                <h2 className="text-2xl font-semibold text-blue-900">Settings</h2>
                <p className="text-blue-600 mt-1">Manage account preferences and privacy settings</p>
            </div>

            {/* Notifications Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                        <button
                            onClick={() => handleNotificationChange('email')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Push Notifications</h4>
                            <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                        </div>
                        <button
                            onClick={() => handleNotificationChange('push')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                            <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                        </div>
                        <button
                            onClick={() => handleNotificationChange('sms')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications.sms ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Privacy</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Profile Visibility
                        </label>
                        <select
                            value={settings.privacy.profile_visibility}
                            onChange={(e) => handlePrivacyChange('profile_visibility', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="public">Public - Anyone can view</option>
                            <option value="connections">Connections only</option>
                            <option value="private">Private - Only you</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Show Email Address</h4>
                            <p className="text-sm text-gray-600">Display your email on your profile</p>
                        </div>
                        <button
                            onClick={() => handlePrivacyChange('show_email', !settings.privacy.show_email)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.privacy.show_email ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.privacy.show_email ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">Show Phone Number</h4>
                            <p className="text-sm text-gray-600">Display your phone on your profile</p>
                        </div>
                        <button
                            onClick={() => handlePrivacyChange('show_phone', !settings.privacy.show_phone)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.privacy.show_phone ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.privacy.show_phone ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Language
                        </label>
                        <select
                            value={settings.preferences.language}
                            onChange={(e) => handlePreferenceChange('language', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="es">Español</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Timezone
                        </label>
                        <select
                            value={settings.preferences.timezone}
                            onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">Eastern Time</option>
                            <option value="America/Chicago">Central Time</option>
                            <option value="America/Denver">Mountain Time</option>
                            <option value="America/Los_Angeles">Pacific Time</option>
                            <option value="Europe/London">London</option>
                            <option value="Europe/Paris">Paris</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Theme
                        </label>
                        <select
                            value={settings.preferences.theme}
                            onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto (System)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <LoadingButton
                        onClick={handleResetSettings}
                        variant="secondary"
                        size="md"
                        loading={isLoading}
                        loadingText="Resetting..."
                    >
                        Reset to Default
                    </LoadingButton>
                    <LoadingButton
                        onClick={handleSaveSettings}
                        variant="primary"
                        size="md"
                        loading={isLoading}
                        loadingText="Saving..."
                    >
                        Save Settings
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
} 