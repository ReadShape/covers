import { useMemo } from 'react';
import { createBase } from './base';
import { createDetails } from './details';
import { createShapes } from './shape';
import { murmur } from './utils/murmur';

type CoverProps = {
  title: string;
  authors: string[];
};

export function Cover({ title, authors }: CoverProps): JSX.Element {
  const data = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 360;
    const context = canvas.getContext('2d');

    const str = `${title} ${authors.join(' ')}`;
    const hash = murmur(str);

    const v1 = hash % 10;
    const v2 = ((hash % 100) - v1) / 10;
    const remainingEntropy = Math.floor(hash / 1000);

    context.beginPath();
    context.rect(0, 0, 240, 360);
    context.clip();

    createBase(context, hash, v1);
    const bounds = createDetails(context, title, authors, v2);

    context.beginPath();
    context.rect(bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]);
    context.clip();

    createShapes(context, bounds, remainingEntropy);

    return canvas.toDataURL('image/png');
  }, [title, authors]);

  return <img src={data} />;
}
