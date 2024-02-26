import { IconCircleMinus, IconCirclePlus } from '@tabler/icons-react';

interface Props {
  quantity: number;
  change_quantity: (value: number) => void;
}

export const QuantitySelector = ({ quantity, change_quantity }: Props) => {
  const update = (value: number) => {
    if (quantity + value < 1) return;
    change_quantity(quantity + value);
  };

  return (
    <div className="flex items-center">
      <button
        className="hover:bg-gray-100 p-2 rounded-md"
        onClick={() => update(-1)}
      >
        <IconCircleMinus size={20} />
      </button>

      <span className="w-16 mx-2 bg-gray-100 text-center">{quantity}</span>

      <button
        className="hover:bg-gray-100 p-2 rounded-md"
        onClick={() => update(1)}
      >
        <IconCirclePlus size={20} />
      </button>
    </div>
  );
};
