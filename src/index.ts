import p5 from "p5";

import { sketch } from "./app/main";

const p5Instance = new p5(sketch);

setInterval(() => {
  console.log({
    frame: p5Instance.frameCount,
    framerate: p5Instance.frameRate(),
  });
}, 1000);
