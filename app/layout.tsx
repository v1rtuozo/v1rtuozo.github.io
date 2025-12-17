import { Scene } from './bg'
import './globals.css'
import { BBH_Sans_Bartle, Jersey_10, Host_Grotesk } from 'next/font/google'

export const TITLE = BBH_Sans_Bartle({
  weight: '400',
  subsets: ['latin'],
});

export const SUBTITLE = Jersey_10({
  weight: '400',
  subsets: ['latin'],
})

export const BODY = Host_Grotesk({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Scene></Scene>
        {children}
      </body>
    </html>
  );
}
