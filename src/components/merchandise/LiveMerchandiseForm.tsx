import React, { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { TriangleAlert } from "lucide-react";
import toast from "react-hot-toast";
import BInput from "../BInput";

type LiveMerchandiseFormProps = {
  title: string;
  desc: string;
  cancelTitle?: string;
  doneTitle?: string;
  show: boolean;
  onClose: () => void;
  onContinue: (additionalPrice: number | string) => void;
  loading?: boolean;
};

const LiveMerchandiseForm: React.FC<LiveMerchandiseFormProps> = ({
  title,
  desc,
  cancelTitle = "No, Keep It",
  doneTitle = "Yes, Disable Now",
  show,
  onClose,
  onContinue,
  loading,
}) => {
  if (!show) return null;

  const [additionalPrice, setAdditionalPrice] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Disallow any leading whitespace and prevent two or more consecutive spaces in any field
    newValue = newValue.replace(/^\s+/, "");
    newValue = newValue.replace(/ {2,}/g, " ");

    setAdditionalPrice(newValue);
  };

  const handleLiveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!additionalPrice.trim()) return;

    onContinue(additionalPrice);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-screen bg-[#00000041] backdrop-blur-xs flex justify-center items-center ${
        show ? "animate-fadeIn" : "animate-fadeOut"
      }`}
    >
      <div
        className={`relative bg-secondary text-white p-10 rounded-[20px] flex flex-col justify-center items-center gap-3 ${
          show ? "animate-popupIn" : "animate-popupOut"
        }`}
      >
        <TriangleAlert
          fill="#1C1C1E"
          className="text-primary p-4 bg-primary rounded-full"
          size={100}
        />

        <p className="font-general-semibold text-xl">{title}</p>
        <p className=" w-full text-sm max-w-80 text-center text-white/50">
          {desc}
        </p>

        <form className="w-full" onSubmit={handleLiveProduct}>
          <BInput
            id="additionalPrice"
            label="Additional Price"
            name="additionalPrice"
            onChange={handleInputChange}
            value={additionalPrice}
            disabled={loading}
            inputType="number"
            min="0"
            placeholder="Enter Additional Price"
            required={true}
          />

          <div className="w-full flex items-center gap-3 mt-5">
            <button
              type="button"
              className="cursor-pointer min-w-[140px] w-full h-[44px] bg-[#3D3D3D] text-white text-sm font-general-medium rounded-lg flex justify-center items-center "
              onClick={onClose}
            >
              {cancelTitle}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer min-w-[140px] w-full h-[44px] ${
                loading && "opacity-50"
              } bg-primary text-sm font-general-medium rounded-lg flex justify-center items-center text-black`}
            >
              {loading ? (
                <LuLoaderCircle className="animate-spin" size={24} />
              ) : (
                doneTitle
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveMerchandiseForm;
