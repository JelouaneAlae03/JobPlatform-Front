import DashboardLayout from '~/components/DashboardLayout';
import MyApplications from '~/components/MyApplications';

export default function Applications() {
    return (
        <DashboardLayout title="My Applications">
            <MyApplications />
        </DashboardLayout>
    );
} 