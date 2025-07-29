"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import BackArrow from "@/components/icons/BackArrow";
import Delete from "@/components/icons/Delete";
import BButton from "@/components/BButton";
import Badge from "@/components/icons/Badge";
import Phone from "@/components/icons/Phone";
import Location from "@/components/icons/Location";
import BTab from "@/components/BTab";
import Posts from "@/components/Posts";
import Followers from "@/components/Followers";
import Following from "@/components/Following";
import BasicInfo from "@/components/BasicInfo";
import DangerPopup from "@/components/DangerPopup";
import { getHooks } from "@/hooks/useGetRequests";
import PageLoader from "@/components/PageLoader";
import { postHooks } from "@/hooks/usePostRequests";
import { deleteHooks } from "@/hooks/useDeleteRequests";
import Image from "next/image";
import UserDetails from "./UserDetails";
import CoachDetails from "./CoachDetail";



const Details = () => {
    const searchParams = useSearchParams()
const role = searchParams.get("role")

 return (
    <>
    {
        role == "user" ? <UserDetails/> : <CoachDetails/>
    }</>
 )
};

export default Details;
