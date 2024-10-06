import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import Head from 'next/head';
import {
  ReactQueryDevtools,
  ReactQueryDevtoolsPanel,
} from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

import Transition from '@/components/common/ui/transition/Transition';
import { Leaderboard } from '@/components/Leaderboard';
import QueryClientProvider from '@/components/providers/QueryClientProvider';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const kollektif = localFont({
  src: [
    {
      path: '../fonts/Kollektif/Kollektif.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Kollektif/Kollektif-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Kollektif/Kollektif-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/Kollektif/Kollektif-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-kollektic',
});

export const metadata: Metadata = {
  title: 'KeyLabs',
  description: 'A website where you click and aim letters',
  twitter: {
    title: 'KeyLabs',
    description: 'A website where you click and aim letters',
    card: 'summary_large_image',
    images:
      'https://keylabs-786232600197.australia-southeast1.run.app/og/og-twitter.png',
  },
  openGraph: {
    title: 'KeyLabs',
    description: 'A website where you click and aim letters',
    url: 'https://keylabs-786232600197.australia-southeast1.run.app',
    images:
      'https://keylabs-786232600197.australia-southeast1.run.app/og/og-image.png',
    siteName: 'KeyLabs',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <QueryClientProvider>
        <body
          className={`${kollektif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Transition>
            <div className="grid h-dvh w-dvw place-items-center overflow-hidden">
              <div className="flex h-full w-full max-w-screen-desktop flex-col">
                {children}
              </div>
            </div>
          </Transition>
        </body>
        <Toaster richColors />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </html>
  );
}
