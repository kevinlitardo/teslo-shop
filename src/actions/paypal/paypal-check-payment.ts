'use server';

import { OrderStatusResponse } from '@/interfaces';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function paypal_check_payment(transaction_id: string) {
  const token = await get_paypal_token();

  if (!token) {
    return {
      ok: false,
      message: 'No se pudo obtener token de verificación'
    };
  }

  const payment = await verify_paypal_payment(token, transaction_id);

  if (!payment) {
    return {
      ok: false,
      message: 'No se pudo verificar la transacción'
    };
  }

  const { status, purchase_units } = payment;

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aún no se ha pagado en PayPal'
    };
  }

  const { invoice_id: order_id } = purchase_units[0];

  try {
    await prisma.order.update({
      where: {
        id: order_id
      },
      data: {
        is_paid: true,
        paid_at: new Date()
      }
    });

    revalidatePath(`/orders/${order_id}`);
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'El pago no se puedo realizar'
    };
  }
}

async function get_paypal_token(): Promise<string | null> {
  const paypal_client_id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const paypal_secret = process.env.PAYPAL_SECRET;
  const oauth_url = process.env.PAYPAL_OAUTH_URL ?? '';

  const base_64_token = Buffer.from(
    `${paypal_client_id}:${paypal_secret}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Basic ${base_64_token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded
  };

  try {
    const result = await fetch(oauth_url, {
      ...requestOptions,
      cache: 'no-store'
    }).then((response) => response.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function verify_paypal_payment(
  token: string,
  transaction_id: string
): Promise<OrderStatusResponse | null> {
  const oauth_url = `${process.env.PAYPAL_ORDERS_URL}/${transaction_id}` ?? '';

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  try {
    const response = await fetch(oauth_url, {
      ...requestOptions,
      cache: 'no-store'
    }).then((response) => response.json());

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
