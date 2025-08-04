"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const Topbar = () => {
  const [admin, setAdmin] = useState({
    name: "",
    profileImage: "",
  });

  useEffect(() => {
    const adminData = Cookies.get("admin");
    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      console.log("parsedAdmin: ",parsedAdmin)
      setAdmin({
        name: parsedAdmin.name || "Admin",
        profileImage: parsedAdmin.avatar || "/images/logo.png",
      });
    }
  }, []);
  return (
    <div className="w-full bg-secondary p-4 rounded-[10px] gap-4 flex justify-end">
      <div className="relative " >
        <Search size={20} className="absolute text-[#898989]  top-2 left-4 "  />
      <input className="bg-black rounded-full text-[#898989] w-[300px] border border-[#898989] pl-12 px-4 p-2 text-sm " placeholder="Search anything..." />
      </div>
      <div className="flex items-center gap-2">
        <div className="border border-gray-400 bg-gray-400/20 rounded-full p-2 flex justify-center items-center">
          <div
            className="h-[20px] w-[20px] bg-contain bg-no-repeat bg-center "
            style={{
              backgroundImage: `url(${admin?.profileImage})`,
            }}
          />
        </div>
            <p className="text-white text-sm">{admin?.name}</p>
      </div>
    </div>
  );
};

export default Topbar;
