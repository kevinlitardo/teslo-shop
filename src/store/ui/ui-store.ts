import { create } from 'zustand';

interface State {
  is_open: boolean;
  open: () => void;
  close: () => void;
}

export const useUIStore = create<State>()((set) => ({
  is_open: false,

  open() {
    set({ is_open: true });
  },

  close() {
    set({ is_open: false });
  }
}));
