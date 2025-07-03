import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

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
import KeyValueInput from "@/components/key-value-input";

import { requestMethods } from "@/constants/request-methods";

const RequestSection = () => {
  const [requestMethod, setRequestMethod] = useState("get");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<[boolean, string, string][]>([
    [false, "", ""],
  ]);
  const [queryParameters, setQueryParameters] = useState<
    [boolean, string, string][]
  >([[false, "", ""]]);

  const { mutate: handleMakeRequest, isPending } = useMutation({
    mutationKey: [`make-${requestMethod}-request`],
    mutationFn: async () => {
      const result = await invoke("make_request", {
        method: requestMethod,
        url,
      });

      return result;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateHeaders = useCallback(
    (index: number, type: "checkbox" | "key" | "value", value?: string) => {
      setHeaders((prev) => {
        const newHeaders = prev.map((header, i) => {
          if (i === index) {
            if (type === "checkbox") {
              return [!header[0], header[1], header[2]];
            } else if (type === "key") {
              return [header[0], value, header[2]];
            } else {
              return [header[0], header[1], value];
            }
          } else {
            return header;
          }
        });

        return newHeaders as [boolean, string, string][];
      });
    },
    [headers, setHeaders]
  );

  const updateQueryParameters = useCallback(
    (index: number, type: "checkbox" | "key" | "value", value?: string) => {
      setQueryParameters((prev) => {
        const newQueryParameters = prev.map((queryParameter, i) => {
          if (i === index) {
            if (type === "checkbox") {
              return [!queryParameter[0], queryParameter[1], queryParameter[2]];
            } else if (type === "key") {
              return [queryParameter[0], value, queryParameter[2]];
            } else {
              return [queryParameter[0], queryParameter[1], value];
            }
          } else {
            return queryParameter;
          }
        });

        return newQueryParameters as [boolean, string, string][];
      });
    },
    [queryParameters, setQueryParameters]
  );
  return (
    <div className="py-2 flex flex-col gap-y-1.5">
      <form
        className="flex px-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleMakeRequest();
        }}
      >
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Button className="rounded-none" type="submit" disabled={isPending}>
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

        <KeyValueInput
          state={queryParameters}
          updateState={updateQueryParameters}
          title="Query Parameters"
          addOne={() => {
            setQueryParameters((prev) => {
              const newQueryParameters = [...prev, [false, "", ""]] as [
                boolean,
                string,
                string
              ][];

              return newQueryParameters;
            });
          }}
          removeOne={(index) => {
            if (index !== 0) {
              setQueryParameters((prev) => prev.filter((_, i) => i !== index));
            }
          }}
          tabValue="query"
        />

        <KeyValueInput
          state={headers}
          updateState={updateHeaders}
          title="HTTP Headers"
          addOne={() => {
            setHeaders((prev) => {
              const newHeaders = [...prev, [false, "", ""]] as [
                boolean,
                string,
                string
              ][];

              return newHeaders;
            });
          }}
          removeOne={(index) => {
            if (index !== 0) {
              setHeaders((prev) => prev.filter((_, i) => i !== index));
            }
          }}
          tabValue="headers"
        />
      </Tabs>
    </div>
  );
};

export default RequestSection;
