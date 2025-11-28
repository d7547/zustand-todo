'use client';
import { useAuthStore } from '@/stores/auth/auth.store';
import React, { useEffect } from 'react'

function page() {
  const {token , login} = useAuthStore()
   useEffect(() =>{
    login('hp01@mailinator.com', 'Admin@123');
   },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo App</h1>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded border border-gray-200">
        <p className="text-sm text-gray-600">Auth Token</p>
        <p className="text-xs text-gray-800 break-all mt-2">{token || 'Loading...'}</p>
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
        Create Todo
        </button>
      </div>
      </div>
    </div>
  )
}

export default page