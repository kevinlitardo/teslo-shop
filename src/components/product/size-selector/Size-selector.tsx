import { ProductSizes } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  selected_size?: ProductSizes;
  available_sizes: ProductSizes[];
  select_size: (size: ProductSizes) => void;
}

export const SizeSelector = ({
  selected_size,
  available_sizes,
  select_size
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex gap-1 flex-wrap">
        {available_sizes.map((size) => (
          <button
            onClick={() => select_size(size)}
            className={clsx('text-md hover:bg-gray-200 p-2 rounded-md', {
              'bg-gray-200 font-semibold hover:bg-gray-200':
                size === selected_size
            })}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
