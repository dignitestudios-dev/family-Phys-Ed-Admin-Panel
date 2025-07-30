import { cn } from "@/lib/utils";
import { CalendarDays, ChevronRight, Clock2, MapPin, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export interface Session {
    session_id: number;
    title: string;
    activity: string;
    session_type: 'public' | 'private' | string;
    number_of_slots: number;
    amount: string;
    distance: string;
    date: string;
    duration: string;
    description: string;
    status: string | null;
    lat: number;
    long: number;
    city: string;
    state: string;
    location: string;
    available_slots: number;
    booked_slots: number;
    booking_users: {
        id: number;
        uid: string;
        name: string;
        avatar: string;
        booked_slots: number;
    }[];
    banner_images: string[];
    use_external_address: boolean;
    deleted_at: string | null;
    started_at: string | null;
    ended_at: string | null;
    payment_method_id: number | null;
    request_id?: number;
    booking_id?: number;
    requested_user?: {
        id: number;
        uid: string;
        name: string;
        avatar: string;
    };

    cancelled_booking_users: any[];
}


function SessionCard({ session, coachId }: { session: Session, coachId: string }) {
    const searchParams = useSearchParams();
    return (
        <div className="bg-[#2C2C2E] p-2 w-[32.5%] text-white rounded-xl ">
            <div className="flex flex-col" >
                {/* <Image className="w-[500px] h-[100px] rounded-xl" src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${session.images[0]}`} alt="img" width={500} height={120} /> */}
                <div className="flex justify-between border-b py-2" >
                    <h1>Booking ID #123456</h1>
                    <h1 className="text-blue-600 text-xs" >Upcoming</h1>
                </div>
                <div className="flex justify-between py-2">
                    <div><h1>{session.title}</h1> <h3 className="text-sm text-primary" >{session.activity}</h3></div>
                    <div>

                        <h1 className="text-primary font-bold text-right" >${session.amount}</h1>
                        <h1 className=" text-xs" >{session.distance}</h1>
                    </div>
                </div>
                <div className="text-xs border-b pb-2">
                    <div className="flex gap-4 py-2" >
                        <h1 className="flex gap-2 items-center"> <CalendarDays className="text-primary" size={15} />{session.date}</h1>
                        <h1 className="flex gap-2 items-center"> <Clock2 className="text-primary" size={15} />{session.duration}</h1>
                    </div>

                    <h1 className="flex items-center gap-2" > <MapPin className="text-primary" size={20} /> {session.location}</h1>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex text-sm items-center gap-2">
                        <div className="border-dashed border border-primary rounded-full p-2 bg-secondary" >
                            <Plus className="text-primary" size={15} />
                        </div>
                        <h1>{session.available_slots} Available Slots</h1>

                    </div >

                    <Link href={
                        session.request_id && !session.booking_id
                            ? `session/${searchParams.get("role")}/${session.request_id}?type=${session.session_type}&coach_id=${coachId}`
                            : !session.request_id && session.booking_id
                                ? `session/${searchParams.get("role")}/${session.booking_id}?type=${session.session_type}&coach_id=${coachId}`
                                : `session/${searchParams.get("role")}/${session.session_id}?type=${session.session_type}&coach_id=${coachId}`
                    } className="bg-primary p-3 rounded-md "><ChevronRight className="text-black" /></Link>
                </div>
            </div>
        </div>
    )
}

export default SessionCard