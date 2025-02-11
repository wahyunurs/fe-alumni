'use client';

import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSurveiPenggunaLulusan } from '@/hooks/survei-mitra/surveiPenggunaLulusan.hook';
import { toast } from 'sonner';
import AsyncSelect from 'react-select/async';

type Inputs = {
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
};

export default function SurveiPenggunaLulusanForm({ show, done, uuid }: { show?: boolean, done?: () => void, uuid?: string | null }) {
    const { show: showPenggunaLulusan, update: updatePenggunaLulusan, post: postStatistik, search } = useSurveiPenggunaLulusan();
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Inputs>();
    const [selectedAlumni, setSelectedAlumni] = useState<{ label: string; value: number } | null>(null);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!selectedAlumni) {
            toast.error("Nama alumni belum dipilih!");
            return;
        }

        const payload: any = {};
        if (data.kedisiplinan !== null) payload.kedisiplinan = data.kedisiplinan;
        if (data.kejujuran !== null) payload.kejujuran = data.kejujuran;
        if (data.motivasi) payload.motivasi = data.motivasi;
        if (data.etos) payload.etos = data.etos;
        if (data.moral) payload.moral = data.moral;
        if (data.etika) payload.etika = data.etika;
        if (data.bidang_ilmu) payload.bidang_ilmu = data.bidang_ilmu;
        if (data.produktif) payload.produktif = data.produktif;
        if (data.masalah) payload.masalah = data.masalah;
        if (data.inisiatif) payload.inisiatif = data.inisiatif;
        if (data.menulis_asing) payload.menulis_asing = data.menulis_asing;
        if (data.komunikasi_asing) payload.komunikasi_asing = data.komunikasi_asing;
        if (data.memahami_asing) payload.memahami_asing = data.memahami_asing;
        if (data.alat_teknologi) payload.alat_teknologi = data.alat_teknologi;
        if (data.adaptasi_teknologi) payload.adaptasi_teknologi = data.adaptasi_teknologi;
        if (data.penggunaan_teknologi) payload.penggunaan_teknologi = data.penggunaan_teknologi;
        if (data.emosi) payload.emosi = data.emosi;
        if (data.percaya_diri) payload.percaya_diri = data.percaya_diri;
        if (data.keterbukaan) payload.keterbukaan = data.keterbukaan;
        if (data.kom_lisan) payload.kom_lisan = data.kom_lisan;
        if (data.kom_tulisan) payload.kom_tulisan = data.kom_tulisan;
        if (data.kepemimpinan) payload.kepemimpinan = data.kepemimpinan;
        if (data.manajerial) payload.manajerial = data.manajerial;
        if (data.masalah_kerja) payload.masalah_kerja = data.masalah_kerja;
        if (data.motivasi_tempat_kerja) payload.motivasi_tempat_kerja = data.motivasi_tempat_kerja;
        if (data.motivasi_diri) payload.motivasi_diri = data.motivasi_diri;
        payload.name_alumni = selectedAlumni.label;

        try {
            if (!uuid) {
                await postStatistik(payload);
                toast.success("Success post data");
            } else {
                await updatePenggunaLulusan(uuid, payload);
                toast.success("Success update data");
            }
            reset();
            if (done) done();
        } catch (error) {
            console.error(error);
            toast.error("Gagal menyimpan data");
        }
    };

    useEffect(() => {
        if (!uuid) return;
    
        showPenggunaLulusan(uuid).then((item) => {
            if (!item) return;
    
            setValue("kedisiplinan", item.kedisiplinan ?? null);
            setValue("kejujuran", item.kejujuran ?? null);
            setValue("motivasi", item.motivasi ?? null);
            setValue("etos", item.etos ?? null);
            setValue("moral", item.moral ?? null);
            setValue("etika", item.etika ?? null);
            setValue("bidang_ilmu", item.bidang_ilmu ?? null);
            setValue("produktif", item.produktif ?? null);
            setValue("masalah", item.masalah ?? null);
            setValue("inisiatif", item.inisiatif ?? null);
            setValue("menulis_asing", item.menulis_asing ?? null);
            setValue("komunikasi_asing", item.komunikasi_asing ?? null);
            setValue("memahami_asing", item.memahami_asing ?? null);
            setValue("alat_teknologi", item.alat_teknologi ?? null);
            setValue("adaptasi_teknologi", item.adaptasi_teknologi ?? null);
            setValue("penggunaan_teknologi", item.penggunaan_teknologi ?? null);
            setValue("emosi", item.emosi ?? null);
            setValue("percaya_diri", item.percaya_diri ?? null);
            setValue("keterbukaan", item.keterbukaan ?? null);
            setValue("kom_lisan", item.kom_lisan ?? null);
            setValue("kom_tulisan", item.kom_tulisan ?? null);
            setValue("kepemimpinan", item.kepemimpinan ?? null);
            setValue("manajerial", item.manajerial ?? null);
            setValue("masalah_kerja", item.masalah_kerja ?? null);
            setValue("motivasi_tempat_kerja", item.motivasi_tempat_kerja ?? null);
            setValue("motivasi_diri", item.motivasi_diri ?? null);
    
            setSelectedAlumni({ label: item.name_alumni ?? "", value: item.user_id ?? 0 });
        });
    }, [uuid]);

    const loadAlumniOptions = async (inputValue: string) => {
        const result = await search(inputValue);

        if (Array.isArray(result)) {
            return result.map((item: { id: number; name: string }) => ({
                value: item.id,
                label: item.name,
            }));
        }

        return [];
    };

    const kedisiplinanValue = watch("kedisiplinan");
    const kejujuranValue = watch("kejujuran");
    const motivasiValue = watch("motivasi");
    const etosValue = watch("etos");
    const moralValue = watch("moral");
    const etikaValue = watch("etika");
    const bidang_ilmuValue = watch("bidang_ilmu");
    const produktifValue = watch("produktif");
    const masalahValue = watch("masalah");
    const inisiatifValue = watch("inisiatif");
    const menulis_asingValue = watch("menulis_asing");
    const komunikasi_asingValue = watch("komunikasi_asing");
    const memahami_asingValue = watch("memahami_asing");
    const alat_teknologiValue = watch("alat_teknologi");
    const adaptasi_teknologiValue = watch("adaptasi_teknologi");
    const penggunaan_teknologiValue = watch("penggunaan_teknologi");
    const emosiValue = watch("emosi");
    const percaya_diriValue = watch("percaya_diri");
    const keterbukaanValue = watch("keterbukaan");
    const kom_lisanValue = watch("kom_lisan");
    const kom_tulisanValue = watch("kom_tulisan");
    const kepemimpinanValue = watch("kepemimpinan");
    const manajerialValue = watch("manajerial");
    const masalah_kerjaValue = watch("masalah_kerja");
    const motivasi_tempat_kerjaValue = watch("motivasi_tempat_kerja");
    const motivasi_diriValue = watch("motivasi_diri");
    
    return (
        <Modal show={show} onClose={done} className="overflow-y-auto">
            <Modal.Header>
                <p className="text-blue-500 text-base">Form Survei Pengguna Lulusan</p>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Input Nama Alumni */}
                    <div className="flex flex-col gap-1 mb-5">
                        <label htmlFor="nameAlumni" className="text-sm font-semibold">Nama Alumni</label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadAlumniOptions}
                            defaultOptions
                            onChange={setSelectedAlumni}
                            value={selectedAlumni}
                            placeholder="Cari Nama Alumni..."
                            className="text-sm"
                            required
                            noOptionsMessage={() => "Tidak terdapat alumni yang bekerja pada instansi ini"}
                        />
                    </div>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kedisiplinan Lulusan Di Tempat Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`kedisiplinan-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('kedisiplinan')}
                                    id={`kedisiplinan-${value}`}
                                    name="kedisiplinan"
                                    type="radio"
                                    value={value}
                                    checked={kedisiplinanValue === value}
                                    onChange={() => setValue('kedisiplinan', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`kedisiplinan-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kejujuran Lulusan Di Tempat Kerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`kejujuran-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('kejujuran')}
                                    id={`kejujuran-${value}`}
                                    name="kejujuran"
                                    type="radio"
                                    value={value}
                                    checked={kejujuranValue === value}
                                    onChange={() => setValue('kejujuran', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`kejujuran-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Motivasi Kerja Lulusan Di Tempat Kerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`motivasi-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('motivasi')}
                                    id={`motivasi-${value}`}
                                    name="motivasi"
                                    type="radio"
                                    value={value}
                                    checked={motivasiValue === value}
                                    onChange={() => setValue('motivasi', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`motivasi-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Etos Kerja Lulusan Di Tempat Kerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`etos-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('etos')}
                                    id={`etos-${value}`}
                                    name="etos"
                                    type="radio"
                                    value={value}
                                    checked={etosValue === value}
                                    onChange={() => setValue('etos', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`etos-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Moralitas Lulusan Di Tempat Kerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`moral-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('moral')}
                                    id={`moral-${value}`}
                                    name="moral"
                                    type="radio"
                                    value={value}
                                    checked={moralValue === value}
                                    onChange={() => setValue('moral', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`moral-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Etika Lulusan Di Tempat Kerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`etika-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('etika')}
                                    id={`etika-${value}`}
                                    name="etika"
                                    type="radio"
                                    value={value}
                                    checked={etikaValue === value}
                                    onChange={() => setValue('etika', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`etika-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Penguasaan Bidang Ilmu Lulusan Di Tempat Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`bidang_ilmu-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('bidang_ilmu')}
                                    id={`bidang_ilmu-${value}`}
                                    name="bidang_ilmu"
                                    type="radio"
                                    value={value}
                                    checked={bidang_ilmuValue === value}
                                    onChange={() => setValue('bidang_ilmu', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`bidang_ilmu-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Produktivitas Kerja Lulusan Di Tempat Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`produktif-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('produktif')}
                                    id={`produktif-${value}`}
                                    name="produktif"
                                    type="radio"
                                    value={value}
                                    checked={produktifValue === value}
                                    onChange={() => setValue('produktif', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`produktif-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Menyelesaikan Masalah Di Tempat Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`masalah-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('masalah')}
                                    id={`masalah-${value}`}
                                    name="masalah"
                                    type="radio"
                                    value={value}
                                    checked={masalahValue === value}
                                    onChange={() => setValue('masalah', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`masalah-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Inisiatif Dalam Bekerja Di Tempat Kerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`inisiatif-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('inisiatif')}
                                    id={`inisiatif-${value}`}
                                    name="inisiatif"
                                    type="radio"
                                    value={value}
                                    checked={inisiatifValue === value}
                                    onChange={() => setValue('inisiatif', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`inisiatif-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Menulis Dalam Bahasa Asing</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`menulis_asing-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('menulis_asing')}
                                    id={`menulis_asing-${value}`}
                                    name="menulis_asing"
                                    type="radio"
                                    value={value}
                                    checked={menulis_asingValue === value}
                                    onChange={() => setValue('menulis_asing', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`menulis_asing-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Berkomunikasi Dalam Bahasa Asing</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`komunikasi_asing-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('komunikasi_asing')}
                                    id={`komunikasi_asing-${value}`}
                                    name="komunikasi_asing"
                                    type="radio"
                                    value={value}
                                    checked={komunikasi_asingValue === value}
                                    onChange={() => setValue('komunikasi_asing', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`komunikasi_asing-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Memahami Tesk Dalam Bahasa Asing</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`memahami_asing-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('memahami_asing')}
                                    id={`memahami_asing-${value}`}
                                    name="memahami_asing"
                                    type="radio"
                                    value={value}
                                    checked={memahami_asingValue === value}
                                    onChange={() => setValue('memahami_asing', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`memahami_asing-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Pengetahuan Tentang Alat Dan Teknologi Dalam Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`alat_teknologi-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('alat_teknologi')}
                                    id={`alat_teknologi-${value}`}
                                    name="alat_teknologi"
                                    type="radio"
                                    value={value}
                                    checked={alat_teknologiValue === value}
                                    onChange={() => setValue('alat_teknologi', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`alat_teknologi-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Beradaptasi Dengan Teknologi Baru</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`adaptasi_teknologi-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('adaptasi_teknologi')}
                                    id={`adaptasi_teknologi-${value}`}
                                    name="adaptasi_teknologi"
                                    type="radio"
                                    value={value}
                                    checked={adaptasi_teknologiValue === value}
                                    onChange={() => setValue('adaptasi_teknologi', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`adaptasi_teknologi-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Menggunakan Teknologi Dalam Pekerjaan</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`penggunaan_teknologi-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('penggunaan_teknologi')}
                                    id={`penggunaan_teknologi-${value}`}
                                    name="penggunaan_teknologi"
                                    type="radio"
                                    value={value}
                                    checked={penggunaan_teknologiValue === value}
                                    onChange={() => setValue('penggunaan_teknologi', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`penggunaan_teknologi-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kematangan Emosi Dan Pengendalian Diri Dalam Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`emosi-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('emosi')}
                                    id={`emosi-${value}`}
                                    name="emosi"
                                    type="radio"
                                    value={value}
                                    checked={emosiValue === value}
                                    onChange={() => setValue('emosi', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`emosi-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kepercayaan Diri Lulusan Dalam Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`percaya_diri-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('percaya_diri')}
                                    id={`percaya_diri-${value}`}
                                    name="percaya_diri"
                                    type="radio"
                                    value={value}
                                    checked={percaya_diriValue === value}
                                    onChange={() => setValue('percaya_diri', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`percaya_diri-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Keterbukaan Lulusan Terhadap Kritik Dan Saran</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`keterbukaan-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('keterbukaan')}
                                    id={`keterbukaan-${value}`}
                                    name="keterbukaan"
                                    type="radio"
                                    value={value}
                                    checked={keterbukaanValue === value}
                                    onChange={() => setValue('keterbukaan', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`keterbukaan-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Lulusan Dalam Berkomunikasi Secara Lisan</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`kom_lisan-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('kom_lisan')}
                                    id={`kom_lisan-${value}`}
                                    name="kom_lisan"
                                    type="radio"
                                    value={value}
                                    checked={kom_lisanValue === value}
                                    onChange={() => setValue('kom_lisan', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`kom_lisan-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Lulusan Dalam Berkomunikasi Secara Tertulis</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`kom_tulisan-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('kom_tulisan')}
                                    id={`kom_tulisan-${value}`}
                                    name="kom_tulisan"
                                    type="radio"
                                    value={value}
                                    checked={kom_tulisanValue === value}
                                    onChange={() => setValue('kom_tulisan', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`kom_tulisan-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Lulusan Sebagai Pemimpin Dalam Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`kepemimpinan-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('kepemimpinan')}
                                    id={`kepemimpinan-${value}`}
                                    name="kepemimpinan"
                                    type="radio"
                                    value={value}
                                    checked={kepemimpinanValue === value}
                                    onChange={() => setValue('kepemimpinan', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`kepemimpinan-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Lulusan Sebagai Manajerial Dalam Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`manajerial-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('manajerial')}
                                    id={`manajerial-${value}`}
                                    name="manajerial"
                                    type="radio"
                                    value={value}
                                    checked={manajerialValue === value}
                                    onChange={() => setValue('manajerial', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`manajerial-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kekampuan Lulusan Menyelesaiakan Masalah Dalam Bekerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`masalah_kerja-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('masalah_kerja')}
                                    id={`masalah_kerja-${value}`}
                                    name="masalah_kerja"
                                    type="radio"
                                    value={value}
                                    checked={masalah_kerjaValue === value}
                                    onChange={() => setValue('masalah_kerja', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`masalah_kerja-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Memotivasi Dalam Mempelajari Hal Baru Untuk Kemajuan Tempat Kerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`motivasi_tempat_kerja-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('motivasi_tempat_kerja')}
                                    id={`motivasi_tempat_kerja-${value}`}
                                    name="motivasi_tempat_kerja"
                                    type="radio"
                                    value={value}
                                    checked={motivasi_tempat_kerjaValue === value}
                                    onChange={() => setValue('motivasi_tempat_kerja', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`motivasi_tempat_kerja-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>

                    <fieldset className="mb-5">
                        <legend className="text-sm font-semibold">Nilai Kemampuan Memotivasi Mempelajari Hal Baru Untuk Peningkatan Kompetensi Diri Di Tempat Kerja</legend>
                        <div className="mt-2 space-y-2">
                        {['Sangat Baik', 'Baik', 'Kurang', 'Tidak Baik'].map((value) => (
                            <div key={`motivasi_diri-${value}`} className="flex items-center gap-x-3">
                                <input
                                    {...register('motivasi_diri')}
                                    id={`motivasi_diri-${value}`}
                                    name="motivasi_diri"
                                    type="radio"
                                    value={value}
                                    checked={motivasi_diriValue === value}
                                    onChange={() => setValue('motivasi_diri', value)}
                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <label htmlFor={`motivasi_diri-${value}`} className="text-sm">{value}</label>
                            </div>
                        ))}
                        </div>
                    </fieldset>
                    
                    <button type="submit" className="bg-blue-500 px-5 py-1 rounded-md mt-2 text-white w-full sm:w-auto">
                        Submit
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
