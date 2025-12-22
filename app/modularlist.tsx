/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image';
import dotHollow from './images/dot-hollow.svg';
import dotFull from './images/dot-full.svg';
import './globals.css'
import { TITLE, SUBTITLE, BODY } from './layout';
import { ReactElement, useEffect, useRef, useState } from 'react';

/**A modular list of items
 * @param boxTitle (optional) Title of the list.
 * @param listHeaders Array of headers for each list item.
 * @param listSubheaders (optional) Array of subheaders for each list item.
 * @param listText Array of text for each list item.
 * @param imgRefs (optional) List of image filepaths.
 * @param boxPos y-position of box on the page. Expressed as a tailwind utility class.
 * @param boxExtraStyle (optional) Extra tailwind styling for the container.
 * @returns 
 */
export default function ModularList(props: { boxTitle: string; listHeaders: string[]; listSubheaders: (string | undefined)[]; listText: string[]; imgRefs: (string | undefined)[]; boxPos: string; boxExtraStyle?: string; }) {
    const boxTitle = props.boxTitle;
    const listHeaders = props.listHeaders;
    const listSubheaders = props.listSubheaders;
    const listText = props.listText;
    const imgRefs = props.imgRefs;
    const boxExtraStyle = props.boxExtraStyle;

    if (listHeaders.length != listText.length || listHeaders.length != listSubheaders.length || listHeaders.length != imgRefs.length) {
        console.error("ModularList array lengths unequal! If an element is supposed to be empty, specify it as 'undefined'.");
    }

    const listJSX: ReactElement[] = [];
    const dots: ReactElement[] = [];
    for (let i = 0; i < listHeaders.length; i++) {
        let subtitle = undefined, img = undefined;
        if (listSubheaders[i] != undefined) subtitle = <h3 className={`${SUBTITLE.className} text-cornflower-blue-500`}>{listSubheaders[i]}</h3>;
        if (imgRefs[i] != undefined) img = <Image src={imgRefs[i] as string} alt={imgRefs[i] as string}/>;
        listJSX.push((
            <div key={`${boxTitle}${i}`} id={`${boxTitle}${i}`} className="absolute opacity-0 h-[100vh]">
                <h2 className={`${SUBTITLE.className} text-bone-white-500`}>{listHeaders[i]}</h2>
                {subtitle}
                <p className={`${BODY.className} text-bone-white-500`}>{listText[i]}</p>
                {img}
            </div>
        ));
        dots.push(
            <Image key={`dot${i}`} id={`dot${i}`} src={dotHollow} alt="" width={24} height={24} className={`w-[2vw] opacity-25`}/>
        );
    };

    let title;
    if (boxTitle != undefined) title = <h1 id={`${boxTitle} Title`} className={`${TITLE.className} text-cornflower-blue-500`}>{boxTitle}</h1>;

    useEffect(() => {
        let prevI = 0;

        function onLoad() {
            const h = document.documentElement.clientHeight;
            const y = window.scrollY;
            const i = Math.min(Math.max(Math.floor(y / (h*2) + 0.5) - 1, 0), listJSX.length-1);
            const el = document.getElementById(`${boxTitle}${i}`) as HTMLElement;
            const dot = document.getElementById(`dot${i}`) as HTMLImageElement;
            el.style.opacity = '1.0';
            el.style.top = `${document.getElementById(`${boxTitle} Title`)?.clientHeight}px`;
            dot.src = dotFull.src;
            dot.style.opacity = '1.0';
            prevI = i;
        }

        function scroll() {
            const h = document.documentElement.clientHeight;
            const y = window.scrollY;
            const i = Math.min(Math.max(Math.floor(y / (h*2) + 0.5) - 1, 0), listJSX.length-1);
            if (i != prevI) {
                const elIn = document.getElementById(`${boxTitle}${i}`) as HTMLElement;
                const elOut = document.getElementById(`${boxTitle}${prevI}`) as HTMLElement;
                const dot = document.getElementById(`dot${i}`) as HTMLImageElement;
                const dot2 = document.getElementById(`dot${prevI}`) as HTMLImageElement;
                elIn?.animate({
                        opacity: [0, 1],
                        top: ['50vh', `${document.getElementById(`${boxTitle} Title`)?.clientHeight}px`],
                    },{
                        duration: 500,
                        easing: 'ease-in-out',
                        fill: 'both'
                });
                elOut?.animate({
                        opacity: [1, 0],
                        top: [`${elOut?.getBoundingClientRect().top}px`, '50vh'],
                    },{
                        duration: 500,
                        easing: 'ease-in-out',
                        fill: 'both'
                });
                dot.src = dotFull.src;
                dot.animate({
                        opacity: [0.25, 1.0]
                    },{
                        duration: 250,
                        easing: 'ease-in-out',
                        fill: 'both'
                });
                dot2.src = dotHollow.src;
                dot2.animate({
                        opacity: [1.0, 0.25]
                    },{
                        duration: 500,
                        easing: 'ease-in-out',
                        fill: 'both'
                });
                prevI = i;
            }
        }

        window.addEventListener('scroll', scroll);
        window.addEventListener('load', onLoad);
        return () => {
            window.removeEventListener('scroll', scroll);
            window.removeEventListener('load', onLoad);
        }
    });

    return (
    <>
        <div id={boxTitle} style={{ height: `${listHeaders.length*200 + 50}vh` }} className={`relative w-[1vw]`}>
            <div className={`container sticky bg-carbon-black-500 top-0 h-[50vh] sm:h-[100vh] w-[100vw] sm:w-[67vw] ${boxExtraStyle}`}>
                {title}
                {listJSX}
                <div className={`top-1/2 left-[64.5vw] relative w-[1.5vw]`}>
                    {dots}
                </div>
            </div>

        </div>
    </>
    );
}