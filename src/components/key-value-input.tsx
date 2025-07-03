import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "./ui/input";

const KeyValueInput = ({
  state,
  updateState,
  title,
  addOne,
  removeOne,
  tabValue,
}: {
  state: [boolean, string, string][];
  updateState: (
    index: number,
    type: "checkbox" | "key" | "value",
    value?: string
  ) => void;
  title: string;
  addOne: () => void;
  removeOne: (index: number) => void;
  tabValue: string;
}) => {
  return (
    <TabsContent value={tabValue}>
      <div className="flex flex-col gap-y-3 px-2 mt-2">
        <div className="flex justify-between items-center">
          <p className="text-lg">{title}</p>
          <Button onClick={addOne}>
            <Plus />
          </Button>
        </div>

        {state.map((item, i) => {
          return (
            <div className="flex gap-x-4 items-center" key={i}>
              <Input
                type="checkbox"
                className="w-[5%] size-4 accent-primary cursor-pointer"
                checked={item[0]}
                value={""}
                onChange={() => updateState(i, "checkbox")}
              />
              <div className="flex flex-col gap-y-2.5 w-full">
                <div className="flex justify-between items-center">
                  <Input
                    className="border-t-0 border-l-0 border-r-0 border-b border-b-gray-300 shadow-none w-[45%] focus-visible:ring-0 focus-visible:border-b focus-visible:border-b-black rounded-none focus-visible:border-t-0 focus-visible:border-l-0 focus-visible:border-r-0 px-1"
                    placeholder="key"
                    value={item[1]}
                    onChange={(e) => updateState(i, "key", e.target.value)}
                  />
                  <Input
                    className="border-t-0 border-l-0 border-r-0 border-b border-b-gray-300 shadow-none w-[45%] focus-visible:ring-0 focus-visible:border-b focus-visible:border-b-black rounded-none focus-visible:border-t-0 focus-visible:border-l-0 focus-visible:border-r-0 px-1"
                    placeholder="value"
                    value={item[2]}
                    onChange={(e) => updateState(i, "value", e.target.value)}
                  />
                  <div
                    className="shrink-0 w-4"
                    onClick={() => {
                      removeOne(i);
                    }}
                  >
                    {i !== 0 && <X size={16} className="cursor-pointer" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </TabsContent>
  );
};

export default KeyValueInput;
