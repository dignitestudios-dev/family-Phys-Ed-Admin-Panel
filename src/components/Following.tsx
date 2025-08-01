import Link from "next/link";
import React, { useEffect } from "react";
import CustomPagination from "./CustomPagination";
import { useParams } from "next/navigation";
import { getHooks } from "@/hooks/useGetRequests";

const Following = () => {
  const { id } = useParams();
  const { loading, followings, totalPages, getFollowingsOfUser } =
    getHooks.useGetUserFollowingsById();

  useEffect(() => {
    id && getFollowingsOfUser(id as string);
  }, [id]);

  const onPageChange = (page: number) => {
    id && getFollowingsOfUser(id as string, page);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-4 py-5 flex items-center separator">
        <h2 className="text-2xl font-general-semibold">Following</h2>
      </div>

      <CustomPagination
        totalPages={totalPages}
        loading={loading}
        onPageChange={onPageChange}
      >
        <div className="bg-white rounded-xl px-4 pb-4 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr>
                <th colSpan={7} className="h-[16px] bg-white" />
              </tr>
              <tr className="bg-[#F2FDE0]">
                <th className="px-4 py-5 text-left text-nowrap rounded-s-[8px]">
                  #
                </th>
                <th className="px-4 py-5 text-left text-nowrap">Name</th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Email Address
                </th>
                <th className="px-4 py-5 text-left text-nowrap">
                  Phone Number
                </th>
                <th className="px-4 py-5 text-left text-nowrap">Location</th>
                <th className="px-4 py-5 text-left text-nowrap  rounded-e-[8px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="mt-10">
              {followings?.map((following, index) => (
                <tr key={index} className="border-b-1 border-[#D4D4D4]">
                  <td className="px-4 py-6">{index + 1}</td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-[2px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] rounded-full">
                        <div
                          className="h-[43px] w-[43px] rounded-full bg-cover bg-center border border-white"
                          style={{
                            backgroundImage: `url(${following?.profilePicture})`,
                          }}
                        />
                      </div>
                      {following?.fullName}
                    </div>
                  </td>
                  <td className="px-4 py-6">{following?.email}</td>
                  <td className="px-4 py-6 text-nowrap">
                    {following?.phoneNumber}
                  </td>
                  <td className="px-4 py-6">{following?.location}</td>
                  <td className="px-4 py-6 text-nowrap underline cursor-pointer">
                    <Link href={`/user-management/${following?._id}`}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomPagination>
    </div>
  );
};

export default Following;
