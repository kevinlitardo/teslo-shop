'use server';

import prisma from '@/lib/prisma';

import { UserAddress } from '@/interfaces';

export async function set_user_address(address: UserAddress, user_id: string) {
  try {
    const new_address = create_or_replace_address(address, user_id);

    return {
      ok: true,
      address: new_address,
      message: 'Dirección guardada con éxito'
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se puedo guardar la dirección del usuario'
    };
  }
}

async function create_or_replace_address(
  address: UserAddress,
  user_id: string
) {
  try {
    const prev_address = await prisma.userAddress.findUnique({
      where: { user_id }
    });

    const address_data = {
      first_name: address.first_name,
      last_name: address.last_name,
      address: address.address,
      address2: address.address2!,
      postal_code: address.postal_code,
      city: address.city,
      country_id: address.country,
      phone: address.phone,
      user_id
    };

    if (!prev_address) {
      const new_address = await prisma.userAddress.create({
        data: address_data
      });

      return new_address;
    }

    const updated = await prisma.userAddress.update({
      where: { user_id },
      data: address_data
    });

    return updated;
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo guardar la dirección');
  }
}
