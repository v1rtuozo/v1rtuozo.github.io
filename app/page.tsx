import "./globals.css";
import { TITLE, SUBTITLE, BODY } from './layout';

export default function Page() {
  return (
    <>
      <div className="contianer w-full absolute">
        <p className={`flex ${SUBTITLE.className} text-5xl tracking-wider justify-center`} >hello, i&apos;m</p>
        <div></div>
        <p className={`flex ${TITLE.className} text-5xl tracking-tighter justify-center`}>ryan zucker</p>
      </div>
      <div className="top-90000 absolute">t</div>
    </>
  );
}