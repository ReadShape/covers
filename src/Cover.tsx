import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createBase } from './base';
import { cover } from './constants';
import { createDetails } from './details';
import { createShapes } from './shape';
import { murmur } from './utils/murmur';

type CoverProps = {
    title: string;
    authors: string[];
    className?: string;
    style?: React.CSSProperties;
    fallbackElement?: React.ReactNode;
};

export function Cover({ title, authors, className, style, fallbackElement }: CoverProps): JSX.Element {
    const [data, setData] = useState<string | undefined>(undefined)

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = cover.width;
        canvas.height = cover.height;
        const context = canvas.getContext('2d');

        if (!context) return;

        const str = `${title} ${authors.join(' ')}`;
        const hash = murmur(str);

        const v1 = hash % 10;
        const v2 = ((hash % 100) - v1) / 10;
        const remainingEntropy = Math.floor(hash / 1000);

        context.beginPath();
        context.rect(0, 0, cover.width, cover.height);
        context.clip();

        createBase(context, hash, v1);
        const bounds = createDetails(context, title, authors, v2);

        context.beginPath();
        context.rect(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]);
        context.clip();

        createShapes(context, bounds, remainingEntropy);

        const canvasUrl = canvas.toDataURL('image/png');
        setData(canvasUrl)

    }, [title, authors])


    return <>
        {data ? <img alt="" src={data} className={className} style={style} /> : fallbackElement ? fallbackElement : null}
    </> ;
}
