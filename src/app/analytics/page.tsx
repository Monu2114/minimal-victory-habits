
"use client";

import AnalyticsPage from '@/components/pages/Analytics';
import { withAuth } from '@/contexts/AuthContext';

const AnalyticsWithAuth = withAuth(AnalyticsPage);

export default function Analytics() {
  // Metadata is defined at the server component level
  return <AnalyticsWithAuth />;
}
