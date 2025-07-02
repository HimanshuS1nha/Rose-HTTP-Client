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
    </div>
  );
};

export default RequestSection;
