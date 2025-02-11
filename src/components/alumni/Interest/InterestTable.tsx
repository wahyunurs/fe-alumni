'use client';

import InterestForm from "@/components/alumni/Interest/InterestForm";
import { HiDocumentAdd, HiPlus } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useInterest } from "@/hooks/alumni/interest/useStore.hook";

export default function InterestTable() {
    const { data: interests, pagination, getInterests } = useInterest();

    const [openModalForm, setOpenModalForm] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(true);
    const [filter, setFilter] = useState({
        currentPage: 1,
        lastPage: 1,
    });

    const toggleForm = () => {
        setOpenModalForm(!openModalForm);
    };

    const onPageChange = (page: number) => {
        setFilter({ ...filter, currentPage: page });
        setRefresh(!refresh);
    };

    useEffect(() => {
        getInterests(filter);
    }, [refresh]);

    useEffect(() => {
        setFilter({ ...filter, lastPage: pagination?.lastPage || 1 });
    }, [pagination]);

    return (
        <main className="p-3 space-y-4 bg-white rounded-lg shadow-md px-">
            <aside>
                {openModalForm && <InterestForm show={openModalForm} hide={toggleForm} />}
            </aside>

            <div className="flex justify-center">
                <button
                    onClick={toggleForm}
                    className="bg-orangeSTI hover:bg-orange-500 font-semibold text-white shadow py-2 px-5 rounded-lg flex items-center gap-2"
                >
                    <HiDocumentAdd className="text-2xl" /> Add or Edit Interests
                </button>
            </div>

            <div className="p-7 space-y-10">
                <div className="flex flex-wrap gap-4 justify-start">
                    {interests.map((interest) => (
                        <div
                            key={interest.id}
                            className="flex-1 sm:w-1/2 lg:w-1/3 p-4 border rounded-md shadow-sm bg-gray-50 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-blue-800 hover:text-white"
                        >
                            <p className="text-sm truncate font-medium">{interest.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
