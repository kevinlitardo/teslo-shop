export interface Product {
  id: string;
  description: string;
  images: { url: string; id: string }[];
  in_stock: number;
  price: number;
  sizes: ProductSizes[];
  slug: string;
  tags: string[];
  title: string;
  // todo: type: ProductType;
  gender: ProductGenders;
}

export type ProductGenders = 'men' | 'women' | 'kid' | 'unisex';
export type ProductSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ProductTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: ProductSizes;
  image: { url: string; id: string };
}
