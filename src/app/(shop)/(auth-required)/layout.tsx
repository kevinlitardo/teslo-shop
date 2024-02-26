import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const AuthRequiredLayout = async ({ children }: Props) => {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return <>{children}</>;
};

export default AuthRequiredLayout;
