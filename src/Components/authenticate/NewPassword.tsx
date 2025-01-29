"use client";
import React, { useState } from 'react';
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Image from 'next/image';
import { IoMdLock, IoMdEyeOff, IoMdEye } from "react-icons/io";
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface NewPasswordProps {
    onBack: () => void;
    code: string;
    userName: string;
    onClose: () => void;
}

const NewPassword: React.FC<NewPasswordProps> = ({ onBack, code, userName, onClose }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    return (
        <div className="bg-[#F4F4F4] rounded-lg p-8 shadow-lg z-10 relative xl:w-[590px] lg:w-[590px] md:w-[500px]
         sm:w-[500px] h-auto animate-slideInRight text-black">
            <div>
                <button className="absolute left-5 top-5" onClick={onBack}>
                    <BsFillArrowLeftSquareFill className='text-3xl cursor-pointer' />
                </button>
                <div className='text-[#FDC90E] font-bold text-[30px] text-center -mt-4'>New Password</div>

                <div className='flex justify-center items-center mt-3'>
                    <Image
                        src={"/images/forgetpassword.png"}
                        alt="Forget Password"
                        width={200}
                        height={190}
                    />
                </div>
            </div>

            <Formik
                initialValues={{ password: '', confirmPassowrd: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const response = await axios.post('https://posnew.smcare.net/v0_0_1-users/reset-password', {
                            userName: userName,
                            code: code,
                            password: values.password,
                        }, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        });

                        const data = response.data;

                        if ('message' in data) {
                            if (data.message === 'Password has been reset') {
                                toast.success(data.message);
                                onClose();
                            } else {
                                toast.error(data.message);
                            }
                        } else {
                            toast.error('Unexpected error');
                        }
                    } catch (error) {
                        toast.error('Failed to reset password. Please try again.');
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='bg-white rounded-md mx-1 mt-5 flex flex-col justify-center items-center p-5'>
                        <div className='text-center text-[#606060] text-[15px] font-medium mx-5'>
                            Please enter your new password.
                        </div>

                        <div className="mt-7 relative rounded-md shadow-sm w-full mx-5 ">
                            <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="block w-full h-12 rounded-lg pl-16 pr-10 py-2 border border-[#AEAEAE] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FDC90E] focus:border-[#FDC90E] sm:text-sm"
                                placeholder="New Password"
                            />
                            <div className="absolute rounded-l-lg bg-[#FDC90E] inset-y-0 left-0 px-4
              flex items-center pointer-events-none">
                                <IoMdLock className='text-white text-2xl' />
                            </div>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <IoMdEyeOff className="text-xl text-[#AEAEAE]" /> : <IoMdEye className="text-xl text-[#AEAEAE]" />}
                            </div>

                        </div>
                        <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1 text-left w-full" />

                        <div className="mt-7 relative rounded-md shadow-sm w-full mx-5">
                            <Field
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                className="block w-full h-12 rounded-lg pl-16 pr-10 py-2 border border-[#AEAEAE] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FDC90E] focus:border-[#FDC90E] sm:text-sm"
                                placeholder="Confirm Password"
                            />
                            <div className="absolute rounded-l-lg bg-[#FDC90E] inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                                <IoMdLock className='text-white text-2xl' />
                            </div>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <IoMdEyeOff className="text-xl text-[#AEAEAE]" /> : <IoMdEye className="text-xl text-[#AEAEAE]" />}
                            </div>

                        </div>
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1 text-left w/full" />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-7 w-[80%] mx-10 flex justify-center py-2 px-4 border border-transparent rounded-lg
              shadow-sm text-sm font-semibold bg-[#FDC90E] hover:bg-[#e0b009] focus:outline-none focus:ring-2
               focus:ring-offset-2 focus:ring-[#FDC90E]"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Now'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewPassword;
