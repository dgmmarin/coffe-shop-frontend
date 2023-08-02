import Link from "next/link";
import { FC } from "react";

interface pageProps { }

const getProducts = async () => {
    const res = await fetch("http://127.0.0.1:4000/product", {
        next: {
            revalidate: 2
        },
    })
    return await res.json()
}

const page: FC<pageProps> = async ({ }) => {
    const data = await getProducts()
    console.log(data);
    return <div className="relative w-full overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">UM</th>
                    <th scope="col" className="px-6 py-3">Stock</th>
                    <th scope="col" className="px-6 py-3">CreatedAt</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((elem: any) => {
                        return <tr className="bg-white border-b">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "><Link href={"/dashboard/products/" + elem.id}> {elem.id}</Link></td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.name}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.um}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.stock}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.createdAt}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>

}

export default page