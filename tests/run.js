import assert from "node:assert";
import { angleOf } from "../angle.js";
import { snapAngle } from "../snap.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("angleOf returns a number", () => {
  assert.strictEqual(typeof angleOf([1, 0]), "number");
});

check("snapAngle returns a number", () => {
  assert.strictEqual(typeof snapAngle(10, 15, 7), "number");
});

check("render returns one angle per vector", () => {
  assert.strictEqual(render({ vectors: [[1, 0]], step: 15, tolerance: 7 }).angles.length, 1);
});

check("render counts moved", () => {
  assert.strictEqual(typeof render({ vectors: [[1, 0]], step: 15, tolerance: 7 }).moved, "number");
});

check("render counts multiples", () => {
  assert.strictEqual(typeof render({ vectors: [[1, 0]], step: 15, tolerance: 7 }).multiples, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
