import React from "react";
import { RECORD } from "../[uid]/page";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useAuthContext } from "@/app/provider";

function SelectionDetail({ record, regenerateCode, isReady }: any) {
  const { user } = useAuthContext();

  return (
    record && (
      <div className="p-5 bg--100 rounded-lg min-h-screen flex flex-col  justify-between">
        <div>
        <h2 className="font-bold my-2">Wireframe</h2>
        <Image
          src={record?.imageUrl}
          alt="wireframe"
          width={300}
          height={400}
          className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white"
        />

        <h2 className="mt-4 font-bold my-2 mb-2">AI Model</h2>
        <Input
          defaultValue={record?.model}
          disabled={true}
          className="bg-white"
        />

        <h2 className="mt-4 font-bold my-2 mb-2">Description</h2>
        <Textarea
          defaultValue={record?.description}
          disabled={true}
          className="bg-white h-[180px]"
        />
        </div>

        <Button
          disabled={!isReady || !user}
          onClick={regenerateCode}
          className="mb-52 w-full"
        >
          <RefreshCcw />
          Regenerate Code
        </Button>
      </div>
    )
  );
}

export default SelectionDetail;

