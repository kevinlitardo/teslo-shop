import { LoginForm } from '@/components';
import { title_font } from '@/config/fonts';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${title_font.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  );
}
