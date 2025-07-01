import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const Sidebar = () => {
  const dummyData = [
    {
      id: "1",
      url: "http://localhost:3000",
      method: "get",
      createdAt: "2 days ago",
    },
    {
      id: "2",
      url: "http://localhost:3000/api/login",
      method: "post",
      createdAt: "1 day ago",
    },
  ];
  return (
    <div className="py-3 flex flex-col gap-y-4">
      <Button className="mx-2">
        <Plus />
        New Request
      </Button>

      <div className="flex flex-col">
        {dummyData.map((data) => {
          return (
            <div
              key={data.id}
              className="flex flex-col py-2 cursor-pointer hover:bg-rose-100 gap-y-0.5"
            >
              <div className="flex gap-x-1.5 items-center px-2">
                <div
                  className={cn(
                    "p-1 rounded-lg",
                    data.method === "get" ? "bg-blue-500" : "bg-green-500"
                  )}
                >
                  <p className="uppercase text-white font-semibold text-xs">
                    {data.method}
                  </p>
                </div>
                <p className="text-sm">
                  {data.url.length > 25
                    ? data.url.substring(0, 25) + "..."
                    : data.url}
                </p>
              </div>
              <p className="px-2.5 text-gray-700 text-xs">{data.createdAt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
