"use client";
import PageLoader from "@/components/PageLoader";
import { getHooks } from "@/hooks/useGetRequests";
import { cn } from "@/lib/utils";
import { ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Merchandise = () => {
  const [page, setPage] = useState<number>(1);
  const { products, loading } = getHooks.useGetAllMerchandiseProducts(page);
  console.log("products: ", products);
  return (
    <>
      <h2 className="section-heading">Merchandise</h2>

      <div className="bg-secondary h-full w-full rounded-2xl p-4 overflow-y-auto">
        {loading ? (
          <PageLoader />
        ) : products.length ? (
          <div className="grid grid-cols-3 gap-2">
            {products.map((product) => (
              <div className="bg-[#2C2C2E] w-full p-2 text-white rounded-xl">
                <div className="flex flex-col">
                  <Image
                    className="w-[500px] h-[120px] rounded-xl object-cover"
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${product.products_images[0]}`}
                    alt="img"
                    width={500}
                    height={120}
                  />
                  <div className="flex justify-between border-b py-2">
                    <div>
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-xs">
                        Category:{" "}
                        <span className="text-primary">{`${product.category}`}</span>{" "}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-primary">${product.price}</h3>
                      <h4
                        className={cn(
                          product.is_approved
                            ? " text-green-600"
                            : " text-yellow-600",
                          "rounded-full text-xs text-center"
                        )}
                      >
                        {product.is_approved ? "Live" : "Pending"}
                      </h4>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex text-sm">
                      {" "}
                      <MapPin className="text-primary me-2" size={20} />
                      <span>{product.location}</span>
                    </div>
                    <Link
                      href={`product-detail/${product.id}`}
                      className="bg-primary p-3 rounded-md "
                    >
                      <ChevronRight className="text-black" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-white">No Merchandise Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Merchandise;
