"use client"
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ArrowLeft, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Slider from '../slider/slider'
import DangerPopup from '../DangerPopup'
import { postHooks } from '@/hooks/usePostRequests'

type Props = {
  product: Product
}

function ProductDetails({ product }: Props) {
  const router = useRouter()
  const [popup,setPopup] = useState(false)
   const {toggleApproveCoachProduct} = postHooks.useApproveCoachProduct()
 const handleApproveProduct = () =>{
toggleApproveCoachProduct(String(product.id))
setPopup(false)
 }
  return (
    <div className='text-white'>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white">
          <button onClick={() => router.back()} className="outline-none">
            <ArrowLeft />
          </button>
          <h1 className="section-heading ">Product Detail</h1>
          <div className={cn(product.is_approved ? "bg-green-700/20 text-[#00C369]" : "bg-yellow-500/20 text-yellow-500", "p-2 px-12 text-sm font-bold rounded-full ")} >{product.is_approved ? "Live" : "Pending"}</div>
        </div>
        { !product.is_approved &&
        <button onClick={()=>setPopup(true)} className='cursor-pointer bg-primary p-2 px-6 text-black rounded-sm'>Live Merchandise</button>
        }
      </div>
      <div className='bg-secondary flex gap-2 p-4 rounded-2xl' >
        <div className='w-[50%]' >
<Slider images={product.products_images} />
        </div>
        <div className='w-[50%]' >
          <div className='flex flex-col gap-3' >
            <div className='flex justify-between' >
              <div><h1 className='text-2xl font-bold' >{product.name}</h1>  <h4 className='text-xs flex gap-2 items-center' ><MapPin size={14} className='text-primary' />{product.location}</h4> </div>
              <h4 className='text-primary text-xl font-bold' >${product.price}</h4>
            </div>
            <div className='h-[300px] pb-2  border-b' >
              <h1 className='text-xl' >Description</h1>
              <p className='text-sm opacity-55' >{product.description}</p>
            </div>

            <div className='flex justify-between gap-2 border-b pb-3' >
              <div className='bg-[#2a2a2b] p-2 w-[50%] rounded-2xl text-sm'>
                <span>Category:</span>
                <span className='text-primary' >{product.category}</span>
              </div>
              <div className='bg-[#2a2a2b] p-2 w-[50%] rounded-2xl text-sm'>
                <span>Stock:</span>
                <span className='text-primary' >{product.stock} PCS Availabe</span>
              </div>

            </div>
            <div>
              <h1 className='mb-2 font-bold' >Size</h1>
              <div className='flex gap-2' >
                {product.available_sizes.map((s, idx) => (

                  <span key={idx} className='bg-primary p-3 w-8 flex justify-center items-center text-black font-bold h-8 rounded-md' >{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

<DangerPopup
title='Make Merchandise Live'
desc='Are you sure you want to make this merchandise live? It will become visible to users immediately.'
cancelTitle='No'
doneTitle='Yes'
show={popup}
onClose={()=>setPopup(false)}
onContinue={handleApproveProduct}
/>

    </div>
  )
}

export default ProductDetails