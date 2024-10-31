const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
	dimensions: [1080, 1080],
};

const sketch = () => {
	return ({ context, width, height }) => {
		// fondo
		context.fillStyle = 'pink';
		context.fillRect(0, 0, width, height);

		// borde alrededor de la cuadrícula
		context.lineWidth = width * 0.01;
		const borderOffset = width * 0.15;
		const borderSize = width - borderOffset * 2;

		// dibuja el borde alrededor de la cuadrícula
		context.strokeStyle = 'black';
		context.strokeRect(borderOffset, borderOffset, borderSize, borderSize);

		// tamaño y separación de las celdas
		const gridCount = 5; // Número de filas y columnas
		const w = width * 0.10; // Ancho de cada celda
		const h = height * 0.10; // Alto de cada celda
		const gap = width * 0.03; // Espacio entre celdas

		// calcula el desplazamiento inicial para centrar la cuadrícula
		const gridWidth = gridCount * w + (gridCount - 1) * gap;
		const gridHeight = gridCount * h + (gridCount - 1) * gap;
		const ix = (width - gridWidth) / 2;
		const iy = (height - gridHeight) / 2;
		const off = width * 0.02;

		let x, y;

		// dibuja la cuadrícula
		for (let i = 0; i < gridCount; i++) {
			for (let j = 0; j < gridCount; j++) {
				x = ix + (w + gap) * i;
				y = iy + (h + gap) * j;

				const n = random.noise2D(x, y, 0.005);
				const colorValue = Math.floor(((n + 1) / 2) * 255);
				context.fillStyle = `rgb(${colorValue}, ${colorValue / 2}, 100)`;

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
