"use client";
import React, { useEffect, useState } from "react";
import DashboardFigure from "@/components/DashboardFigure";
import Cookies from "js-cookie";
import TotalUsersChart from "@/components/charts/TotalUsersChart";
import SubscriptionSalesChart from "@/components/charts/SubscriptionSalesChart";
import { analyticsHooks } from "@/hooks/useAnalyticsRequests";
import PageLoader from "@/components/PageLoader";

const Dashboard = () => {
  const { loading, analytics } = analyticsHooks.useUserGrowthAnalytics();
  const currentYear = new Date().getFullYear().toString();
  const [admin, setAdmin] = useState({
    name: "",
    profileImage: "",
  });

  // useEffect(() => {
  //   const adminData = Cookies.get("admin");
  //   if (adminData) {
  //     const parsedAdmin = JSON.parse(adminData);
  //     setAdmin({
  //       name: parsedAdmin.name || "Admin",
  //       profileImage: parsedAdmin.profileImage || "/images/profile-img.png",
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   // Get current year's data by default
  //   getUserGrowthAnalytics(currentYear, currentYear);
  // }, []);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div>
            <h1 className="section-heading">Dashboard</h1>
          </div>
          <div className="grid grid-cols-4 gap-5">
            <DashboardFigure
              title="Users"
              data={analytics.total_users}
            />
            <DashboardFigure title="Coach" data={analytics.total_coaches} />
            <DashboardFigure title="Bookings" data={analytics.total_bookings} />
            <DashboardFigure title="Products" data={analytics.total_products} />
          </div>
          <h2 className="text-dark text-2xl font-general-semibold">Sales</h2>
          <div className="p-4 bg-secondary rounded-2xl">
            <SubscriptionSalesChart loading={loading} data={analytics.sales_graph} />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
