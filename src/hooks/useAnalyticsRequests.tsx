import { useEffect, useState } from "react";
import api from "@/lib/services";
import { DasboardAnalytics, UserGrowthAnalytics } from "@/lib/types";
import { utils } from "@/lib/utils";

const useUserGrowthAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<DasboardAnalytics>({
    total_users: {
      value: "0",
      change_from_yesterday: "+0.00%",
    },
    total_coaches: {
      value: "0",
      change_from_yesterday: "+0.00%",
    },
    total_bookings: {
      value: "0",
      change_from_yesterday: "+0.00%",
    },
    total_products: {
      value: "0",
      change_from_yesterday: "+0.00%",
    },
    sales_graph: [],
  });

  const getDashboardAnalytics = async () => {
    setLoading(true);
    try {
      const response = await api.getDashboardAnalytics();

      setAnalytics(response);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardAnalytics();
  }, []);

  return { loading, analytics, getDashboardAnalytics };
};

export const analyticsHooks = {
  useUserGrowthAnalytics,
};
