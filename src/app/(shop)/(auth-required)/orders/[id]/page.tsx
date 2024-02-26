import { get_order_by_id } from '@/actions';
import { CheckoutProducts, PayPalButton, TitleComponent } from '@/components';
import { format_price } from '@/helpers';
import { IconShoppingBag } from '@tabler/icons-react';
import clsx from 'clsx';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const OrderByIdPage = async ({ params }: Props) => {
  const { id } = params;

  const order = await get_order_by_id(id);

  if (!order) {
    redirect('/orders');
  }

  const mapped_products = order.order_items.map((item) => ({
    id: item.id,
    slug: item.product.slug,
    title: item.product.title,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    image: { ...item.product.product_image[0] }
  }));

  const address = order.order_address;

  return (
    <div className="flex justify-center items-center mb-27 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <TitleComponent title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <StatusBadge is_paid={order.is_paid} />

            {/* Items */}
            <CheckoutProducts products_list={mapped_products} />
          </div>

          {/* Summary */}
          <div className="bg-white rounded-md shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address?.first_name} {address?.last_name}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>CP {address?.postal_code}</p>
              <p>
                {address?.city}, {address?.country_id}
              </p>
              <p>{address?.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen</h2>

            <div className="grid grid-cols-2">
              <span className="">No. Productos</span>
              <span className="text-right">{order.quantity} artículos</span>

              <span className="">Subtotal</span>
              <span className="text-right">
                {format_price(order.sub_total)}
              </span>

              <span className="">Impuestos (15%)</span>
              <span className="text-right">{format_price(order.tax)}</span>

              <span className="text-2xl mt-5 font-semibold">Total</span>
              <span className="text-right text-2xl mt-5 font-semibold">
                {format_price(order.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order.is_paid ? (
                <StatusBadge is_paid={order.is_paid} />
              ) : (
                <PayPalButton order_id={order.id} amount={order.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ is_paid }: { is_paid: boolean }) => {
  return (
    <div
      className={clsx(
        'flex items-center rounded-md py-2 px-3.5 text-xs font-bold text-white mb-5',
        { 'bg-red-500': !is_paid, 'bg-green-700': is_paid }
      )}
    >
      <IconShoppingBag size={20} />
      {!is_paid ? (
        <span className="mx-2">Pendiente de pago</span>
      ) : (
        <span className="mx-2">Pagado</span>
      )}
    </div>
  );
};

export default OrderByIdPage;
