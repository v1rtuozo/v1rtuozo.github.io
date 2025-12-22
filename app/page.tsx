import "./globals.css";
import { TITLE, SUBTITLE, BODY } from './layout';

export default function Page() {
  return (
    <>
      <div className="box-border h-[100vh] relative justify-items-center">
        <div className="text-bone-white-500 relative top-[calc(50vh-3rem)] h-100%">
          <h2 className={`${SUBTITLE.className} text-2xl md:text-3xl tracking-tighter`}>hello, i&apos;m</h2>
          <div></div>
          <h1 className={`${TITLE.className} text-2xl md:text-6xl tracking-tighter`}>ryan zucker</h1>
        </div>
      </div>
      <div className="absolute top-90000">x</div>
    </>
  );
}
