
import LoginPage from '@/components/pages/Login';

export const metadata = {
  title: 'Login - Atomic Habits',
  description: 'Log in to your Atomic Habits account to track your progress',
  robots: {
    index: false,
  },
};

export default function Login() {
  return <LoginPage />;
}
