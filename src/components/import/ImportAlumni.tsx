'use client';

import { FileInput, Label } from "flowbite-react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useImport } from '@/hooks/import/useImport.hooks';
import { useState } from 'react';
import { toast } from 'sonner';

type Inputs = {
  excels: FileList;
};

export function ImportAlumni() {
    const { importExcel } = useImport();
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);

    const onSubmit: SubmitHandler<Inputs> = async () => {
        const formData = new FormData();

        if (selectedFile) formData.append('file', selectedFile);
        formData.append('category', 'alumni');

        if (selectedFile) await importExcel(formData)
            .then(() => {
                toast.success("Success import ");    
            }).catch(() => {
                toast.error("Failed import ");    
            }).finally(() => {
                reset();
            })

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            setSelectedFile(file);
        } else {
            toast.warning("Please upload a valid Excel file.");
            setSelectedFile(null);
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="flex w-full items-center justify-center">
                    <Label
                        htmlFor="dropzone-file"
                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                                aria-hidden="true"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>

                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-400">Excel only (.xlsx, .xls)</p>

                        </div>

                        <FileInput
                            {...register('excels')}
                            id="dropzone-file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                        />

                    </Label>
                </div>

                {selectedFile && (
                    <p className="mt-2 text-sm text-gray-700">
                        Selected file: <span className="font-medium">{selectedFile.name}</span>
                    </p>
                )}

                <button type="submit" className="bg-blue-500 px-5 py-1 text-white rounded-md mt-3 disabled:bg-gray-300" disabled={!selectedFile} > Send </button>
            </form>
        </section>
  );
}
