// angle.js：角度换算（横轴正方向为零度，逆时针为正）
export function angleOf(vector) {
  const x = vector[0];
  const y = vector[1];
  if (x === 0 && y === 0) {
    const error = new Error("zero vector has no angle");
    error.code = "E_ZERO_VECTOR";
    throw error;
  }
  const degrees = Math.round((Math.atan2(y, x) * 180) / Math.PI);
  return ((degrees % 360) + 360) % 360;
}
