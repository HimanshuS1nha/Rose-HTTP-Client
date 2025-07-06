import { Plus } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { Button } from "@/components/ui/button";

import { useRequests } from "@/hooks/use-requests";
import { useRequest } from "@/hooks/use-request";

import { cn } from "@/lib/utils";

const Sidebar = () => {
  const requests = useRequests((state) => state.requests);

  const setRequest = useRequest((state) => state.setRequest);
  return (
    <div className="py-3 flex flex-col gap-y-4">
      <Button className="mx-2" onClick={() => setRequest(null)}>
        <Plus />
        New Request
      </Button>

      <div className="flex flex-col">
        {requests.map((data) => {
          return (
            <div
              key={data.id}
              className="flex flex-col py-2 cursor-pointer hover:bg-rose-100 gap-y-0.5"
              onClick={() => setRequest(data)}
            >
              <div className="flex gap-x-1.5 items-center px-2">
                <div
                  className={cn(
                    "p-1 rounded-lg",
                    data.requestMethod === "get"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  )}
                >
                  <p className="uppercase text-white font-semibold text-xs">
                    {data.requestMethod}
                  </p>
                </div>
                <p className="text-sm">
                  {data.url.length > 25
                    ? data.url.substring(0, 25) + "..."
                    : data.url}
                </p>
              </div>
              <p className="px-2.5 text-gray-700 text-xs">
                {formatDistanceToNowStrict(data.createdAt)} ago
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
