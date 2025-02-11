interface GetDataPengalamanMagang {
    data?: Data[]
}

interface Data {
    key?: string,
    label?: string,
    value?:  string,
}

export function getPengalamanMagang(): GetDataPengalamanMagang{
    return {
        data: [
            { key: 'pm1', label: "Tanpa Pengalaman", value: "Tanpa Pengalaman" },
            { key: 'pm2', label: "Fresh Graduate", value: "Fresh Graduate" },
            { key: 'pm3', label: "Minimal 1 Tahun", value: "Minimal 1 Tahun" },
            { key: 'pm4', label: "Minimal 2 Tahun", value: "Minimal 2 Tahun" },
            { key: 'pm5', label: "Minimal 3 Tahun", value: "Minimal 3 Tahun" },
            { key: 'pm6', label: "Lebih dari 3 tahun", value: "Lebih dari 3 tahun" },
        ]
    }
}
