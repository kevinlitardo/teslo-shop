import { get_countries, get_user_address } from '@/actions';
import { auth } from '@/auth.config';
import { AddressForm, TitleComponent } from '@/components';
import { redirect } from 'next/navigation';

export default async function CheckoutAddressPage() {
  const session = await auth();
  const countries = await get_countries();

  if (!session?.user) {
    redirect('/');
  }

  const user_stored_address = await get_user_address(session.user.id);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <TitleComponent title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm
          countries={countries}
          user_stored_address={user_stored_address!}
        />
      </div>
    </div>
  );
}
