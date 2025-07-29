import MerchandiseCard from "@/components/ui/merchandise-card";

function Merchandise({ products }: { products: any[] }) {
    return (
        <div className="bg-secondary p-2 flex flex-wrap justify-between gap-2" >
            {products.length > 0 ? products.map((p) => (
                <>
                <MerchandiseCard product={p} key={p.id} />
           
            </>)) :
                <div className="flex justify-center items-center h-[100px]">

                    <h1 className="text-white">No Merchandise Found</h1>
                </div>
            }
        </div>
    )
}

export default Merchandise