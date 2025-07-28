import Image from "next/image";
import React from "react";

const AuthHeading: React.FC<{ title: string; desc: string }> = ({
  title,
  desc,
}) => {
  return (
    <>
      <div className=" h-32 w-32 text-white flex justify-center items-center rounded-2xl">
        <Image src={"/images/logo.png"} alt="BioYap" width={150} height={150} />
      </div>
      <div>
        <h1 className="text-4xl text-white font-general-semibold text-center">{title}</h1>
        <p className="text-[#868686] text-center mt-1 text-sm">{desc}</p>
      </div>
    </>
  );
};

export default AuthHeading;
