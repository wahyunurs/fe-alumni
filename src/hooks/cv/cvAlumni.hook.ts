import axios from 'axios';
import { getToken } from '@/hooks/auth/authClient';

export function useCvAlumni(){
    const token = getToken();

    const getDataCvAlumni = async () => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cetakCvAlumni` , {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return data;
            
        } catch (error) {

            console.log("Error", error);
            
            throw new Error("Error get cetakCvAlumni");
        }
    }

    return { getDataCvAlumni };
}