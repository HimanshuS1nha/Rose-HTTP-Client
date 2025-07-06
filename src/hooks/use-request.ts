import { create } from "zustand";

import { RequestType } from "types";

type UseRequestType = {
  request: RequestType | null;
  setRequest: (request: RequestType | null) => void;
};

export const useRequest = create<UseRequestType>((set) => ({
  request: null,
  setRequest: (request) => set({ request }),
}));
