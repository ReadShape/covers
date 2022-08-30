export function getRGBA(num: number): [number, number, number, number] {
  const b = num & 0xff;
  const g = (num & 0xff00) >>> 8;
  const r = (num & 0xff0000) >>> 16;
  const a = ((num & 0xff000000) >>> 24) / 255;

  return [r, g, b, Math.min(a, 0.2)];
}
