import React from "react";

import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const TextContentTab = ({
  data,
  setData,
}: {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TabsContent value="text">
      <div className="flex flex-col gap-y-3 px-2 mt-2">
        <p className="text-lg">Text Content</p>

        <Textarea
          className="rounded-none min-h-60 focus-visible:border-black focus-visible:ring-0"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
    </TabsContent>
  );
};

export default TextContentTab;
