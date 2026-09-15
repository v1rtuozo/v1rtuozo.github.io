import { CSSProperties } from 'react';
import './globals.css';
import Image from 'next/image';

export default function MonoLink(props: { link: string, img: string, altText?: string,size: number, style?: string, animationDelay?: number }) {
    return (
        <a href={props.link} target="_blank" rel="noopener noreferrer">
            <div className={`mono-link ${props.style} rounded-full p-[7.5pt] w-fit`} style={{ '--link-animation-delay': `${props.animationDelay ?? 0}ms` } as CSSProperties}>
                <Image src={props.img} alt={props.altText || ""} width={props.size} height={props.size}/>
            </div>
        </a>
    )
}