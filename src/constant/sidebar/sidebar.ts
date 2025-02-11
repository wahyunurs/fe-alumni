import { HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiHome, HiAcademicCap, HiBadgeCheck, HiOutlineNewspaper, HiOutlineClipboardList, HiBriefcase, HiOutlineBriefcase, HiFolderDownload } from 'react-icons/hi';
import { IconType } from 'react-icons';
import { getUser } from '@/hooks/auth/authClient';
import { HiUserCircle } from "react-icons/hi";
import { HiIdentification } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { signOut } from 'next-auth/react';
import { HiBuildingOffice2 } from 'react-icons/hi2';

export interface MenuItem {
    key: string;
    title: string;
    path: string;
    icon: IconType;
    condition?: boolean;
}

export function getMenu(): MenuItem[] {

    const onLogOut = async () => {
        try {
            await signOut(); // Atau panggil fungsi logout yang relevan
            console.log('User logged out');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const user = getUser();

    const roleAlumni: boolean | undefined = user?.roles?.includes('alumni');
    const roleAdmin: boolean | undefined = user?.roles?.includes('admin');
    const roleMahasiswa: boolean | undefined = user?.roles?.includes('mahasiswa');
    const roleMitra: boolean | undefined = user?.roles?.includes('mitra');


    const menu = [
        {
            key: 'dashboard',
            title: "Dashboard",
            path: '/dashboard',
            icon: HiHome,  
            condition: roleAlumni || roleAdmin || roleMahasiswa || roleMitra ,
        },
        {
            key: 'statistic',
            title: "Statistic",
            path: '/dashboard/statistic',
            icon: HiChartPie,
            condition: roleAdmin,
        },
        {
            key: 'tracerStudy',
            title: "Tracer Study",
            path: '/dashboard/tracer-study',
            icon: HiInbox,
            condition: roleAdmin,
        },
        {
            key: 'masaTunggu',
            title: "Masa Tunggu",
            path: '/dashboard/masa-tunggu-alumni',
            icon: HiBadgeCheck,
            condition: roleAdmin,
        },
        {
            key: 'alumni',
            title: "Data CV",
            path: '/dashboard/alumni',
            icon: HiShoppingBag,
            condition: roleAlumni || roleMahasiswa,
        },        
        {
            key: 'dataAlumni',
            title: "Data Alumni",
            path: '/dashboard/data-alumni',
            icon: HiIdentification,
            condition: roleAdmin || roleMitra,
        },
        {
            key: 'surveiPenggunaLulusan',
            title: "Survei Pengguna Alumni",
            path: '/dashboard/survei-pengguna-lulusan',
            icon: HiOutlineClipboardList,
            condition: roleMitra,
        },
        {
            key: 'surveiMitra',
            title: "Survei Mitra Pengguna Alumni",
            path: '/dashboard/survei-mitra',
            icon: HiOutlineClipboardList,
            condition: roleAdmin ,
        },
        {
            key: 'dataMitra',
            title: "Data Mitra Pengguna Alumni",
            path: '/dashboard/data-mitra',
            icon: HiBuildingOffice2,
            condition: roleAdmin ,
        },
        {
            key: 'loker',
            title: "Lowongan Kerja",
            path: '/dashboard/loker',
            icon: HiBriefcase,
            condition: roleAlumni || roleAdmin || roleMitra,
        },
        {
            key: 'logang',
            title: "Lowongan Magang",
            path: '/dashboard/logang',
            icon: HiOutlineBriefcase,
            condition: roleAlumni || roleAdmin || roleMahasiswa,
        },
        {
            key: 'import',
            title: "Import",
            path: '/dashboard/import',
            icon: HiFolderDownload,
            condition: roleAdmin,
        },
        {
            key: 'announcement',
            title: "Pengumuman",
            path: '/dashboard/announcement',
            icon: HiOutlineNewspaper,
            condition: roleAdmin ,
        },        
        {
            key: 'profile',
            title: "Profile",
            path: '/dashboard/profile',
            icon: HiUserCircle,  
            condition: roleAlumni || roleAdmin || roleMahasiswa || roleMitra ,
        },
        {
            key: 'sign-out',
            title: "Sign Out",
            path: '#',
            icon: IoLogOut , 
            condition: true, // Selalu muncul untuk semua role
            onClick: onLogOut, // Fungsi untuk log out
        },
    ];

    const filterMenu = menu.filter((item) => item.condition);

    return filterMenu;
}
