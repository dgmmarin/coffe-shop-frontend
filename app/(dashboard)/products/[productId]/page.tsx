"use client"
import { User } from "@/hooks/use-user";
import { FC } from "react";

interface pageProps {
    user: User
}

const getProduct = async (id: number) => {
    const res = await fetch("http://127.0.0.1:4000/product/" + id, {
        next: {
            revalidate: 5
        },
    })
    // if ([200,201].indexOf(res.status) == -1){
    //     throw new Error(res.statusText)
    // }
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    return await res.json()
}

const page: FC<pageProps> = async (props: any) => {
    console.log(props.params.productId)
    const data = await getProduct(props.params.productId)
    console.log(data)
    return <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
        <div className="flex space-x-4">
            <img alt="" src="https://source.unsplash.com/100x100/?portrait" className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
            <div className="flex flex-col space-y-1">
                <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">Leroy Jenkins</a>
                <span className="text-xs dark:text-gray-400">4 hours ago</span>
            </div>
        </div>
        <div>
            <img src="https://source.unsplash.com/random/100x100/?5" alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
            <h2 className="mb-1 text-xl font-semibold">{data.name}</h2>
            <table>
                <thead className="caption-left text-left">
                    <tr>
                        <th>ID</th><td>{data.id}</td>
                    </tr>
                    <tr><th>Name</th><td>{data.name}</td></tr>
                    <tr><th>Stock</th><td>{data.stock}</td></tr>
                    <tr><th>UM</th><td>{data.um}</td></tr>
                    <tr><th>CreatedAt</th></tr>
                    <tr><th>DeletedAt</th></tr>


                </thead>
            </table>
        </div>

    </div>
}

export default page