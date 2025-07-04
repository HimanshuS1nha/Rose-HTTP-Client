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

const ResponseSection = () => {
  return (
    <div className="px-2 py-3 flex flex-col gap-y-1.5 overflow-y-auto">
      <div className="flex gap-x-4 items-center">
        <p>
          Status: <span className="text-emerald-600 font-semibold">200</span>
        </p>
        <p>
          Size: <span className="text-emerald-600 font-semibold">2 KB</span>
        </p>
        <p>
          Time: <span className="text-emerald-600 font-semibold">300 ms</span>
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
                <TableRow>
                  <TableCell className="border-r">Content-Type</TableCell>
                  <TableCell className="border-r">application/json</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r">Token</TableCell>
                  <TableCell className="border-r">12345678</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResponseSection;
