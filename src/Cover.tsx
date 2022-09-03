import React, { useEffect, useState } from 'react';
import { createBase } from './base';
import { cover } from './constants';
import { createDetails } from './details';
import { createShapes } from './shape';
import { murmur } from './utils/murmur';
import { CacheOptions, StorageOptions } from './types';
import * as localforage from 'localforage';

type CoverProps = {
    title: string;
    authors: string[];
    className?: string;
    style?: React.CSSProperties;
    fallbackElement?: React.ReactNode;
    cacheOptions?: CacheOptions;
};

export function Cover({ title, authors, className, style, fallbackElement, cacheOptions }: CoverProps): JSX.Element {
    const [data, setData] = useState<string | undefined>(undefined)
    const cacheIdentifier = cacheOptions?.identifier;
    const location = cacheOptions?.storage

    const str = `${title} ${authors.join(' ')}`;
    const identifier = `${cacheIdentifier ? cacheIdentifier : str}-canvas`


    // Tries to get a canvas from cache if one is specified
    const retrieveCanvas = async () => {
        if (location){
            if (location === StorageOptions.indexeddb || location === StorageOptions.localstorage){
                const ls = localforage.createInstance({driver: location})
                return await ls.getItem<string | null>(identifier)
            } else {
                return window.sessionStorage.getItem(identifier)
            }
        } else {
            return null
        }
    }

    // Tries saving a canvas on cache if one is specified
    const saveCanvas = async (canvasDataURL: string) => {
        if (location){
            if (location === StorageOptions.indexeddb || location === StorageOptions.localstorage){
                const ls = localforage.createInstance({driver: location})
                await ls.setItem(identifier, canvasDataURL);
                return;
            } else {
                sessionStorage.setItem(identifier, canvasDataURL);
                return;
            }

        } else {
            return;
        }

    }

    useEffect(() => {
        retrieveCanvas().then((retrievedCanvas) => {
            if (retrievedCanvas == null){
                const canvas = document.createElement('canvas');
                canvas.width = cover.width;
                canvas.height = cover.height;
                const context = canvas.getContext('2d');

                if (!context) {
                    setData("");
                    return;
                }
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
                const canvasDataURL = canvas.toDataURL();
                saveCanvas(canvasDataURL).then(() => {
                    setData(canvasDataURL);
                })
            } else {
                setData(retrievedCanvas)
            }
        })

    }, [title, authors])


    return <>
        {data ? <img alt="" src={data} className={className} style={style} /> : fallbackElement ? fallbackElement : null}
    </> ;
}
