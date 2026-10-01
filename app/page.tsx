import "./globals.css";
import { TITLE, SUBTITLE, BODY } from './layout';
import Image from 'next/image';
import arrowDown from './images/arrow-down.svg';

export default function Page() {
  return (
    <>
      <div className="h-[100vh] relative justify-items-center">
        <div className="text-bone-white-500 absolute top-[50vh] translate-y-[-50%] h-fit">
          <h2 className={`${SUBTITLE.className} text-3xl tracking-tighter`}>hello, i&apos;m</h2>
          <div></div>
          <h1 className={`${TITLE.className} text-6xl tracking-tighter`}>ryan zucker</h1>
        </div>
        <Image src={arrowDown} alt={""} width={64} height={64} className={`absolute arr-down bottom-[15pt]`}></Image>
      </div>
    </>
  );
}
