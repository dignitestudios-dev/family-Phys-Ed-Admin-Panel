"use client";
import { useState } from "react";
import api from "@/lib/services";
import { toast } from "react-hot-toast";
import { utils } from "@/lib/utils";
import { Notification } from "@/lib/types";

const useGetNotifications = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getNotifications = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await api.getNotifications(search, page);
      setNotifications(response?.data || []);
      const totalNotificationsPages = Math.ceil(
        response?.total / response?.per_page
      );
      setTotalPages(totalNotificationsPages || 1);
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

  const createNotification = async (payload: {
    title: string;
    description: string;
    date: string;
    time: string;
  }) => {
    setLoading(true);
    try {
      // Convert dateOfBirth from yyyy-mm-dd to mm-dd-yyyy if needed
      let formattedDOB = payload.date;
      if (/^\d{4}-\d{2}-\d{2}$/.test(payload.date)) {
        const [yyyy, mm, dd] = payload.date.split("-");
        formattedDOB = `${dd}-${mm}-${yyyy}`;
      }

      let formattedTime = `${payload.time}:00`

      const response = await api.createNotification({
        title: payload.title,
        body: payload.description,
        date: formattedDOB,
        time: formattedTime,
      });
      toast.success("New notification created");
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

const useDeleteNotification = () => {
  const [loading, setLoading] = useState(false);

  const deleteNotification = async (notificationId: string) => {
    setLoading(true);
    try {
      const response = await api.deleteNotification(notificationId);
      toast.success("Notification deleted");
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteNotification };
};

export const notificationHooks = {
  useGetNotifications,
  useCreateNotification,
  useDeleteNotification,
};
