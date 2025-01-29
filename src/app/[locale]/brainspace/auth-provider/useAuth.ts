"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import baseApi from "./baseApi";

export const useAuth = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state to handle async token check
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token') || sessionStorage.getItem('accessToken');
        if (storedToken) {
            validateToken(storedToken).then(isValid => {
                if (isValid) {
                    setAccessToken(storedToken);
                } else {
                    handleInvalidToken(); // Handle invalid token
                }
                setLoading(false);
            });
        } else {
            setIsLoginModalOpen(true); // Open the login modal if not authenticated
            setLoading(false);
        }
    }, []); // Runs only once after the initial render

    const validateToken = async (token: string): Promise<boolean> => {
        try {
            // Replace with your API call to validate the token
            const response = await baseApi.get('/validate-token', {
                params: {
                    token
                },
                headers: {
                    Authorization: token,
                    Language: 'en',
                },
            });
            return response.data;
        } catch {
            return false;
        }
    };

    const handleInvalidToken = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('accessToken');
        setAccessToken(null);
        router.push('/'); 
    };

    const closeModal = () => {
        setIsLoginModalOpen(false);
    };

    return { accessToken, isLoginModalOpen, closeModal, loading };
};
