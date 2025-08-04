"use client";

import React, { useEffect, useMemo, useState } from "react";

import UserDetails from "./UserDetails";
import CoachDetails from "./CoachDetail";
import { useSearchParams } from "next/navigation";

const Details = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  return <>{role == "user" ? <UserDetails /> : <CoachDetails />}</>;
};

export default Details;
