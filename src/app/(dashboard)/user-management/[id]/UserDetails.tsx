"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import BTab from "@/components/BTab";

import DangerPopup from "@/components/DangerPopup";
import { getHooks } from "@/hooks/useGetRequests";
import PageLoader from "@/components/PageLoader";
import { postHooks } from "@/hooks/usePostRequests";
import { deleteHooks } from "@/hooks/useDeleteRequests";
import { cn } from "@/lib/utils";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Details from "@/components/user-management/user-details/details";
import Sessions from "@/components/user-management/sessions";

type SelectedTabs = "" | "0" | "1" | "2" | "3";

const UserDetails = () => {

  const tabs = ["Detail",  "Sessions"];
  const { loading, user, setUser, getUserById } = getHooks.useGetUsersDetails();
  const { loading: suspendLoading, toggleSuspendUser } =
    postHooks.useToggleSuspendUser();
  const { loading: deleteLoading, deleteUser } = deleteHooks.useDeleteUser();

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
  }>({ delete: false, disable: false });

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
    id && getUserById(id as string);
  }, [id]);

  const handleToggleDisablePopup = (value: boolean) => {
    setShowAlert((prev) => ({
      ...prev,
      disable: value,
    }));
  };

  const handleToggleDeletePopup = (value: boolean) => {
    setShowAlert((prev) => ({
      ...prev,
      delete: value,
    }));
  };

  const handleToggleDisableUser = async () => {
    // const suspendUser = !user?.is_deactivate;
    // const success = await toggleSuspendUser(id as string, suspendUser);
    // if (success)
    //   setUser((prev: any) => ({ ...prev, is_deactivate: suspendUser }));

    handleToggleDisablePopup(false);
  };

  const handleDeleteUser = async () => {
    const success = await deleteUser(id as string);
    if (success) router.push("/user-management");

    handleToggleDeletePopup(false);
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
          <Link href="/user-management" className="outline-none">
           <ArrowLeft />
          </Link>
            <h1 className="section-heading ">User Profile</h1>

         </div>

            <div className="flex gap-2 items-center">
              {/* <div
                className="bg-[#FF3B30] rounded-[10px] h-[48px] w-[44px] cursor-pointer active:scale-[0.95] transition-all flex justify-center items-center"
                onClick={() => handleToggleDeletePopup(true)}
              >
                <Delete />
              </div> */}

              <button onClick={() => handleToggleDisablePopup(true)} className={cn(user?.is_deactivate ? "bg-[#00C369]" : "bg-[#FF363A]", "p-2 px-8 rounded-lg text-white")} >
                {user?.is_deactivate ? "Activate" : "Deactivate"}
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-secondary flex gap-5 items-center py-5 px-8">
            <div className="p-[1.5px] bg-primary rounded-full">
              <div
                className="h-[150px] w-[150px] rounded-full bg-cover bg-center border-[3px] border-white"
                style={{
                  backgroundImage: `url(http://family-phys-ed-s3.s3.amazonaws.com/${user?.avatar}?alt=media)`,
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h2 className="font-general-semibold text-xl text-white">
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
              <h4 className="text-white text-sm" >{user?.fitness_level}</h4>

              <div className="flex items-center gap-2 text-white">
                <div className="flex items-center gap-1 text-sm ">
                         <Phone size={20} className="text-primary" />
                  <p className="text-white"> {user?.phone_number}</p>
                </div>
            
                <div className="flex items-center gap-1 text-sm ">
                      <Mail size={20} className="text-primary" />
                  <p className="text-white"> {user?.email}</p>
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

          <div className=" h-full min-h-[500px] overflow-y-auto">
            {selectedTab === "0" ? (
              <Details activity_preferences={user?.activity_preferences!} fitness_goal={user?.fitness_goal!} fitness_level={user?.fitness_level!} />
            ) : selectedTab === "1" ? (
              <Sessions sessions={user?.sessions!} />
            ) : (
              ""
            )}
          </div>

          <DangerPopup
            title={user?.is_deactivate ? "Enable User" : "Disable User"}
            desc={`Are you sure you want to ${user?.is_deactivate ? "enable" : "disable"
              } this user?`}
            doneTitle={`Yes, ${user?.is_deactivate ? "Enable" : "Disable"} Now`}
            show={showAlert.disable}
            onClose={() => handleToggleDisablePopup(false)}
            onContinue={handleToggleDisableUser}
            loading={suspendLoading}
          />

          <DangerPopup
            title="Delete User"
            desc="Are you sure you want to delete this user?"
            doneTitle="Yes, Delete Now"
            show={showAlert.delete}
            onClose={() => handleToggleDeletePopup(false)}
            onContinue={handleDeleteUser}
            loading={deleteLoading}
          />
        </>
      )}
    </>
  );
};

export default UserDetails;
