"use client"
import Pagination from "@/app/components/pagination";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from "react";


interface pageProps { }



export default function Page(){
    const searchParams = useSearchParams()
    const router = useRouter();
    const [limit, setLimit] = useState(parseInt(searchParams.get("limit") ?? "1"))
    const [page, setPage] = useState( parseInt(searchParams.get("page") ?? "1"))
    const [count, setCount] = useState(0);
    const [data, setData] = useState({items:[],meta:{totalItems:10,itemsPerPage:limit,currentPage:page}})
    useEffect(() =>{
        const getProducts = async (page:number, limit:number) => {
            const res = await fetch(`http://127.0.0.1:4000/product?page=${page}&limit=${limit}`, {
                next: {
                    revalidate: 2
                },
            })
            return await res.json()
        }

        getProducts(page, limit).then(_data => {
            console.log(page)
            console.log(searchParams.get("page"))
            setPage(parseInt(searchParams.get("page") ?? "1"))
                
                    setData(_data)
                
        })
        setCount((count) => count + 1); 
    },[router])
    return <>
    <div className="relative w-full overflow-x-auto shadow-md">
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
                    data.items.map((elem: any) => {
                        return <tr key={elem.id} className="bg-white border-b">
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
        <Pagination
     totalItems={data.meta.totalItems}
     currentPage={data.meta.currentPage}
     itemsPerPage={data.meta.itemsPerPage}
     renderPageLink={(page, limit) => `products?page=${page}&limit=${limit}`}
     setPage={() => setPage(page)}  />
    </div>
    </>
   

}

// export default page