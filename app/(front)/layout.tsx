import Footer from '@/components/FrontEnd/Footer'
import NavigationBar from '@/components/FrontEnd/NavigiationBar'

import React, { ReactNode } from 'react'



export default async function Layout({children}: {children:ReactNode}) {
  return (
    <div>
      <NavigationBar/>
     <div className='space-y-2.5 '>
       {children}
    </div>
    </div>
  )
}