"use client";

import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import VerifyCode from "./VerifyCode";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

interface ForgotPasswordProps {
  onClose: () => void;
}
interface ForgetPasswordResponse {
  message: string;
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [animateOut, setAnimateOut] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);
  const [backAnimating, setBackAnimating] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSend = async () => {
    if (userName.trim() === "") {
      toast.error("User name is required");
      return;
    }

    try {
      const response = await axios.get<ForgetPasswordResponse>(
        "https://posnew.smcare.net/v0_0_1-users/forget-password",
        {
          params: { userName },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setEmail(data.email);
        toast.success(data.message);
        setAnimateOut(true);
        setTimeout(() => {
          setIsSubmitted(true);
          setAnimateOut(false);
          setAnimateIn(true);
        }, 500);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(
          axiosError.response?.data.message || "An error occurred"
        );
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  const handleBack = () => {
    setBackAnimating(true);
    setAnimateIn(false);
    setAnimateOut(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setBackAnimating(false);
      setAnimateOut(false);
      setAnimateIn(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      {!isSubmitted ? (
        <div
          className={`bg-[#F4F4F4] rounded-lg p-8 shadow-lg z-10 relative w-full xl:w-[590px] lg:w-[590px] md:w-[500px]
              sm:w-[500px] h-auto ${
                animateOut
                  ? "animate-slideOutLeft"
                  : animateIn
                  ? "animate-slideInLeft"
                  : ""
              }`}
        >
          <button className="absolute left-5 top-5" onClick={onClose}>
            <FaWindowClose className="text-3xl text-[#1890FF] cursor-pointer" />
          </button>
          <div className="text-[#1890FF] font-bold text-[30px] text-center mt-2">
            Forget Password
          </div>
          <div className="flex justify-center items-center mt-3">
            <Image
              src={"/images/login/Group 11.svg"}
              alt="Forget Password Illustration"
              width={200}
              height={190}
            />
          </div>

          <div className="bg-white rounded-md mx-1 mt-5 flex flex-col space-y-5 justify-center items-center p-5">
            <div className="text-center text-[#606060] text-[15px] font-medium mx-5">
              We will send an email to the address associated with your account
              to help you reset your password.
            </div>

            <div className="relative rounded-md shadow-sm w-full mx-5">
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="block w-full text-black h-12 rounded-lg pl-16 pr-4 py-2 border border-[#AEAEAE] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FDC90E] focus:border-[#FDC90E] sm:text-sm"
                placeholder="Username"
              />
              <div className="absolute rounded-l-lg bg-[#1890FF] inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                <MdEmail className="text-white text-2xl" />
              </div>
            </div>
            <button
              type="button"
              onClick={handleSend}
              className="w-[80%] mx-10 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold bg-[#1890FF] hover:bg-[#e0b009] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDC90E]"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${
            backAnimating
              ? "animate-slideOutRight"
              : animateIn
              ? "animate-slideInRight"
              : ""
          }`}
        >
          <VerifyCode
            onBack={handleBack}
            email={email}
            userName={userName}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
