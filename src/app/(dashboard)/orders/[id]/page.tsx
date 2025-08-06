"use client";
import FullPageLoader from "@/components/FullPageLoader";
import CurrentOrderStatus from "@/components/icons/orders/CurrentOrderStatus";
import DeliveredSuccessIcon from "@/components/icons/orders/DeliveredSuccessIcon";
import DisabledOrderStatus from "@/components/icons/orders/DisabledOrderStatus";
import NextOrderStatus from "@/components/icons/orders/NextOrderStatus";
import StripeIcon from "@/components/icons/StripeIcon";
import OrderProductDetails from "@/components/orders/OrderProductDetails";
import PageLoader from "@/components/PageLoader";
import PInfoPopup from "@/components/PInfoPopup";
import PPopup from "@/components/PPopup";
import Separator from "@/components/Separator";
import { getHooks } from "@/hooks/useGetRequests";
import { updateHooks } from "@/hooks/useUpdateRequests";
import { OrderTrackingStatus } from "@/lib/types";
import { utils } from "@/lib/utils";
import { ArrowLeft, Loader2, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createOrGetSupportChat } from "@/lib/createSupportChat";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";

const OrderDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<OrderTrackingStatus | null>(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const { loading, orderDetails, getOrderDetailsById } =
    getHooks.useGetOrderDetails(String(id));
  const { loading: updating, updateTrackingStatus } =
    updateHooks.updateTrackingStatus();

  if (loading) return <PageLoader />;
  if (!orderDetails) return <p>No order details found.</p>;

  const onSelectStatus = (status: OrderTrackingStatus) => {
    setSelectedStatus(status);
    setShowUpdatePopup(true);
  };

  const onUpdateTrackingStatus = async (status: OrderTrackingStatus | null) => {
    if (!status) return;
    const success = await updateTrackingStatus(String(id), status);

    if (!success) return;
    setSelectedStatus(null);

    if (status === "delivered") {
      setShowInfoPopup(true);
    } else {
      await getOrderDetailsById();
    }
  };

  const handleHideInfoPopupAndRefetchData = async () => {
    setShowInfoPopup(false);
    await getOrderDetailsById();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/orders" className="outline-none">
            <ArrowLeft />
          </Link>
          <h2 className="section-heading">Order Details</h2>
        </div>

        <div
          className={`${
            orderDetails.status === "completed"
              ? "bg-green-600"
              : orderDetails.status === "cancelled"
              ? "bg-red-600"
              : "bg-[#FFFE00]"
          } text-black px-4 py-2 rounded-full font-bold`}
        >
          {utils.toTitleCase(orderDetails.status)}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {/* Order progress stepper */}
        {orderDetails.status !== "cancelled" && (
          <div className="bg-secondary rounded-2xl py-18 flex justify-center items-center">
            <div className="flex gap-[152px]">
              <div className="flex flex-col justify-center items-center gap-2">
                <p>Order Placed</p>
                <button
                  disabled
                  className="relative cursor-pointer disabled:cursor-not-allowed"
                >
                  <CurrentOrderStatus />
                  <div className="absolute top-1/2 left-[100%] w-52 bg-transparent border border-dashed border-primary" />
                </button>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <p>Shipped</p>
                <button
                  disabled={orderDetails.tracking_status !== "confirmed"}
                  className="relative cursor-pointer disabled:cursor-not-allowed"
                  onClick={() => onSelectStatus("shipped")}
                >
                  {orderDetails.tracking_status === "confirmed" ? (
                    <NextOrderStatus />
                  ) : (
                    <CurrentOrderStatus />
                  )}
                  <div
                    className={`absolute top-1/2 left-[100%] w-52 bg-transparent border border-dashed ${
                      orderDetails.tracking_status === "confirmed"
                        ? "border-white/50"
                        : "border-primary"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <p>Out for Delivery</p>
                <button
                  disabled={orderDetails.tracking_status !== "shipped"}
                  onClick={() => onSelectStatus("out for delivery")}
                  className="relative cursor-pointer disabled:cursor-not-allowed"
                >
                  {orderDetails.tracking_status === "out for delivery" ||
                  orderDetails.tracking_status === "delivered" ? (
                    <CurrentOrderStatus />
                  ) : orderDetails.tracking_status === "shipped" ? (
                    <NextOrderStatus />
                  ) : (
                    <DisabledOrderStatus />
                  )}
                  <div
                    className={`absolute top-1/2 left-[100%] w-52 bg-transparent border border-dashed ${
                      orderDetails.tracking_status === "delivered"
                        ? "border-primary"
                        : orderDetails.tracking_status === "out for delivery"
                        ? "border-primary"
                        : "border-white/50"
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <p>Delivered</p>
                <button
                  disabled={orderDetails.tracking_status !== "out for delivery"}
                  onClick={() => onSelectStatus("delivered")}
                  className="relative cursor-pointer disabled:cursor-not-allowed"
                >
                  {orderDetails.tracking_status === "delivered" ? (
                    <CurrentOrderStatus />
                  ) : orderDetails.tracking_status === "out for delivery" ? (
                    <NextOrderStatus />
                  ) : (
                    <DisabledOrderStatus />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order details */}
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-3">
            <div className="bg-secondary rounded-2xl p-6">
              <p>
                <span className="text-white/50">Order ID:</span>{" "}
                {orderDetails.order_id}
              </p>
              <p>
                <span className="text-white/50">Order Placed:</span>{" "}
                {utils.formatDate(orderDetails.order_placed)}
              </p>

              <Separator />

              <div>
                <p>Delivery Address</p>
                <div className="bg-[#2C2C2E] rounded-[20px] px-4 h-[46px] mt-2 flex items-center">
                  {orderDetails.delivery_address}
                </div>
              </div>

              <div className="my-4">
                <p>Payment Method</p>
                <div className="bg-[#2C2C2E] rounded-[20px] px-4 h-[46px] mt-2 flex items-center">
                  <StripeIcon />{" "}
                  <p className="ms-4">
                    **** **** **** {orderDetails.payment_method_last_digits}
                  </p>
                </div>
              </div>

              <OrderProductDetails order={orderDetails} />
            </div>

            {orderDetails.status === "cancelled" && (
              <div className="bg-secondary rounded-2xl p-6 mt-4">
                <h3 className="font-bold text-xl">Cancellation Reason</h3>

                <p className="text-white/60 mt-4">
                  {orderDetails.cancellation_reason ||
                    "Lorem ipsum dolor sit amet consectetur. Id eu id iaculis at netus. Lacus convallis sed fringilla feugiat nam nec. Dolor dis elit mi quam quisque mauris dui eget"}
                </p>
              </div>
            )}
          </div>
          <div className="col-span-2">
            <div className="bg-secondary rounded-2xl p-6">
              <h3 className="font-bold text-xl">Order Summary</h3>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-white font-extralight">
                  Subtotal ( {orderDetails.order_items.length || 0}{" "}
                  {orderDetails.order_items.length <= 1 ? "item" : "items"} )
                </p>
                <p className="text-white">
                  ${orderDetails.order_summary.subtotal}
                </p>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-primary">
                <p>Total</p>
                <p>${orderDetails.order_summary.total}</p>
              </div>
            </div>

            <div className="bg-secondary rounded-2xl p-6 mt-4">
              <h3 className="font-bold text-xl mb-4">Customer</h3>

              <div className="flex gap-2 items-center h-fit py-2 px-3 rounded-2xl">
                <div className="p-[2px] w-fit h-fit bg-primary rounded-full">
                  <div
                    className="h-[43px] w-[43px] rounded-full bg-cover bg-center border-2 border-[#1C1C1E]"
                    style={{
                      backgroundImage: `${
                        orderDetails?.user?.avatar
                          ? `url(${process.env.NEXT_PUBLIC_MEDIA_URL}${orderDetails.user.avatar})`
                          : "url(/default-avatar.png)"
                      }`,
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <p>{orderDetails.user.name} </p>
                  </div>

                  <p className="text-sm text-white/50">
                    {orderDetails.user.phone_number}
                  </p>
                </div>
              </div>

              <button
                className="bg-gradient w-full p-3 rounded-lg flex gap-2 items-center justify-center mt-4 text-black cursor-pointer"
                onClick={async () => {
                  // Get admin UID from cookie (same as chat-support page)
                  let adminUid = null;
                  if (typeof window !== "undefined") {
                    const adminData = Cookies.get("admin");
                    if (adminData) {
                      const parsedAdmin = JSON.parse(adminData);

                      try {
                        adminUid = parsedAdmin.uid;
                      } catch {}
                    }
                  }
                  if (!adminUid) {
                    alert("Admin UID not found in cookies.");
                    return;
                  }
                  // Prepare user profile for chat doc
                  const userProfile = {
                    uid: orderDetails.user.uid,
                    name: orderDetails.user.name,
                    avatar: orderDetails.user.avatar || "",
                    phone_number: orderDetails.user.phone_number || "",
                  };
                  const chatId = await createOrGetSupportChat(
                    adminUid,
                    userProfile
                  );
                  // Redirect to chat-support with chatId as query param
                  router.push(`/chat-support?chatId=${chatId}`);
                }}
              >
                <MessageCircleMore className="text-black" /> <p>Chat Now</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <FullPageLoader
        show={updating}
        desc={`Updating tracking status to ${utils.toTitleCase(
          selectedStatus as string
        )}...`}
      />

      <PPopup
        title={`${
          selectedStatus === "shipped"
            ? "Order Shipped"
            : selectedStatus === "out for delivery"
            ? "Out for Delivery"
            : "Delivered"
        }`}
        description={`Are you sure you want to mark this order as ${selectedStatus}? The user will be notified about the status update.`}
        show={showUpdatePopup && selectedStatus !== null}
        setShow={setShowUpdatePopup}
        onConfirm={() => onUpdateTrackingStatus(selectedStatus)}
      />

      <PInfoPopup
        iconPath={"/images/order-success.png"}
        title="Product Successfully Delivered"
        description="Your product has been successfully delivered"
        show={showInfoPopup}
        setShow={handleHideInfoPopupAndRefetchData}
      />
    </>
  );
};

export default OrderDetails;
