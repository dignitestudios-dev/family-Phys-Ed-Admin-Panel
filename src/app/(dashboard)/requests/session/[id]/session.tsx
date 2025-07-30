"use client";

import SessionDetail from "@/components/session/session-detail";
import { getHooks } from "@/hooks/useGetRequests";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BaseSession {
  session_id: number;
  title: string;
  activity: string;
  session_type: string;
  number_of_slots: number;
  amount: string;
  distance: string;
  date: string;
  duration: string;
  description: string;
  status: string | null;
  lat: number;
  long: number;
  city: string;
  state: string;
  location: string;
  available_slots: number;
  booked_slots: number;
  booking_users: any[];
  banner_images: string[];
  use_external_address: boolean | null;
  deleted_at: string | null;
  started_at: string | null;
  ended_at: string | null;
  payment_method_id: string | number | null;
  cancelled_booking_users: any[];
}

interface PublicSession extends BaseSession {}

interface PrivateSession extends BaseSession {
  request_id: number;
  requested_user: {
    id: number;
    uid: string;
    name: string;
    avatar: string;
  };
}

function Session() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // 'public' | 'private' | 'custom'
  const coachId = searchParams.get("coach_id");

  const [sessionData, setSessionData] = useState<PublicSession | PrivateSession| null>(null);

  const { data: publicData, getPublicSessionById } = getHooks.useGetPublicSessionDetails();
  const { data: privateData, getRequestSessionById } = getHooks.useGetReqSessionDetails();

  useEffect(() => {
    if (!id || !type) return;

    if (type === "public") {
      getPublicSessionById( coachId!,id as string ,);
    } else if (type === "private" || type === "custom") {
      if (coachId) getRequestSessionById( coachId,id as string);
    }
  }, [id, type, coachId]);

  useEffect(() => {
    if (type === "public" && publicData) {
      setSessionData(publicData);
    } else if ((type === "private" || type === "custom") && privateData) {
      setSessionData(privateData);
    }
  }, [publicData, privateData, type]);

  return (
    <div>
      {sessionData ? (
        <SessionDetail data={sessionData as any} />
      ) : (
        <p className="p-4 text-gray-500">Loading session details...</p>
      )}
    </div>
  );
}

export default Session;
