const sessionStatusStyles: Record<string, string> = {
  upcoming: "bg-yellow-400/20 text-yellow-300",
  pending: "bg-[#F59E0B]/20 text-[#FCD34D]",
  completed: "bg-emerald-500/20 text-emerald-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export const formatSessionStatus = (status?: string | null) => {
  if (!status?.trim()) {
    return "Upcoming";
  }

  return status
    .toLowerCase()
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getSessionStatusBadgeClassName = (status?: string | null) => {
  const normalizedStatus = status?.trim().toLowerCase() || "upcoming";

  return (
    sessionStatusStyles[normalizedStatus] ?? "bg-blue-500/20 text-blue-300"
  );
};