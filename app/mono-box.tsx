import './globals.css';
import { ReactElement } from 'react';

export default function MonoBox(props: { children: ReactElement; width: string; height: string; boxStyle?: string; boxInnerStyle?: string; }) {
    const boxStyle = props.boxStyle;
    const boxInnerStyle = props.boxInnerStyle;
    const width = props.width;
    const height = props.height;

    return (
        <>
            <div className={`0 bg-linear-to-tl from-carbon-black-500 to-carbon-black-400 ${width} ${height} ${boxStyle} rounded-[45pt]`}>
                <div className={`mono-box bg-linear-to-tl from-carbon-black-500 to-carbon-black-400 absolute p-[15pt] w-[calc(100%-30pt)] h-[calc(100%-30pt)] top-[15pt] left-[15pt] rounded-[30pt] ${boxInnerStyle}`}>
                    {props.children}
                </div>
            </div>
        </>
    );
}