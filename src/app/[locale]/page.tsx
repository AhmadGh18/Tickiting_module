"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "@/Components/authenticate/LoginForm";
import { useRouter } from "next/navigation";
import Loader from "@/common/loader/loader";


const HomePage = () => {
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
    <LoginForm />
  );
};

export default HomePage;
