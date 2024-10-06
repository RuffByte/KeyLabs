'use client';

import { useRouter } from 'next/navigation';

import { devConfig } from '@/devconfig';

export default function Redirect404() {
  const router = useRouter();

  if (devConfig.DISABLE_NOTFOUND) {
    router.push('/');
  }
  return <div>not found xd</div>;
}
