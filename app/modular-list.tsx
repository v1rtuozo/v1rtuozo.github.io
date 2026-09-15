'use client'

import Image from 'next/image';
import dotHollow from './images/dot-hollow.svg';
import dotFull from './images/dot-full.svg';
import cadModel from './images/cad-model.svg';
import github from './images/github.svg';
import linkImg from './images/link.svg';
import './globals.css'
import { TITLE, SUBTITLE, BODY } from './layout';
import { CSSProperties, ReactElement, useEffect, useRef, useState } from 'react';
import MonoBox from './mono-box';
import MonoHeader from './mono-header';
import MonoLink from './mono-link';

export interface ModularListItem {
    title: string;
    subtitle?: string;
    description: string;
    links?: {
        title: string;
        url: string;
    }[];
    image?: string;
}

export interface ModularListData {
    title: string;
    items: ModularListItem[];
}

const ITEM_HEIGHT = 65; // in vh
const LINK_ANIMATION_DURATION = 300;
const LINK_ANIMATION_DELAY = 100;
const LINK_SETTLE_DELAY = 25;

const getLinkTransitionDuration = (linkCount: number) =>
    LINK_ANIMATION_DURATION + Math.max(0, linkCount - 1) * LINK_ANIMATION_DELAY;

export default function ModularList(props: { data: ModularListData; boxExtraStyle?: string; }) {
    const { data, boxExtraStyle } = props;
    const boxTitle = data.title;
    const items = data.items;   
    const listRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [settledIndex, setSettledIndex] = useState(0);
    const [linkIndex, setLinkIndex] = useState(0);
    const [isLinkExiting, setIsLinkExiting] = useState(false);
    const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const linkIndexRef = useRef(0);
    const linkExitStartedAtRef = useRef<number | null>(null);

    useEffect(() => {
        const list = listRef.current;
        const stages = list?.querySelectorAll<HTMLElement>('.list-stage');
        if (!stages?.length) return;

        const documentTop = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;
        const onScroll = () => {
            const firstTarget = documentTop(stages[0]);
            const lastTarget = documentTop(stages[stages.length - 1]);
            const isInsideList = window.scrollY >= firstTarget && window.scrollY <= lastTarget;
            document.documentElement.classList.toggle('list-snapping', isInsideList);

            if (isInsideList) {
                const nextIndex = Math.min(
                    items.length - 1,
                    Math.max(0, Math.round((window.scrollY - firstTarget) / (window.innerHeight * ITEM_HEIGHT / 100))),
                );
                setActiveIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
                if (nextIndex === linkIndexRef.current && linkExitStartedAtRef.current !== null) {
                    linkExitStartedAtRef.current = null;
                    setIsLinkExiting(false);
                } else if (nextIndex !== linkIndexRef.current && linkExitStartedAtRef.current === null) {
                    linkExitStartedAtRef.current = Date.now();
                    setIsLinkExiting(true);
                }
                if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
                settleTimeoutRef.current = setTimeout(
                    () => setSettledIndex(nextIndex),
                    LINK_SETTLE_DELAY,
                );
            }
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
            document.documentElement.classList.remove('list-snapping');
        };
    }, [items]);

    useEffect(() => {
        if (settledIndex === linkIndex) return;

        const oldLinkCount = items[linkIndex]?.links?.length ?? 0;
        const transitionDuration = getLinkTransitionDuration(oldLinkCount);
        const exitStartedAt = linkExitStartedAtRef.current ?? Date.now();
        const remainingTransitionDuration = Math.max(0, transitionDuration - (Date.now() - exitStartedAt));
        const transitionTimeout = setTimeout(() => {
            linkIndexRef.current = settledIndex;
            setLinkIndex(settledIndex);
            setIsLinkExiting(false);
            linkExitStartedAtRef.current = null;
        }, remainingTransitionDuration);

        return () => {
            clearTimeout(transitionTimeout);
        };
    }, [items, settledIndex, linkIndex]);

    const listJSX: ReactElement[] = [];
    items.forEach((item, i) => {
        const subtitle = item.subtitle ? <h3 className={`${SUBTITLE.className} text-cornflower-blue-500`}>{item.subtitle}</h3> : null;
        const img = item.image ? <Image src={item.image} alt={item.title} width={320} height={180} /> : null;
        listJSX.push((
            <div key={`${boxTitle}-item-${i}`} id={`${boxTitle}-${i}`} data-list-item={true} data-list-first={i === 0 || undefined} data-list-last={i === items.length - 1 || undefined} className="carousel-item absolute pt-[15pt] box-border" style={{ '--item-index': i } as CSSProperties}>
                <div>
                    <h2 className={`${SUBTITLE.className} text-bone-white-500`}>{item.title}</h2>
                    {subtitle}
                    <p className={`${BODY.className} text-bone-white-500`}>{item.description}</p>
                    {img}
                </div>
            </div>
        ));
    });

    const linkAnimationClass = isLinkExiting ? 'list-link-exit' : 'list-link-visible';
    const listLinkJSX = (items[linkIndex]?.links ?? []).map((link, i) => {
        let linkImage = null;
        if (link.title == 'GitHub') linkImage = github;
        else if (link.title == 'Onshape') linkImage = cadModel;
        else linkImage = linkImg;
        return (
            <MonoLink key={`${boxTitle}-${linkIndex}-link-${i}`} img={linkImage} link={link.url} altText={link.title} size={40} animationDelay={i * LINK_ANIMATION_DELAY} style={`list-link ${linkAnimationClass}`} />
        );
    });

    let title;
    if (boxTitle != undefined) {
        title = (
        <MonoHeader boxStyle={`z-[2]`}>
            <h1 id={`${boxTitle}-title`} className={`${TITLE.className} text-cornflower-blue-500 w-fit`}>{boxTitle}</h1>
        </MonoHeader>
        );
    }

    return (
    <>
        <div id={boxTitle} style={{ '--item-height': `${ITEM_HEIGHT}vh`, height: `calc(100vh + ${items.length * ITEM_HEIGHT}vh)` } as CSSProperties} className="relative overflow-visible">
            <MonoBox width={'w-[calc(67vw-30pt)]'} height={'h-[calc(100vh-30pt)]'} boxStyle={`container sticky top-[15pt] left-[15pt] z-[1] overflow-visible ${boxExtraStyle}`} boxInnerStyle="overflow-hidden">
                <div className={`w-full h-full`}>
                    <div className="flex items-center gap-[7.5pt] flex-wrap">
                        {title}
                        <div className="list-link-rail flex items-center gap-[7.5pt] flex-wrap">
                            {listLinkJSX}
                        </div>
                    </div>
                    {listJSX}
                    <div aria-hidden="true" className="absolute right-[15pt] top-1/2 translate-y-[-50%] w-fit">
                        {items.map((_, i) => (
                            <Image key={`dot${i}`} id={`dot${i}`} data-list-dot src={i === activeIndex ? dotFull : dotHollow} alt="" width={16} height={16} className={i === activeIndex ? 'opacity-100 pt-[7.5pt] pb-[7.5pt]' : 'opacity-25 pt-[7.5pt] pb-[7.5pt]'}/>
                        ))}
                    </div>
                </div>
            </MonoBox>
            <div ref={listRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {items.map((_, i) => <div key={`${boxTitle}-stage-${i}`} className="list-stage relative" />)}
            </div>
        </div>
    </>
    );
}