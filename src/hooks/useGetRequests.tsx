import api from "@/lib/services";
import {
  ApprovalRequests,
  CoachDetailsInterface,
  CommunityInterface,
  CommunityMembersInterface,
  FollowerInterface,
  FollowingInterface,
  GroupDetailsInterface,
  GroupInterface,
  MerchandiseProduct,
  Order,
  OrderDetails,
  PaginatedSessionData,
  PostDetailsInterface,
  PostInterface,
  PrivateSessionDetail,
  Product,
  PublicSessionDetail,
  ReportedGroupsInterface,
  ReportedIssue,
  ReportedPostInterface,
  ReportedUsersInterface,
  RevenueCoach,
  RevenueMerchandise,
  RevenueUser,
  UserDetailsInterface,
  UserInterface,
  UserType,
} from "@/lib/types";
import { utils } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserInterface | null>(null);
  const [totalUsersPages, setTotalUsersPages] = useState<number>(1);
  const [totalCoachesPages, setTotalCoachesPages] = useState<number>(1);

  const getAllUsers = async (search: string, page?: number) => {
    setLoading(true);
    try {
      const response = await api.getAllUsers(search, page);

      setUsers(response);
      const userTotalPages = Math.ceil(
        response?.users?.total / response?.users?.per_page
      );
      const coachesTotalPages = Math.ceil(
        response?.coaches?.total / response?.coaches?.per_page
      );

      setTotalUsersPages(userTotalPages);
      setTotalCoachesPages(coachesTotalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, users, totalUsersPages, totalCoachesPages, getAllUsers };
};

const useGetAllProfileReq = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<ApprovalRequests | undefined>();
  const [profileTotalPages, setProfileTotalPages] = useState<number>(1);
  const [merchandiseTotalPages, setMerchandiseTotalPages] = useState<number>(1);

  const getAllRequests = async (
    page?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getAllRequests(page);

      setUsers(response);
      const profileDataTotalPages = Math.ceil(
        response?.profile_requests?.total / response?.profile_requests?.per_page
      );
      const merchandiseDataTotalPages = Math.ceil(
        response?.merchandise_requests?.total /
          response?.merchandise_requests?.per_page
      );

      setProfileTotalPages(profileDataTotalPages);
      setMerchandiseTotalPages(merchandiseDataTotalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    users,
    profileTotalPages,
    merchandiseTotalPages,
    getAllRequests,
  };
};

const useGetUsersDetails = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDetailsInterface | null>(null);

  const getUserById = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.getUserById(id);

      setUser(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, setUser, getUserById };
};

const useGetCoachDetails = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<CoachDetailsInterface | null>(null);

  const getUserById = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.getCoachById(id);

      setUser(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, setUser, getUserById };
};

const useGetUserPublicSessionDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PublicSessionDetail | null>(null);

  const getUserPublicSessionById = async (id: string, sessionId: string) => {
    setLoading(true);
    try {
      const response = await api.getUserPublicSessionById(id, sessionId);
      console.log("User details API call: ", response);
      setData(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, setData, getUserPublicSessionById };
};

const useGetUserPrivateSessionDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PublicSessionDetail | null>(null);

  const getUserPrivateSessionById = async (id: string, sessionId: string) => {
    setLoading(true);
    try {
      const response = await api.getUserPrivateSessionById(id, sessionId);
      console.log("User details API call: ", response);
      setData(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, setData, getUserPrivateSessionById };
};

const useGetPublicSessionDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PublicSessionDetail | null>(null);

  const getPublicSessionById = async (id: string, sessionId: string) => {
    setLoading(true);
    try {
      const response = await api.getPublicSessionById(id, sessionId);
      console.log("User details API call: ", response);
      setData(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, setData, getPublicSessionById };
};

const useGetProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  const getProductDetailById = async (id: string) => {
    setLoading(true);
    try {
      const response = await api.getProductDetail(id);
      console.log("User details API call: ", response);
      setProduct(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, product, setProduct, getProductDetailById };
};

const useGetReqSessionDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PrivateSessionDetail | null>(null);

  const getRequestSessionById = async (id: string, reqId: string) => {
    setLoading(true);
    try {
      const response = await api.getRequestSessionById(id, reqId);
      console.log("User details API call: ", response);
      setData(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, setData, getRequestSessionById };
};

const useGetUserPostsById = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostInterface[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getPostsOfUser = async (
    id: string,
    selectedTab: "0" | "1" | "2" | "3" | "4" = "0",
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const postType: "all" | "normal" | "job" | "educational" | "group" =
        selectedTab === "0"
          ? "all"
          : selectedTab === "1"
          ? "normal"
          : selectedTab === "2"
          ? "job"
          : selectedTab === "3"
          ? "educational"
          : selectedTab === "4"
          ? "group"
          : "all";

      const response = await api.getPostsOfUser(id, page, limit, postType);
      console.log("User posts API call: ", response);
      setPosts(response?.posts);
      setTotalPages(response?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, posts, totalPages, getPostsOfUser };
};

const useGetPostDetails = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostDetailsInterface | null>(null);

  const getPostById = async (id: string, type: string) => {
    setLoading(true);
    try {
      const response = await api.getPostById(id, type);
      console.log("Post details API call: ", response);
      setPost({ ...response?.post, type: response?.type });
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, post, getPostById };
};

const useGetUserFollowersById = () => {
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState<FollowerInterface[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getFollowersOfUser = async (
    id: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getFollowersOfUser(id, page, limit);
      console.log("User followers API call: ", response);
      setFollowers(response?.followers);
      // setTotalPages(response?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, followers, totalPages, getFollowersOfUser };
};

const useGetUserFollowingsById = () => {
  const [loading, setLoading] = useState(true);
  const [followings, setFollowings] = useState<FollowingInterface[] | null>(
    null
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const getFollowingsOfUser = async (
    id: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getFollowingsOfUser(id, page, limit);
      console.log("User followings API call: ", response);
      setFollowings(response?.followings);
      // setTotalPages(response?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, followings, totalPages, getFollowingsOfUser };
};

const useGetCommunities = () => {
  const [loading, setLoading] = useState(false);
  const [communities, setCommunities] = useState<CommunityInterface[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getCommunities = async (
    search: string,
    page?: number,
    limit?: number
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.getCommunities(search, page, limit);
      setCommunities(response?.data?.communities);
      setTotalPages(response?.data?.totalPages);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, totalPages, communities, getCommunities };
};

const useGetCommunityDetails = () => {
  const [loading, setLoading] = useState(false);
  const [communityDetails, setCommunityDetails] = useState<{
    community: CommunityInterface;
    members: CommunityMembersInterface[];
  }>({
    community: {} as CommunityInterface,
    members: [],
  });
  const [totalPages, setTotalPages] = useState<number>(1);

  const getCommunityMembers = async (
    id: string,
    page?: number,
    limit?: number
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.getCommunityMembers(id, page, limit);
      setCommunityDetails({
        community: response?.data?.community,
        members: response?.data?.members,
      });
      setTotalPages(response?.data?.totalPages);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, totalPages, communityDetails, getCommunityMembers };
};

const useGetReportedUsers = () => {
  const [loading, setLoading] = useState(true);
  const [reportedUsers, setReportedUsers] = useState<
    ReportedUsersInterface[] | null
  >(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getReportedUsers = async (
    search?: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getReportedUsers(search, page, limit);
      console.log("Reported users API call: ", response);
      setReportedUsers(response?.reports);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, reportedUsers, totalPages, getReportedUsers };
};

const useGetReportedPosts = () => {
  const [loading, setLoading] = useState(true);
  const [reportedPosts, setReportedPosts] = useState<
    ReportedPostInterface[] | null
  >(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getReportedPosts = async (
    selectedTab: "0" | "1" | "2" | "3" | "4" = "0",
    search?: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const postType: "" | "normal" | "job" | "educational" | "group" =
        selectedTab === "0"
          ? ""
          : selectedTab === "1"
          ? "normal"
          : selectedTab === "2"
          ? "job"
          : selectedTab === "3"
          ? "educational"
          : selectedTab === "4"
          ? "group"
          : "";

      const response = await api.getReportedPosts(
        postType,
        search,
        page,
        limit
      );
      console.log("Reported posts API call: ", response);
      setReportedPosts(response?.reports);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, reportedPosts, totalPages, getReportedPosts };
};

const useGetReportedGroups = () => {
  const [loading, setLoading] = useState(true);
  const [reportedGroups, setReportedGroups] = useState<
    ReportedGroupsInterface[] | null
  >(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getReportedGroups = async (
    selectedTab?: "0" | "1" | "2",
    search?: string,
    page?: number,
    limit?: number
  ) => {
    setLoading(true);
    try {
      const isDisabled: "" | boolean =
        selectedTab === "0"
          ? ""
          : selectedTab === "1"
          ? false
          : selectedTab === "2"
          ? false
          : "";
      const response = await api.getReportedGroups(
        isDisabled,
        search,
        page,
        limit
      );
      console.log("Reported groups API call: ", response);
      setReportedGroups(response?.reports);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, reportedGroups, totalPages, getReportedGroups };
};

const useGetAllGroups = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<GroupInterface[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAllGroups = async (
    search: string,
    selectedTab: "0" | "1" | "2" = "0",
    page?: number,
    limit?: number
  ): Promise<void> => {
    setLoading(true);
    try {
      const status: string =
        selectedTab === "0"
          ? ""
          : selectedTab === "1"
          ? "active"
          : selectedTab === "2"
          ? "inactive"
          : "";

      const response = await api.getAllGroups(search, status, page, limit);
      setGroups(response?.data?.groups);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, groups, totalPages, getAllGroups };
};

const useGetGroupDetails = () => {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<GroupDetailsInterface | null>(null);

  const getGroupById = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getGroupById(id);
      setGroup(response?.data);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, group, getGroupById };
};

const useGetAllMerchandiseProducts = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<MerchandiseProduct[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getMerchandiseProducts = async () => {
    setLoading(true);
    try {
      const response = await api.getMerchandiseProducts(page);
      console.log("Merchandise products API call: ", response);
      setProducts(response);
      // setTotalPages(response?.data?.totalPages || 1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMerchandiseProducts();
  }, [page]);

  return { loading, products, totalPages, getMerchandiseProducts };
};

const useGetAllNewOrders = () => {
  const [loading, setLoading] = useState(true);
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [totalNewOrderPages, setTotalNewOrderPages] = useState<number>(1);
  useState<number>(1);

  const getAllNewOrders = async (page?: number) => {
    setLoading(true);
    try {
      const response = await api.getAllNewOrders(page);
      console.log("Orders API call: ", response);
      setNewOrders(response?.data || []);
      const newOrdersTotalPages = Math.ceil(
        response?.total / response?.per_page
      );
      setTotalNewOrderPages(newOrdersTotalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loadingNewOrders: loading,
    newOrders,
    totalNewOrderPages,
    getAllNewOrders,
  };
};

const useGetAllOrdersHistory = () => {
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [totalOrderHistoryPages, setTotalOrderHistoryPages] =
    useState<number>(1);

  const getAllOrdersHistory = async (
    orderStatus: "in-progress" | "completed" | "cancelled",
    page?: number
  ) => {
    setLoading(true);
    try {
      const response = await api.getAllOrdersHistoy(page, orderStatus);
      console.log("Orders API call: ", response);
      setOrderHistory(response?.data || []);

      const orderHistoryTotalPages = Math.ceil(
        response?.total / response?.per_page
      );
      setTotalOrderHistoryPages(orderHistoryTotalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loadingOrdersHistory: loading,
    orderHistory,
    totalOrderHistoryPages,
    getAllOrdersHistory,
  };
};

const useGetOrderDetails = (orderId: string) => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const getOrderDetailsById = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const response = await api.getOrdersDetails(orderId);
      console.log("Order details API call: ", response);
      setOrderDetails(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetailsById();
  }, [orderId]);

  return { loading, orderDetails, getOrderDetailsById };
};

const useGetAllReportedIssues = (page?: number) => {
  const [loading, setLoading] = useState(true);
  const [reportedByCoach, setReportedByCoach] = useState<ReportedIssue[]>([]);
  const [reportedByUser, setReportedByUser] = useState<ReportedIssue[]>([]);
  const [totalReportedByCoachPages, setTotalReportedByCoachPages] =
    useState<number>(1);
  const [totalReportedByUserPages, setTotalReportedByUserPages] =
    useState<number>(1);

  const getAllReportedIssues = async () => {
    setLoading(true);
    try {
      const response = await api.getAllReportedIssues(page);
      console.log("Reported Issues API call: ", response);
      setReportedByCoach(response?.reported_by_coach?.data || []);
      setReportedByUser(response?.reported_by_user?.data || []);
      const reportedByCoachTotalPages = Math.ceil(
        response?.reported_by_coach?.total /
          response?.reported_by_coach?.per_page
      );
      const reportedByUserTotalPages = Math.ceil(
        response?.reported_by_user?.total / response?.reported_by_user?.per_page
      );
      setTotalReportedByCoachPages(reportedByCoachTotalPages);
      setTotalReportedByUserPages(reportedByUserTotalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllReportedIssues();
  }, [page]);

  return {
    loading,
    reportedByCoach,
    reportedByUser,
    totalReportedByCoachPages,
    totalReportedByUserPages,
    getAllReportedIssues,
  };
};

const useGetRevenue = (selectedUserType: UserType) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [merchandises, setMerchandises] = useState<RevenueMerchandise[]>([]);
  const [totalUsersPages, setTotalUsersPages] = useState<number>(1);
  const [totalMerchandisesPages, setTotalMerchandisesPages] =
    useState<number>(1);

  const getRevenue = async (page?: number) => {
    setLoading(true);
    try {
      const response = await api.getRevenue(page, selectedUserType);
      console.log("Revenue API call: ", response);
      setUsers(
        selectedUserType === "coach"
          ? response?.coaches?.data || []
          : response?.users?.data || []
      );
      setMerchandises(response?.merchandise?.data || []);
      const usersTotalPages =
        selectedUserType === "coach"
          ? Math.ceil(response?.coaches?.total / response?.coaches?.per_page)
          : Math.ceil(response?.users?.total / response?.users?.per_page);

      const coachesTotalPages = Math.ceil(
        response?.merchandise?.total / response?.merchandise?.per_page
      );
      setTotalUsersPages(usersTotalPages);
      setTotalMerchandisesPages(coachesTotalPages);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRevenue(1);
  }, [selectedUserType]);

  return {
    loading,
    users,
    merchandises,
    totalUsersPages,
    totalMerchandisesPages,
    getRevenue,
  };
};

const useDownloadRevenueReport = (activeTab: 0 | 1, userType: UserType) => {
  const [loading, setLoading] = useState<boolean>(false);

  const downloadRevenueReport = async () => {
    setLoading(true);
    try {
      let response;
      let filename;
      if (activeTab === 0) {
        if (userType === "coach") {
          response = await api.downloadCoachesRevenueReport();
          filename = `Coaches Revenue Report-${utils.formatDate(
            String(new Date())
          )}.pdf`;
        } else if (userType === "user") {
          response = await api.downloadUsersRevenueReport();
          filename = `Users Revenue Report-${utils.formatDate(
            String(new Date())
          )}.pdf`;
        } else {
          toast.error("Invalid user type");
          return;
        }
      } else {
        response = await api.downloadProductsRevenueReport();
        filename = `Products Revenue Report-${utils.formatDate(
          String(new Date())
        )}.pdf`;
      }

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    downloadRevenueReport,
  };
};

export const getHooks = {
  useGetAllUsers,
  useGetReqSessionDetails,
  useGetPublicSessionDetails,
  useGetProductDetails,
  useGetUserPrivateSessionDetails,
  useGetUsersDetails,
  useGetCoachDetails,
  useGetUserPostsById,
  useGetUserFollowersById,
  useGetUserFollowingsById,
  useGetPostDetails,
  useGetCommunities,
  useGetCommunityDetails,
  useGetAllProfileReq,
  useGetReportedUsers,
  useGetReportedPosts,
  useGetReportedGroups,
  useGetAllGroups,
  useGetGroupDetails,
  useGetUserPublicSessionDetails,
  useGetAllMerchandiseProducts,
  useGetAllNewOrders,
  useGetAllOrdersHistory,
  useGetOrderDetails,
  useGetAllReportedIssues,
  useGetRevenue,
  useDownloadRevenueReport,
};
