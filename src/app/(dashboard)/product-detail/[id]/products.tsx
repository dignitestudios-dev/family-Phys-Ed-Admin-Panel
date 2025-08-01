"use client";
import ProductDetails from "@/components/merchandise/product-detail";
import PageLoader from "@/components/PageLoader";
import { getHooks } from "@/hooks/useGetRequests";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

function Products({}: Props) {
  const { id } = useParams();
  const { loading, product, getProductDetailById } =
    getHooks.useGetProductDetails();

  useEffect(() => {
    if (id) {
      getProductDetailById(id as string);
    }
  }, []);

  if (loading) return <PageLoader />;
  return (
    <>
      <ProductDetails product={product!} />
    </>
  );
}

export default Products;
