import MerchandiseCard from "@/components/ui/merchandise-card";
import Image from "next/image";

function Merchandise({ products }: { products: any[] }) {
  return (
    <div className="bg-secondary p-2 flex flex-wrap  gap-2">
      {products.length > 0 ? (
        products.map((p) => (
          <>
            <MerchandiseCard product={p} key={p.id} />
          </>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Image
            src={"/images/Illustration.png"}
            alt="No Data"
            width={300}
            height={300}
          />
          <h1 className="text-white">No Merchandise Available</h1>
        </div>
      )}
    </div>
  );
}

export default Merchandise;
