"use client"
import { PrivateSessionDetail, PublicSessionDetail } from "@/lib/types"
import { ArrowLeft, CalendarDays, Clock2, MapPin } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

function SessionDetail({ data }: { data: PublicSessionDetail | PrivateSessionDetail }) {
    const router = useRouter()
    const pathname   = usePathname()
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-white">
                    <button onClick={() => router.back()} className="outline-none">
                        <ArrowLeft />
                    </button>
                    <h1 className="section-heading ">Session Detail</h1>
                </div>


            </div>
            <div className="flex flex-col gap-2">
                <div className="bg-secondary flex justify-between items-center p-4 rounded-2xl text-white">
                    <div className="">
                        <h1 className="text-2xl" >{data.title} <span className="bg-primary text-black text-sm p-1 px-2 rounded-full" >{data.session_type}</span></h1>
                        <h1 className="text-primary" >{data.activity} </h1>
                    </div>
                    <h1 className="bg-blue-500/20 text-blue-600 rounded-full text-center p-2 text-sm">Upcoming</h1>
                </div>

                <div className="flex gap-2 text-white" >

                    <div className="bg-secondary p-3 rounded-2xl w-[60%]">
                        <h1 className="mb-3 text-xl">Description</h1>
                        <p className="text-sm">{data.description}</p>
                    </div>
                    {data.session_type == "public"  ?
                        <div className="bg-secondary p-3 rounded-2xl w-[40%]">
                            <h1 className="mb-3 text-xl">Other Details</h1>
                            <div className="text-xs border-b pb-2">
                                <div className="flex gap-4 py-2" >
                                    <h1 className="flex gap-2 items-center"> <CalendarDays className="text-primary" size={15} />{data.date}</h1>
                                    <h1 className="flex gap-2 items-center"> <Clock2 className="text-primary" size={15} />{data.duration}</h1>
                                </div>

                                <h1 className="flex items-center gap-2" > <MapPin className="text-primary" size={20} /> {data.location}</h1>
                            </div>
                            <div className="flex flex-col gap-2 py-2" >
                                <div className="bg-[#2c2c2e] p-2 px-4 flex justify-between rounded-2xl" >
                                    <h1>Total Slots</h1>
                                    <h3 className="text-primary">{data.number_of_slots}</h3>
                                </div>
                                <div className="bg-[#2c2c2e] p-2 px-4 flex justify-between rounded-2xl" >
                                    <h1>Book Slots</h1>
                                    <h3 className="text-primary">{data.booked_slots}</h3>
                                </div>
                                <div className="bg-[#2c2c2e] p-2 px-4 flex justify-between rounded-2xl" >
                                    <h1>Remaining Slots</h1>
                                    <h3 className="text-primary">{data.available_slots}</h3>
                                </div>

                            </div>
                        </div>
                        :
                        <div className="bg-secondary p-3 rounded-2xl w-[40%]">
                            <h1 className="mb-3 text-xl">Other Details</h1>
                            <div className="text-xs border-b pb-2">
                                <div className="flex gap-4 py-2" >
                                    <h1 className="flex gap-2 items-center"> <CalendarDays className="text-primary" size={15} />{data.date}</h1>
                                    <h1 className="flex gap-2 items-center"> <Clock2 className="text-primary" size={15} />{data.duration}</h1>
                                </div>

                                <h1 className="flex items-center gap-2" > <MapPin className="text-primary" size={20} /> {data.location}</h1>
                            </div>
                            <div className="flex flex-col gap-2 py-2 border-b" >
                                {/* <div className="bg-[#2c2c2e] p-2 px-4 flex justify-between rounded-2xl" >
                                <h1>Total Slots</h1>
                                <h3 className="text-primary">{data.number_of_slots}</h3>
                             </div>
                             <div className="bg-[#2c2c2e] p-2 px-4 flex justify-between rounded-2xl" >
                                <h1>Book Slots</h1>
                                <h3 className="text-primary">{ data.booked_slots}</h3>
                             </div>
                             <div className="bg-[#2c2c2e] p-2 px-4 flex justify-between rounded-2xl" >
                                <h1>Remaining Slots</h1>
                                <h3 className="text-primary">{data.available_slots}</h3>
                             </div> */}
                                <div className="bg-[#2c2c2e] flex justify-between items-center p-2 rounded-2xl px-4" >
                                    <div className="flex gap-2 items-center">
                                        <Image className="rounded-full w-[50px] h-[50px]" src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${data.requested_user.avatar}`} alt="img" width={50} height={50} />

                                        <div> <h1 className="text-sm">{data.requested_user.name}</h1>
                                            <h1 className="text-xs text-primary" >Customer</h1>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        Total Members: {data.booking_users.length}
                                    </div>
                                </div>
                            </div>
                            <div className="py-4">
                                <h1>Payment Details</h1>
                                <div className="bg-[#2c2c2e] flex flex-col  gap-2 p-4 rounded-2xl" >
                                    <div className="flex justify-between">
                                        <h1>Subtotal</h1>
                                        <h4>${data.payment_details.subtotal}</h4>
                                    </div>
                                    <div className="flex justify-between">
                                        <h1>Duration</h1>
                                        <h4>${data.payment_details.duration}</h4>
                                    </div>
                                    <div className="flex justify-between">
                                        <h1>Total Members</h1>
                                        <h4>{data.payment_details.total_slots}</h4>
                                    </div>
                                    <div className="flex justify-between">
                                        <h1 className="font-semibold">Total Amount</h1>
                                        <h4 className="text-primary">${data.payment_details.total_amount}</h4>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default SessionDetail