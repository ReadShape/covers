import type { Font } from './types';

export const cover = {
  width: 240,
  height: 360,
};

export const details: {
  title: Font;
  author: Font;
  gap: number;
  padding: number;
} = {
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
  gap: 2,
  padding: 20,
};
