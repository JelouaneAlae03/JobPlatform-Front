import JobOffers from '~/components/company/JobOffers';
import DashboardLayout from '~/components/DashboardLayout';
import ProtectedRoute from '~/components/auth/ProtectedRoute';

export default function OfferManagerRoute() {
    return (
        <ProtectedRoute>
            <DashboardLayout title="Offer Manager">
                <JobOffers />
            </DashboardLayout>
        </ProtectedRoute>
    );
} 