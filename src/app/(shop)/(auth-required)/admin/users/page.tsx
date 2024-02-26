import { get_paginated_users } from '@/actions';
import { TitleComponent, UserItem } from '@/components';
import { redirect } from 'next/navigation';

const AdminUsersPage = async () => {
  const { ok, users } = await get_paginated_users();

  if (!ok) redirect('/auth/login');

  return (
    <>
      <TitleComponent title="Usuarios" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Email
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Rol
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <UserItem user={item} key={item.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUsersPage;
