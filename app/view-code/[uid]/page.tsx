"use client";
import AppHeader from "@/app/_components/AppHeader";
import Constants from "@/data/Constants";
import axios from "axios";
import { Loader2, LoaderCircle } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SelectionDetail from "../_components/SelectionDetail";
import CodeEditor from "../_components/CodeEditor";
import MobileSidebar from "@/app/_components/MobileSidebar";
import MobileAppHeader from "@/app/_components/MobileAppHeader";
export interface RECORD {
  id: number;
  description: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
  uid: string;
}
function ViewCode() {
  const { uid } = useParams<any>();
  const [loading, setLoading] = useState(false);
  const [codeResp, setCodeResp] = useState("");
  const [record, setRecord] = useState<any>();
  const [isReady, setIsReady] = useState(false);
  const [readyForDB, setReadyForDB] = useState(false);
  // const [isExistingCode,setIsExistingCode] = useState()
  useEffect(() => {
    uid && GetRecordInfo();
  }, [uid]);
  const GetRecordInfo = async (regen = false) => {
    setReadyForDB(false);
    setIsReady(false);
    setLoading(true);

    setCodeResp("");

    const result = await axios.get("/api/wireframe-to-code?uid=" + uid);
    console.log(result.data);
    const resp = result?.data;
    setRecord(result?.data);
    if (resp?.code == null || regen) {
      GenerateCode(resp);
    } else {
      setCodeResp(resp?.code?.resp);
      setLoading(false);
      setIsReady(true);
      setReadyForDB(true);
    }
    if (resp?.error) {
      console.log("No record found");
    }
    setLoading(false);
  };

  const GenerateCode = async (record: RECORD) => {
    setLoading(true);
    const res = await fetch("/api/ai-model", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: record?.description + ":" + Constants.PROMPT,
        model: record?.model,
        imageUrl: record?.imageUrl,
      }),
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    setLoading(false);

    while (true) {
      setReadyForDB(false);
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder
        .decode(value)
        .replace("```jsx", "")
        .replace("jsx", "")
        .replace("```", "");
      setCodeResp((prev) => prev + text);
      console.log(text);
    }
    setReadyForDB(true);

    setIsReady(true);
    // setReadyForDB(true)
    // UpdateCodeToDB()
  };

  useEffect(() => {
    if (codeResp != "" && record?.uid && isReady) {
      console.log("upadte db use effect called");
      UpdateCodeToDB();
    }
  }, [codeResp, record, isReady]);
  const UpdateCodeToDB = async () => {
    const result = await axios.put("/api/wireframe-to-code", {
      uid: record?.uid,
      codeResp: { resp: codeResp },
    });

    console.log(result);
  };
  return (
    <div className="min-h-screen flex flex-col bg--400">
      <MobileAppHeader />
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10 bg--500  min-h-screen flex-1">
        <div className="min-h-screen bg--700">
          {/* Selections details */}
          <SelectionDetail
            isReady={isReady}
            regenerateCode={() => GetRecordInfo(true)}
            record={record}
          />
        </div>
        <div className="md:col-span-4 bg--300 ">
          {/* Code editor */}
          {loading ? (
            <div>
              <h2 className="font-bold text-2xl text-center p-20 flex items-center justify-center bg-slate-100 h-[80vh] rounded-xl">
                <Loader2 className="animate-spin" /> Analyzing the wireframe
              </h2>
            </div>
          ) : (
            <CodeEditor readyForDB={readyForDB} codeResp={codeResp} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
