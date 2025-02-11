'use client';

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiOutlineHome } from 'react-icons/hi';

type TBreadCrumbProps = {
    capitalizeLinks?: boolean
}

export default function AutoBreadcrumb({  capitalizeLinks }: TBreadCrumbProps){
    
    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )
    const separator = ">";
    
    return (
        <section className="flex flex-wrap justify-between items-center px-3 ">
            {/* Judul halaman di pojok kiri */}
            <h1 className="text-3xl font-bold text-blueSTI">
                {capitalizeLinks
                ? pathNames[pathNames.length - 1]?.[0]?.toUpperCase() +
                    pathNames[pathNames.length - 1]?.slice(1)
                : pathNames[pathNames.length - 1] || 'Home'}
            </h1>

            {/* Breadcrumb di pojok kanan */}
            <ul className="flex gap-2 items-center ml-auto">
                <li className="text-sm font-bold text-gray-500">
                <Link href={'/'}>
                    <HiOutlineHome />
                </Link>
                </li>
                {pathNames.length > 0 && separator}
                {pathNames.map((link, index) => {
                const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                const itemLink = capitalizeLinks
                    ? link[0].toUpperCase() + link.slice(1)
                    : link;
                const isActive = index === pathNames.length - 1;

                return (
                    <React.Fragment key={index}>
                    <li
                        className={`text-sm font-semibold ${
                        isActive
                            ? 'text-white bg-blueSTI px-2 py-1 rounded'
                            : 'text-gray-500'
                        }`}
                    >
                        {isActive ? (
                        itemLink
                        ) : (
                        <Link href={href}>{itemLink}</Link>
                        )}
                    </li>
                    {pathNames.length !== index + 1 && (
                        <p className="text-sm font-semibold text-gray-500">{separator}</p>
                    )}
                    </React.Fragment>
                );
            })}
        </ul>
        </section>
    )
}