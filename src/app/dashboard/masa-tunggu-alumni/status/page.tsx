import MasaTungguTableComponent from "@/components/masa-tunggu/MasaTungguTable";

export default function Page({ searchParams }: { searchParams: { status: string } }){

    const { status } = searchParams;

    return (
        <main className="container mx-auto lg:px-10" >
            <h2 className="text-2xl font-semibold text-gray-500 mb-1 text-center sm:text-left" >Data Untuk Status {status}</h2>
            <p className="mb-1 text-gray-500" >Berikut adalah informasi untuk datanya</p>

            <MasaTungguTableComponent status={status} />

        </main>
    )
}