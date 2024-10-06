'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { devConfig } from '@/devconfig';

export default function Redirect404() {
  const router = useRouter();

  if (devConfig.DISABLE_NOTFOUND) {
    router.push('/');
  }
  return <div>not found xd</div>;
}
