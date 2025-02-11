import AlumniList from "@/components/data-alumni/AlumniList"

export default function DataAlumni(){
    return (
        <main className="container mx-auto lg:px-10" >
            {/* <h2 className="text-2xl font-semibold text-gray-500 mb-3 text-center sm:text-left" >Data Alumni</h2> */}

            <p className="font-semibold text-center sm:text-left text-sm sm:text-base " >Berikut adalah informasi data dari masing - masing aku alumni</p>

            <AlumniList />

        </main>
    )
}