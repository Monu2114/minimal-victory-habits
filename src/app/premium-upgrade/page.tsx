
"use client";

import PremiumUpgradePage from '@/components/pages/PremiumUpgrade';
import { withAuth } from '@/contexts/AuthContext';

const PremiumUpgradeWithAuth = withAuth(PremiumUpgradePage);

export default function PremiumUpgrade() {
  return <PremiumUpgradeWithAuth />;
}
