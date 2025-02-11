'use client';

import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInterest } from "@/hooks/alumni/interest/useStore.hook";

const INTEREST_OPTIONS = [
    "Data analysis",
    "Natural Language Processing",
    "Artificial Intelligence",
    "Neural Networks",
    "Pattern Recognition",
    "Internet of Things (IoT)",
    "Remote Sensing",
    "Image Processing",
    "Fuzzy Logic",
    "Genetic Algorithm",
    "Bioinformatics/Biomedical Applications",
    "Biometrical Application",
    "Computer Network and Architecture",
    "Network Security",
    "Content-Based Multimedia Retrievals",
    "Augmented Reality",
    "Virtual Reality",
    "Information System",
    "Game Mobile",
    "IT Bussiness Incubation",
];

export default function InterestForm({ show, hide, uuid }: { show?: boolean; hide?: () => void; uuid?: string | null }) {
    const { data: userInterests, storeOrUpdateInterests } = useInterest();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleSave = async () => {
        try {
            await storeOrUpdateInterests(selectedInterests);
            toast.success("Interests successfully updated!");
            if (hide) hide();
        } catch (error) {
            toast.error("Failed to update interests.");
        }
    };

    useEffect(() => {
        if (uuid && userInterests) {
            const currentInterests = userInterests.map((interest) => interest.name);
            setSelectedInterests(currentInterests);
        } else {
            setSelectedInterests([]);
        }
    }, [uuid, userInterests]);

    return (
        <Modal show={show} onClose={hide} className="w-full overflow-y-auto ">
            <Modal.Header>
                <p className="text-blue-500 text-base">Select Your Interests</p>
            </Modal.Header>
            <Modal.Body>
                <div className="p-5 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
                        {INTEREST_OPTIONS.map((interest) => (
                            <div
                                key={interest}
                                onClick={() => toggleInterest(interest)}
                                className={`p-4 border rounded-md shadow-sm cursor-pointer transition-all 
                                    ${
                                        selectedInterests.includes(interest)
                                            ? "bg-blue-800 text-white"
                                            : "bg-blue-100 text-gray-700 hover:bg-blue-800 hover:text-white"
                                    }`}
                            >
                                <p
                                    className="text-sm text-center font-medium truncate"
                                    title={interest.length > 40 ? interest : ""}
                                >
                                    {interest}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                    <hr></hr>
                <div className="flex justify-start px-5 mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-md text-white font-semibold"
                    >
                        Save
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
