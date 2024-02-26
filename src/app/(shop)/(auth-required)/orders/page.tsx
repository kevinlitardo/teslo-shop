// https://tailwindcomponents.com/component/hoverable-table

export const revalidate = 0;

import { get_orders_by_user } from '@/actions';
import { TitleComponent } from '@/components';
import { IconCreditCard } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';

export default async function OrdersPage() {
  const orders = await get_orders_by_user();

  return (
    <>
      <TitleComponent title="Ordenes" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id.split('-').at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.order_address?.first_name}{' '}
                  {item.order_address?.last_name}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IconCreditCard
                    className={clsx({
                      'text-green-800': item.is_paid,
                      'text-red-800': !item.is_paid
                    })}
                  />
                  <span
                    className={clsx('mx-2', {
                      'text-green-800': item.is_paid,
                      'text-red-800': !item.is_paid
                    })}
                  >
                    {item.is_paid ? 'Pagado' : 'No pagado'}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${item.id}`}
                    className="underline text-blue-400"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
