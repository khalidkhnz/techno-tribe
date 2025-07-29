import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { UserRole } from '@/types/enums'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout type={UserRole.ADMIN}>{children}</DashboardLayout>
  )
}

export default Layout