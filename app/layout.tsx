import Scene from './bg'
import ModularList, { ModularListData } from './modular-list'
import projects from './data/projects.json';
import { preload } from 'react-dom'
import './globals.css'
import { BBH_Sans_Bartle, Google_Sans_Code, Host_Grotesk } from 'next/font/google'

import dotFull from './images/dot-full.svg';
import dotHollow from './images/dot-hollow.svg';
import cadModel from './images/cad-model.svg';
import github from './images/github.svg';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preload(dotFull.src, { as: 'image' });
  preload(dotHollow.src, { as: 'image' });
  preload(cadModel.src, { as: 'image' });
  preload(github.src, { as: 'image' });

  return (
    <html lang="en">
      <body>
        <Scene></Scene>
        {children}
        <ModularList data={projects as ModularListData} />
        <div className="absolute top-[10000px]">x</div>
      </body>
    </html>
  );
}
