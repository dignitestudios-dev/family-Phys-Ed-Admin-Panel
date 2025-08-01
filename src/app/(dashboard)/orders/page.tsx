"use client";
import BTab from "@/components/BTab";
import CustomPagination from "@/components/CustomPagination";
import OrderProduct from "@/components/orders/OrderProduct";
import { getHooks } from "@/hooks/useGetRequests";
import { utils } from "@/lib/utils";
import React, { useState } from "react";

const Orders = () => {
  const tabs = ["New Orders", "Order History"];
  const orderOptions = ["in-progress", "completed", "cancelled"] as const;
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [activeOrderTab, setActiveOrderTab] = useState<0 | 1 | 2>(0);
  const {
    loading,
    newOrders,
    orderHistory,
    totalNewOrderPages,
    totalOrderHistoryPages,
    getAllOrders,
  } = getHooks.useGetAllOrders();

  const onPageChange = (page: number) => {
    getAllOrders(page);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="section-heading">Orders</h2>

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
      </div>

      {activeTab === 0 ? (
        <CustomPagination
          loading={loading}
          onPageChange={onPageChange}
          totalPages={totalNewOrderPages}
        >
          <div className="bg-secondary h-full w-full rounded-2xl p-4 overflow-y-auto">
            {!newOrders.length ? (
              <p className="text-white/50">No new orders found.</p>
            ) : (
              newOrders.map((order, index) => (
                <OrderProduct key={index} order={order} />
              ))
            )}
          </div>
        </CustomPagination>
      ) : activeTab === 1 ? (
        <>
          <div className="ms-6 w-fit flex gap-4 -mb-[27px] bg-[#2C2C2E] rounded-xl z-10">
            {orderOptions.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveOrderTab(index as 0 | 1 | 2)}
                className={`cursor-pointer px-4 py-2 rounded ${
                  activeOrderTab === index
                    ? "border-b-[6px] text-primary"
                    : "text-white"
                }`}
              >
                {utils.toTitleCase(tab)}
              </button>
            ))}
          </div>

          <CustomPagination
            loading={loading}
            onPageChange={onPageChange}
            totalPages={totalOrderHistoryPages}
          >
            <div className="bg-secondary h-full w-full rounded-2xl p-4 overflow-y-auto">
              {!orderHistory.length ? (
                <p className="text-white/50">No orders history found.</p>
              ) : (
                orderHistory.map((order, index) => (
                  <OrderProduct
                    key={index}
                    order={order}
                    showOrderStatus={true}
                  />
                ))
              )}
            </div>
          </CustomPagination>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Orders;
