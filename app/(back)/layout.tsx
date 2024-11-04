import React, { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Dashboard/Sitebar';
import NavBar from '@/components/Dashboard/Navbar';

// Layout component for the dashboard
export default async function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <NavBar />
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}