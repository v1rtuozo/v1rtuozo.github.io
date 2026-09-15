import './globals.css';
import { ReactElement } from 'react';

export default function MonoHeader(props: { children: ReactElement, boxStyle?: string }) {
    const boxStyle = props.boxStyle;

    return (
        <>
            <div className={`mono-header relative bg-linear-to-tl from-deep-blue-500 to-deep-blue-400 ${boxStyle} rounded-full p-[15pt] w-fit`}>
                {props.children}
            </div>
        </>
    )
}