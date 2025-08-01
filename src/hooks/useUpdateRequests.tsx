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
    setLoading(true);
    try {
      if (!status) {
        toast.error("Order tracking status is required");
        return false;
      }

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

export const updateHooks = {
  updateTrackingStatus,
};
