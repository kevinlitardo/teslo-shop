import { UserAddress } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  address: UserAddress;
  set_address: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        first_name: '',
        last_name: '',
        address: '',
        postal_code: '',
        city: '',
        country: '',
        phone: ''
      },
      set_address(address) {
        set({ address });
      }
    }),
    { name: 'address-information' }
  )
);
