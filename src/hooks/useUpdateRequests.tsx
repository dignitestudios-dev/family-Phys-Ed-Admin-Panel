import api from "@/lib/services";
import { OrderTrackingStatus } from "@/lib/types";
import { utils } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

const updateTrackingStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateTrackingStatus = async (
    orderId: string,
    status: OrderTrackingStatus
  ): Promise<boolean> => {
    if (!status) {
      toast.error("Order tracking status is required");
      return false;
    }

    setLoading(true);
    try {
      const response = await api.updateTrackingStatus(orderId, status);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateTrackingStatus };
};

const useUpdateUserStatus = () => {
  const [loadingActivate, setLoadingActivate] = useState<boolean>(false);
  const [loadingDeactivate, setLoadingDeactivate] = useState<boolean>(false);

  const activateUser = async (userId: number): Promise<boolean> => {
    if (!userId) return false;
    setLoadingActivate(true);
    try {
      const response = await api.activateUser(userId);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoadingActivate(false);
    }
  };

  const deactivateUser = async (userId: number): Promise<boolean> => {
    if (!userId) return false;
    setLoadingDeactivate(true);
    try {
      const response = await api.deactivateUser(userId);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoadingDeactivate(false);
    }
  };

  return { loadingActivate, activateUser, loadingDeactivate, deactivateUser };
};

export const updateHooks = {
  updateTrackingStatus,
  useUpdateUserStatus,
};
