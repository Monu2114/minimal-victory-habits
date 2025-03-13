
"use client";

import OnboardingPage from '@/components/pages/Onboarding';
import { withAuth } from '@/contexts/AuthContext';

const OnboardingWithAuth = withAuth(OnboardingPage);

export default function Onboarding() {
  return <OnboardingWithAuth />;
}
