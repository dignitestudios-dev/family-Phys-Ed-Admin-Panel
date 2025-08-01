import { useState } from "react";
import api from "@/lib/services";
import { UserGrowthAnalytics } from "@/lib/types";
import { utils } from "@/lib/utils";

const useUserGrowthAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<UserGrowthAnalytics>({
    totalActiveUsers: 0,
    userGrowthData: [],
  });

  const getUserGrowthAnalytics = async (startYear: string, endYear: string) => {
    setLoading(true);
    try {
      // const response = await api.getUserGrowthAnalytics(startYear, endYear);
      setAnalytics({
        totalActiveUsers: 1001 + 1221 + 1121 + 1322 + 1456,
        userGrowthData: [
          {
            year: "2021",
            users: 1001,
          },
          {
            year: "2022",
            users: 1221,
          },
          {
            year: "2023",
            users: 1121,
          },
          {
            year: "2024",
            users: 1322,
          },
          {
            year: "2025",
            users: 1456,
          },
        ],
      });
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, analytics, getUserGrowthAnalytics };
};

export const analyticsHooks = {
  useUserGrowthAnalytics,
};
