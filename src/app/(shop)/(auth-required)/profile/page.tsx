import { auth } from '@/auth.config';
import { TitleComponent } from '@/components';

const ProfilePage = async () => {
  const session = await auth();

  return (
    <div className="">
      <TitleComponent title="Perfíl" subtitle="Información del usuario" />

      <pre>{JSON.stringify(session?.user, null, 4)}</pre>
    </div>
  );
};

export default ProfilePage;
