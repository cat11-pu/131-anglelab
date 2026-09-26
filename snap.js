// snap.js：吸附到网格倍数（距离不超过容差才吸，平局吸较小倍数）
export function snapAngle(angle, step, tolerance) {
  if (!(step > 0) || 360 % step !== 0) {
    const error = new Error("step must divide 360");
    error.code = "E_BAD_STEP";
    throw error;
  }
  const lower = Math.floor(angle / step);
  const upper = lower + 1;
  const lowerDistance = angle - lower * step;
  const upperDistance = upper * step - angle;
  const nearest = lowerDistance <= upperDistance ? lower : upper;
  const distance = Math.min(lowerDistance, upperDistance);
  if (distance > tolerance) {
    return angle;
  }
  return (nearest * step) % 360;
}
