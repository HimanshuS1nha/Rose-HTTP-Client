import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

import { useResponse } from "@/hooks/use-response";

const ResponseSection = () => {
  const response = useResponse((state) => state.response);
  return (
    <div className="px-2 py-3 flex flex-col gap-y-1.5 overflow-y-auto">
      <div className="flex gap-x-4 items-center">
        <p>
          Status:{" "}
          <span
            className={cn(
              "font-semibold",
              response?.status.startsWith("20")
                ? "text-emerald-600"
                : response?.status.startsWith("30")
                ? "text-yellow-500"
                : "text-primary"
            )}
          >
            {response?.status}
          </span>
        </p>
        <p>
          Size:{" "}
          <span
            className={cn(
              "font-semibold",
              response?.status.startsWith("20")
                ? "text-emerald-600"
                : response?.status.startsWith("30")
                ? "text-yellow-500"
                : "text-primary"
            )}
          >
            {response?.size && `${response?.size.toFixed(4)} KB`}
          </span>
        </p>
        <p>
          Time:{" "}
          <span
            className={cn(
              "font-semibold",
              response?.status.startsWith("20")
                ? "text-emerald-600"
                : response?.status.startsWith("30")
                ? "text-yellow-500"
                : "text-primary"
            )}
          >
            {response?.time && `${response.time} ms`}
          </span>
        </p>
      </div>

      <Tabs defaultValue="response">
        <div className="w-full flex flex-col">
          <TabsList className="bg-transparent gap-x-4">
            <TabsTrigger
              value="response"
              className="text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:shadow-none focus-visible:border-none focus-within:ring-0 rounded-none cursor-pointer hover:text-black"
            >
              Response
            </TabsTrigger>
            <TabsTrigger
              value="headers"
              className="text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-3 data-[state=active]:border-b-primary data-[state=active]:shadow-none focus-visible:border-none focus-within:ring-0 rounded-none cursor-pointer hover:text-black"
            >
              Headers
            </TabsTrigger>
          </TabsList>
          <div className="w-full h-[0.5px] bg-gray-300 -mt-1" />
        </div>

        <TabsContent value="response">
          <div className="flex flex-col gap-y-3 px-2 mt-2">
            <p className="text-lg">Response</p>

            <Textarea
              className="rounded-none min-h-60 focus-visible:border-black focus-visible:ring-0"
              contentEditable={false}
              value={
                response?.is_response_json_type
                  ? JSON.stringify(JSON.parse(response?.body ?? ""), null, 2)
                  : response?.body ?? ""
              }
              readOnly
            />
          </div>
        </TabsContent>

        <TabsContent value="headers">
          <div className="flex flex-col gap-y-3 px-2 mt-2">
            <p className="text-lg">Response Headers</p>

            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r">Header</TableHead>
                  <TableHead className="border-r">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {response?.headers &&
                  Object.keys(response.headers).map((key) => {
                    return (
                      <TableRow key={key}>
                        <TableCell className="border-r">{key}</TableCell>
                        <TableCell className="border-r">
                          {response.headers[key]}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResponseSection;
