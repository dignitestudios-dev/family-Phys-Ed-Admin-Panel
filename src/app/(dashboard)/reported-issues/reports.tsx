"use client";
import BTab from "@/components/BTab";
import CustomPagination from "@/components/CustomPagination";
import PPopup from "@/components/PPopup";
import MerchandiseCard from "@/components/ui/merchandise-card";
import { getHooks } from "@/hooks/useGetRequests";
import { updateHooks } from "@/hooks/useUpdateRequests";
import { utils } from "@/lib/utils";
import React, { useState } from "react";

type SelectedTabs = 0 | 1; // 0: Coaches, 1: Users

const ReportedIssues = () => {
  const tabs = ["Reported By Coach", "Reported By Users"];
  const [selectedTab, setSelectedTab] = useState<SelectedTabs>(0);
  const [page, setPage] = useState<number>(1);
  const {
    loading,
    reportedByCoach,
    totalReportedByCoachPages,
    reportedByUser,
    totalReportedByUserPages,
    getAllReportedIssues,
  } = getHooks.useGetAllReportedIssues(page);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [updatedUserStatus, setUpdatedUserStatus] = useState<
    "activate" | "deactivate" | null
  >(null);
  const { loadingActivate, activateUser, loadingDeactivate, deactivateUser } =
    updateHooks.useUpdateUserStatus();

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const handleSetUserToUpdateStatus = (
    userId: number,
    updatedStatus: "activate" | "deactivate"
  ) => {
    setSelectedUserId(userId);
    setUpdatedUserStatus(updatedStatus);
  };

  const handleCloseStatusPopup = async (show: boolean) => {
    if (!show) {
      setSelectedUserId(null);
      setUpdatedUserStatus(null);
    }
  };

  const handleUpdateUserStatus = async () => {
    if (!updatedUserStatus || !selectedUserId) return;
    if (updatedUserStatus === "deactivate") {
      await deactivateUser(selectedUserId);
    } else {
      await activateUser(selectedUserId);
    }

    getAllReportedIssues();
  };

  return (
    <>
      <div className="flex items-center justify-between ">
        <h2 className="section-heading mb-4">Reported Issues</h2>
        <div className="px-4">
          <div className="flex bg-[#1C1C1E] items-center w-fit p-1 rounded-lg gap-5">
            {tabs.map((tab, index) => (
              <BTab
                title={tab}
                key={index}
                active={selectedTab === index}
                onBtnClick={() => setSelectedTab(index as SelectedTabs)}
              />
            ))}
          </div>
        </div>
      </div>

      <CustomPagination
        loading={loading}
        onPageChange={onPageChange}
        totalPages={
          selectedTab === 0
            ? totalReportedByCoachPages
            : selectedTab === 1
            ? totalReportedByUserPages
            : 1
        }
      >
        <div className=" rounded-xl p-4 overflow-y-auto bg-secondary">
          {selectedTab === 0 ? (
            <table className="w-full text-white">
              <thead className="sticky top-0 z-10 bg-[#2C2C2E] p-2">
                <tr>
                  <th className="px-4 py-5 font-normal text-left rounded-s-[8px]">
                    #
                  </th>
                  <th className="px-4 py-5 text-left font-normal">Name</th>
                  <th className="px-4 py-5 text-left font-normal">Reason</th>
                  <th className="px-4 py-5 text-left font-normal">
                    Reported By
                  </th>
                  <th className="px-4 py-5 text-left font-normal">Date</th>
                  <th className="px-4 py-5 text-left font-normal">Time</th>
                  <th className="px-4 py-5 text-left font-normal rounded-e-[8px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportedByCoach?.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b cursor-pointer border-[#3a3a3c]"
                  >
                    <td className="px-4 py-6">{index + 1}</td>
                    <td className="px-4 py-6">
                      <div className="flex users-center gap-3">
                        {user?.name}
                      </div>
                    </td>
                    <td className="px-4 py-6">{user?.reason || "N/A"}</td>
                    <td className="px-4 py-6">{user?.reported_by || "N/A"}</td>
                    <td className="px-4 py-6">{user?.date || "N/A"}</td>

                    <td className="px-4 py-6">{user?.time || 0}</td>
                    <td className="px-4 py-6 space-x-6">
                      <button
                        className="border-b text-red-500 cursor-pointer"
                        onClick={() =>
                          handleSetUserToUpdateStatus(
                            user.user_id,
                            "deactivate" // later update this condition according to the user's current status currently the activate key is not coming with the get all reports API data
                          )
                        }
                      >
                        Deactivate
                      </button>
                      <button className="border-b text-green-600 cursor-pointer">
                        Mark as Read
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : selectedTab === 1 ? (
            <table className="w-full text-white">
              <thead className="sticky top-0 z-10 bg-[#2C2C2E] p-2">
                <tr>
                  <th className="px-4 py-5 font-normal text-left rounded-s-[8px]">
                    #
                  </th>
                  <th className="px-4 py-5 text-left font-normal">Name</th>
                  <th className="px-4 py-5 text-left font-normal">Reason</th>
                  <th className="px-4 py-5 text-left font-normal">
                    Reported By
                  </th>
                  <th className="px-4 py-5 text-left font-normal">Date</th>
                  <th className="px-4 py-5 text-left font-normal">Time</th>
                  <th className="px-4 py-5 text-left font-normal rounded-e-[8px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportedByUser?.map((user, index) => (
                  <tr
                    key={index}
                    className="border-b cursor-pointer border-[#3a3a3c]"
                  >
                    <td className="px-4 py-6">{index + 1}</td>
                    <td className="px-4 py-6">
                      <div className="flex users-center gap-3">
                        {user?.name}
                      </div>
                    </td>
                    <td className="px-4 py-6">{user?.reason || "N/A"}</td>
                    <td className="px-4 py-6">{user?.reported_by || "N/A"}</td>
                    <td className="px-4 py-6">{user?.date || "N/A"}</td>

                    <td className="px-4 py-6">{user?.time || 0}</td>
                    <td className="px-4 py-6 space-x-6 space-y-3">
                      <button
                        className="border-b text-red-500 cursor-pointer"
                        onClick={() =>
                          handleSetUserToUpdateStatus(
                            user.user_id,
                            "activate" // later update this condition according to the user's current status currently the activate key is not coming with the get all reports API data
                          )
                        }
                      >
                        Deactivate
                      </button>
                      <button className="border-b text-green-600 cursor-pointer">
                        Mark as Read
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <></>
          )}
        </div>
      </CustomPagination>

      {/* Deactivate User Popup */}
      <PPopup
        title={`${utils.toTitleCase(updatedUserStatus || "")} User`}
        description={`Are you sure you want to ${updatedUserStatus} this user?`}
        show={updatedUserStatus !== null && selectedUserId !== null}
        setShow={handleCloseStatusPopup}
        onConfirm={() => handleUpdateUserStatus()}
      />
    </>
  );
};

export default ReportedIssues;
