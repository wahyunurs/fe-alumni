"use client";

import { Avatar, Dropdown } from "flowbite-react";
import { getMenu } from '@/constant/sidebar/sidebar';
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from 'next/navigation'
import { logout, getUser } from '@/hooks/auth/authClient';
import { useEffect } from "react";
import { useProfile } from "@/hooks/profile/alumni/useStore.hook";
import Image from 'next/image';
import Link from "next/link";


export default function Navigationbar(){

    const menu = getMenu();
    const router = useRouter();
    // const user = getUser();
    const { data, getDataAlumni, getDataAdmin } = useProfile();

    useEffect(() => {
        const fetchedUser = getUser();

        if (fetchedUser) {
            if (fetchedUser.roles?.includes("alumni")) {
                getDataAlumni();
            } else if (fetchedUser.roles?.includes("admin")) {
                getDataAdmin();
            } 
        }
    }, []);

    const onLogOut = async () => {
        await logout();
        router.replace("/");

        return
    }

    const basePath = process.env.NEXT_PUBLIC_BASEPATH;


    return <main className="border w-full p-5  flex justify-between bg-white shadow-md items-center" >

        <div className="sm:hidden" >
            <Dropdown
                arrowIcon={false}
                inline
                label={ <HiMenuAlt3 size={30} /> }
                
            >
                
                { menu.map((item) => (<Dropdown.Item key={item.key} className="active:bg-blueSTI active:text-white" > <Link href={item.path} >{item.title}</Link> </Dropdown.Item>)) }
            </Dropdown>

        </div>

        <div className="mx-10" >
            <Image  src={`${basePath}/logo/logo-sti.png`} height={100} width={200}  alt='Logo'    />    
        </div>

        <div>
            <Dropdown
                arrowIcon={false}
                inline label={ 
                    <Avatar 
                        alt="User settings" 
                        img={data?.foto_profil ? 
                            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/foto_profils/${data.foto_profil}` : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/default_logo.png`
                        }
                        rounded 
                    />}
            >
                <Dropdown.Header>
                    <span className="block text-sm">{ data?.name ? data.name : "~" }</span>
                    <span className="block truncate text-sm font-medium">{ data?.email ? data.email : "~" }</span>
                </Dropdown.Header>

                <Dropdown.Item onClick={() => router.push("/dashboard/profile")} > Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogOut} >Sign out</Dropdown.Item>
            </Dropdown>

        </div>
        
    </main>
}