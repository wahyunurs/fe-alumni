import { create } from 'zustand'

interface Data {
    key: string;
    Logo?: string;
    NamaPerusahaan?: string;
    Posisi?: string;
    Tags?: string;   
    Alamat?: string
    TipeMagang?: string;
}


interface State {
    data?: Data[]

}

interface Action {
    fetChDataLowonganMagang: () => void;
    
}

export const useGetLowonganMagang = create<State & Action>((set) => ({
    // * States
    data: [
        { key: '1', Logo: "", Posisi: "Web Engineer", NamaPerusahaan: "Udinus", Tags: "Early Birds", Alamat:"Indonesia", TipeMagang: "Full Time" },
        { key: '2', Logo: "", Posisi: "BE - NodeJS", NamaPerusahaan: "PT Telkom", Tags: "Junior Developer", Alamat:"Indonesia", TipeMagang: "Full Time" },
        { key: '3', Logo: "", Posisi: "Fullstact- Laravel", NamaPerusahaan: "PT Telkom", Tags: "Senior Developer", Alamat:"Indonesia", TipeMagang: "Full Time" },
        { key: '4', Logo: "", Posisi: "FE - Nextjs", NamaPerusahaan: "Tokopedia", Tags: "Senior Developer", Alamat:"Indonesia", TipeMagang: "hybrid" },
    ],

    // * Actions
    fetChDataLowonganMagang: () => set(( state ) => (state)),
    
}))
