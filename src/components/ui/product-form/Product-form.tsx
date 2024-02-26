'use client';

import { create_product, remove_image } from '@/actions';
import { Category, Product, ProductGenders } from '@/interfaces';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ImagePlaceholder } from '../image-placeholder/Image-placeholder';

interface Props {
  product: Partial<Product>;
  categories: Category[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FormFields {
  title: string;
  slug: string;
  description: string;
  price: number;
  in_stock: number;
  sizes: string[];
  tags: string;
  gender: ProductGenders;
  category_id: string;

  images?: FileList;
}

export const Product_form = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    getValues,
    setValue,
    watch
  } = useForm<FormFields>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(','),
      sizes: product.sizes ?? [],
      images: undefined
    }
  });

  watch('sizes');

  const submit = async (data: FormFields) => {
    const formData = new FormData();

    const { images, ...rest } = data;

    if (product.id) {
      formData.append('id', product.id);
    }

    if (!images) {
      return alert('Debes agregar mínimo una imagen');
    }

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    formData.append('title', rest.title);
    formData.append('slug', rest.slug);
    formData.append('description', rest.description);
    formData.append('price', rest.price.toString());
    formData.append('in_stock', rest.in_stock.toString());
    formData.append('sizes', rest.sizes.toString());
    formData.append('tags', rest.tags);
    formData.append('category_id', rest.category_id);
    formData.append('gender', rest.gender);

    const { ok, product: response } = await create_product(formData);

    if (!ok) {
      return alert('No se pudo guardar el producto');
    }

    router.replace(`/admin/product/${response?.slug}`);
  };

  const change_size = (size: string) => {
    const sizes = new Set(getValues('sizes'));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes));
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('title', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            {...register('description', { required: true })}
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('in_stock', { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('tags', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Género</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('gender', { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('category_id', { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className={clsx('w-full', {
            'btn-primary': isValid,
            'btn-primary-disabled': !isValid
          })}
          disabled={!isValid}
        >
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => change_size(size)}
                className={clsx(
                  'flex items-center justify-center w-10 h-10 mr-2 border rounded-md transition-all',
                  {
                    'bg-blue-500 text-white hover:bg-blue-600':
                      getValues('sizes').includes(size),
                    'hover:bg-gray-200': !getValues('sizes').includes(size)
                  }
                )}
              >
                <span>{size}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              {...register('images')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.images?.map((item) => (
              <div key={item.id} className="shadow-md">
                <ImagePlaceholder
                  alt={product.title ?? ''}
                  src={item.url}
                  width={300}
                  height={300}
                  className="rounded-t-md"
                />

                <button
                  onClick={() => remove_image(item.id, item.url)}
                  type="button"
                  className="bg-red-500 flex items-center justify-center w-full hover:bg-red-600 rounded-b-md text-white text-sm py-1"
                >
                  Borrar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
