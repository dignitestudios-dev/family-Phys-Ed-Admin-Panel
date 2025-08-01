import { Order, OrderDetails } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Separator from "../Separator";

// const OrderProductDetails: React.FC<{ order: Order }> = ({ order }) => {
const OrderProductDetails: React.FC<{ order: OrderDetails }> = ({ order }) => {
  return (
    <div className="mb-8">
      <p className="font-bold text-2xl">Orders</p>
      <Separator />
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          {order.order_items.map((item, index) => (
            <div key={index} className="space-y-4 py-4">
              <div className="flex gap-5 items-center justify-between">
                <div className="flex gap-5 items-center">
                  <div className="bg-[#FCD146] w-20 h-20 rounded-2xl overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${item.product_images[0]}`}
                      alt="Product Image"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-contain"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-lg">{item.product_name}</p>
                    <div className="flex gap-5">
                      <p>
                        <span className="text-white/50">Category:</span>{" "}
                        {item.category}
                      </p>

                      <div>
                        {Object.entries(item.sizes).map(([size, qty]) => (
                          <div key={size} className="flex gap-5 items-center">
                            <p>
                              <span className="text-white/50">Size:</span>{" "}
                              {size}
                            </p>
                            <p>
                              <span className="text-white/50">Qty:</span> {qty}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-primary font-semibold text-2xl">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default OrderProductDetails;
