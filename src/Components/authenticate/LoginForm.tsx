"use client";
import React, { useState, useEffect } from "react";
import { IoMdLock, IoMdEyeOff, IoMdEye } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import ForgotPassword from "./ForgetPassword";
import Image from "next/image";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import * as cookie from "cookie";
import defaultProf from '../../../public/defaultprof.png';
import person from '../../../public/Frame 6.png';
import group from '../../../public/Group 2.png';
import LanguageDropdown from "./LanguageDropdown";

// import qs from "qs"

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [locale, setLocale] = useState("en");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    useEffect(() => {
        if (typeof window !== "undefined" && document.cookie) {
            try {
                const cookies = cookie.parse(document.cookie);
                setLocale(cookies["NEXT_LOCALE"] || "en");
            } catch (error) {
                console.error("Error parsing cookies:", error);
            }
        }
    }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userName) {
            toast.error("Username is require");
            return;
        }

        if (!password) {
            toast.error("Password is required");
            return;
        }

        setLoading(true); // Start loading

        try {
            // Make the API request to log in
            const response = await axios.post('https://posnew.smcare.net/v0_0_1-users/login', {
                userName,
                password,
                fcmToken: "x",
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.status !== 200) {
                toast.error(response.data.message);
                throw new Error('Login failed');
            }

            const data = response.data;
            // Save the token in local storage
            localStorage.setItem("token", data.accessToken);
            const nameParts = data.name.split(" ");
            const userState = {
                id: data.id,
                firstName: nameParts[0], // First part of the name
                lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "", // Remaining parts as last name
                image: data.image || defaultProf, // Use the image if available, otherwise use the default image
                role: data.role || 'user', // Use the image if available, otherwise use the default image
                birthday: data.birthday || '12/12/2004', // Use the image if available, otherwise use the default image
                email: data.email || 'example@gmail.com', // Use the image if available, otherwise use the default image
                phoneNumber: data.phoneNumber || '70123123', // Use the image if available, otherwise use the default image
            };
            localStorage.setItem("userState", JSON.stringify(userState));
            // Store the access token
            if (rememberMe) {
                localStorage.setItem('accessToken', data.accessToken);
            } else {
                sessionStorage.setItem('accessToken', data.accessToken);
            }

            toast.success("Login successful");
            // Redirect directly after successful login
            setLoading(false); // Stop loading before redirecting
            router.push(`/${locale}/brainspace/home`);

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Check if the error is an Axios error
                const errorMessage = error.response?.data?.message || "An error occurred";
                toast.error(errorMessage);
            } else if (error instanceof Error && error.message === 'Login failed') {
                // Handle specific 'Login failed' error
                toast.error("Wrong Credentials");
            } else {
                // Handle any other unexpected error
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred");
            }
            setLoading(false); // Stop loading in case of an error
        }
    };


    const handleForgotPassword = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: "url('/8 1.png')" }}
        >
            <ToastContainer />

            <div className="shadow-lg w-full max-w-md mx-auto h-450 relative flex flex-col items-center justify-center rounded-md">
                <div
                    className=" bg-transparent h-[180px] rounded-t-xl w-full max-w-md flex flex-col justify-center items-center relative">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-4xl font-semibold mb-4 text-white">
                            Brain Space
                        </h2>
                        <h2
                            className="text-4xl font-semibold text-white -mt-6 transform rotate-180"
                            style={{
                                transform: 'scaleY(-1)',
                                opacity: 0.25,
                                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Brain Space
                        </h2>
                    </div>
                    <Image
                        src={group}
                        alt="Description"
                        className="absolute bottom-6 right-4 object-contain"
                    />
                </div>

                <form className="w-full space-y-6 px-10 pt-5 pb-10 bg-white bg-opacity-80" onSubmit={handleSubmit}>
                    <div>
                        <div className="w-full flex justify-center mb-5">
                            <LanguageDropdown />
                        </div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                className="block text-black w-full h-12 rounded-lg pl-16 pr-3 py-2 border border-[#AEAEAE] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FDC90E] focus:border-[#FDC90E] sm:text-sm"
                                placeholder="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                            >
                                <Image
                                    alt="message"
                                    src={person}
                                    width={10}
                                    height={24}
                                    className="h-4 w-4"
                                />
                            </div>
                            <div className="absolute rounded-l-lg bg-[#B6B6B6] inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                                <MdEmail className="text-white text-2xl" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="block text-black w-full h-12 rounded-lg pl-16 pr-10 py-2 border border-[#AEAEAE] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FDC90E] focus:border-[#FDC90E] sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="absolute rounded-l-lg bg-[#B6B6B6] inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                                <IoMdLock className="text-white text-2xl" />
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <IoMdEyeOff className="text-xl text-[#AEAEAE]" />
                                ) : (
                                    <IoMdEye className="text-xl text-[#AEAEAE]" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                className="h-4 w-4 border-[#999999] rounded"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block font-medium text-sm text-[#999999]"
                            >
                                Remember Me
                            </label>
                        </div>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="text-sm text-[#1890FF] transition duration-200"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
              shadow-sm text-md font-semibold text-white bg-[#1890FF] hover:shadow-md hover:shadow-gray-400"
                        >
                            {loading ? (
                                <BeatLoader color="black" size={8} />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {showModal && <ForgotPassword onClose={closeModal} />}
        </div>

    );
};

export default LoginForm;
