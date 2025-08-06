"use client";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Slider from "../slider/slider";
import { postHooks } from "@/hooks/usePostRequests";
import LiveMerchandiseForm from "./LiveMerchandiseForm";

type Props = {
  product: Product;
};

function ProductDetails({ product }: Props) {
  const router = useRouter();
  const [popup, setPopup] = useState(false);
  const { loading, toggleApproveCoachProduct } =
    postHooks.useApproveCoachProduct();
  const handleApproveProduct = async (additionalPrice: number | string) => {
    await toggleApproveCoachProduct(String(product.id), additionalPrice);
    setPopup(false);
  };
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white">
          <button onClick={() => router.back()} className="outline-none">
            <ArrowLeft />
          </button>
          <h1 className="section-heading ">Product Details</h1>
          <div
            className={cn(
              product.is_approved
                ? "bg-green-700/20 text-[#00C369]"
                : "bg-yellow-500/20 text-yellow-500",
              "p-2 px-12 text-sm font-bold rounded-full "
            )}
          >
            {product.is_approved ? "Live" : "Pending"}
          </div>
        </div>
        {!product.is_approved && (
          <button
            onClick={() => setPopup(true)}
            className="cursor-pointer bg-primary p-2 px-6 text-black rounded-sm"
          >
            Live Merchandise
          </button>
        )}
      </div>
      <div className="bg-secondary h-full overflow-y-auto flex gap-2 p-4 rounded-2xl">
        <div className="w-[50%]">
          <Slider images={product.products_images} />
        </div>
        <div className="w-[50%]">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>{" "}
                <h4 className="text-xs flex gap-2 items-center">
                  <MapPin size={14} className="text-primary" />
                  {product.location}
                </h4>{" "}
              </div>
              <h4 className="text-primary text-xl font-bold">
                ${product.price}
              </h4>
            </div>
            <div className="h-[300px] pb-2  border-b">
              <h1 className="text-xl">Description</h1>
              <p className="text-sm opacity-55">{product.description}</p>
            </div>

            <div className="flex justify-between gap-2 border-b pb-3">
              <div className="bg-[#2a2a2b] p-2 w-[50%] rounded-2xl text-sm">
                <span>Category:</span>
                <span className="text-primary ms-2">{product.category}</span>
              </div>
              <div className="bg-[#2a2a2b] p-2 w-[50%] rounded-2xl text-sm">
                <span>Stock:</span>
                <span className="text-primary ms-2">
                  {product.stock} PCS Availabe
                </span>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div>
                <h1 className="mb-2 font-bold">Size</h1>
                <div className="flex gap-2">
                  {product.available_sizes.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-primary p-3 w-8 flex justify-center items-center text-black font-bold h-8 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#2a2a2b] mb-4 flex gap-2 items-center h-fit py-2 px-3 rounded-2xl">
                <div className="p-[2px] w-fit h-fit bg-primary rounded-full">
                  <div
                    className="h-[43px] w-[43px] rounded-full bg-cover bg-center border-2 border-[#1C1C1E]"
                    style={{
                      backgroundImage: `${
                        product?.coach?.avatar
                          ? `url(${process.env.NEXT_PUBLIC_MEDIA_URL}${product.coach.avatar})`
                          : "url(/default-avatar.png)"
                      }`,
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <p>{product.coach.name} </p>
                    <svg
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.29346 2.71711L0.389776 3.11366L0.338346 3.12352C0.260493 3.14299 0.189519 3.18157 0.132673 3.23532C0.0758274 3.28908 0.0351448 3.35608 0.0147822 3.42949C-0.00558032 3.50291 -0.00489432 3.58009 0.0167692 3.65317C0.0384338 3.72625 0.0802992 3.7926 0.138093 3.84545L2.24167 5.7742L1.74559 8.4986L1.73967 8.54576C1.73491 8.6216 1.75162 8.69729 1.78812 8.76504C1.82461 8.8328 1.87957 8.8902 1.94736 8.93138C2.01515 8.97256 2.09335 8.99603 2.17392 8.99937C2.25451 9.00272 2.33459 8.98584 2.40597 8.95046L5.0029 7.66435L7.59392 8.95046L7.63943 8.97018C7.71455 8.99804 7.7962 9.00659 7.87598 8.99493C7.95577 8.98328 8.03082 8.95183 8.09346 8.90384C8.15609 8.85584 8.20404 8.79302 8.23238 8.7218C8.26073 8.65059 8.26845 8.57355 8.25476 8.4986L7.75822 5.7742L9.86271 3.84503L9.8982 3.80859C9.94892 3.74976 9.98217 3.67931 9.99456 3.60444C10.007 3.52956 9.99807 3.45292 9.9688 3.38234C9.93951 3.31176 9.89089 3.24975 9.82788 3.20262C9.76488 3.1555 9.68974 3.12495 9.61012 3.11409L6.70643 2.71711L5.40842 0.239203C5.37085 0.16741 5.31271 0.106955 5.24057 0.06468C5.16841 0.0224051 5.08514 0 5.00017 0C4.9152 0 4.83193 0.0224051 4.75978 0.06468C4.68763 0.106955 4.62948 0.16741 4.59193 0.239203L3.29346 2.71711Z"
                        fill="#FFCC00"
                      />
                    </svg>

                    <p className="text-sm">{product.coach.rating}</p>
                  </div>

                  <p className="text-primary">Coach</p>
                </div>

                <Link
                  href={`/user-management/${product.coach.uid}?role=coach`}
                  className="bg-primary p-1 rounded-md "
                >
                  <ChevronRight className="text-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LiveMerchandiseForm
        title="Make Merchandise Live"
        desc="Are you sure you want to make this merchandise live? It will become visible to users immediately."
        cancelTitle="No"
        doneTitle="Yes"
        show={popup}
        onClose={() => setPopup(false)}
        onContinue={handleApproveProduct}
        loading={loading}
      />
    </>
  );
}

export default ProductDetails;
