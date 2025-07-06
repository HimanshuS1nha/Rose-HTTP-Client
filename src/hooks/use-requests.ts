import { create } from "zustand";

import type { Store } from "@tauri-apps/plugin-store";
import type { RequestType } from "../../types";

type UseRequestsType = {
  requests: RequestType[];
  setRequests: (requests: RequestType[]) => void;
  getRequests: (store: Store) => Promise<void>;
  updateRequests: (request: RequestType, store: Store) => Promise<void>;
};

export const useRequests = create<UseRequestsType>((set, get) => ({
  requests: [],
  setRequests: (requests) => set({ requests }),
  getRequests: async (store) => {
    const data = await store.get<RequestType[]>("requests");

    if (data) {
      set({ requests: data });
    }
  },
  updateRequests: async (request, store) => {
    const requests = get().requests;

    let newRequests;
    if (requests.find((item) => item.id === request.id)) {
      newRequests = requests.map((item) => {
        if (item.id === request.id) {
          return request;
        } else {
          return item;
        }
      });
    } else {
      newRequests = [...requests, request];
    }

    set({ requests: newRequests });

    await store.set("requests", newRequests);

    await store.save();
  },
}));
