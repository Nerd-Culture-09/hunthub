import { authOptions } from '@/lib/auth'
import LoginFormWithBg from '@/components/Auth/Login'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  return (
    <div className="">
      <LoginFormWithBg/> 
    </div>
  )
}
