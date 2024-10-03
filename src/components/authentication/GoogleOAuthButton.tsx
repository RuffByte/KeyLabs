'use client'

import React from 'react'
import { RiGoogleFill } from '@remixicon/react'
import { toast } from 'sonner'

import { getGoogleOauthConsentUrl } from '@/app/login/login.action'
import Button from '@/components/common/Button'

export const GoogleOAuthButton = () => {
  return (
    <Button
      className="flex items-center rounded-input justify-center w-full bg-white px-4 py-2 text-sm text-black hover:bg-gray-100 hover:border"
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
    </Button>
  )
}
