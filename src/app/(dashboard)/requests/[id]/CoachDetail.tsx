"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
;
import BTab from "@/components/BTab";

import DangerPopup from "@/components/DangerPopup";
import { getHooks } from "@/hooks/useGetRequests";
import PageLoader from "@/components/PageLoader";
import { postHooks } from "@/hooks/usePostRequests";
import { deleteHooks } from "@/hooks/useDeleteRequests";

import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Details from "@/components/user-management/coach-details/details";
import Portfolio from "@/components/user-management/coach-details/portfolio";
import Sessions from "@/components/user-management/sessions";

import { cn } from "@/lib/utils";
import Merchandise from "@/components/requests/coach-details/merchandise";
import DangerRejectPopup from "@/components/DangerRejectPopup";

type SelectedTabs = "" | "0" | "1" | "2" | "3";

const CoachDetails = () => {

  const tabs = ["Detail", "Portfolio", "Sessions", "Merchandise"];
  const { loading, user, setUser, getUserById } = getHooks.useGetCoachDetails();
  const { loading: suspendLoading, toggleSuspendUser } =
    postHooks.useToggleSuspendUser();
  const { loading: deleteLoading, toggleRejectCoach } = postHooks.useRejectCoach();
  const { loading: approveLoading, toggleApproveCoach } = postHooks.useApproveCoach();
const [reason,setReason] = useState("")
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const currentTab: SelectedTabs = useMemo(
    () => searchParams.get("tab"),
    [searchParams]
  ) as SelectedTabs;

  const [selectedTab, setSelectedTab] = useState<SelectedTabs>("");
  const [showAlert, setShowAlert] = useState<{
    delete: boolean;
    disable: boolean;
    approve: boolean;
  }>({ delete: false, disable: false , approve:false });

  const handleTabChange = (index: SelectedTabs) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", index);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    currentTab && ["0", "1", "2", "3"].includes(currentTab)
      ? setSelectedTab(currentTab as SelectedTabs)
      : setSelectedTab("0");
  }, [currentTab]);

  useEffect(() => {
    id && getUserById(id as string );
  }, [id]);

  const handleToggleDisablePopup = (value: boolean) => {
    setShowAlert((prev) => ({
      ...prev,
      disable: value,
    }));
  };

  const handleToggleApprovePopup = (value: boolean) => {
    setShowAlert((prev) => ({
      ...prev,
      approve: value,
    }));
  };

  const handleToggleRejectUser =  () => {
 toggleRejectCoach(String(user?.coach_id) as string , reason);
 setReason("")
  handleToggleDisablePopup(false);
  };



  const handleToggleApproveUser =  () => {
   toggleApproveCoach(String(user?.coach_id) as string);

 handleToggleApprovePopup(false);

  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="flex flex-col gap-4">

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
          <div onClick={()=>router.back()} className="outline-none">
           <ArrowLeft />
          </div>
            <h1 className="section-heading ">Coach Profile</h1>
</div>
            <div className="flex gap-2 items-center">
              {/* <div
                className="bg-[#FF3B30] rounded-[10px] h-[48px] w-[44px] cursor-pointer active:scale-[0.95] transition-all flex justify-center items-center"
                onClick={() => handleToggleDeletePopup(true)}
              >
                <Delete />
              </div> */}

              <button onClick={()=>handleToggleDisablePopup(true)} className={cn( "bg-[#FF363A]" , "p-2 px-8 rounded-lg text-white")} >
                Reject
              </button>
              <button onClick={()=>handleToggleApprovePopup(true)} className={cn("bg-[#00C369]" , "p-2 px-8 rounded-lg text-white")} >
                Approve
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-secondary flex gap-5 items-center py-5 px-8">
            <div className="p-[1.5px] bg-primary rounded-full">
              <div
                className="h-[150px] w-[150px] rounded-full bg-cover bg-center border-[3px] border-white"
                style={{
                  backgroundImage: `url(https://family-phys-ed-s3.s3.amazonaws.com/${user?.avatar})`,
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h2 className="font-general-semibold text-2xl text-white">
                  {user?.name}
                </h2>
                {/* {user?.earnedBadges?.length ? (
                  <Image
                    src={`/badges/${
                      user?.earnedBadges[user?.earnedBadges.length - 1]?._id
                    }.svg`}
                    alt={
                      user?.earnedBadges[user?.earnedBadges.length - 1]?.name
                    }
                    width={32}
                    height={32}
                  />
                ) : (
                  ""
                )} */}
              </div>

              {/* <p className="text-sm text-white">@{user?.name}</p> */}
              <h4 className="text-white text-sm">{user?.experience}+ Years of Experience</h4>

              <div className="flex items-center gap-4 text-xs text-white">
                <div className="flex items-center gap-1  ">
                  <Phone size={20} className="text-primary" />
                  <p> {user?.phone_number}</p>
                </div>
              
                <div className="flex items-center gap-1  ">
                  <Mail size={20} className="text-primary" />
                  <p> {user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white">
                <MapPin size={20} className="text-primary" />
                {user?.location}</div>

              {/* <p className="text-desc text-sm">{user?.fitness_level}</p> */}
            </div>
          </div>

          <div className="rounded-lg bg-secondary font-medium flex items-center p-1 w-fit shadow-[0px_4px_19.4px_0px_#0000000D]">
            {tabs.map((tab, index) => (
              <BTab
                key={index}
                title={tab}
                active={selectedTab === String(index)}
                onBtnClick={() =>
                  handleTabChange(String(index) as SelectedTabs)
                }
              />
            ))}
          </div>

          <div className="rounded-lg  h-full overflow-y-auto">
            {selectedTab === "0" ? (
              <Details coach={user!} />
            ) : selectedTab === "1" ? (
              <Portfolio media={user?.portfolio!} />
            ) : selectedTab === "2" ? (
              <Sessions sessions={user?.sessions!} coachId={String(user?.coach_id)} />
            ) : selectedTab === "3" ? (
              <Merchandise products={user?.products!} />
            ) : (
              ""
            )}
          </div>

          <DangerRejectPopup
            title={"Reject Profile"}
            desc={`Are you sure you want to
              ${user?.is_deactivate ? "Activate" : "Deactivate"
            } this coach`}
             setReason={setReason}
            doneTitle={`Yes, ${user?.is_deactivate ? "Enable" : "Disable"} Now`}
            show={showAlert.disable}
            onClose={() => handleToggleDisablePopup(false)}
            onContinue={handleToggleRejectUser}
            loading={suspendLoading}
          />

          <DangerPopup
            title="Approve Profile"
            desc="Are you sure you want to approve this profile?"
            doneTitle="Yes"
            show={showAlert.approve}
            onClose={() => handleToggleApprovePopup(false)}
            onContinue={handleToggleApproveUser}
            loading={deleteLoading}
          />
        </div>
      )}
    </>
  );
};

export default CoachDetails;
