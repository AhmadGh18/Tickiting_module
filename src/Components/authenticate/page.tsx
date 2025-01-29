"use client";
import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { ToastContainer } from 'react-toastify';
import { useRouter } from "next/navigation";
import Loader from '@/common/loader/loader';

const LoginPage: React.FC = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true); // State to handle page rendering

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/en/brainspace/home"); // Redirect immediately
        } else {
            setLoading(false); // Allow the page to render if no token
        }
    }, []);

    if (loading) {
        // Don't render the page while checking the token
        return <Loader />;
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#F4F4F4]">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/login/8 1.png')" }}
            >
            </div>
            <div className="relative lg:w-1/3 z-10">
                <LoginForm />
                <ToastContainer />
            </div>
        </div>
    );
};

export default LoginPage;
