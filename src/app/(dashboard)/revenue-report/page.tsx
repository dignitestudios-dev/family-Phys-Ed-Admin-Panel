"use client";
import BButton from "@/components/BButton";
import BTab from "@/components/BTab";
import CustomPagination from "@/components/CustomPagination";
import { getHooks } from "@/hooks/useGetRequests";
import { utils } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RevenueReport = () => {
  const router = useRouter();
  const tabs = ["Users", "Merchandise"];
  const {
    loading,
    users,
    merchandises,
    totalUsersPages,
    totalMerchandisesPages,
    getRevenue,
  } = getHooks.useGetRevenue();
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const { loading: downloadingReport, downloadRevenueReport } =
    getHooks.useDownloadRevenueReport(activeTab);

  const onPageChange = (page: number) => {
    getRevenue(page);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="section-heading">Revenue</h2>

        <BButton
          title="Download"
          loading={downloadingReport}
          onBtnClick={downloadRevenueReport}
        />
      </div>

      <div className="bg-secondary rounded-2xl p-2 flex gap-4 items-center w-fit">
        {tabs.map((tab, index) => (
          <BTab
            title={tab}
            key={index}
            active={activeTab === index}
            onBtnClick={() => setActiveTab(index as 0 | 1)}
          />
        ))}
      </div>

      {activeTab === 0 ? (
        <CustomPagination
          loading={loading}
          onPageChange={onPageChange}
          totalPages={totalUsersPages}
        >
          {!users.length ? (
            <p className="text-white/50">No revenue found.</p>
          ) : (
            <div className="bg-secondary rounded-xl px-4 pb-4 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th colSpan={7} className="h-[16px] bg-secondary" />
                  </tr>
                  <tr className="bg-[#2C2C2E]">
                    <th className="px-4 py-5 text-left text-nowrap rounded-s-[8px]">
                      #
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">Name</th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      User Type
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Sessions Attended
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Custom Request Posted
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Total Spent
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Total Refund
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      App Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="mt-10">
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b-1 border-[#D4D4D4] cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/user-management/${user.uid}?role=${user.user_type}`
                        )
                      }
                    >
                      <td className="px-4 py-6">{index + 1}</td>
                      <td className="px-4 py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-[2px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] rounded-full">
                            <div
                              className="h-[43px] w-[43px] rounded-full bg-cover bg-center border border-white"
                              style={{
                                backgroundImage: `url(${
                                  user?.avatar ?? "/default-avatar.png"
                                })`,
                              }}
                            />
                          </div>
                          {user?.name}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-nowrap">
                        {user.user_type}
                      </td>
                      <td className="px-4 py-6">{user.attended_sessions}</td>
                      <td className="px-4 py-6">{user.requests_posted}</td>
                      <td className="px-4 py-6">{user.spent_amount}</td>
                      <td className="px-4 py-6">{user.refunded_amount}</td>
                      <td className="px-4 py-6">{user.total_revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CustomPagination>
      ) : activeTab === 1 ? (
        <CustomPagination
          loading={loading}
          onPageChange={onPageChange}
          totalPages={totalMerchandisesPages}
        >
          {!merchandises.length ? (
            <p className="text-white/50">No revenue found.</p>
          ) : (
            <div className="bg-secondary rounded-xl px-4 pb-4 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th colSpan={7} className="h-[16px] bg-secondary" />
                  </tr>
                  <tr className="bg-[#2C2C2E]">
                    <th className="px-4 py-5 text-left text-nowrap rounded-s-[8px]">
                      #
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">Image</th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Product Name
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Coach Name
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Price Per Unit
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Total Stock
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Units Sold
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Stock Left
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">
                      Revenue Earned
                    </th>
                    <th className="px-4 py-5 text-left text-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="mt-10">
                  {merchandises.map((merchandise, index) => (
                    <tr
                      key={index}
                      className="border-b-1 border-[#D4D4D4] cursor-pointer"
                      onClick={() =>
                        router.push(`/product-detail/${merchandise.id}`)
                      }
                    >
                      <td className="px-4 py-6">{index + 1}</td>
                      <td className="px-4 py-6 text-nowrap">
                        <div className="bg-[#FCD146] w-20 h-20 rounded-2xl overflow-hidden">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${merchandise.image}`}
                            alt="Product Image"
                            width={80}
                            height={80}
                            className="h-20 w-20 object-contain"
                          />
                        </div>{" "}
                      </td>
                      <td className="px-4 py-6">{merchandise.product_name}</td>

                      <td className="px-4 py-6">{merchandise.coach_name}</td>
                      <td className="px-4 py-6">
                        {merchandise.price_per_unit}
                      </td>
                      <td className="px-4 py-6">{merchandise.total_stock}</td>
                      <td className="px-4 py-6">{merchandise.units_sold}</td>
                      <td className="px-4 py-6">{merchandise.stock_left}</td>
                      <td className="px-4 py-6">
                        {merchandise.revenue_earned}
                      </td>
                      <td
                        className={`px-4 py-6 ${
                          merchandise.status === "Active"
                            ? "text-green-600"
                            : "text-shadow-red-600"
                        }`}
                      >
                        {merchandise.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CustomPagination>
      ) : (
        <></>
      )}
    </>
  );
};

export default RevenueReport;
