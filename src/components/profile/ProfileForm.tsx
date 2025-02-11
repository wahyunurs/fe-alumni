import React, { useState, useEffect, FormEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alumni, useProfile } from '@/hooks/profile/alumni/useStore.hook';
import { HiPencilAlt } from 'react-icons/hi';
import { toast } from 'sonner'


type Inputs = {
    // * Main
    name: string;
    email: string;
    gender: string;

    nim?: string;
    yearIn?: number | null;
    yearOut?: number | null;
    phone1?: string;

    status: string;
    // * Work
    jobType?: string;
    jobCategory?: string;
    agencyName?: string;
    jobTitle?: string;
    jobLevel?: string;
    waitingPeriod?: string;
    monthInJob?: string;

    // * Education
    educationCost?: string;
    educationName?: string;
    majorName?: string;
    educationStats?: string;
    educationStart?: string;

    masa_tunggu?: string;
}

export function ProfileForm({ profileAlumni, onDone }: { profileAlumni?: Alumni, onDone?: () => void }){
   
    const { register, handleSubmit, setValue } = useForm<Inputs>();
    const { updateDataAlumni } =  useProfile()

    const [statusField, setStatusField] = useState< "none" | "plane1" | "plane2" | "plane3">("none");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isEditMode, setisEditMode] = useState<boolean>(false);


    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setIsDisabled(true);

        const formData = new URLSearchParams();

        if (data.name) formData.append("name", data.name);
        if (data.gender) formData.append("jns_kelamin", data.gender);
        if (data.email) formData.append("email", data.email);

        if (data.nim) formData.append("nim", data.nim);
        if (data.yearIn) formData.append("tahun_masuk", String(data.yearIn));
        if (data.yearOut) formData.append("tahun_lulus", String(data.yearOut));
        if (data.phone1) formData.append("no_hp", data.phone1);

        if (data.status) formData.append("status", data.status);

        if (data.waitingPeriod) formData.append("masa_tunggu", data.waitingPeriod);
        if (data.jobType) formData.append("bidang_job", data.jobType);
        if (data.jobCategory) formData.append("jns_job", data.jobCategory);
        if (data.agencyName) formData.append("nama_job", data.agencyName);
        if (data.jobTitle) formData.append("jabatan_job", data.jobTitle);
        if (data.jobLevel) formData.append("lingkup_job", data.jobLevel);
        if (data.monthInJob) formData.append("bulan_masuk_job", data.monthInJob);

        if (data.educationCost) formData.append("biaya_studi", data.educationCost);
        if (data.educationStats) formData.append("jenjang_pendidikan", data.educationStats );
        if (data.educationName) formData.append("universitas", data.educationName);
        if (data.majorName) formData.append("program_studi", data.majorName);        
        if (data.educationStart) formData.append("mulai_studi", data.educationStart);

        await updateDataAlumni(formData)
            .then(() => {
                toast.success("Succes in update data alumni");
            })
            .catch(() => {
                toast.error("Failed in update data alumni");
            })
            
        setIsDisabled(false);
        setisEditMode(false);

        if (onDone) onDone();
    }

    const onChangeStatus = (event: FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;

        if (value === "Bekerja Full Time" || value === "Bekerja Part Time" || value === "Wiraswasta"){
            setStatusField("plane1");
        }else if (value === "Melanjutkan Pendidikan") {
            setStatusField("plane2");
        }else {
            setStatusField("none");
        }
    }

    const changeStatusPlame = (value: string) => {
        
        if (value === "Bekerja Full Time" || value === "Bekerja Part Time" || value === "Wiraswasta"){
            setStatusField("plane1");
        }else if (value === "Melanjutkan Pendidikan") {
            setStatusField("plane2");
        }else {
            setStatusField("none");
        }
    }

    useEffect(() => {
        setValue("name", profileAlumni?.name ? profileAlumni?.name : "");
        setValue("gender", profileAlumni?.jns_kelamin ? profileAlumni?.jns_kelamin : "");
        setValue("nim", profileAlumni?.nim ? profileAlumni?.nim : "");
        setValue("email", profileAlumni?.email ? profileAlumni?.email : "");
        setValue("phone1", profileAlumni?.no_hp ? profileAlumni?.no_hp : "");
        setValue("yearIn", profileAlumni?.tahun_masuk ?  Number(profileAlumni?.tahun_masuk) : null);
        setValue("yearOut", profileAlumni?.tahun_lulus ?  Number(profileAlumni?.tahun_lulus) : null);
        setValue("status", profileAlumni?.status ?  profileAlumni?.status : "");

        setValue("waitingPeriod", profileAlumni?.masa_tunggu ?  profileAlumni?.masa_tunggu : "");
        setValue("jobType", profileAlumni?.bidang_job ?  profileAlumni?.bidang_job : "");
        setValue("jobCategory", profileAlumni?.jns_job ?  profileAlumni?.jns_job : "");
        setValue("agencyName", profileAlumni?.nama_job ?  profileAlumni?.nama_job : "");
        setValue("jobTitle", profileAlumni?.jabatan_job ?  profileAlumni?.jabatan_job : "");
        setValue("jobLevel", profileAlumni?.lingkup_job ?  profileAlumni?.lingkup_job : "");        
        setValue("monthInJob", profileAlumni?.bulan_masuk_job ?  profileAlumni?.bulan_masuk_job : "");

        setValue("educationCost", profileAlumni?.biaya_studi ?  profileAlumni?.biaya_studi : "");
        setValue("educationStats", profileAlumni?.jenjang_pendidikan ? profileAlumni?.jenjang_pendidikan : "");
        setValue("educationName", profileAlumni?.universitas ?  profileAlumni?.universitas : "");
        setValue("majorName", profileAlumni?.program_studi ?  profileAlumni?.program_studi : "");
        setValue("educationStart", profileAlumni?.mulai_studi ?  profileAlumni?.mulai_studi : "");
        
        if (profileAlumni?.status) changeStatusPlame(profileAlumni.status);

    }, [profileAlumni])

    return (
        <section>

            <div className='flex justify-end mb-3' >
                <button className={`${isEditMode ? "bg-blue-500 text-white" : ""} text-xs sm:text-sm p-3 w-full sm:w-fit flex justify-center shadow-sm rounded-md border border-blue-300 border-dashed`} onClick={() => setisEditMode(!isEditMode)} ><HiPencilAlt /></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="space-y-8">
                    {/* Informasi Pribadi */}
                    <section>
                        <h2 className="text-sm font-bold mb-4">Informasi Pribadi</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Nama */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm font-medium">Nama :</label>
                                {isEditMode ? (
                                    <input {...register('name')} id="name" type="text" className="border rounded-md p-2 text-sm" placeholder="Jane Doe"required/>
                                ) : (
                                    <div className="text-sm">{profileAlumni?.name}</div>)
                                }
                            </div>

                            {/* NIM */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nim" className="text-sm font-medium">Nomor Induk Mahasiswa (NIM) :</label>
                                {isEditMode ? (
                                    <input {...register('nim')} id="nim" type="text" className="border rounded-md p-2 text-sm" placeholder="Nomor Induk Mahasiswa" required />
                                ) : (
                                    <div className="text-sm ">{profileAlumni?.nim}</div>)
                                }
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium">Email :</label>
                                {isEditMode ? (
                                    <input {...register('email')} id="email" type="email" className="border rounded-md p-2 text-sm" placeholder="mhs@mhs.com" required />
                                ) : (
                                    <div className="text-sm ">{profileAlumni?.email}</div>)
                                }
                            </div>

                            {/* Nomor Telephone */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone1" className="text-sm font-medium">Nomor Telephone :</label>
                                {isEditMode ? (
                                    <input {...register('phone1')} id="phone1" type="text" className="border rounded-md p-2 text-sm" placeholder="xxxxxxxxxxxx"required />
                                ) : (
                                    <div className="text-sm ">{profileAlumni?.no_hp}</div>)
                                }
                            </div>

                            {/* Jenis Kelamin */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="gender" className="text-sm font-medium ">Jenis Kelamin :</label>
                                {isEditMode ? (
                                    <select {...register('gender')} id="gender" className="border rounded-md p-2 text-sm" required>
                                        <option value="">-none-</option>
                                        <option value="Laki-Laki">Laki - Laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                ) : (
                                    <div className="text-sm">{profileAlumni?.jns_kelamin}</div>)
                                }
                            </div>
                        </div>
                    </section>

                    {/* Informasi Akademik */}
                    <section>
                        <h2 className="text-sm font-bold mb-4">Informasi Akademik</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Tahun Masuk */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearIn" className="text-sm font-medium">Tahun Masuk :</label>
                                <div className="text-sm ">{profileAlumni?.tahun_masuk}</div>
                            </div>

                            {/* Tahun Lulus */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="yearOut" className="text-sm font-medium">Tahun Lulus :</label>
                                {isEditMode ? (
                                    <input {...register('yearOut')} id="yearOut" type="number" min={0} className="border rounded-md p-2 text-sm" placeholder="2024" required />
                                ) : (
                                    <div className="text-sm ">{profileAlumni?.tahun_lulus}</div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Status */}
                    <section>
                        <h2 className="text-sm font-bold mb-4">Status Saat Ini</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* status */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="status" className="text-sm font-medium">Status :</label>
                                {isEditMode ? (
                                    <select {...register('status')} id="status" className="border rounded-md p-2 text-sm" onChange={onChangeStatus} required >
                                        <option value="">-none-</option>
                                        <option value="Bekerja Full Time">Bekerja Full Time</option>
                                        <option value="Bekerja Part Time">Bekerja Part Time</option>
                                        <option value="Wiraswasta">Wiraswasta</option>
                                        <option value="Melanjutkan Pendidikan">Melanjutkan Pendidikan</option>
                                        <option value="Tidak Bekerja Tetapi Sedang Mencari Pekerjaan">Tidak Bekerja Tetapi Sedang Mencari Pekerjaan</option>
                                        <option value="Belum memungkinkan Bekerja">Belum memungkinkan Bekerja</option>
                                        <option value="Menikah / Atau Mengurus Keluarga">Menikah / Atau Mengurus Keluarga</option>
                                    </select>
                                ) : (
                                    <div className="text-sm">{profileAlumni?.status}</div>
                                )}
                            </div>

                            {/* masa tunggu */}
                            {statusField === "plane1" && (
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="waitingPeriod" className="text-sm font-medium" >Masa Tunggu :</label>
                                    <div className='text-sm' >{profileAlumni?.masa_tunggu}</div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Work */}
                    {statusField === "plane1" && (
                        <section>
                            <h2 className="text-sm font-bold mb-4">Bekerja</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* bulan masuk instansi */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="monthInJob" className="text-sm font-medium">Bulan Masuk Kerja :</label>
                                    { 
                                        isEditMode
                                        ?<select {...register('monthInJob')} name="monthInJob" id="monthInJob" className="text-sm" required>
                                            <option value="">Pilih Bulan</option>
                                            {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((bulan, index) => (
                                                <option key={index} value={bulan}>{bulan}</option>
                                            ))}
                                        </select>
                                        : <div className='text-sm' >{profileAlumni?.bulan_masuk_job}</div>
                                    }
                                </div>

                                {/* nama instansi */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="agencyName" className="text-sm font-medium" >Nama Instansi :</label>
                                    {
                                        isEditMode
                                        ? <input  {...register('agencyName')} name="agencyName" id="agencyName" type="text" className="text-xs" placeholder="Udinus" />
                                        : <div className='text-sm' >{profileAlumni?.nama_job}</div>
                                    }
                                </div>
                                
                                {/* jabatan pekerjaan */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="jobTitle" className="text-sm font-medium" >Jabatan Pekerjaan :</label>
                                    {
                                        isEditMode
                                        ? <select { ...register("jobTitle") } id="jobTitle" name='jobTitle' about="jobTitle" className="text-xs"  >
                                            <option value="" >-none-</option>
                                            <option value="founder" >Founder</option>
                                            <option value="coFounder">Co Founder</option>
                                            <option value="staff">Staff</option>
                                            <option value="freelance">Freelance</option>
                                        </select>
                                        : <div className='text-sm' >{profileAlumni?.jabatan_job}</div>

                                    }
                                </div>

                                {/* bidang pekerjaan' */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="jobType" className="text-sm font-medium">Bidang Pekerjaan :</label>
                                    {isEditMode ? (
                                        <select {...register("jobType")} id="jobType" className="border rounded-md p-2 text-sm">
                                            <option value="">-none-</option>
                                            <option value="infokom">Infokom</option>
                                            <option value="nonInfokom">Non Infokom</option>
                                        </select>
                                    ) : (
                                        <div className="text-sm">{profileAlumni?.bidang_job}</div>
                                    )}
                                </div>

                                {/* kategori pekerjaan */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="jobCategory" className="text-sm font-medium" >Kategori Pekerjaan :</label>
                                    {
                                        isEditMode
                                        ? <select { ...register("jobCategory") } id="jobCategory" name='jobCategory' about="jobCategory" className="text-xs"  >
                                            <option value="" >-none-</option>
                                            <option value="swasta" >Perusahaan Swasta</option>
                                            <option value="nirlaba">Perusahaan Nirlaba</option>
                                            <option value="bumn">BUMN / BUMD</option>
                                            <option value="lembagaPem">Lembaga Pemerintah</option>
                                            <option value="wiraswasta">Wiraushana</option>
                                        </select>
                                        : <div className='text-sm' >{profileAlumni?.jns_job}</div>

                                    }
                                </div>

                                {/* tingkat pekerjaan */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="jobLevel" className="text-sm font-medium" >Tingkat Pekerjaan :</label>
                                    {
                                        isEditMode
                                        ? <select { ...register("jobLevel") } id="jobLevel" name='jobLevel' about="jobLevel" className="text-xs"  >
                                            <option value="" >-none-</option>
                                            <option value="localNonLaw" >Lokal / Wilayah tidak berbadan hukum</option>
                                            <option value="localLaw" >Lokal / Wilayah berbadan hukum</option>
                                            <option value="national" >Nasional</option>
                                            <option value="multinational">Multinasional</option>
                                            <option value="international">Internasional</option>
                                        </select>
                                        : <div className='text-sm' >{profileAlumni?.lingkup_job}</div>

                                    }
                                </div>
                            </div>
                            

                        </section>
                    )}

                    {/* Education */}
                    {statusField === "plane2" && (
                        <section className="flex flex-col gap-4">
                            <h2 className="text-sm font-bold">Pendidikan</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* sumber biaya pendidikan */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="educationCost" className="text-sm font-medium" >Sumber Biaya Pendidikan :</label>
                                    {
                                        isEditMode
                                        ? <select { ...register("educationCost") } id="educationCost" name='educationCost' about="educationCost" className="text-xs"  >
                                            <option value="" >-none-</option>
                                            <option value="ownself" >Sendiri</option>
                                            <option value="scholarship" >Beasiswa</option>
                                        </select>
                                        : <div className='text-sm' >{profileAlumni?.biaya_studi}</div>

                                    }
                                </div>

                                {/* nama perguruan tinggi */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="educationName" className="text-sm font-medium" >Nama Perguruan Tinggi :</label>
                                    {
                                        isEditMode
                                        ? <input  {...register('educationName')} name="educationName" id="educationName" type="text" className="text-xs" placeholder="Udinus" />
                                        : <div className='text-sm' >{profileAlumni?.universitas}</div>

                                    }
                                </div>
                                
                                {/* jenjang pendidikan */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="educationStats" className="text-sm font-medium" >Jenjang Pendidikan :</label>
                                    {
                                        isEditMode
                                        ? <select { ...register("educationStats") } id="educationStats" name='educationStats' about="educationStats" className="text-xs"  >
                                            <option value="" >-none-</option>
                                            <option value="Sarjana" >Sarjana</option>
                                            <option value="Magister" >Magister</option>
                                            <option value="Doctor" >Doctor</option>
                                        </select>
                                        : <div className='text-sm' >{profileAlumni?.jenjang_pendidikan}</div>
        
                                    }
                                </div>

                                {/* prodi */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="majorName" className="text-sm font-medium" >Nama Program Studi :</label>
                                    {
                                        isEditMode
                                        ? <input  {...register('majorName')} name="majorName" id="majorName" type="text" className="text-xs" placeholder="Informatika" />
                                        : <div className='text-sm' >{profileAlumni?.program_studi}</div>

                                    }
                                </div>

                                {/* tanggal mulai studi */}
                                {/* <div className="flex flex-col gap-2">
                                    <label htmlFor="educationStart" className="text-sm font-medium" >Tanggal Awal Studi :</label>
                                    {
                                        isEditMode
                                        ? <input  {...register('educationStart')} name="educationStart" id="educationStart" type="date" className="text-xs" placeholder="Informatika" />
                                        : <div className='text-sm' >{profileAlumni?.mulai_studi}</div>

                                    }
                                </div> */}

                            </div>
                        </section>
                    )}

                </div>
                { isEditMode && <button type="submit" className={`mt-5 px-5 py-2 border rounded-md bg-blue-500 text-white w-full hover:bg-blue-500 active:bg-blue-600`} disabled={isDisabled} >Submit</button>}
            </form>

        </section>
    )
}