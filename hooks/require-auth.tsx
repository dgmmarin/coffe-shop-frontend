"use client";

import { useEffect } from 'react';
import { useAuth } from './use-auth'

import { useRouter } from 'next/navigation';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth()
    useEffect(() => {
        console.log("abcd")
        if (!auth.user) {
            const router = useRouter()
            return router.push('/users');
        }
    }, [auth.user]);
    if(!auth.user){
        return
    }
   return children
}

export default RequireAuth