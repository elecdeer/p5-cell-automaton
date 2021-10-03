import p5 from "p5";

import tsIconImg from "../assets/tsicon.png";

export const sketch = (p5: p5): void => {
  let img: p5.Image;

  p5.setup = () => {
    p5.createCanvas(600, 400);

    img = p5.loadImage(tsIconImg);
  };

  p5.draw = () => {
    p5.background(0);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate((p5.frameCount / 120) * p5.TWO_PI);

    const size = 100;
    p5.image(img, -size / 2, -size / 2, size, size);
  };
};
