import RegisterFormWitBg from '@/components/Auth/Register';
import React from 'react'

export default function page({
  searchParams,
}:{
  searchParams: { [key: string]: string | string[]| undefined};
}) {
  const { role } = searchParams;
  console.log(role);
  return (
    <div className="">
      <RegisterFormWitBg role={role} />
    </div>
  )
}