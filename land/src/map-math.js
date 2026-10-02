export const ART_WIDTH = 1536;
export const ART_HEIGHT = 1024;

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function fitScale(width, height) {
  return Math.min(width / ART_WIDTH, Math.max(200, height - 116) / ART_HEIGHT);
}

export function constrainView(view, size) {
  const minimum = fitScale(size.width, size.height) * 0.88;
  const scale = clamp(view.scale, minimum, 3);
  const width = ART_WIDTH * scale;
  const height = ART_HEIGHT * scale;
  const inset = 90;
  return {
    scale,
    x:
      width <= size.width + 0.01
        ? (size.width - width) / 2
        : clamp(view.x, size.width - width - inset, inset),
    y:
      height < size.height - 80
        ? (size.height - height) / 2 + 12
        : clamp(view.y, size.height - height - inset, inset),
  };
}

export function initialView(size, center = [0.5, 0.5], overview = false) {
  if (overview) center = [0.5, 0.5];
  const fit = fitScale(size.width, size.height);
  const scale =
    size.width < 700 && !overview
      ? Math.max(fit, Math.min((size.height - 112) / ART_HEIGHT, 0.68))
      : fit;
  return constrainView(
    {
      scale,
      x: size.width / 2 - center[0] * ART_WIDTH * scale,
      y: size.height / 2 - center[1] * ART_HEIGHT * scale,
    },
    size,
  );
}

export function zoomAt(view, factor, point, size) {
  const scale = clamp(
    view.scale * factor,
    fitScale(size.width, size.height) * 0.88,
    3,
  );
  const ratio = scale / view.scale;
  return constrainView(
    {
      scale,
      x: point.x - (point.x - view.x) * ratio,
      y: point.y - (point.y - view.y) * ratio,
    },
    size,
  );
}

export function focusPoint(view, spot, size, factor = 1.5) {
  const scale = Math.min(view.scale * factor, 3);
  return constrainView(
    {
      scale,
      x: size.width / 2 - (spot.x / 100) * ART_WIDTH * scale,
      y: size.height / 2 - (spot.y / 100) * ART_HEIGHT * scale,
    },
    size,
  );
}

export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
