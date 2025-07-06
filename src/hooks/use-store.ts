import { create } from "zustand";

import type { Store } from "@tauri-apps/plugin-store";

type UseStoreType = {
  store: Store | null;
  setStore: (store: Store | null) => void;
};

export const useStore = create<UseStoreType>((set) => ({
  store: null,
  setStore: (store) => set({ store }),
}));
