import Scene from './bg'
import ModularList from './modularlist'
import Head from 'next/head'
import './globals.css'
import { BBH_Sans_Bartle, Google_Sans_Code, Host_Grotesk } from 'next/font/google'

import dotFull from './images/dot-full.svg';
import dotHollow from './images/dot-hollow.svg';

export const TITLE = BBH_Sans_Bartle({
  weight: '400',
  subsets: ['latin'],
});

export const SUBTITLE = Google_Sans_Code({
  weight: '300',
  subsets: ['latin'],
  style: 'italic',
})

export const BODY = Host_Grotesk({
  subsets: ['latin']
})

const testT = "hello, world!";
const testH = ["item 1", "item 2", "item 3", "item 4"];
const testS = ["subh 1", "subh 2", "subh 3", "subh 4"];
const testX = ["text 1", "text 2", "text 3", "text 4"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Head>
          <link rel="preload" href={dotFull} as="image"></link>
          <link rel="preload" href={dotHollow} as="image"></link>
        </Head>
        <Scene></Scene>
        {children}
        <ModularList listHeaders={testH} listSubheaders={testS} listText={testX} boxTitle={testT} boxPos={'105vh'} imgRefs={[undefined, undefined, undefined, undefined]}></ModularList>
      </body>
    </html>
  );
}
