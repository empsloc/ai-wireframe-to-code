"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, icons, Loader2Icon, WandSparkles, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import Constants from "@/data/Constants";
import { toast } from "sonner";

function ImageUpload() {
  const [previewIrl, setPreviewUrl] = useState<string | null>(null);
  const [file,setFile] = useState<any>()
  const [model,setModel] = useState<string>()
  const [description,setDescription] = useState<string>()
  const {user} = useAuthContext()
  const [loading, setLoading] = useState<any>(false)
  const router = useRouter()
  
  const onImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setFile(files[0])
      setPreviewUrl(imageUrl);
    }
  };
  const onConvertToCodeButtonClick=async()=>{
    if(!file||!model||!description){
        console.log("select all fields")
        return
    }
    setLoading(true)
    //save image to firebase

    const fileName = Date.now()+".png";
    const imageRef = ref(storage,"Wireframe_To_Code/"+fileName)
    await uploadBytes(imageRef,file).then( resp=>{
        console.log(resp)
    });

    const imageUrl = await getDownloadURL(imageRef)
    console.log(imageUrl)

    //save info to database
    const uid = uuidv4()
    const result = await axios.post("/api/wireframe-to-code",{
        uid:uid,
        description:description,
        imageUrl:imageUrl,
        model:model,
        email:user?.email
    })
    if(result.data?.error){
      console.log("Not enough credits")
      toast('not enough credits')
      setLoading(false)
      return;
    }
    console.log(result)
    setLoading(false)
    router.push("/view-code/"+uid)
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {!previewIrl ? (
          <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
            <CloudUpload className="h-10 w-10 text-primary" />
            <h2 className="font-bold text-lg">Upload Image</h2>
            <p className="text-gray-400  mt-3 ">
              Click button to select Wireframe Image
            </p>
            <div className="p-5 border border-dashed w-full flex items-center justify-center mt-7">
              <label htmlFor="imageSelect">
                <h2 className="p-2 bg-blue-100 font-medium text-primary rounded-md px-5">
                  Select Image
                </h2>
              </label>
            </div>
            <input
              multiple={false}
              type="file"
              id="imageSelect"
              className="hidden"
              onChange={onImageSelect}
            />
          </div>
        ) : (
          <div className="p-5 border border-dashed ">
            <Image
              src={previewIrl}
              alt="preview"
              width={500}
              height={500}
              className="w-full h-[300px] object-contain "
            />
            <X
              onClick={() => setPreviewUrl(null)}
              className="cursor-pointer flex justify-end w-full"
            />
          </div>
        )}
        <div className="p-7 border shadow-md rounded-lg">
          <h2 className="font-bold text-lg">Select AI Model</h2>
          <Select onValueChange={(v)=>setModel(v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {Constants?.AiModelList.map((model, index) => (
                <SelectItem key={index} value={model.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={model.icon}
                      alt={model.name}
                      width={25}
                      height={25}
                    />
                    {model.name}
                    <h2></h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">
            Enter Description about your webpage{" "}
          </h2>
          <Textarea
          onChange={(e)=>setDescription(e.target.value)}
            className="mt-3 h-[200px]"
            placeholder="Write about your web page"
          />
          {/* user input area */}
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Button onClick={onConvertToCodeButtonClick} disabled={loading}>
          {loading?<Loader2Icon className="animate-spin"/>:<WandSparkles />} Convert to code
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
