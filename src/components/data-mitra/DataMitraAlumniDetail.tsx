import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useDataMitra } from '@/hooks/data-mitra/dataMitra.hooks'; 

export default function DataMitraAlumniDetail({ show, done, uuid }: { show?: boolean, done?: () => void, uuid?: number }) {

    const { detail, getDetailMitra } = useDataMitra();

    useEffect(() => {
        if (uuid) getDetailMitra(uuid); 
    }, []); 

    return (
        <Modal show={show} onClose={done} size="7xl">
            <Modal.Header>Detail {detail?.id}</Modal.Header>
            <Modal.Body>
                <div className="border rounded-md bg-white mb-3 p-4">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-700 font-medium">Jenis Job:</p>
                            <p className="text-sm text-gray-600">{detail?.jns_job}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-700 font-medium">Lingkup Job:</p>
                            <p className="text-sm text-gray-600">{detail?.lingkup_job}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-700 font-medium">Kota:</p>
                            <p className="text-sm text-gray-600">{detail?.kota}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-gray-700 font-medium">Alamat:</p>
                            <p className="text-sm text-gray-600">{detail?.alamat}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
