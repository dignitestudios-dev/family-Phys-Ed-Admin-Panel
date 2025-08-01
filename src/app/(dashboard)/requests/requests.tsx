"use client";
import CustomPagination from "@/components/CustomPagination";
import MerchandiseCard from "@/components/ui/merchandise-card";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import { getHooks } from "@/hooks/useGetRequests";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type SelectedTabs = "0" | "1"; // 0: Coaches, 1: Users

const Requests = () => {
  const tabs = ["Profile Requests", "Merchandise Requests"];
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("0");
  const [searchValue, setSearhValue] = useState<string>("");
  const searchValueDebounce: string = useDebounceSearch(searchValue);
  const { loading, users, totalPages, getAllRequests } =
    getHooks.useGetAllProfileReq();

  useEffect(() => {
    getAllRequests(searchValueDebounce, selectedTab);
  }, [searchValueDebounce, selectedTab]);

  const onPageChange = (page: number) => {
    getAllRequests(searchValueDebounce, selectedTab, page);
  };

  const currentList =
    selectedTab === "0" ? users?.profile_requests : users?.merchandise_requests;

  return (
    <>
      <div className="flex items-center justify-between ">
        <h2 className="section-heading mb-4">Requests</h2>
        <div className="px-4">
          <div className="flex bg-[#1C1C1E] items-center w-fit p-1 rounded-sm gap-5">
            {tabs.map((tab, index) => (
              <p
                key={index}
                className={`cursor-pointer text-sm text-black text-center px-10 w-[250px] py-1 ${
                  selectedTab === String(index)
                    ? "bg-primary rounded-sm font-general-medium"
                    : "text-desc"
                }`}
                onClick={() => setSelectedTab(String(index) as SelectedTabs)}
              >
                {tab}
              </p>
            ))}
          </div>
        </div>
        {/* 
                <div className="relative">
                    <Search className="absolute text-[#898989] top-2.5 left-4" size={15} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="outline-none bg-[#1C1C1E] text-[#898989] pl-12 p-2 px-4 text-sm rounded-sm flex-1 h-full"
                        onChange={(e) => setSearhValue(e.target.value)}
                    />
                </div> */}
      </div>

      {/* <CustomPagination loading={loading} onPageChange={onPageChange} totalPages={totalPages}> */}
      <div className=" rounded-xl p-4 overflow-y-auto bg-secondary">
        {selectedTab == "0" ? (
          <table className="w-full text-white ">
            <thead className="sticky top-0 z-10 bg-[#2C2C2E] p-2">
              <tr>
                <th className="px-4 py-5 font-normal text-left rounded-s-[8px]">
                  #
                </th>
                <th className="px-4 py-5 text-left font-normal">Name</th>
                <th className="px-4 py-5 text-left font-normal">Email</th>
                <th className="px-4 py-5 text-left font-normal">
                  Phone Number
                </th>
                <th className="px-4 py-5 text-left font-normal">Address</th>
                <th className="px-4 py-5 text-left font-normal">
                  Per Slot Price
                </th>
                <th className="px-4 py-5 text-left font-normal">
                  Hourly Slot Price
                </th>
                <th className="px-4 py-5 text-left font-normal rounded-e-[8px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {currentList?.map((item, index) => (
                <tr key={index} className="border-b border-[#3a3a3c]">
                  <td className="px-4 py-6">{index + 1}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-[2px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] rounded-full">
                        <div
                          className="h-[43px] w-[43px] rounded-full bg-cover bg-center border border-white"
                          style={{
                            backgroundImage: `url(${item?.avatar ?? "/default-avatar.png"})`,
                          }}
                        />
                      </div>
                      {item?.name}
                    </div>
                  </td>
                  <td className="px-4 py-6">{item?.email}</td>
                  <td className="px-4 py-6">{item?.phone_number || "N/A"}</td>
                  <td className="px-4 py-6">{item?.address || "N/A"}</td>

                  {selectedTab === "0" ? (
                    <>
                      <td className="px-4 py-6">${item?.per_slot_price || 0}</td>
                      <td className="px-4 py-6">${item?.hourly_slot_price || 0}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-6">{item?.fitness_goal ?? "N/A"}</td>
                      <td className="px-4 py-6">
                        {(item?.activity_preferences?.join(", ") || "N/A")}
                      </td>
                      <td className="px-4 py-6">{item?.fitness_level ?? "N/A"}</td>
                    </>
                  )}

                  <td
                    className={`px-4 py-6 ${
                      item?.is_deactivate ? "text-[#EE0004]" : "text-[#85D500]"
                    }`}
                  >
                    {item?.is_deactivate ? "Inactive" : "Active"}
                  </td>
                </tr>
              ))} */}
              {users?.profile_requests.data?.map((item, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    router.push(`/requests/${item.uid}?role=coach`)
                  }
                  className="border-b cursor-pointer border-[#3a3a3c]"
                >
                  <td className="px-4 py-6">{index + 1}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-[2px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] rounded-full">
                        <div
                          className="h-[43px] w-[43px] rounded-full bg-cover bg-center border border-white"
                          style={{
                            backgroundImage: `url(${
                              item?.avatar ?? "/default-avatar.png"
                            })`,
                          }}
                        />
                      </div>
                      {item?.name}
                    </div>
                  </td>
                  <td className="px-4 py-6">{item?.email}</td>
                  <td className="px-4 py-6">{item?.phone_number || "N/A"}</td>
                  <td className="px-4 py-6">{item?.address || "N/A"}</td>

                  <>
                    <td className="px-4 py-6">${item?.per_slot_price || 0}</td>
                    <td className="px-4 py-6">
                      ${item?.hourly_slot_price || 0}
                    </td>
                  </>

                  <td
                    className={`px-4 py-6 ${
                      item?.is_approved ? "text-[#EE0004]" : "text-[#85D500]"
                    }`}
                  >
                    {item?.is_approved}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            {users?.merchandise_requests.data.map((p) => (
              <MerchandiseCard key={p.id} product={p} />
            ))}
          </>
        )}
      </div>
      {/* </CustomPagination> */}
    </>
  );
};

export default Requests;
