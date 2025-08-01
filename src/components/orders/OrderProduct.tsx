import { Order } from "@/lib/types";
import { utils } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderProduct: React.FC<{ order: Order; showOrderStatus?: boolean }> = ({
  order,
  showOrderStatus = false,
}) => {
  return (
    <div className="border-b border-[#8D8D8D33] mb-8">
      <div className="border-b border-[#8D8D8D33] flex items-center justify-between pb-3">
        <p>Order ID # {order.order_id}</p>

        <p className="text-primary">
          {showOrderStatus && utils.toTitleCase(order.status)}
        </p>
      </div>
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
                  </div>
                </div>

                <div>
                  <p className="text-white/50">Price</p>
                  <p className="text-xl">$199.00</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-2 flex justify-end items-start">
          <Link
            href={`/orders/${order.order_id}`}
            className="text-primary underline me-8 mt-12"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
