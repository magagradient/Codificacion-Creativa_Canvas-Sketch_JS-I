const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  // animate: true,
};

const sketch = () => {
  return ({ context, width, height }) => {
    // Relleno del fondo
    context.fillStyle = 'blue';
    context.fillRect(0, 0, width, height);

    // Grosor inicial de la línea del borde
    const initialLineWidth = width * 0.005;
    context.lineWidth = initialLineWidth;

    // Posición inicial del borde alrededor de la cuadrícula
    const borderOffset = width * 0.15;
    const borderSize = width - borderOffset * 2;

    // Color del borde y de las líneas de expansión
    context.strokeStyle = 'violet';

    // Bucle para expandir las líneas hacia afuera
    let offset = borderOffset;
    let size = borderSize;
    const lineExpansionStep = width * 0.02; // Distancia entre cada línea expandida
    const lineWidthIncrement = width * 0.002; // Incremento del grosor en cada expansión

    while (offset > 0 && size < width) {
      context.strokeRect(offset, offset, size, size);

      // Ajusta los valores para la siguiente línea de expansión hacia afuera
      offset -= lineExpansionStep;
      size += lineExpansionStep * 2;
      context.lineWidth += lineWidthIncrement;
    }

		// Configuración de la cuadrícula centrada
		const gridCount = 5; // Número de filas y columnas
		const w = width * 0.10; // Ancho de cada celda
		const h = height * 0.10; // Alto de cada celda
		const gap = width * 0.03; // Espacio entre celdas

    // Calcular desplazamiento inicial para centrar la cuadrícula
    const gridWidth = gridCount * w + (gridCount - 1) * gap;
    const gridHeight = gridCount * h + (gridCount - 1) * gap;
    const ix = (width - gridWidth) / 2;
    const iy = (height - gridHeight) / 2;
    const off = width * 0.02;

    let x, y;

    // Dibuja la cuadrícula
    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        // Generar valores RGB para variar la tonalidad
        const n = random.noise2D(x, y, 0.005);
        const baseColorValue = Math.floor(((n + 1) / 2) * 255);
        const red = Math.min(100, baseColorValue + 60); // Aumenta el rojo para tonos cálidos
        const green = Math.max(0, baseColorValue - 60); // Reduce el verde
        const blue = 255; // Fija el azul para una paleta equilibrada

        // Asignar el color generado a cada celda
        context.fillStyle = `rgb(${red}, ${green}, ${blue})`;

        context.beginPath();
        context.rect(x, y, w, h);
        context.fill();
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.fill();
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
