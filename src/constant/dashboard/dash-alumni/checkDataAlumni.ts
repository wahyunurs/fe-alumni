interface GetDataAlumni {
    level: number,
    data?: Data[]
}

interface Data {
    key?: string,
    name?: string,
    isFilled?: boolean,
    count?: number,
    lastUpdted?: Date | null
}

export function getDataAlumni(): GetDataAlumni{
    return {
        level: 4,
        data: [
            { key: 'a1', name: "Academic", isFilled: true, count: 5, lastUpdted:  new Date('10/7/2024') },
            { key: 'a2', name: "Pekerjaan", isFilled: false, count: 0, lastUpdted: null },
            { key: 'a3', name: "Magang", isFilled: true, count: 3, lastUpdted:  new Date('10/7/2024')},
            { key: 'a4', name: "Organization", isFilled: false, count: 0, lastUpdted: null },
            { key: 'a5', name: "Achievement", isFilled: false, count: 0, lastUpdted: null },
            { key: 'a6', name: "Certificate", isFilled: true , count: 3, lastUpdted:  new Date('10/7/2024')},
            { key: 'a7', name: "Skills", isFilled: true, count: 1 , lastUpdted:  new Date('10/7/2024') },
        ]
    }
}
