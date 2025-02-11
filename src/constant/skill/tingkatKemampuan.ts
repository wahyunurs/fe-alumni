interface GetTingkatKemampuan {
    data?: Data[]
}

interface Data {
    key?: string,
    label?: string,
    value?:  string,
}

export function getTingkatKemampuan(): GetTingkatKemampuan{
    return {
        data: [
            { key: 'tk1', label: "Sangat Baik", value: "Sangat Baik" },
            { key: 'tk2', label: "Baik", value: "Baik" },
            { key: 'tk3', label: "Cukup", value: "Cukup" },
            { key: 'tk4', label: "Kurang", value: "Kurang" },
        ]
    }
}
