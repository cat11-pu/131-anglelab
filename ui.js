// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let step = spec.step || 15;
  parts.log.textContent = "向量 " + (spec.vectors || []).length + " 个，网格 " + step + " 度。";

  function draw() {
    const scene = Object.assign({}, spec, { step: step });
    let view = null;
    try {
      view = render(scene);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.angles.forEach(function (angle, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = JSON.stringify((spec.vectors || [])[spot]);
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.snapped[spot] === angle ? "" : " ok");
      mark.textContent = angle + " 度 -> " + view.snapped[spot] + " 度";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "最大角度 " + view.biggest + "，吸附 " + view.moved + " 个";
    parts.log.textContent = "网格倍数 " + view.multiples + " 个";
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算角度并吸附";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const coarseButton = document.createElement("button");
  coarseButton.textContent = "网格变粗";
  coarseButton.addEventListener("click", function () {
    step = Math.min(90, step * 2);
    draw();
  });
  parts.controls.appendChild(coarseButton);

  const fineButton = document.createElement("button");
  fineButton.textContent = "网格变细";
  fineButton.addEventListener("click", function () {
    step = Math.max(5, Math.round(step / 2));
    draw();
  });
  parts.controls.appendChild(fineButton);

  const label = document.createElement("label");
  label.textContent = "网格度数";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(step);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 1 && 360 % parsed === 0) { step = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最大角度";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { step: step }));
    parts.out.textContent = "最大角度 " + view.biggest + "，吸附 " + view.moved + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
