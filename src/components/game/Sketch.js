let myProps = {}

export default function sketch(p) {
  let speed = 0, acc = 0;
  let rotateAngle = 0;

  p.setup = () => {
    p.createCanvas(340, 340);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    myProps = props
    if (!props) return
    if (props.wheelTrigger) {
      speed = 0;
      acc = (p.random(10) + 5) / 1000;
    }
  };

  p.draw = () => {
    const SCORES = [100, 200, 300, 400, 500, 600, 700, 800, 900]

    p.clear();
    // p.background(255, 200, 200);
    p.noStroke();

    p.translate(p.width / 2, p.height / 2);
    p.fill(0)
    p.triangle(150, 0, 170, -10, 170, 10)
    if (speed >= 1 && acc > 0) acc = -acc;
    if (speed <= 0 && acc < 0 && myProps.wheelTrigger) {
      speed = 0;
      acc = 0;
      myProps.toggleWheelTrigger(false)
      const gotScoreIndex = Math.floor(rotateAngle/(2*Math.PI/SCORES.length))
      myProps.setScoreMultiplier(SCORES[(SCORES.length - gotScoreIndex - 1) % SCORES.length])
    }
    rotateAngle = (rotateAngle + speed) % (2 * Math.PI);
    speed += acc;
    p.rotate(rotateAngle);

    const colorRGBs = [
      [255, 0, 0],
      [255, 127, 0],
      [255, 255, 0],
      [0, 255, 0],
      [0, 0, 255],
      [139, 0, 255],
    ];

    SCORES.forEach((e, idx, values) => {
      p.push();
      const len = values.length;
      p.rotate((2 * Math.PI * idx) / len);
      p.fill(colorRGBs[idx % colorRGBs.length][0], colorRGBs[idx % colorRGBs.length][1], colorRGBs[idx % colorRGBs.length][2]);
      p.arc(0, 0, 300, 300, 0, (2 * Math.PI) / len, p.PIE);

      p.rotate(Math.PI / len);
      p.fill(0);
      p.textStyle(p.BOLD);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(e, 95, 0);

      p.pop();
    });
  };
}
