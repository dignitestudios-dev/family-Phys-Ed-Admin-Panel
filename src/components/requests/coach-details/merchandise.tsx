import MerchandiseCard from "@/components/ui/merchandise-card";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Merchandise({ products }: { products: any[] }) {
  const pathname = usePathname();

  return (
    <div className="bg-secondary p-2 flex flex-wrap  gap-2">
      {pathname.includes("user-management") && products.length > 0 ? (
        products.map((p) => (
          <>
            <MerchandiseCard product={p} key={p.id} />
          </>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Image
            src={"/images/illustration.png"}
            alt="no"
            width={300}
            height={300}
          />
          <h1 className="text-white">No Merchandise Requests Available</h1>
          {pathname.includes("requests") && (
            <h3 className="text-xs text-gray-400">
              The coach can send a merchandise request once his profile is
              approved.
            </h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Merchandise;
