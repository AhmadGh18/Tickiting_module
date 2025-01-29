
"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Image from 'next/image';
import NewPassword from './NewPassword';
import { toast } from 'react-toastify';
import axios from "axios";

interface VerifyCodeProps {
    onBack: () => void;
    email: string;
    userName: string;
    onClose: () => void;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ onBack, email, userName, onClose }) => {
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [animateOut, setAnimateOut] = useState<boolean>(false);
    const [animateIn, setAnimateIn] = useState<boolean>(false);
    const [backAnimating, setBackAnimating] = useState<boolean>(false);
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

    useEffect(() => {
        const firstInput = document.getElementById('otp-0') as HTMLInputElement;
        firstInput?.focus();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value.length === 1 && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
            nextInput?.focus();
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');

        if (otp.some(input => input.trim() === '')) {
            toast.error('Code is required');
            return;
        }

        try {
            const response = await axios.get('https://posnew.smcare.net/v0_0_1-users/verify-code', {
                params: {
                    userName,
                    code,
                },
            });

            const data = response.data;

            if (data.message === 'Verified') {
                toast.success('Code verified successfully!');
                setAnimateOut(true);
                setTimeout(() => {
                    setIsVerified(true);
                    setAnimateOut(false);
                    setAnimateIn(true);
                }, 500);
            } else {
                toast.error(data.message || 'Verification failed.');
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message || 'Verification failed.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    const handleBackFromNewPassword = () => {
        setBackAnimating(true);
        setAnimateIn(false);
        setAnimateOut(true);
        setTimeout(() => {
            setIsVerified(false);
            setBackAnimating(false);
            setAnimateOut(false);
            setAnimateIn(true);
        }, 500);
    };

    const formatEmail = (email: string) => {
        const [localPart, domain] = email.split('@');
        if (localPart.length > 3) {
            const firstThree = localPart.slice(0, 3);
            return `${firstThree}...@${domain}`;
        }
        return email;
    };

    const formattedEmail = formatEmail(email);

    return !isVerified ? (
        <div className={`bg-[#F4F4F4] rounded-lg p-8 shadow-lg z-10 relative xl:w-[590px] lg:w-[590px] md:w-[500px]
         sm:w-[500px] h-auto ${animateOut ? 'animate-slideOutLeft' : animateIn ? 'animate-slideInLeft' : ''}`}>
            <div>
                <button className="absolute left-5 top-5" onClick={onBack}>
                    <BsFillArrowLeftSquareFill className='text-3xl text-[#1890FF] cursor-pointer' />
                </button>
                <div className='text-[#1890FF] font-bold text-[30px] text-center -mt-4'>Verify Code</div>
            </div>
            <div className='flex justify-center items-center mt-3'>
                <Image
                    src={"/images/login/Group 11.svg"}
                    alt="verifyImage"
                    width={200}
                    height={190}
                />
            </div>
            <div className='bg-white rounded-md mx-1 mt-5 flex flex-col space-y-7 justify-center items-center p-5'>
                <div className='text-center text-[#606060] text-[15px] font-medium mx-5'>
                    We have sent a verification code to <strong>{formattedEmail}</strong>. Please enter it below to continue.
                </div>
                <div className="flex space-x-2">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            maxLength={1}
                            className="w-12 h-12 text-black border border-[#AEAEAE] rounded-lg text-center text-xl focus:outline-none focus:ring-1 focus:ring-[#FDC90E]"
                        />
                    ))}
                </div>
                <button
                    type="button"
                    onClick={handleVerify}
                    className="w-[80%] mx-10 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold bg-[#1890FF] hover:bg-[#e0b009] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDC90E]"
                >
                    Verify
                </button>
            </div>
        </div>
    ) : (
        <div className={`${backAnimating ? 'animate-slideOutRight' : animateIn ? 'animate-slideInRight' : ''}`}>
            <NewPassword onBack={handleBackFromNewPassword} code={otp.join('')} userName={userName} onClose={onClose} />
        </div>
    );
};

export default VerifyCode;
