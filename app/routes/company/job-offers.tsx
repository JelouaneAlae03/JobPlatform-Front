import JobOffers from '~/components/company/JobOffers';
import DashboardLayout from '~/components/DashboardLayout';

export default function OfferManagerRoute() {
    return (
        <DashboardLayout title="Offer Manager">
            <JobOffers />
        </DashboardLayout>
    );
} 