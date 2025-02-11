import { create } from 'zustand'

interface Data {
    key?: string,
    name?: string,
    isFilled?: boolean,
    count?: number,
    lastUpdted?: Date | null,
    path?: string
}


interface State {
    level: number;
    data?: Data[]

}

interface Action {
    fetchCheckDataAlumni: () => void;
    
}

export const useCheckDataAlumni = create<State & Action>((set) => ({
    // * States
    level: 4,
    data: [
        { key: 'a1', name: "Academic", isFilled: true, count: 5, lastUpdted:  new Date('10/7/2024'), path: "academic" },
        { key: 'a2', name: "Job", isFilled: false, count: 0, lastUpdted: null, path: "job" },
        { key: 'a3', name: "Internship", isFilled: true, count: 3, lastUpdted:  new Date('10/7/2024'), path: "internship"},
        { key: 'a4', name: "Organization", isFilled: false, count: 0, lastUpdted: null, path: "organization" },
        { key: 'a5', name: "Award", isFilled: false, count: 0, lastUpdted: null, path: "award" },
        { key: 'a5', name: "Interest", isFilled: false, count: 0, lastUpdted: null, path: "interest" },
        { key: 'a6', name: "Course", isFilled: true , count: 3, lastUpdted:  new Date('10/7/2024'), path: "course"},
        { key: 'a7', name: "Skills", isFilled: true, count: 1 , lastUpdted:  new Date('10/7/2024'), path: "skill" },
    ],

    // * Actions
    fetchCheckDataAlumni: () => set(( state ) => ({ level: state.level + 1 })),
    
}))
