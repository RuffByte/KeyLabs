import { getUser } from '@/lib/lucia'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }

  return <div className="text-white">you are logged in as {user.name}</div>
}

export default page
