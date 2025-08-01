import { TriangleAlert } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ANIMATION_DURATION = 200; // ms

const PPopup: React.FC<{
  title: string;
  description: string;
  show: boolean;
  setShow: (show: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
}> = ({ title, description, show, setShow, onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(show);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (show) {
      timeoutRef.current = setTimeout(
        () => setVisible(true),
        ANIMATION_DURATION
      );
    } else {
      timeoutRef.current = setTimeout(
        () => setVisible(false),
        ANIMATION_DURATION
      );
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [show]);

  if (!visible) return null;

  const handleOnConfirm = () => {
    onConfirm();
    setShow(false);
  };

  const handleOnCancel = () => {
    onCancel?.();
    setShow(false);
  };

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
        className={`bg-[#1C1C1E] rounded-2xl p-6 w-[470px] flex flex-col gap-4 justify-center items-center transform transition-all duration-200 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="bg-gradient h-[100px] w-[100px] rounded-full flex items-center justify-center">
          <TriangleAlert className="text-[#3D3D3D]" size={48} />
        </div>
        <h2 className="font-black text-2xl text-center">{title}</h2>
        <p className="text-center text-white/60">{description}</p>
        <div className="flex w-full gap-4">
          <button
            onClick={handleOnCancel}
            className="w-full bg-[#3D3D3D] rounded-lg py-5 cursor-pointer font-bold"
          >
            No
          </button>
          <button
            onClick={handleOnConfirm}
            className="bg-gradient text-black w-full rounded-lg py-5 cursor-pointer font-bold"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PPopup;
