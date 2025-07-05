import { create } from "zustand";

type ResponseType = {
  body: string | null;
  headers: { [key: string]: string };
  status: string;
  size: number;
  time: number;
  is_response_json_type: boolean;
};

type UseResponseType = {
  response: ResponseType | null;
  setResponse: (response: ResponseType | null) => void;
};

export const useResponse = create<UseResponseType>((set) => ({
  response: null,
  setResponse: (response) => set({ response }),
}));
