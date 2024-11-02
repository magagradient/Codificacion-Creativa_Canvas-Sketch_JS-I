const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  animate: true, // Necesario para que las partículas se muevan
};

const sketch = ({ context, width, height }) => {
  const agents = [];
  const centralCircleRadius = width * 0.25; // Radio del círculo central
  const cx = width * 0.5;
  const cy = height * 0.5;
  const numParticles = 15;

  // Crear partículas dentro del círculo central
  for (let i = 0; i < numParticles; i++) {
    const angle = random.range(0, Math.PI * 1);
    const x = cx + Math.cos(angle) * random.range(0, centralCircleRadius);
    const y = cy + Math.sin(angle) * random.range(0, centralCircleRadius);

    agents.push(new Agent(x, y, centralCircleRadius, cx, cy));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'green';

    const outerCircleRadius = width * 0.3;
    const numBars = 30;

    // Dibujar el círculo exterior con rectángulos (fijo, sin animación)
    for (let i = 0; i < numBars; i++) {
      const slice = math.degToRad(360 / numBars);
      const angle = slice * i;

      const x = cx + outerCircleRadius * Math.sin(angle);
      const y = cy + outerCircleRadius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-width * 0.005, random.range(0, -height * 0.05), width * 0.01, height * 0.1);
      context.fill();
      context.restore();
      

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, outerCircleRadius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
      context.strokeStyle = 'blue';
      context.stroke();
      context.restore();
    }

    // Dibujar partículas y sus líneas dentro del círculo central
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];
        const dist = agent.pos.getDistance(other.pos);

        if (dist > centralCircleRadius) continue; // Limitar conexiones al radio del círculo central

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.strokeStyle = 'red';
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update(); // Actualizar cada agente
      agent.draw(context);
      agent.bounceWithinCircle(cx, cy, centralCircleRadius); // Rebote dentro del círculo central
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y, circleRadius, cx, cy) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 20);
    this.circleRadius = circleRadius;
    this.cx = cx;
    this.cy = cy;
  }

  bounceWithinCircle(cx, cy, circleRadius) {
    const distFromCenter = Math.sqrt((this.pos.x - cx) ** 2 + (this.pos.y - cy) ** 2);

    // Si la partícula está fuera del círculo, invertir la dirección
    if (distFromCenter + this.radius > circleRadius) {
      // Calcular el ángulo desde el centro hasta la partícula
      const angle = Math.atan2(this.pos.y - cy, this.pos.x - cx);
      // Invertir la velocidad hacia adentro
      this.vel.x = -Math.cos(angle) * Math.abs(this.vel.x);
      this.vel.y = -Math.sin(angle) * Math.abs(this.vel.y);
    }
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  }
}
