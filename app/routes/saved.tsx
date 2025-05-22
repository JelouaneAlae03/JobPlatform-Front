import DashboardLayout from '~/components/DashboardLayout';
import SavedJobs from '~/components/SavedJobs';

export default function Saved() {
    return (
        <DashboardLayout title="Saved Jobs">
            <SavedJobs />
        </DashboardLayout>
    );
} 