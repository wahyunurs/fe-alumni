'use client';

import axios from "axios";
import { getToken } from '@/hooks/auth/authClient';
import { useEffect, useState } from "react";

type DashboardStatistics = {
    total_surveys: number;
    survey_counts_by_choice: SurveyChoice[];
    user_surveys_count: number;
    total_alumni_in_surveys: number;
    kepuasan_distribution: RatingDistribution[];
    kesesuaian_distribution: RatingDistribution[];
};

type SurveyChoice = {
    survei: string;
    count: number;
};

type RatingDistribution = {
    rating: number; // Rating (1-5)
    count: number; // Count of responses
};

export function useDashboardMitra() {
    const [statistics, setStatistics] = useState<DashboardStatistics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getDashboardMitra = async () => {
        const token = getToken();

        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboardMitra`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (data) setStatistics(data);
        } catch (err) {
            console.error("Error fetching statistics", err);
            setError("Failed to load dashboard statistics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardMitra();
    }, []);

    return { statistics, loading, error, getDashboardMitra };
}
