import './globals.css';
import { ReactElement } from 'react';

export default function MonoBox(props: { children: ReactElement; width: string; height: string; boxStyle?: string; boxInnerStyle?: string; }) {
    const boxStyle = props.boxStyle;
    const boxInnerStyle = props.boxInnerStyle;
    const width = props.width;
    const height = props.height;

    return (
        <>
            <div className={`bg-linear-to-tl from-carbon-black-500 to-carbon-black-400 ${width} ${height} ${boxStyle} p-[15pt] rounded-[45pt]`}>
                <div className={`mono-box bg-linear-to-tl from-carbon-black-500 to-carbon-black-400 relative p-[15pt] w-full h-full rounded-[30pt] ${boxInnerStyle}`}>
                    {props.children}
                </div>
            </div>
        </>
    );
}