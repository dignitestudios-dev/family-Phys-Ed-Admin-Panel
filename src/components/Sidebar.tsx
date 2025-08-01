"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

import UserManagement from "./icons/sidebar/UserManagement";
import CommunityManagement from "./icons/sidebar/CommunityManagement";
import BadgesManagement from "./icons/sidebar/BadgesManagement";
import ReportedContent from "./icons/sidebar/ReportedContent";
import SubscriptionPlans from "./icons/sidebar/SubscriptionPlans";
import PushNotifications from "./icons/sidebar/PushNotifications";
import LogOut from "./icons/sidebar/LogOut";
import DashboardSelected from "./icons/sidebar/DashboardSelected";
import Dashboard from "./icons/sidebar/Dashboard";
import { usePathname, useRouter } from "next/navigation";
import UserManagementSelected from "./icons/sidebar/UserManagementSelected";
import CommunityManagementSelected from "./icons/sidebar/CommunityManagementSelected";
import BadgesManagementSelected from "./icons/sidebar/BadgesManagementSelected";
import ReportedContentSelected from "./icons/sidebar/ReportedContentSelected";
import SubscriptionPlansSelected from "./icons/sidebar/SubscriptionPlansSelected";
import PushNotificationsSelected from "./icons/sidebar/PushNotificationsSelected";
import GroupManagement from "./icons/sidebar/GroupManagement";
import GroupManagementSelected from "./icons/sidebar/GroupManagementSelected";
import RequestIcon from "./icons/sidebar/Request-icon";
import MerchandiseSelected from "./icons/sidebar/MerchandiseSelected";
import Merchandise from "./icons/sidebar/Merchandise";
import Order from "./icons/sidebar/Order";
import OrderSelected from "./icons/sidebar/OrderSelected";
import ReportedIssues from "./icons/sidebar/ReportedIssues";
import ReportedIssuesSelected from "./icons/sidebar/ReportedIssuesSelected";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    {
      title: "Dashboard",
      path: "/",
      icon: <Dashboard />,
      iconSelected: <DashboardSelected />,
    },
    {
      title: "User Management",
      path: "/user-management",
      icon: <UserManagement />,
      iconSelected: <UserManagementSelected />,
    },
    {
      title: "Requests",
      path: "/requests ",
      icon: <RequestIcon />,
      iconSelected: <RequestIcon />,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: <Order />,
      iconSelected: <OrderSelected />,
    },
    {
      title: "Merchandise",
      path: "/merchandise",
      icon: <Merchandise />,
      iconSelected: <MerchandiseSelected />,
    },
    {
      title: "Reported Issues",
      path: "/reported-issues",
      icon: <ReportedIssues />,
      iconSelected: <ReportedIssuesSelected />,
    },
    {
      title: "Push Notifications",
      path: "/push-notifications",
      icon: <PushNotifications />,
      iconSelected: <PushNotificationsSelected />,
    },
  ];

  const isActiveRoute = useCallback(
    (linkPath: string) => {
      if (linkPath === "/") return pathname === "/";
      return pathname.startsWith(linkPath);
    },
    [pathname]
  );

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <nav className="p-[30px] bg-secondary h-full overflow-y-auto rounded-[10px] hidden-scrollbar">
      <Image
        src={"/images/logo.png"}
        alt="BioYap Admin"
        width={70}
        height={70}
      />
      <ul className="mt-10 flex flex-col gap-3">
        {navLinks.map((navLink, index) => {
          const isActive = isActiveRoute(navLink.path);

          return (
            <li key={index}>
              <Link
                href={navLink.path}
                className={`p-3 flex items-center gap-3 font-general-medium ${
                  isActive ? "bg-primary text-black" : " text-white"
                } hover:bg-primary hover:text-dark rounded-full cursor-pointer`}
              >
                {isActive ? navLink.iconSelected : navLink.icon}
                {navLink.title}
              </Link>
            </li>
          );
        })}

        <li>
          <button
            className={`p-3 w-full flex items-center gap-3 text-[#FF363A] font-general-medium rounded-xl cursor-pointer`}
            onClick={handleLogout}
          >
            <LogOut />
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
