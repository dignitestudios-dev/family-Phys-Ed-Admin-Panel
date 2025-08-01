import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/lib/services";
import { utils } from "@/lib/utils";
import {
  CreateNotificationInterface,
  NotificationInterface,
} from "@/lib/types";

const useGetNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const getNotifications = async (
    search: string = "",
    page?: number,
    limit?: number
  ): Promise<void> => {
    setLoading(true);
    try {
      // Static array of NotificationInterface objects
      const staticNotifications: NotificationInterface[] = [
        {
          _id: "1",
          title: "Welcome Notification",
          description: "Welcome to the platform!",
          date: "2024-06-01",
          time: "09:00",
          scheduledTime: "2024-06-01T09:00:00.000Z",
          isSent: true,
          type: "info",
          image: null,
          byAdmin: true,
          receivers: ["user1", "user2"],
          createdAt: "2024-06-01T08:00:00.000Z",
          updatedAt: "2024-06-01T08:00:00.000Z",
        },
        {
          _id: "2",
          title: "System Update",
          description: "System will be down for maintenance.",
          date: "2024-06-05",
          time: "22:00",
          scheduledTime: "2024-06-05T22:00:00.000Z",
          isSent: false,
          type: "alert",
          image: null,
          byAdmin: true,
          receivers: ["user3"],
          createdAt: "2024-06-02T10:00:00.000Z",
          updatedAt: "2024-06-02T10:00:00.000Z",
        },
      ];

      // const response = await api.getAllNotifications(search, page, limit);
      setNotifications(staticNotifications);
      // setTotalPages(response.pagination.totalPages || 1);
      setTotalPages(1);
    } catch (error) {
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, notifications, totalPages, getNotifications };
};

const useCreateNotification = () => {
  const [loading, setLoading] = useState(false);

  const createNotification = async (
    data: CreateNotificationInterface
  ): Promise<boolean> => {
    setLoading(true);
    try {
      // Combine into a single datetime string in local time
      const localDateTime = new Date(`${data.date}T${data.time}`);

      // Convert to UTC string
      const scheduledTime = localDateTime.toISOString();

      const response = await api.createNotification({
        ...data,
        scheduledTime,
      });
      toast.success(response.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createNotification };
};

export const notificationHooks = {
  useGetNotifications,
  useCreateNotification,
};
