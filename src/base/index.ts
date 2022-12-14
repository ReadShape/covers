import { cover } from '../constants';
import { getGradient } from './gradient';

export function createBase(
  ctx: CanvasRenderingContext2D,
  hash: number,
  seed: number,
): void {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cover.width, cover.height);

  if (seed < 7) {
    ctx.fillStyle = getGradient(ctx, hash);
  } else {
    ctx.fillStyle = '#fcf7ed';
  }

  ctx.fillRect(0, 0, cover.width, cover.height);
}
