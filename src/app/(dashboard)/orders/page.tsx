"use client";
import BTab from "@/components/BTab";
import CustomPagination from "@/components/CustomPagination";
import OrderProduct from "@/components/orders/OrderProduct";
import { getHooks } from "@/hooks/useGetRequests";
import { utils } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const tabs = ["New Orders", "Order History"];
  const orderOptions = ["in-progress", "completed", "cancelled"] as const;
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [activeOrderTab, setActiveOrderTab] = useState<0 | 1 | 2>(0);

  const { loadingNewOrders, newOrders, totalNewOrderPages, getAllNewOrders } =
    getHooks.useGetAllNewOrders();

  const {
    loadingOrdersHistory,
    orderHistory,
    totalOrderHistoryPages,
    getAllOrdersHistory,
  } = getHooks.useGetAllOrdersHistory();

  const onNewOrdersPageChange = (page: number) => {
    getAllNewOrders(page);
  };

  const onOrdersHistoryPageChange = (page: number) => {
    getAllOrdersHistory(orderOptions[activeOrderTab], page);
  };

  const handleChangeOrderTab = (index: 0 | 1 | 2) => {
    if (![0, 1, 2].includes(index)) return;

    setActiveOrderTab(index);
    getAllOrdersHistory(orderOptions[index]);
  };

  useEffect(() => {
    if (activeTab === 0) {
      getAllNewOrders(1);
    } else if (activeTab === 1) {
      getAllOrdersHistory("in-progress", 1);
    }
  }, [activeTab]);

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
          loading={loadingNewOrders}
          onPageChange={onNewOrdersPageChange}
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
                disabled={loadingOrdersHistory}
                onClick={() => handleChangeOrderTab(index as 0 | 1 | 2)}
                className={`cursor-pointer disabled:cursor-not-allowed px-4 py-2 rounded ${
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
            loading={loadingOrdersHistory}
            onPageChange={onOrdersHistoryPageChange}
            totalPages={totalOrderHistoryPages}
          >
            <div className="bg-secondary h-full w-full rounded-2xl p-4 overflow-y-auto">
              {!orderHistory.length ? (
                <p className="text-white/50">No "{orderOptions[activeOrderTab]}" orders history found.</p>
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
        <></>
      )}
    </>
  );
};

export default Orders;
