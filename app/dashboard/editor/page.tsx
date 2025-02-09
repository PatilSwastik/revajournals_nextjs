"use client";
import { Toaster } from "sonner";

import { PlateEditor } from "@/components/editor/plate-editor";
import { useEffect } from "react";
import PaperList from "./PaperList";

export default function Page() {
  useEffect(() => {
    const footer = document.querySelector("#footer") as HTMLElement;
    if (!footer) return;
    footer.style.display = "none";
    return () => {
      footer.style.display = "block";
    };
  }, []);

  function getPaper() {}

  useEffect(() => {
    getPaper();
  }, []);

  return (
    <div className="h-screen w-full flex bg-white" data-registry="plate">
      <div className="min-w-[40%] bg-gray-100 p-4">
        <PaperList />
      </div>
      <PlateEditor />
      <Toaster />
    </div>
  );
}
