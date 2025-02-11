import axios from "axios";
import { useState } from "react";

type ForgotPassword = {
    email?: string;
    message?: string;
}

export const useForgotPassword = () => {

    const [isOtpSend, setIsOtpSend] = useState<boolean>(false);
    const [isVerified, setIsVerifed] = useState<boolean>(true);

    const sendOtp  = async (formData: FormData): Promise< void | undefined | unknown> => {

        try {
            
            const { data } = await axios.post<ForgotPassword>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/forgot-password`, formData);

            setIsOtpSend(true);
            
            return data;
            
        } catch (error) {

            console.log("Error", error);

            throw new Error();
        }
    
    }

    const verifyOtp  = async (formData: FormData): Promise< void | undefined | unknown> => {

        try {
            
            const { data } = await axios.post<ForgotPassword>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/verify-otp-password`, formData);

            setIsVerifed(true);
            
            return data;

        } catch (error) {

            console.log("Error", error);

            throw new Error();

        }
    
    }

    const resetPassword  = async (formData: FormData): Promise< void | undefined | unknown> => {

        try {
            
            const { data } = await axios.post<ForgotPassword>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reset-password`, formData);

            return data;

        } catch (error) {

            console.log("Error", error);

            throw new Error();

        }
    
    }

    return { sendOtp, verifyOtp, resetPassword, isOtpSend, isVerified };
}


