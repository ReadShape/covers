import { getRGBA } from '../utils/rgba';

export function getGradient(
  ctx: CanvasRenderingContext2D,
  hash: number,
): CanvasGradient {
  const gradient = ctx.createRadialGradient(120, 0, 240, 120, 360, 240);

  gradient.addColorStop(0, `rgba(${getRGBA(hash).join(', ')})`);
  gradient.addColorStop(0.5, `rgba(${getRGBA(hash / 8).join(', ')})`);
  gradient.addColorStop(1, `rgba(${getRGBA(hash / 2).join(', ')})`);

  return gradient;
}
