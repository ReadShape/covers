import type { ShapeBounds } from '../details';

function createCirclePattern(
  ctx: CanvasRenderingContext2D,
  bounds: ShapeBounds,
  width: number,
  height: number,
  resolution: number,
  flow: number[][],
) {
  ctx.globalAlpha = 0.3;
  ctx.beginPath();

  for (let i = 0; i < 1; i += 0.02) {
    const y = Math.floor(i * height) + bounds[0][1];

    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();
  ctx.closePath();
  ctx.globalAlpha = 1;

  ctx.beginPath();
  ctx.arc(
    width / 2 + bounds[0][0],
    height / 2 + bounds[0][1],
    100,
    0,
    Math.PI * 2,
  );
  ctx.clip();
  ctx.closePath();

  for (let i = 0; i < 150; i++) {
    const length = 25;

    let x = 100 * Math.cos((i / 10 / 15) * Math.PI * 2) + width / 2;
    let y = 100 * Math.sin((i / 10 / 15) * Math.PI * 2) + height / 2;

    ctx.beginPath();

    for (let n = 0; n < length; n++) {
      ctx.moveTo(x + bounds[0][0], y + bounds[0][1]);

      const column_index = Math.floor(x / resolution);
      const row_index = Math.floor(y / resolution);

      if (!flow[column_index] || !flow[column_index][row_index]) continue;

      const grid_angle = flow[column_index][row_index];
      const x_step = n * Math.cos(grid_angle);
      const y_step = n * Math.sin(grid_angle);

      x = x - x_step;
      y = y + y_step;

      ctx.lineTo(x + bounds[0][0], y + bounds[0][1]);
    }

    ctx.closePath();
    ctx.stroke();
  }
}

function createMountainPattern(
  ctx: CanvasRenderingContext2D,
  bounds: ShapeBounds,
  width: number,
  height: number,
  resolution: number,
  flow: number[][],
) {
  ctx.globalAlpha = 1;

  for (let i = 30; i < 100; i++) {
    let x = 0;
    let y = Math.floor((i / 100) * height);

    ctx.beginPath();

    if (i % 5) {
      ctx.globalAlpha = 0.3;
    } else {
      ctx.globalAlpha = 1;
    }

    for (let n = 0; n < width; n++) {
      ctx.moveTo(x + bounds[0][0], y + bounds[0][1]);

      const column_index = Math.floor(x / resolution);
      const row_index = Math.floor(y / resolution);

      if (!flow[column_index] || !flow[column_index][row_index]) continue;

      const grid_angle = flow[column_index][row_index];
      const x_step = n * Math.cos(grid_angle);
      const y_step = n * Math.sin(grid_angle);

      x = x - x_step;
      y = y - y_step;

      ctx.lineTo(x + bounds[0][0], y + bounds[0][1]);
    }

    ctx.closePath();
    ctx.stroke();
  }
}

const getIntAtPos = (seed: number, pos: number) =>
  Math.floor((seed % (10 ** pos * 10)) / 10 ** pos);

export function createShapes(
  ctx: CanvasRenderingContext2D,
  bounds: ShapeBounds,
  hash: number,
) {
  const vc = Math.floor(Math.log10(hash) + 1);

  const seed = Array.from({ length: vc }).reduce<number[]>((acc, _, idx) => {
    const ent = getIntAtPos(hash, idx) + 1;
    const nent = getIntAtPos(hash, idx + 1) + 1;

    acc.push(ent);

    if (idx < vc) {
      const steps = Math.floor(Math.abs(ent - nent) / 2);

      if (steps > 0) {
        acc.push(
          ...Array.from(
            { length: steps },
            (_, i) => ent + (i * 2 + 1) * (ent > nent ? -1 : 1),
          ),
        );
      }
    }

    return acc;
  }, []);

  const width = bounds[1][0] - bounds[0][0];
  const height = bounds[1][1] - bounds[0][1];

  const resolution = Math.floor(width * 0.01);
  const columns = width / resolution;
  const rows = height / resolution;

  const flow: number[][] = [];
  const state = new Map<number, { x: number; angle: number }>();

  for (let x = 0; x < columns; x++) {
    const pos = Math.floor((x / columns) * seed.length);
    const ent = seed[pos];

    for (let y = 0; y < rows; y++) {
      if (!flow[x]) flow[x] = [];

      const nangle =
        ((ent / 10 + y / rows + x / columns) / 3) *
          (Math.PI * 1.5 - Math.PI / 2) +
        Math.PI / 2;
      const saved = state.get(y)?.angle ?? nangle;
      const angle = (nangle + saved) / 2;

      flow[x][y] = angle;

      state.set(y, { x, angle });
    }
  }

  if (seed[0] < 5) {
    createCirclePattern(ctx, bounds, width, height, resolution, flow);
  } else {
    createMountainPattern(ctx, bounds, width, height, resolution, flow);
  }
}
