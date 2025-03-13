
import RegisterPage from '@/components/pages/Register';

export const metadata = {
  title: 'Register - Atomic Habits',
  description: 'Create your Atomic Habits account and start building better habits today',
  robots: {
    index: false,
  },
};

export default function Register() {
  return <RegisterPage />;
}
