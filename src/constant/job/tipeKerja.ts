interface GetDataTipeKerja {
    data?: Data[]
}

interface Data {
    key?: string,
    label?: string,
    value?:  string,
}

export function getTipeKerja(): GetDataTipeKerja{
    return {
        data: [
            { key: 'pm1', label: "Freelance", value: "Freelance" },
            { key: 'pm2', label: "Full Time", value: "Full Time" },
            { key: 'pm3', label: "Part Time", value: "Part Time" },
            { key: 'pm4', label: "Kontrak", value: "Kontrak" },
            { key: 'pm5', label: "Sementara", value: "Sementara" },
        ]
    }
}
