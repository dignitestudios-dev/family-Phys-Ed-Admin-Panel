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
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import Details from "@/components/user-management/coach-details/details";
import Portfolio from "@/components/user-management/coach-details/portfolio";
import Sessions from "@/components/user-management/sessions";
import Merchandise from "@/components/user-management/coach-details/merchandise";
import { cn } from "@/lib/utils";

type SelectedTabs = "" | "0" | "1" | "2" | "3";

const CoachDetails = () => {
  const tabs = ["Detail", "Portfolio", "Sessions", "Merchandise"];
  const { loading, user, setUser, getUserById } = getHooks.useGetCoachDetails();
  const { loading: suspendLoading, toggleSuspendUser } =
    postHooks.useToggleSuspendUser();
  const { loading: deleteLoading, deleteUser } = deleteHooks.useDeleteUser();
  const { activateUser } = postHooks.useActivate();
  const { deactivateUser } = postHooks.useDeactivate();
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
    activate: boolean;
  }>({ delete: false, disable: false, activate: false });

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

  const handleToggleDeactivatePopup = (value: boolean) => {
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
    deactivateUser(String(user?.coach_id));

    handleToggleDeactivatePopup(false);
  };

  const handleDeleteUser = async () => {
    const success = await deleteUser(id as string);
    if (success) router.push("/user-management");

    handleToggleDeletePopup(false);
  };

  const handleToggleActivatePopup = (value: boolean) => {
    setShowAlert((prev) => ({
      ...prev,
      activate: value,
    }));
  };

  const handleActivateUser = () => {
    activateUser(String(user?.coach_id));
    handleToggleActivatePopup(false);
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
              <Link href="/user-management" className="outline-none">
                <ArrowLeft />
              </Link>
              <h1 className="section-heading ">Coach Profile</h1>
            </div>
            <div className="flex gap-2 items-center">
              {/* <div
                className="bg-[#FF3B30] rounded-[10px] h-[48px] w-[44px] cursor-pointer active:scale-[0.95] transition-all flex justify-center items-center"
                onClick={() => handleToggleDeletePopup(true)}
              >
                <Delete />
              </div> */}
              {user?.is_deactivate ? (
                <button
                  onClick={() => handleToggleActivatePopup(true)}
                  className={cn(
                    user?.is_deactivate ? "bg-[#00C369]" : "bg-[#FF363A]",
                    "p-2 px-8 rounded-lg text-white"
                  )}
                >
                  {"Active"}
                </button>
              ) : (
                <button
                  onClick={() => handleToggleDeactivatePopup(true)}
                  className={cn(
                    user?.is_deactivate ? "bg-[#00C369]" : "bg-[#FF363A]",
                    "p-2 px-8 rounded-lg text-white"
                  )}
                >
                  {"Deactivate"}
                </button>
              )}
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

                <div className="flex items-center gap-1">
                  <svg
                    width="10"
                    height="9"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.29346 2.71711L0.389776 3.11366L0.338346 3.12352C0.260493 3.14299 0.189519 3.18157 0.132673 3.23532C0.0758274 3.28908 0.0351448 3.35608 0.0147822 3.42949C-0.00558032 3.50291 -0.00489432 3.58009 0.0167692 3.65317C0.0384338 3.72625 0.0802992 3.7926 0.138093 3.84545L2.24167 5.7742L1.74559 8.4986L1.73967 8.54576C1.73491 8.6216 1.75162 8.69729 1.78812 8.76504C1.82461 8.8328 1.87957 8.8902 1.94736 8.93138C2.01515 8.97256 2.09335 8.99603 2.17392 8.99937C2.25451 9.00272 2.33459 8.98584 2.40597 8.95046L5.0029 7.66435L7.59392 8.95046L7.63943 8.97018C7.71455 8.99804 7.7962 9.00659 7.87598 8.99493C7.95577 8.98328 8.03082 8.95183 8.09346 8.90384C8.15609 8.85584 8.20404 8.79302 8.23238 8.7218C8.26073 8.65059 8.26845 8.57355 8.25476 8.4986L7.75822 5.7742L9.86271 3.84503L9.8982 3.80859C9.94892 3.74976 9.98217 3.67931 9.99456 3.60444C10.007 3.52956 9.99807 3.45292 9.9688 3.38234C9.93951 3.31176 9.89089 3.24975 9.82788 3.20262C9.76488 3.1555 9.68974 3.12495 9.61012 3.11409L6.70643 2.71711L5.40842 0.239203C5.37085 0.16741 5.31271 0.106955 5.24057 0.06468C5.16841 0.0224051 5.08514 0 5.00017 0C4.9152 0 4.83193 0.0224051 4.75978 0.06468C4.68763 0.106955 4.62948 0.16741 4.59193 0.239203L3.29346 2.71711Z"
                      fill="#FFCC00"
                    />
                  </svg>

                  <p className="text-sm">{user?.rating}</p>
                </div>
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
              <h4 className="text-white text-sm">
                {user?.experience}+ Years of Experience
              </h4>

              <div className="flex items-center gap-4 text-xs text-white">
                <div className="flex items-center gap-1  ">
                  <Phone size={20} className="text-primary" />{" "}
                  <p>
                    {`${
                      user?.phone_number.startsWith("+1")
                        ? user?.phone_number
                        : user?.phone_number.startsWith("1")
                        ? `+${user?.phone_number}`
                        : `+1${user?.phone_number}`
                    }` || "N/A"}
                  </p>
                </div>

                <div className="flex items-center gap-1  ">
                  <Mail size={20} className="text-primary" />
                  <p> {user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white">
                <MapPin size={20} className="text-primary" />
                {user?.location}
              </div>

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
              <Sessions
                sessions={user?.sessions!}
                coachId={String(user?.coach_id)!}
              />
            ) : selectedTab === "3" ? (
              <Merchandise products={user?.products!} />
            ) : (
              ""
            )}
          </div>

          <DangerPopup
            title={user?.is_deactivate ? "Activate User" : "Deactivate Coach"}
            desc={`Are you sure you want to
              ${user?.is_deactivate ? "Activate" : "Deactivate"} this coach`}
            doneTitle={`Yes, ${user?.is_deactivate ? "Enable" : "Disable"} Now`}
            show={showAlert.disable}
            onClose={() => handleToggleDeactivatePopup(false)}
            onContinue={handleToggleDisableUser}
            loading={suspendLoading}
          />

          <DangerPopup
            title="Activate User"
            desc="Are you sure you want to activate this user?"
            doneTitle="Yes"
            show={showAlert.activate}
            onClose={() => handleToggleActivatePopup(false)}
            onContinue={handleActivateUser}
            loading={deleteLoading}
          />
        </div>
      )}
    </>
  );
};

export default CoachDetails;
