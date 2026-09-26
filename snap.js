// snap.js：吸附到最近的网格倍数，距离不超过容差才吸，等距时取较小倍数
export function snapAngle(angle, step, tolerance) {
  const lower = Math.floor(angle / step) * step;
  const upper = lower + step;
  const target = (angle - lower <= upper - angle) ? lower : upper;
  return Math.abs(angle - target) <= tolerance ? target : angle;
}
