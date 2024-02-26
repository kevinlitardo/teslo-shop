'use client';

import { change_user_role } from '@/actions';
import type { User } from '@/interfaces';
import { Role } from '@prisma/client';

interface Props {
  user: User;
}

export const UserItem = ({ user }: Props) => {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.id}
      </td>
      <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.name}
      </td>
      <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <select
          className="text-sm text-gray-900 w-full p-2"
          value={user.role}
          onChange={(e) => change_user_role(user.id, e.target.value as Role)}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </td>
    </tr>
  );
};
