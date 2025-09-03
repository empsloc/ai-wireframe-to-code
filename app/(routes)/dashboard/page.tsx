"use client";

import React, { useEffect, useState } from "react";
import ImageUpload from "./_components/ImageUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Open dialog only on first page load
    setOpen(true);
  }, []);

  return (
    <div className="md:px-20 lg:px-20 xl:px-40">
      <h2 className="font-bold text-3xl">Convert Wireframe to Code</h2>
      <ImageUpload />

      {/* Intro Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Note from the developer</DialogTitle>
            <DialogDescription>
              Here’s how to use the application:
            </DialogDescription>
          </DialogHeader>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Upload your wireframe image using the Select Image button.</li>
            <li>Select the AI model from the options.</li>
            <li>Add description of the wireframe.</li>
            <li>Click on Generate Code button.</li>
          </ul>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setOpen(false)}>Got it</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;
