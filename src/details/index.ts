import { cover, details } from '../constants';
import { drawWrappedLines, getFontStyle, getWrappedText } from '../utils/text';

export type ShapeBounds = [[number, number], [number, number]];

type HPlacement = 'left' | 'center' | 'right';
type VPlacement = 'top' | 'bottom';
type Placement = [VPlacement, HPlacement];

function getPlacement(seed: number): Placement {
  switch (seed) {
    case 0:
    case 1:
      return ['top', 'left'];
    case 2:
    case 3:
      return ['top', 'center'];
    case 4:
      return ['top', 'right'];
    case 5:
    case 6:
      return ['bottom', 'left'];
    case 7:
    case 8:
      return ['bottom', 'center'];
    case 9:
      return ['bottom', 'right'];
  }
}

function getY(placement: VPlacement, offset: number): number {
  switch (placement) {
    case 'top':
      return offset - details.padding;
    case 'bottom':
      return cover.height - offset + details.padding;
  }
}

function getX(placement: HPlacement): number {
  switch (placement) {
    case 'left':
      return details.padding;
    case 'center':
      return cover.width / 2;
    case 'right':
      return cover.width - details.padding;
    default:
      throw new Error('Invalid placement');
  }
}

export function createDetails(
  ctx: CanvasRenderingContext2D,
  title: string,
  [author]: string[],
  seed: number,
): ShapeBounds {
  const placement = getPlacement(seed);
  ctx.textAlign = placement[1];

  ctx.fillStyle = 'black';
  ctx.font = getFontStyle(details.title);

  const wrappedTitle = getWrappedText(
    ctx,
    title,
    0,
    0,
    cover.width - details.padding * 2,
    cover.height / 2,
    details.title.fontSize,
  );

  ctx.fillStyle = 'black';
  ctx.font = getFontStyle(details.author);

  const wrappedAuthor = getWrappedText(
    ctx,
    author,
    0,
    0,
    cover.width - details.padding * 2,
    details.author.fontSize,
    details.author.fontSize,
  );

  const height =
    details.padding * 2 +
    details.gap +
    wrappedTitle.offset +
    wrappedAuthor.offset;
  const isTopPlacement = placement[0] === 'top';

  ctx.fillStyle = details.title.fontColor;
  ctx.font = getFontStyle(details.title);

  drawWrappedLines(
    ctx,
    wrappedTitle.lines,
    getX(placement[1]),
    getY(
      placement[0],
      isTopPlacement
        ? height - wrappedTitle.offset
        : height - wrappedAuthor.offset,
    ),
  );

  ctx.fillStyle = details.author.fontColor;
  ctx.font = getFontStyle(details.author);

  drawWrappedLines(
    ctx,
    wrappedAuthor.lines,
    getX(placement[1]),
    getY(
      placement[0],
      isTopPlacement
        ? height + details.gap
        : height - wrappedTitle.offset - details.gap - wrappedAuthor.offset,
    ),
  );

  return [
    [0, isTopPlacement ? height : 0],
    [cover.width, isTopPlacement ? cover.height : cover.height - height],
  ];
}
