import { TriangleAlert } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DeliveredSuccessIcon from "./icons/orders/DeliveredSuccessIcon";
import Image from "next/image";

const ANIMATION_DURATION = 200; // ms
const AUTO_HIDE_DURATION = 2000; // ms

const PInfoPopup: React.FC<{
  iconPath: string;
  title: string;
  description: string;
  show: boolean;
  setShow: (show: boolean) => void;
}> = ({ iconPath, title, description, show, setShow }) => {
  const [visible, setVisible] = useState(show);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoHideRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (show) {
      timeoutRef.current = setTimeout(
        () => setVisible(true),
        ANIMATION_DURATION
      );
      // Auto-hide after 2 seconds
      autoHideRef.current = setTimeout(() => {
        setShow(false);
      }, AUTO_HIDE_DURATION);
    } else {
      timeoutRef.current = setTimeout(
        () => setVisible(false),
        ANIMATION_DURATION
      );
      if (autoHideRef.current) {
        clearTimeout(autoHideRef.current);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoHideRef.current) clearTimeout(autoHideRef.current);
    };
  }, [show, setShow]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black/30 flex items-center justify-center transition-opacity duration-200 ${
        show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 9999 }}
    >
      <div
        className={`bg-[#1C1C1E] rounded-2xl p-6 pt-0 min-w-[570px] flex flex-col justify-center items-center transform transition-all duration-200 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <Image src={iconPath} alt="Info Icon" width={300} height={300} />
        <h2 className="font-black text-2xl text-center mb-2">{title}</h2>
        <p className="text-center text-white/60">{description}</p>
      </div>
    </div>
  );
};

export default PInfoPopup;
