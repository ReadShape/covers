import type { Font } from '../types';

export type Line = {
  text: string;
  x: number;
  y: number;
};

export function getWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxHeight: number,
  lineHeight: number,
): {
  lines: Line[];
  offset: number;
} {
  const words = text.split(' ');

  const state: { line: string[]; x: number; y: number } = {
    line: [],
    x,
    y,
  };

  const lines = words.reduce<Line[]>((acc, word, index) => {
    state.line.push(word);

    const metrics = ctx.measureText(state.line.join(' '));

    if (state.y > maxHeight) {
      return;
    }

    if (metrics.width > maxWidth && index > 0) {
      acc.push({
        text: state.line.slice(0, state.line.length - 1).join(' '),
        x: state.x,
        y: state.y,
      });

      state.y += lineHeight;
      state.line = [word];
    }

    if (index + 1 === words.length) {
      acc.push({
        text: state.line.join(' '),
        x: state.x,
        y: state.y,
      });

      if (state.y === 0) {
        state.y += lineHeight;
      }
    }

    return acc;
  }, []);

  return {
    lines,
    offset: lines.length * lineHeight,
  };
}

export function drawWrappedLines(
  ctx: CanvasRenderingContext2D,
  lines: Line[],
  x = 0,
  y = 0,
): void {
  lines.forEach(({ text, ...position }) => {
    ctx.fillText(text, position.x + x, position.y + y);
  });
}

export function getFontStyle(font: Font): string {
  return `${font.fontWeight} ${font.fontSize}px ${font.fontFamily}`;
}
