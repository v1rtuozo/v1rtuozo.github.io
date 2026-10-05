import Scene from './bg'
import ModularList, { ModularListData } from './modular-list'
import experience from './data/experience.json';
import projects from './data/projects.json';
import whoami from './data/whoami.json';
import signature from './images/signature.svg';
import mailto from './images/mailto.svg';
import github from './images/github.svg';
import linkedin from './images/linkedin.svg';
import './globals.css'
import { BBH_Sans_Bartle, Google_Sans_Code, Host_Grotesk } from 'next/font/google'

import MonoBox from './mono-box';
import MonoHeader from './mono-header';
import Image from 'next/image';
import MonoLink from './mono-link';

export const TITLE = BBH_Sans_Bartle({
  weight: '400',
  subsets: ['latin'],
});

export const SUBTITLE = Google_Sans_Code({
  weight: '300',
  subsets: ['latin'],
  style: 'italic',
});

export const BODY = Host_Grotesk({
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Scene></Scene>
        <div className={`relative w-[950px] left-[50vw] translate-x-[-50%]`}>
          {children}
          <MonoBox width={'w-[75%]'} height={'h-fit'} boxStyle={`relative left-[50%] translate-x-[-50%] mb-[50pt]`}>
            <>
              <MonoHeader>
                <h1 className={`${TITLE.className} text-cornflower-blue-500 w-fit`}>
                  Who Am I?
                </h1>
              </MonoHeader>
              <h2 className={`${SUBTITLE.className} text-bone-white-500 pt-[15pt] text-3xl`}>
                Hi there,
              </h2>
              <div className={`${BODY.className} text-bone-white-500 whitespace-pre-wrap text-justify`}>
                {whoami.body}
              </div>
              <Image src={signature} alt={""} className={`absolute translate-x-[45pt] translate-y-[-65pt]`} width={128} height={128}></Image>
            </>
          </MonoBox>
          <ModularList listId="projects" data={projects as ModularListData} align={'left'} />
          <div className={`relative w-[100vw] h-[50pt]`}></div>
          <ModularList listId="experience" data={experience as ModularListData} align={'right'} />
        </div>
        <div className={`relative w-full h-fit bg-carbon-black-500 mt-[15pt] pt-[15pt] pb-[10pt]`}>
          <div className={`w-fit mx-auto`}>
            <div className="flex relative gap-[10pt] w-max">
              <MonoHeader>
                <h1 className={`${TITLE.className} text-cornflower-blue-500 w-fit`}>
                  Get In Touch
                </h1>
              </MonoHeader>
              <MonoLink link={"mailto:ryan.zucker@icloud.com"} img={mailto} size={40} />
              <MonoLink link={"https://github.com/v1rtuozo"} img={github} size={40} />
              <MonoLink link={"https://linkedin.com/in/ryan-zucker-a7a9662a1/"} img={linkedin} size={40} />
            </div>
            <div className={`${BODY.className} text-bone-white-500 mt-[5pt]`}>
              made with ♡ by v1rtuozo/Ryan Zucker.
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
