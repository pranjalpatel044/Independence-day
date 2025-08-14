const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * -5 - 2;
    this.alpha = 1;
  }
  draw() {
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
    if (this.alpha < 0) this.alpha = 0;
  }
}

let particles = [];

function spawnFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const colors = ['255,153,51', '255,255,255', '19,136,8']; // tricolor
  for (let i = 0; i < 30; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(index,1);
  });
  requestAnimationFrame(animate);
}

setInterval(spawnFirework, 800);
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
