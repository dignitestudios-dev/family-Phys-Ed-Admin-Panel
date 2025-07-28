import React from "react";
import Chart from "./icons/Chart";

type DashboardFigureProps = {
  title?: string;
  value?: number | string;
};

const DashboardFigure: React.FC<DashboardFigureProps> = ({ title, value }) => {
  return (
    <div className="p-5 bg-secondary rounded-[20px] relative overflow-hidden">
      <h2 className="text-desc font-general-medium">{title}</h2>
      <p className="text-2xl text-white font-general-semibold">{value}</p>

      {/* <div className="h-full  flex items-center absolute right-0 top-0"> */}
        {/* <Chart /> */}
 
   <div className="absolute w-40 h-40 bottom-0 right-0 bg-[radial-gradient(circle,_rgba(255,255,0,0.07)_0%,_transparent_40%)] pointer-events-none"></div>


      {/* </div> */}
    </div>
  );
};

export default DashboardFigure;
