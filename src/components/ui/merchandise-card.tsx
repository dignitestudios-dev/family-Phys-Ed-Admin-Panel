import { cn } from "@/lib/utils";
import { ChevronRight, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link";


function MerchandiseCard({product}:{product:{
  id: number;
  title: string;
  category: string;
  price: string; // or `number` if you parse it
  is_approved: boolean;
  location: string;
  images: string[];
}}) {
  return (
    <div className="bg-[#2C2C2E] p-2 w-[32.5%] text-white rounded-xl ">
        <div className="flex flex-col" >
            <Image className="w-[500px] h-[120px] rounded-xl object-cover" src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${product.images[0]}`} alt="img" width={500} height={120} />
            <div className="flex justify-between border-b py-2" >
           <div>

            <h1>{product.title}</h1>
            <p className="text-xs">Category: <span className="text-primary" >{`${product.category}`}</span> </p>
           </div>
           <div>
           <h3 className="text-primary" >${product.price}</h3>
           <h4 className={cn(product.is_approved? " text-green-600" : " text-yellow-600" , "rounded-full text-xs text-center")}>{product.is_approved ? "Live" : "Pending"}</h4>
           </div>
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="flex text-sm"> <MapPin className="text-primary" size={20} /><span>{product.location}</span></div >
                <Link href={`product-detail/${product.id}`} className="bg-primary p-3 rounded-md "><ChevronRight className="text-black" /></Link>
            </div>
        </div>
    </div>
  )
}

export default MerchandiseCard