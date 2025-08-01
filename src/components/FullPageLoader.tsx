import { utils } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const FullPageLoader: React.FC<{ show: boolean; desc: string }> = ({
  show,
  desc,
}) => {
  // Early return if the loader should not be shown
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex gap-2 items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={32} />
      <p className="text-white/80">{desc}</p>
    </div>
  );
};

export default FullPageLoader;
