'use client'

import React from 'react'
import { RiGoogleFill } from '@remixicon/react'
import { getGoogleOauthConsentUrl } from '@/app/login/login.action'
import { toast } from 'sonner'
export const GoogleOAuthButton = () => {
  return (
    <button
      onClick={async () => {
        const res = await getGoogleOauthConsentUrl()
        if (res.url) {
          window.location.href = res.url
        } else {
          toast.error('Something went wrong')
        }
      }}
    >
      <RiGoogleFill className="mr-2 h-4 w-4" />
      Continue with Google!
    </button>
  )
}
