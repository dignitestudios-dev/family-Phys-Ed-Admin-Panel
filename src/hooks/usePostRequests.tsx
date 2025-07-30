"use client"
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useState } from "react";
import api from "../lib/services";
import { CommunityInterface, LoginInterface } from "../lib/types";
import { useRouter } from "next/navigation";
import { utils } from "@/lib/utils";

const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (payload: LoginInterface) => {
    setLoading(true);

    try {
      const { email, password } = payload;

      if (!email && !password) {
        toast.error("Email and password are required");
        return;
      } else if (!email) {
        toast.error("Email is required");
        return;
      } else if (!password) {
        toast.error("Password is required");
        return;
      }

      console.log("Login API goes");

      const data = await api.login(payload);
      console.log("here we go")
console.log(data)
      toast.success(data?.message);

      Cookies.set("token", data?.token);
      Cookies.set("admin", JSON.stringify(data?.admin_details.name));
      router.push("/");
    } catch (error: any) {
      console.log(error)
      utils.handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

const useToggleSuspendUser = () => {
  const [loading, setLoading] = useState(false);

  const toggleSuspendUser = async (
    id: string,
    suspendUser: boolean
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.suspendUser(id, suspendUser);
      toast.success(response?.message);

      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, toggleSuspendUser };
};

const useForgotPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (!email) {
        toast.error("Email is required");
        return false;
      }

      const response = await api.forgotPassword(email);
      Cookies.set("email", email);
      toast.success(response?.message);
      router.push("/verification");
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, forgotPassword };
};

const useApproveCoach = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleApproveCoach = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
    

      const response = await api.approveCoach(id  );
    
      toast.success(response?.message);
   router.push("/requests");
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, toggleApproveCoach };
};


const useRejectCoach = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleRejectCoach = async (id: string , reason:string): Promise<boolean> => {
    setLoading(true);
    try {
    

      const response = await api.rejectCoach(id ,reason );
    
      toast.success(response?.message);
      router.push("/requests");
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, toggleRejectCoach };
};

const useApproveCoachProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleApproveCoachProduct = async (id: string ): Promise<boolean> => {
    setLoading(true);
    try {
    

      const response = await api.approveCoachProduct(id );
    
      toast.success(response?.message);
      router.push("/requests");
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, toggleApproveCoachProduct };
};


const useVerifyOtp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (otp: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (!otp || otp.length !== 6) router.push("/reset-password");

      const email = Cookies.get("email");
      if (!email) {
        toast.error("Credentials error");
        router.push("/forgot-password");
        return false;
      }

      const response = await api.verifyOtp(otp, email);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, verifyOtp };
};

const useResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const resetPassword = async (
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      if (!password && !confirmPassword) {
        toast.error("All are required fields");
        return false;
      } else if (!password) {
        toast.error("New password field is required");
        return false;
      } else if (!confirmPassword) {
        toast.error("Re-enter password field is required");
        return false;
      }

      if (password !== confirmPassword) {
        toast.error("Password and confirm password must be same");
        return false;
      }

      const email = Cookies.get("email");
      if (!email) {
        toast.error("Credentials error");
        router.push("/forgot-password");
        return false;
      }

      const response = await api.resetPassword(
        email,
        password,
        confirmPassword
      );
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

const useCreateCommunity = () => {
  const [loading, setLoading] = useState(false);

  const createCommunity = async (
    title: string,
    description: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      if (!title) {
        toast.error("Community name is required");
        return false;
      }
      if (!description) {
        toast.error("Community description is required");
        return false;
      }

      const response = await api.createCommunity(title, description);
      toast.success(response?.message);
      return true;
    } catch (error) {
      utils.handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createCommunity };
};

export const postHooks = {
  useLogin,
  useToggleSuspendUser,
  useRejectCoach,
  useApproveCoach,
  useForgotPassword,
  useVerifyOtp,
  useResetPassword,
  useCreateCommunity,
  useApproveCoachProduct
};
