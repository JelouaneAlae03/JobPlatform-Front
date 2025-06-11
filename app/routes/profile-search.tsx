import DashboardLayout from '~/components/DashboardLayout';
import ProfileSearch from '~/components/ProfileSearch';
import ProtectedRoute from '~/components/auth/ProtectedRoute';

export default function ProfileSearchRoute() {
    return (
        <ProtectedRoute>
            <DashboardLayout title="Profile Search">
                <ProfileSearch />
            </DashboardLayout>
        </ProtectedRoute>
    );
} 