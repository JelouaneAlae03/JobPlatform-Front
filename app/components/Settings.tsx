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

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [contactData, setContactData] = useState({
        email: user?.email || '',
        phone: user?.phone || '',
        currentPassword: '' // For verification when changing contact info
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement password change logic
        console.log('Password change requested:', passwordData);
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement contact info update logic
        console.log('Contact info update requested:', contactData);
    };

    const handleDeleteAccount = () => {
        // TODO: Implement account deletion logic
        console.log('Account deletion requested');
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
                {/* Account Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Account Settings</h3>
                    <div className="space-y-6">
                        {/* Contact Information Section */}
                        <div>
                            <h4 className="text-sm font-medium text-blue-900 mb-4">Contact Information</h4>
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-blue-900">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={contactData.email}
                                        onChange={handleContactChange}
                                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-blue-900">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={contactData.phone}
                                        onChange={handleContactChange}
                                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contactPassword" className="block text-sm font-medium text-blue-900">Current Password (for verification)</label>
                                    <input
                                        type="password"
                                        id="contactPassword"
                                        name="currentPassword"
                                        value={contactData.currentPassword}
                                        onChange={handleContactChange}
                                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        Update Contact Information
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Change Password Section */}
                        <div>
                            <h4 className="text-sm font-medium text-blue-900 mb-4">Change Password</h4>
                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-blue-900">Current Password</label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-blue-900">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-900">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Account Deletion Section */}
                        <div className="border-t border-blue-100 pt-6">
                            <h4 className="text-sm font-medium text-red-600 mb-4">Danger Zone</h4>
                            <div className="bg-red-50 p-4 rounded-md">
                                <p className="text-sm text-red-600 mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                {!showDeleteConfirm ? (
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteConfirm(true)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                                    >
                                        Delete Account
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-sm text-red-600">
                                            Are you sure you want to delete your account? This action cannot be undone.
                                        </p>
                                        <div className="flex space-x-4">
                                            <button
                                                type="button"
                                                onClick={handleDeleteAccount}
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                                            >
                                                Yes, Delete My Account
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowDeleteConfirm(false)}
                                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

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