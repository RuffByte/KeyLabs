import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import Head from 'next/head';
import {
  ReactQueryDevtools,
  ReactQueryDevtoolsPanel,
} from '@tanstack/react-query-devtools';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <Head>
        <meta property="og:site_name" content="KeyLabs" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KeyLabs" />
        <meta
          property="og:description"
          content="A website where you click and aim letters"
        />
        <meta
          property="og:image"
          content="https://keylabs-786232600197.australia-southeast1.run.app/api/images/og"
        />
      </Head>
      <QueryClientProvider>
        <body
          className={`${kollektif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Transition>
            <div className="grid h-dvh w-dvw place-items-center overflow-hidden">
              <div className="box-border flex h-full w-full max-w-screen-desktop flex-col p-4">
                {children}
              </div>
            </div>
          </Transition>
        </body>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </html>
  );
}
