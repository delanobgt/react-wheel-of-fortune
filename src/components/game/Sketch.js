export default function sketch(p) {
  let speed = 0, acc = -0.01;
  let rotateAngle = 0;

  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    console.log('triggered', props)
    if (props.rotation) {
      
    }
  };

  p.start = () => {
    speed = 0;
    acc = (p.random(5) + 5) / 1000;
  }

  p.draw = () => {
    p.clear();
    p.background(200);
    p.noStroke();

    p.translate(p.width / 2, p.height / 2);
    if (speed >= 1 && acc > 0) acc = -acc;
    if (speed <= 0 && acc < 0) speed = 0;
    rotateAngle = (rotateAngle + speed) % (2 * Math.PI);
    speed += acc;
    p.rotate(rotateAngle);

    [100, 200, 300, 400, 300, 200, 100].forEach((e, idx, values) => {
      p.push();
      const len = values.length;
      p.rotate((2 * Math.PI * (idx + 1)) / len);
      p.fill((255 * (idx + 1)) / len);
      p.arc(0, 0, 300, 300, 0, (2 * Math.PI) / len, p.PIE);

      p.rotate(Math.PI / len);
      p.fill(0, 200, 0);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(e, 75, 0);

      p.pop();
    });
  };
}
