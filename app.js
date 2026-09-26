// app.js：渲染结果
import { angleOf } from "./angle.js";
import { snapAngle } from "./snap.js";

export function render(spec) {
  const vectors = spec.vectors || [];
  const step = spec.step || 1;
  const tolerance = spec.tolerance || 0;
  const angles = vectors.map((item) => angleOf(item));
  const snapped = angles.map((value) => snapAngle(value, step, tolerance));
  let moved = 0;
  angles.forEach((value, spot) => { if (value !== snapped[spot]) moved += 1; });
  return { angles: angles, snapped: snapped, moved: moved,
           biggest: angles.length ? Math.max.apply(null, angles) : 0,
           count: vectors.length, multiples: Math.floor(360 / step) };
}
