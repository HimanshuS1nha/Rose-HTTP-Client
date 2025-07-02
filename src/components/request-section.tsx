import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { requestMethods } from "@/constants/request-methods";

const RequestSection = () => {
  const [requestMethod, setRequestMethod] = useState("get");
  return (
    <div className="py-2 flex flex-col gap-y-1.5">
      <form className="flex px-1">
        <Select
          value={requestMethod}
          onValueChange={(value) => setRequestMethod(value)}
        >
          <SelectTrigger className="rounded-none focus-visible:ring-0 cursor-pointer">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent className="rounded-none focus-visible:ring-0">
            {requestMethods.map((method) => {
              return (
                <SelectItem
                  value={method.toLowerCase()}
                  key={method}
                  className="cursor-pointer"
                >
                  {method}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Input
          placeholder="Enter URL"
          className="rounded-none focus-visible:ring-0"
        />

        <Button className="rounded-none" type="submit">
          Send
        </Button>
      </form>

      <Tabs defaultValue="query">
        <div className="w-full flex flex-col">
          <TabsList className="bg-transparent gap-x-4">
            <TabsTrigger
              value="query"
              className="text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:shadow-none focus-visible:border-none focus-within:ring-0 rounded-none cursor-pointer hover:text-black"
            >
              Query
            </TabsTrigger>
            <TabsTrigger
              value="headers"
              className="text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:shadow-none focus-visible:border-none focus-within:ring-0 rounded-none cursor-pointer hover:text-black"
            >
              Headers
            </TabsTrigger>
            <TabsTrigger
              value="body"
              className="text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:shadow-none focus-visible:border-none focus-within:ring-0 rounded-none cursor-pointer hover:text-black"
            >
              Body
            </TabsTrigger>
          </TabsList>

          <div className="w-full h-[0.5px] bg-gray-300 -mt-1" />
        </div>
      </Tabs>
    </div>
  );
};

export default RequestSection;
