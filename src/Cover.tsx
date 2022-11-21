import type { ImgHTMLAttributes } from 'react';
import { useMemo } from 'react';
import { createBase } from './base';
import { cover } from './constants';
import { createDetails } from './details';
import { createShapes } from './shape';
import { murmur } from './utils/murmur';

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'>;

type CoverProps = {
  title: string;
  authors: string[];
} & ImageProps;

export function Cover({
  title,
  authors,
  ...imageProps
}: CoverProps): JSX.Element {
  const data = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = cover.width;
    canvas.height = cover.height;
    const context = canvas.getContext('2d');

    if (!context) return '';

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

    return canvas.toDataURL('image/png');
  }, [title, authors]);

  return <img {...imageProps} src={data} />;
}
