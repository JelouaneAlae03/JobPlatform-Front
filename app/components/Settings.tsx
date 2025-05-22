import { useState } from 'react';
import { useAuth } from '~/context/AuthContext';

export default function Settings() {
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        emailNotifications: true,
        jobAlerts: true,
        darkMode: false,
        language: 'en',
        timezone: 'UTC',
        privacySettings: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false
        }
    });

    const handleToggleChange = (setting: string) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting as keyof typeof prev]
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePrivacyChange = (setting: string) => {
        setSettings(prev => ({
            ...prev,
            privacySettings: {
                ...prev.privacySettings,
                [setting]: !prev.privacySettings[setting as keyof typeof prev.privacySettings]
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement settings update logic
        console.log('Settings updated:', settings);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-blue-900">Settings</h2>
                <p className="text-blue-600 mt-1">Customize your account preferences</p>
            </div>

            {/* Settings Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Notification Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-blue-900">Email Notifications</h4>
                                <p className="text-sm text-blue-600">Receive email updates about your applications</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={() => handleToggleChange('emailNotifications')}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-blue-900">Job Alerts</h4>
                                <p className="text-sm text-blue-600">Get notified about new job opportunities</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.jobAlerts}
                                    onChange={() => handleToggleChange('jobAlerts')}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Appearance</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-blue-900">Dark Mode</h4>
                                <p className="text-sm text-blue-600">Switch between light and dark theme</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.darkMode}
                                    onChange={() => handleToggleChange('darkMode')}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="language" className="block text-sm font-medium text-blue-900">Language</label>
                            <select
                                id="language"
                                name="language"
                                value={settings.language}
                                onChange={handleSelectChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="timezone" className="block text-sm font-medium text-blue-900">Timezone</label>
                            <select
                                id="timezone"
                                name="timezone"
                                value={settings.timezone}
                                onChange={handleSelectChange}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="UTC">UTC</option>
                                <option value="EST">Eastern Time</option>
                                <option value="CST">Central Time</option>
                                <option value="PST">Pacific Time</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="profileVisibility" className="block text-sm font-medium text-blue-900">Profile Visibility</label>
                            <select
                                id="profileVisibility"
                                name="profileVisibility"
                                value={settings.privacySettings.profileVisibility}
                                onChange={(e) => setSettings(prev => ({
                                    ...prev,
                                    privacySettings: {
                                        ...prev.privacySettings,
                                        profileVisibility: e.target.value
                                    }
                                }))}
                                className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="connections">Connections Only</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-blue-900">Show Email</h4>
                                <p className="text-sm text-blue-600">Display your email on your profile</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.privacySettings.showEmail}
                                    onChange={() => handlePrivacyChange('showEmail')}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-blue-900">Show Phone</h4>
                                <p className="text-sm text-blue-600">Display your phone number on your profile</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.privacySettings.showPhone}
                                    onChange={() => handlePrivacyChange('showPhone')}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
} 