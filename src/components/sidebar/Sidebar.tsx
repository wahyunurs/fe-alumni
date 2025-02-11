'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getMenu, MenuItem } from '@/constant/sidebar/sidebar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProfile } from "@/hooks/profile/alumni/useStore.hook";
import { logout, getUser } from '@/hooks/auth/authClient';
import { useRouter } from 'next/navigation';

export default function SidebarComponent() {
    const router = useRouter();
    const { data, getDataAlumni, getDataAdmin, getDataMitra} = useProfile();

    const onLogOut = async () => {
        try {
            await logout();
            router.replace('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const pathname = usePathname();
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [isCollapse, setIsCollapse] = useState(false);

    const fetchMenu = async () => {
        const menuItems = getMenu();
        setMenu(menuItems);
    };

    const basePath = process.env.NEXT_PUBLIC_BASEPATH;

    const handleMouseEnter = () => setIsCollapse(false);
    const handleMouseLeave = () => setIsCollapse(true);

    useEffect(() => {
        const fetchedUser = getUser();
        if (fetchedUser?.roles?.includes("alumni")) {
            getDataAlumni();
        } else if (fetchedUser?.roles?.includes("admin")) {
            getDataAdmin();
        }else if (fetchedUser?.roles?.includes("mitra")) {
            getDataMitra();
        }
        fetchMenu();
    }, []);

    return (
        <main className="hidden shrink-0 sm:flex">
            <div
                className={`sm:h-screen bg-white py-3 shrink-0 transition-all ease-in ${isCollapse ? 'w-17' : 'w-58'} overflow-y-scroll hide-scrollbar`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* logo STI */}
                <div className="mb-3 py-3 sm:flex items-center gap-x-2 justify-center px-4">
                    {isCollapse ? (
                        <Image src={`${basePath}/logo/sti-logo.png`} height={30} width={40} alt="Logo" />
                    ) : (
                        <Image src={`${basePath}/logo/logo-sti.png`} height={70} width={170} alt="Logo" />
                    )}
                </div>

                {/* logo profile */}
                {!isCollapse && (
                    <div className="mb-2 py-3 sm:flex sm:flex-col items-center justify-center px-4">
                        <img
                            alt="Photo Profile"
                            src={data?.foto_profil
                                ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/foto_profils/${data.foto_profil}`
                                : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/default_logo.png`}
                            className="w-32 h-32 rounded-full object-cover shadow-lg"
                        />
                        <div className="mt-3 text-center">
                            <span className="block text-sm font-semibold text-blueSTI">
                                {data?.email || "~"}
                            </span>
                        </div>
                    </div>
                )}

                {/* menu */}
                <div className={`sm:flex flex-col px-5 transition-all ease-in ${isCollapse ? 'mt-5' : 'mt-0'}`}>
                    {menu.map((item) => (
                        item.key === 'sign-out' ? (
                            <button
                                key={item.key}
                                onClick={onLogOut}
                                className="text-gray-400 flex items-center px-4 py-2 mb-2 transition-all ease-in h-10 hover:bg-blueSTI hover:text-white hover:rounded-md"
                            >
                                <item.icon className={`text-xl ${isCollapse ? 'mx-auto' : 'mr-2'}`} />
                                {!isCollapse && <p>{item.title}</p>}
                            </button>
                        ) : (
                            <Link
                                key={item.key}
                                href={item.path}
                                className={`text-gray-400 flex items-center px-4 py-2 mb-2 transition-all ease-in h-10 ${
                                    pathname === item.path
                                        ? 'rounded-md bg-orangeSTI text-white'
                                        : 'hover:bg-blueSTI hover:text-white hover:rounded-md'
                                }`}
                            >
                                <item.icon className={`text-xl ${isCollapse ? 'mx-auto' : 'mr-2'}`} />
                                {!isCollapse && <p>{item.title}</p>}
                            </Link>
                        )
                    ))}
                </div>
            </div>
            <div className="flex-1 sm:bg-blueSTI p-1"></div>
        </main>
    );
}
