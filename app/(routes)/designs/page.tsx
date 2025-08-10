"use client";
import { useAuthContext } from "@/app/provider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DesignCard from "./_components/DesignCard";

function Designs() {
  const { user } = useAuthContext();
  const [wireframeList, setWireFrameList] = useState<any>([]);
  useEffect(() => {
    user && GetAllUserWireframe();
  }, [user]);
  const GetAllUserWireframe = async () => {
    const result = await axios.get(
      "/api/wireframe-to-code?email=" + user?.email,
    );
    console.log(result.data);
    setWireFrameList(result?.data);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl">Wireframes and Codes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
        {wireframeList?.map((item: any, index: any) => (
          <DesignCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Designs;

