import axios from "axios";
import { useState } from "react";
import { getToken } from '@/hooks/auth/authClient';

interface Interest {
    id: number;
    user_id: number;
    interest_id: string;
    created_at: string;
    updated_at: string;
    name: string; // We need the name field, as it's coming from the controller
}

interface Pagination {
    currentPage: number;
    lastPage: number;
}

interface Filter {
    limit?: number;
    currentPage?: number;
}

export function useInterest() {
    const token = getToken();

    const [data, setData] = useState<Interest[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

    // Fetch the logged-in user's interests
    const getInterests = async (filter?: Filter) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/interestAlumni`, {
                params: {
                    page: filter?.currentPage ? filter.currentPage : pagination.currentPage,
                },
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.data && response.data.data) {
                const interests = response.data.data;

                // Map the interest data to include the interest names
                const mappedData = interests.map((item: any) => ({
                    ...item,
                    name: item.name, // Map name from the response
                }));
                
                setData(mappedData);

                if (response.data.last_page) {
                    setPagination({ ...pagination, lastPage: response.data.last_page });
                }
            }

        } catch (error) {
            console.log("Error fetching interests:", error);
            setError("Error fetching interests");
            throw new Error("Error fetching interests");
        }
    };

    // Update or create interests for the logged-in user
    const storeOrUpdateInterests = async (interests: string[]): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/interestAlumni`, { interests }, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.data) {
                setSuccess("Interests updated successfully");
                setData(response.data.data); // Assuming response contains the updated interests with names
            }

        } catch (error) {
            console.log("Error updating interests:", error);
            setError("Error updating interests");
            throw new Error("Error updating interests");
        }
    };

    return {
        data,
        error,
        success,
        pagination,
        getInterests,
        storeOrUpdateInterests,
    };
}
