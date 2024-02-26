import { create } from 'zustand';

import { CartProduct } from '@/interfaces';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];
  add_product: (product: CartProduct) => void;
  update_product: (product: CartProduct, quantity: number) => void;
  remove_product: (product: CartProduct) => void;
  get_total_products: () => number;
  get_summary: () => {
    sub_total: number;
    tax: number;
    total: number;
    total_products: number;
  };
  clear_cart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      add_product(product) {
        const { cart } = get();

        const product_in_cart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!product_in_cart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updated_cart = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );

        set({ cart: updated_cart });
      },
      update_product(product, quantity) {
        const { cart } = get();

        const updated_cart = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity }
            : item
        );

        set({ cart: updated_cart });
      },
      remove_product(product) {
        const { cart } = get();

        const clear_list = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: clear_list });
      },
      get_total_products() {
        const { cart } = get();

        const total = cart.reduce((acc, el) => acc + el.quantity, 0);

        return total;
      },
      get_summary() {
        const { cart, get_total_products } = get();

        const sub_total = cart.reduce((acc, el) => {
          return acc + el.quantity * el.price;
        }, 0);

        const tax = sub_total * 0.15;

        const total = sub_total + tax;

        return {
          sub_total,
          tax,
          total,
          total_products: get_total_products()
        };
      },
      clear_cart() {
        set({
          cart: []
        });
      }
    }),
    { name: 'shopping-cart' }
  )
);
