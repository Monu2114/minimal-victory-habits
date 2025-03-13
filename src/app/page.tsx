
import Landing from '@/components/pages/Landing';

export const metadata = {
  title: 'Atomic Habits - Home',
  description: 'Small Habits, Remarkable Results. Build better habits with minimal viable progress.',
  openGraph: {
    title: 'Atomic Habits - Home',
    description: 'Small Habits, Remarkable Results. Build better habits with minimal viable progress.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return <Landing />;
}
