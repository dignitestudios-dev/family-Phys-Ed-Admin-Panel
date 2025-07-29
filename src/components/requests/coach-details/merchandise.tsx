
function Merchandise({ products }: { products: any[] }) {
    return (
        <div className="bg-secondary p-2" >
            {products.length > 0 ? products.map((p) => (
                    <div>

                    </div>
                )): 
                <div className="flex justify-center items-center h-[100px]">

                    <h1 className="text-white">No Merchandise Found</h1>
                </div>
        }
        </div>
    )
}

export default Merchandise