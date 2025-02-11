'use client';

import axios from 'axios';
import { useState } from 'react';
import { getToken } from '@/hooks/auth/authClient';

type Pagination = {
  currentPage: number;
  lastPage: number;
};

type Filter = {
  query?: string; // Untuk search
  limit?: number;
  currentPage?: number;
};

type surveiPenggunaLulusan = {
  no: number;
  id: number;
  user_id: number;
  name: string;
  name_alumni: string;
  kedisiplinan: string;
  kejujuran: string;
  motivasi: string;
  etos: string;
  moral: string;
  etika: string;
  bidang_ilmu: string;
  produktif: string;
  masalah: string;
  inisiatif: string;
  menulis_asing: string;
  komunikasi_asing: string;
  memahami_asing: string;
  alat_teknologi: string;
  adaptasi_teknologi: string;
  penggunaan_teknologi: string;
  emosi: string;
  percaya_diri: string;
  keterbukaan: string;
  kom_lisan: string;
  kom_tulisan: string;
  kepemimpinan: string;
  manajerial: string;
  masalah_kerja: string;
  motivasi_tempat_kerja: string;
  motivasi_diri: string;
  created_at: Date;
  updated_at: Date;
};

export function useSurveiPenggunaLulusan() {
  const token = getToken();
  const [data, setData] = useState<surveiPenggunaLulusan[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 1 });

  const index = async (filter?: Filter): Promise<surveiPenggunaLulusan[] | undefined> => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/surveiMitra`, {
        params: {
          page: filter?.currentPage ? filter.currentPage : pagination.currentPage,
        },
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (Array.isArray(data.data)) setData(data.data);
      if (data.last_page) setPagination({ ...pagination, lastPage: data.last_page });
      return data.data;

    } catch (error) {
      console.log("Error fetching survei pengguna lulusan index:", error);
      throw new Error('Error fetching survei pengguna lulusan index');
    }
  };

  const search = async (query: string): Promise<surveiPenggunaLulusan[] | undefined> => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/surveiSearch`, {
        params: { query },
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      return data;

    } catch (error) {
      console.log("Error searching alumni:", error);
      throw new Error('Error searching alumni');
    }
  };

  const show = async (uuid: string): Promise<surveiPenggunaLulusan | undefined> => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/surveiMitra/${uuid}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      return data;
    } catch (error) {
      console.log("Error fetching survei pengguna lulusan details:", error);
      throw new Error('Error fetching survei pengguna lulusan details');
    }
  };

  const post = async (formData: FormData | URLSearchParams): Promise<surveiPenggunaLulusan | undefined> => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/surveiMitra`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      return data;
    } catch (error) {
      console.log("Error storing survei pengguna lulusan:", error);
      throw new Error('Error storing survei pengguna lulusan');
    }
  };

  const update = async (uuid: string, formData: FormData | URLSearchParams): Promise<surveiPenggunaLulusan | undefined> => {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/surveiMitra/${uuid}`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      return data;

    } catch (error) {
      console.error('Error updating survei pengguna lulusan:', error);
      throw new Error('Error updating survei pengguna lulusan');
    }
  };

  const remove = async (uuid: string): Promise<boolean> => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/surveiMitra/${uuid}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      return true;

    } catch (error) {
      console.error('Error deleting survei pengguna lulusan:', error);
      throw new Error('Error deleting survei pengguna lulusan');
    }
  };

  return { data, pagination, index, search, show, post, update, remove };
}
