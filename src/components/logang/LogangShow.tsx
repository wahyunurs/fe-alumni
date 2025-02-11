import { Modal } from "flowbite-react";
import { HiGlobeAlt, HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { useLogangAdmin, useLogangAlumni, useLogangMitra, Logang } from "@/hooks/logang/useStore.hook";
import { useEffect, useState } from "react";
import { getUser,  } from '@/hooks/auth/authClient';
import Link from "next/link";
import Image from 'next/image';


export default function LogangShow({ uuid, show, onDone }: {uuid?: string, show?: boolean, onDone?: () => void}){

    const { show: getDataLogang } = useLogangAdmin();
    const { show: getDataLogangAlumni } = useLogangAlumni();
    const { show: getDataLogangMitra } = useLogangMitra();
    const [ role, setRole ] = useState< "alumni" | "admin" | "mitra" >();
    const [ data, setData] = useState<Logang>();

    const setTags = (tags: string) => {
        const split = tags.split(',');
        return split.map((tag, index) => {
            return <span key={index} className="px-2 py-1 text-xs font-semibold bg-yellow-400 text-blueSTI rounded-full">{tag}</span>
        })
    }

    useEffect(() => {

        if (uuid && role){

            if (role === 'admin') getDataLogang(uuid).then((result) => {
                setData(result);    
            })

            if (role === 'alumni') getDataLogangAlumni(uuid).then((result) => {
                setData(result);    
            })

            if (role === 'mitra') getDataLogangMitra(uuid).then((result) => {
                setData(result);    
            })
        }

    }, [uuid, role]);

    useEffect(() => {
        const result = getUser();
        if (result) {

            const roleAlumni: boolean | undefined = result?.roles?.includes('alumni');
            const roleAdmin: boolean | undefined = result?.roles?.includes('admin');
            const roleMitra: boolean | undefined = result?.roles?.includes('mitra');

            if (roleAlumni) setRole('alumni');
            if (roleAdmin) setRole('admin');
            if (roleMitra) setRole('mitra');

        } 
    }, [])

    return (
        <Modal show={show} onClose={onDone}>
            <Modal.Header>
                <p className="text-blueSTI text-base">Detail</p>
            </Modal.Header>
            <Modal.Body>
            <div className="flex items-center justify-start text-left bg-white bg-opacity-30 rounded-lg">
                <div className="flex flex-col items-start">
                    <div className="flex items-start space-x-4 w-3/4">
                        <Image
                            src={data?.Logo ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/${data.Logo}` : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/imglogo/default-logo`}
                            alt={`${data?.NamaPerusahaan} Logo`}
                            className="h-24 w-24 object-contain"
                            width={96}
                            height={96}
                        />
                        <div>
                            <h1 className="text-xl text-left text-gray-800 font-semibold text-basebold mb-2 mt-4">{data?.NamaPerusahaan}</h1>
                            <p className="text-sm text-left text-gray-600 mb-4">{data?.Posisi}</p>
                        </div>
                        <div className="absolute right-7 flex flex-col space-y-4">
                            {data?.no_hp && data.no_hp.trim() !== "-" && (
                                <Link
                                    passHref
                                    href={`https://wa.me/${data?.no_hp.startsWith("0") ? data.no_hp.replace(/^0/, "+62") : data.no_hp}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="p-2 bg-green-500 text-white rounded-full text-center hover:bg-green-600"
                                >
                                    <HiPhone className="text-xl" />
                                </Link>
                            )}

                            <Link
                                href={`mailto:${data?.Email}?subject=${"Magang"}&body=${"Body Magang"}`}
                                className="p-2 bg-blue-500 text-white rounded-full text-center hover:bg-blue-600"
                            >
                                <HiMail className="text-xl" />
                            </Link>
                            {data?.Website && data.Website.trim() !== "-" && (
                                <Link
                                    passHref
                                    href={`${data?.Website}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="p-2 bg-gray-400 text-white rounded-full text-center hover:bg-gray-500"
                                >
                                    <HiGlobeAlt className="text-xl" />
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <div className="flex space-x-2 mt-2">
                            { data?.Tags && setTags(data.Tags) }
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="text-sm text-left flex mt-3 items-start space-x-2">
                            <HiLocationMarker className="flex-shrink-0" />
                            <span className="whitespace-normal break-words">
                                {data?.Alamat}
                            </span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start">
                        <div className="w-full text-left">
                            <p className="text-sm text-gray-800 mt-2 whitespace-pre-line">
                                {data?.Deskripsi}
                            </p>
                            <p className="mt-2 text-sm text-gray-800">
                                <span className="font-bold">Tipe kerja:</span> {data?.TipeMagang}
                            </p>
                            <p className="text-sm text-gray-800">
                                <span className="font-bold">Pengalaman:</span> {data?.Pengalaman}
                            </p>
                            <p className="text-sm text-gray-800">
                                <span className="font-bold">Gaji:</span> {data?.Gaji ? new Intl.NumberFormat('id-ID').format(Number(data.Gaji)) : '~'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </Modal.Body>
        </Modal>

    )
}