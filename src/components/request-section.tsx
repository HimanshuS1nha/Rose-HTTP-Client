import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import toast from "react-hot-toast";

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
import JsonContentTab from "@/components/json-content-tab";
import TextContentTab from "@/components/text-content-tab";

import { useResponse } from "@/hooks/use-response";

import { requestMethods } from "@/constants/request-methods";

const RequestSection = () => {
  const setResponse = useResponse((state) => state.setResponse);

  const [requestMethod, setRequestMethod] = useState("get");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<[boolean, string, string][]>([
    [false, "", ""],
  ]);
  const [queryParameters, setQueryParameters] = useState<
    [boolean, string, string][]
  >([[false, "", ""]]);
  const [formData, setFormData] = useState<[boolean, string, string][]>([
    [false, "", ""],
  ]);
  const [json, setJson] = useState("");
  const [text, setText] = useState("");

  const { mutate: handleMakeRequest, isPending } = useMutation({
    mutationKey: [`make-${requestMethod}-request`],
    mutationFn: async () => {
      let updatedUrl = url;

      if (
        (queryParameters.length > 1 &&
          queryParameters.find((item) => item[0])) ||
        queryParameters[0][0]
      ) {
        updatedUrl += "?";

        queryParameters.map((queryParameter, i) => {
          if (queryParameter[0]) {
            updatedUrl += `${queryParameter[1]}=${queryParameter[2]}`;
          }

          if (i !== queryParameters.length) {
            updatedUrl += "&";
          }
        });
      }

      const form = formData.flatMap((data) =>
        data[0] ? [data[1], data[2]] : []
      );

      const result = await invoke("make_request", {
        method: requestMethod,
        url: updatedUrl,
        headers: headers.flatMap((header) => {
          if (header[0]) {
            return `${header[1]}:${header[2]}`;
          } else {
            return [];
          }
        }),
        form: new Map([form as [string, string]]),
        json: json.trim().length > 0 ? JSON.parse(json) : null,
        text: text.trim().length > 0 ? text : null,
      });

      return result as {
        body: string;
        headers: { [key: string]: string };
        status: string;
        size: number;
        time: number;
        is_response_json_type: boolean;
      };
    },
    onSuccess: (data) => {
      setResponse(data);
    },
    onError: (error: { RequestError: string[] }) => {
      if (error.RequestError) {
        toast.error(`Error ${error.RequestError[0]}: ${error.RequestError[1]}`);
      } else {
        toast.error((error as any).message);
      }
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

  const updateFormData = useCallback(
    (index: number, type: "checkbox" | "key" | "value", value?: string) => {
      setFormData((prev) => {
        const newFormData = prev.map((formData, i) => {
          if (i === index) {
            if (type === "checkbox") {
              return [!formData[0], formData[1], formData[2]];
            } else if (type === "key") {
              return [formData[0], value, formData[2]];
            } else {
              return [formData[0], formData[1], value];
            }
          } else {
            return formData;
          }
        });

        return newFormData as [boolean, string, string][];
      });
    },
    [formData, setFormData]
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

        <TabsContent value="body">
          <Tabs defaultValue="json">
            <TabsList className="bg-transparent w-[20%] gap-x-1.5 px-1">
              <TabsTrigger
                value="json"
                className="text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:shadow-none focus-visible:border-none focus-within:ring-0 rounded-none cursor-pointer hover:text-black"
              >
                JSON
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:shadow-none focus-visible:border-none focus-within:ring-0 rounded-none cursor-pointer hover:text-black"
              >
                Text
              </TabsTrigger>
              <TabsTrigger
                value="form"
                className="text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:shadow-none focus-visible:border-none focus-within:ring-0 rounded-none cursor-pointer hover:text-black"
              >
                Form
              </TabsTrigger>
            </TabsList>

            <JsonContentTab data={json} setData={setJson} />

            <TextContentTab data={text} setData={setText} />

            <KeyValueInput
              state={formData}
              updateState={updateFormData}
              title="Form Fields"
              addOne={() => {
                setFormData((prev) => {
                  const newFormData = [...prev, [false, "", ""]] as [
                    boolean,
                    string,
                    string
                  ][];

                  return newFormData;
                });
              }}
              removeOne={(index) => {
                if (index !== 0) {
                  setFormData((prev) => prev.filter((_, i) => i !== index));
                }
              }}
              tabValue="form"
            />
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestSection;
