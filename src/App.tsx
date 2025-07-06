import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { load } from "@tauri-apps/plugin-store";
import toast from "react-hot-toast";

import Sidebar from "@/components/sidebar";
import RequestSection from "@/components/request-section";
import ResponseSection from "@/components/response-section";
import Loading from "@/components/loading";

import { useStore } from "@/hooks/use-store";
import { useRequests } from "@/hooks/use-requests";

const App = () => {
  const setStore = useStore((state) => state.setStore);

  const getRequests = useRequests((state) => state.getRequests);

  const { data, isPending, error } = useQuery({
    queryKey: ["load-store"],
    queryFn: async () => {
      const store = await load("rose.json", { autoSave: false });

      await getRequests(store);

      return store;
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Error in loading previous requests");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setStore(data);
    }
  }, [data]);
  return (
    <main className="flex w-dvw h-dvh">
      {isPending ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="w-[20%] border-r border-r-gray-300">
            <Sidebar />
          </div>
          <div className="w-[45%] border-r border-r-gray-300">
            <RequestSection />
          </div>
          <div className="w-[35%] border-r border-r-gray-300">
            <ResponseSection />
          </div>
        </>
      )}
    </main>
  );
};

export default App;
