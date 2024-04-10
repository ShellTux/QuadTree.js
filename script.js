let cv, ctx;
let particles = [];
let qtree;
let mouseIsPressed = false;
let rangeP = [];

window.onload = () => setup();

const setup = function() {
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');
  background(cv, 'black');
  let boundary = new Rectangle(cv.width / 2, cv.height / 2, cv.width / 2, cv.height / 2);
  qtree = new QuadTree(boundary, 4);
  for (let i = 0; i < 300; i++) {
    let v = createVector(Math.random() * cv.width, Math.random() * cv.height);
    let p = new Point(v.x, v.y);
    particles.push(v);
    qtree.insert(p);
  }
  console.log(qtree);
  draw();
  setInterval(draw, 10);
}

const draw = function() {
  background(cv, 'black');
  ctx.fillStyle = 'white';
  particles.forEach(particle => ctx.ellipse(particle.x, particle.y, 2, 2));
  let x = Math.random() * cv.width;
  let y = Math.random() * cv.height;
  let w = 100;
  let range = new Rectangle(mouse.x, mouse.y, w, w);
  range.show(ctx);
  rangeP = qtree.query(range);
  ctx.fillStyle = rgb(10, 200, 10);
  rangeP.forEach(point => ctx.ellipse(point.x, point.y, 4, 4));
  qtree.show(ctx);
}
