
"use client";

import DashboardPage from '@/components/pages/Dashboard';
import { withAuth } from '@/contexts/AuthContext';

const DashboardWithAuth = withAuth(DashboardPage);

export default function Dashboard() {
  return <DashboardWithAuth />;
}
