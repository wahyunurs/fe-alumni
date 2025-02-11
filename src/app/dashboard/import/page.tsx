import { ImportAlumni } from "@/components/import/ImportAlumni"

export default function Page(){

    return (
        <main className="container mx-auto lg:px-10" >
            {/* <h2 className="text-2xl font-semibold text-gray-500 mb-3 text-center sm:text-left" >Import Data</h2> */}
            <ImportAlumni />
        </main>
    )
}