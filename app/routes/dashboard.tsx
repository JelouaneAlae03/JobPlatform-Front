import DashboardLayout from '~/components/DashboardLayout';
import JobListings from '~/components/JobListings';

export default function Dashboard() {
    return (
        <DashboardLayout title="Job Listings">
            <JobListings />
        </DashboardLayout>
    );
} 