"use client";
import { utils } from "@/lib/utils";
import { Clock9 } from "lucide-react";
import React, { useEffect } from "react";

const MessageBox: React.FC<{
  ref?: any;
  isMine: boolean;
  text: string;
  time: string;
}> = ({ ref, isMine, text, time }) => {
  useEffect(() => {
    if (ref) console.log("ref from last message ", text, " and ref is ", ref);
  }, []);
  return (
    <div
      ref={ref}
      className={`w-fit max-w-[85%] py-2 px-3 rounded-lg ${
        isMine ? "bg-[#FDFC22] rounded-tr-none self-end mr-5" : "bg-white rounded-tl-none self-start ml-5"
      } mb-3`}
    >
      <p className="text-black text-sm">{text}</p>
      <span className="relative top-1 left-2 text-black text-opacity-30 text-[10px] float-right">
        {time ? utils.formatChatTime(time) : <Clock9 size={10} />}
      </span>
    </div>
  );
};

export default React.memo(MessageBox);
