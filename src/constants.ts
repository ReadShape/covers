import type { Font } from './types';

type Cover = {
  width: number;
  height: number;
};

export const cover: Cover = {
  width: 240,
  height: 360,
};

type Details = {
  title: Font;
  author: Font;
  gap: number;
  padding: number;
};

export const details: Details = {
  title: {
    fontSize: 24,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    fontColor: '#21252b',
  },
  author: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    fontWeight: 'normal lighter',
    fontColor: '#2a2e36',
  },
  gap: 4,
  padding: 20,
};
