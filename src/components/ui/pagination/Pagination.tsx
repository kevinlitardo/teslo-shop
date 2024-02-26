'use client';

import { generate_pagination_numbers } from '@/utils';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';

interface Props {
  total_pages: number;
}

export const Pagination = ({ total_pages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params_page = searchParams.get('page') ?? 1;
  const current_page = isNaN(Number(params_page)) ? 1 : Number(params_page);

  if (current_page < 1 || isNaN(Number(params_page))) {
    redirect(pathname);
  }

  const create_page_url = (page_number: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (page_number === '...') {
      return `${pathname}?${params.toString()}`;
    }

    if (+page_number <= 0) {
      return `${pathname}`;
    }

    if (+page_number > total_pages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set('page', page_number.toString());
    return `${pathname}?${params.toString()}`;
  };

  const all_pages = generate_pagination_numbers(current_page, total_pages);

  return (
    <div className="flex justify-center mb-30">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none gap-2">
          <li className="page-item">
            <Link
              className="page-link relative flex items-center gap-3 py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={create_page_url(current_page - 1)}
            >
              <IconChevronLeft size="1.1rem" />
              Anterior
            </Link>
          </li>

          {all_pages.map((page, index) => (
            <li className="page-item" key={page + '-' + index}>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                  {
                    'bg-blue-500 text-white hover:bg-blue-500 hover:text-white':
                      current_page === page
                  }
                )}
                href={create_page_url(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative flex items-center gap-3 py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={create_page_url(current_page + 1)}
            >
              Siguiente
              <IconChevronRight size="1.1rem" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
