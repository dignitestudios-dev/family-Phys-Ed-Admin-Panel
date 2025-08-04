// all utility/helper funtions
import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a date string to relative time (now, secs/mins/hours ago, or mm/dd/yyyy)
function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) return formatDate(dateStr); // Future date fallback

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffSec < 1) return "now";
  if (diffSec < 60) return `${diffSec} secs ago`;
  if (diffMin < 60) return `${diffMin} mins ago`;
  if (diffHour < 24) return `${diffHour} hours ago`;
  // After 23:59, show date in mm/dd/yyyy
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTimeTo12Hour(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const truncateText = (
  text: string,
  length: number,
  from: "start" | "end" = "start"
) => {
  if (text.length <= length) return text;

  if (from === "start") return `${text.slice(0, length)}...`;
  else if (from === "end") return `...${text.slice(-length)}`;
};

const toTitleCase = (str: string): string => {
  return str
    ?.toLowerCase()
    ?.split(/\s|-/) // Split on spaces or hyphens
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
};

const handleError = (error: any) =>
  toast.error(
    error?.response?.data?.message || error?.message || "Something went wrong."
  );

const getYear = (dateString: string) => new Date(dateString).getUTCFullYear();

// Get the actual time in 12-hour format with AM/PM or 24-hour format
const formatChatTime = (
  dateInput: string | number | Date,
  is24Hour: boolean = false
): string => {
  const date = new Date(dateInput);

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (is24Hour) {
    // 24-hour format (HH:mm)
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  } else {
    // 12-hour format (hh:mm AM/PM)
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12; // Converts 0-23 hour to 12-hour format
    return `${String(adjustedHours).padStart(2, "0")}:${minutes} ${period}`;
  }
};

export const utils = {
  cn,
  formatDate,
  formatTimeTo12Hour,
  truncateText,
  toTitleCase,
  handleError,
  getYear,
  formatRelativeTime,
  formatChatTime,
};
