import { type ReactElement } from 'react';
import ProtectedRoute from "~/components/auth/ProtectedRoute";
import DashboardLayout from "~/components/DashboardLayout";
import StudentProfile from "~/components/student/StudentProfile";

export default function StudentProfileRoute(): ReactElement {
    return (
        <ProtectedRoute>
            <DashboardLayout title="Student Profile">
                <StudentProfile />
            </DashboardLayout>
        </ProtectedRoute>
    );
} 