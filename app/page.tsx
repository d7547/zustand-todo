'use client';
import { useAuthStore } from '@/stores/auth/auth.store';
import React, { useEffect } from 'react'

function page() {
  const {token , login} = useAuthStore()
   useEffect(() =>{
    login('hp01@mailinator.com', 'Admin@123');
   },[])

  return (
    <div>{token}</div>
  )
}

export default page