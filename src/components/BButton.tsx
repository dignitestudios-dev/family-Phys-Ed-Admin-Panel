import React from "react";
import { LuLoaderCircle } from "react-icons/lu";

type BButtonProps = {
  title: string;
  type?: "submit" | "button";
  varient?: "primary" | "secondary";
  loading?: boolean;
  w?: "fit" | "full" | "";
  onBtnClick?: any;
  disabled?: boolean;
  xl?: boolean;
};

const BButton: React.FC<BButtonProps> = ({
  title,
  type = "button",
  varient = "primary",
  loading = false,
  w,
  onBtnClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`
        ${
          w === "fit"
            ? "w-fit px-4 min-w-28"
            : w === "full"
            ? "w-full"
            : "px-4 min-w-40"
        }
         flex items-center justify-center gap-2 px-8 select-none  h-[49px] max-w-full rounded-[12px] transition-all ${
           varient === "secondary" ? "bg-[#D8D8D8]" : "bg-gradient text-black"
         } text-black font-bold ${
        loading || disabled
          ? "cursor-not-allowed opacity-75"
          : "cursor-pointer active:scale-[.95]"
      }`}
      onClick={onBtnClick}
      disabled={loading || disabled}
    >
      {loading ? <LuLoaderCircle className="animate-spin" /> : title}
    </button>
  );
};

export default BButton;
