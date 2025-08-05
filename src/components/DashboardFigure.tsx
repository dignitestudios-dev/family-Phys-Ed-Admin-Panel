import React from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

type DashboardFigureProps = {
  title?: string;
  data?: {
    value: string;
    change_from_yesterday: string;
  };
};

const DashboardFigure: React.FC<DashboardFigureProps> = ({ title, data }) => {
  // Determine color and icon for change_from_yesterday
  let changeColor = "text-gray-400";
  let Icon: React.ReactNode = (
    <FaMinus className="inline text-xs align-text-top" />
  );
  if (data?.change_from_yesterday) {
    if (
      data.change_from_yesterday === "+0.00%" ||
      data.change_from_yesterday === "0.00%"
    ) {
      changeColor = "text-gray-400";
      Icon = <FaMinus className="inline text-xs align-text-top" />;
    } else if (data.change_from_yesterday.startsWith("+")) {
      changeColor = "text-green-400";
      Icon = <FaArrowUp className="inline text-xs align-text-top" />;
    } else if (data.change_from_yesterday.startsWith("-")) {
      changeColor = "text-red-400";
      Icon = <FaArrowDown className="inline text-xs align-text-top" />;
    }
  }

  return (
    <div className="p-5 bg-secondary rounded-[20px] relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-desc font-general-medium">{title}</h2>
        {data?.change_from_yesterday && (
          <span
            className={`font-general-medium ${changeColor} text-sm flex items-center gap-1`}
          >
            {Icon} {data.change_from_yesterday}
          </span>
        )}
      </div>
      <p className="text-4xl text-white font-general-semibold">{data?.value}</p>
      <div className="absolute w-40 h-40 -top-2 right-0 bg-[radial-gradient(circle,_rgba(255,255,0,0.07)_0%,_transparent_40%)] pointer-events-none"></div>
    </div>
  );
};

export default DashboardFigure;
