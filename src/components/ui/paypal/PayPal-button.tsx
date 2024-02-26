'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions
} from '@paypal/paypal-js';
import { paypal_check_payment, save_transaction_id } from '@/actions';

interface Props {
  order_id: string;
  amount: number;
}

export const PayPalButton = ({ order_id, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <>
        <div className="h-12 animate-pulse bg-gray-200 rounded-md mb-3" />
        <div className="h-12 animate-pulse bg-gray-200 rounded-md mb-3" />
        <div className="h-6 w-2/4 mx-auto animate-pulse bg-gray-200 rounded-md" />
      </>
    );
  }

  const rounded_amount = Math.round(amount * 100) / 100;

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const transaction_id = await actions.order.create({
      purchase_units: [
        {
          invoice_id: order_id,
          amount: {
            value: `${rounded_amount}`
          }
        }
      ]
    });

    const { ok } = await save_transaction_id(order_id, transaction_id);

    if (!ok) throw new Error('No se pudo realizar la transacción');

    return transaction_id;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details) return;

    await paypal_check_payment(details.id);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
