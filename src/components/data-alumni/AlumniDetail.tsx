import { Modal } from "flowbite-react";
import { useEffect } from "react";
import { useDataAlumni } from '@/hooks/data/dataAlumni.hooks';

export default function AlumniDetail({ show, done, uuid }: { show?: boolean, done?: () => void, uuid?: number }){

    const { detail, showDataCvAlumni } = useDataAlumni();

    useEffect(() => {
        if (uuid){
            showDataCvAlumni(uuid);
        }
    }, [uuid])
    

    return (
        <Modal show={show} onClose={done} size="7xl" >
            <Modal.Header>Detail</Modal.Header>
            <Modal.Body>
                <div className="border rounded-md bg-white mb-3" >
                    <h3 className="p-3 rounded-t-md font-semibold bg-blue-400 text-white" >Academic</h3>
                    {
                        detail?.academics && detail.academics.length > 0 && detail.academics.map((item, index) => {
                            return (
                                <div key={`${index}-acdm`} className="p-3 text-sm " >
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-800">{item.jenjang_pendidikan}</h3>
                                                    <p className="text-sm text-gray-700">{item.nama_studi}</p>
                                                    <p className="text-sm text-gray-600">{item.tahun_masuk} - {item.tahun_lulus} &middot; { (item.tahun_lulus && item.tahun_masuk) ? item.tahun_lulus - item.tahun_masuk  : '~' } tahun</p>
                                                    <p className="text-sm text-gray-600">{item.kota}, {item.negara} </p>
                                                    <p className="text-sm text-gray-600">IPK: {item.ipk} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {item.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { detail?.academics.length > 1 && index < detail?.academics.length - 1 && ( <hr className="border-gray-300"/> ) }
                                </div>
                            )
                        })
                    }
                </div>

                <div className="border rounded-md bg-white mb-3" >
                    <h3 className="p-3 rounded-t-md font-semibold bg-blue-400 text-white" >Interest</h3>
                    {
                        detail?.awards && detail.awards.length > 0 && detail.awards.map((item, index) => {
                            return (
                                <div key={`${index}-awa`} className="p-3 text-sm " >
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                   <h3 className="text-sm font-semibold text-gray-800">{item.nama_award}</h3>
                                                    <p className="text-sm text-gray-600">{item.institusi_award}</p>
                                                    <p className="text-sm text-gray-600">Tingkat: {item.tingkat_award} </p>
                                                    <p className="text-sm text-gray-600">Tahun: {item.tahun_award} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {item.deskripsi_award} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { detail?.awards.length > 1 && index < detail?.awards.length - 1 && ( <hr className="border-gray-300"/> ) }
                                </div>
                            )
                        })
                    }
                </div>

                <div className="border rounded-md bg-white mb-3" >
                    <h3 className="p-3 rounded-t-md font-semibold bg-blue-400 text-white" >Courses</h3>
                    {
                        detail?.courses && detail.courses.length > 0 && detail.courses.map((item, index) => {
                            return (
                                <div key={`${index}-crs`} className="p-3 text-sm " >
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                <h3 className="text-sm font-semibold text-gray-800">{item.nama_course}</h3>
                                                    <p className="text-sm text-gray-600">{item.institusi_course}</p>
                                                    <p className="text-sm text-gray-600">Tingkat: {item.tingkat_course} </p>
                                                    <p className="text-sm text-gray-600">Tahun: {item.tahun_course} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { detail?.courses.length > 1 && index < detail?.courses.length - 1 && ( <hr className="border-gray-300"/> ) }
                                </div>
                            )
                        })
                    }
                </div>

                <div className="border rounded-md bg-white mb-3" >
                    <h3 className="p-3 rounded-t-md font-semibold bg-blue-400 text-white" >Internships</h3>
                    {
                        detail?.internships && detail.internships.length > 0 && detail.internships.map((item, index) => {
                            return (
                                <div key={`${index}-intr`} className="p-3 text-sm " >
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-800">{item.nama_intern}</h3>
                                                    <p className="text-sm text-gray-600">{item.jabatan_intern}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {item.bulan_masuk_intern} {item.periode_masuk_intern} - {item.bulan_keluar_intern} {item.periode_keluar_intern} &nbsp;&middot;&nbsp; 
                                                        {(item.periode_keluar_intern && item.periode_masuk_intern) ? item.periode_keluar_intern - item.periode_masuk_intern : '~'} tahun</p>
                                                    <p className="text-sm text-gray-600">{item.kota}, {item.negara} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {item.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { detail?.internships.length > 1 && index < detail?.internships.length - 1 && ( <hr className="border-gray-300"/> ) }
                                </div>
                            )
                        })
                    }
                </div>

                <div className="border rounded-md bg-white mb-3" >
                    <h3 className="p-3 rounded-t-md font-semibold bg-blue-400 text-white" >Jobs</h3>
                    {
                        detail?.jobs && detail.jobs.length > 0 && detail.jobs.map((item, index) => {
                            return (
                                <div key={`${index}-jbs`} className="p-3 text-sm " >
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-800">{item.nama_job}</h3>
                                                    <p className="text-sm text-gray-600">{item.jabatan_job}</p>
                                                    <p className="text-sm text-gray-600">{item.periode_masuk_job} - {item.periode_keluar_job} &middot; { (item.periode_keluar_job && item.periode_masuk_job) ? item.periode_masuk_job - item.periode_keluar_job  : '~' } tahun</p>
                                                    <p className="text-sm text-gray-600">{item.kota}, {item.negara} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {item.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { detail?.jobs.length > 1 && index < detail?.jobs.length - 1 && ( <hr className="border-gray-300"/> ) }
                                </div>
                            )
                        })
                    }
                </div>

                <div className="border rounded-md bg-white mb-3" >
                    <h3 className="p-3 rounded-t-md font-semibold bg-blue-400 text-white" >Organization</h3>
                    {
                        detail?.organizations && detail.organizations.length > 0 && detail.organizations.map((item, index) => {
                            return (
                                <div key={`${index}-org`} className="p-3 text-sm " >
                                    <div className='p-3 flex justify-between'>
                                        <div className="space-y-6">
                                            <div className="flex items-start">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-800">{item.nama_org}</h3>
                                                    <p className="text-sm text-gray-600">{item.jabatan_org}</p>
                                                    <p className="text-sm text-gray-600">{item.periode_masuk_org} - {item.periode_keluar_org} &middot; { (item.periode_keluar_org && item.periode_masuk_org) ? item.periode_keluar_org - item.periode_masuk_org  : '~' } tahun</p>
                                                    <p className="text-sm text-gray-600">{item.kota}, {item.negara} </p>
                                                    <p className="text-sm text-gray-600 italic">Catatan: {item.catatan} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { detail?.organizations.length > 1 && index < detail?.organizations.length - 1 && ( <hr className="border-gray-300"/> ) }
                                </div>
                            )
                        })
                    }
                </div>

                <div className="border rounded-md bg-white mb-3" >
                    <h3 className="p-3 rounded-t-md font-semibold bg-blue-400 text-white" >Skills</h3>
                    {
                        detail?.skills && detail.skills.length > 0 && detail.skills.map((item, index) => {
                            return (
                                <div key={`${index}-sk`} className="p-3 text-sm " >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Kerjasama:</p>
                                            <p className="text-sm text-gray-600">{item.kerjasama_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Keahlian:</p>
                                            <p className="text-sm text-gray-600">{item.ahli_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Bahasa Inggris:</p>
                                            <p className="text-sm text-gray-600">{item.inggris_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Komunikasi:</p>
                                            <p className="text-sm text-gray-600">{item.komunikasi_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Pengembangan Diri:</p>
                                            <p className="text-sm text-gray-600">{item.pengembangan_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Kepemimpinan:</p>
                                            <p className="text-sm text-gray-600">{item.kepemimpinan_skill}</p>
                                        </div>
                                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                                            <p className="text-sm font-semibold text-gray-800">Etos Kerja:</p>
                                            <p className="text-sm text-gray-600">{item.etoskerja_skill}</p>
                                        </div>
                                    </div>
                                    { detail?.skills.length > 1 && index < detail?.skills.length - 1 && ( <hr className="border-gray-300"/> ) }
                                </div>
                            )
                        })
                    }
                </div>

                
            </Modal.Body>
        </Modal>
    )
}