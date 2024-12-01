// importacion de modulos:
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random'); // Herramientas para generar números aleatorios y ruido
const math = require('canvas-sketch-util/math'); // Utilidades matemáticas, como mapear rangos
const Tweakpane = require('tweakpane'); // Herramienta para crear una interfaz de control

// Configuración de Lienzo y Parámetros Iniciales
const settings = {
	dimensions: [1080, 1080], // Dimensiones del lienzo en píxeles
	animate: true // Permite la animación continua
};

const params = {
	cols: 10, // Columnas en la cuadrícula
	rows: 10, // Filas en la cuadrícula
	scaleMin: 1, // Escala mínima de las líneas
	scaleMax: 30, // Escala máxima de las líneas
	freq: 0.001, // Frecuencia del ruido (determina suavidad de la animación)
	amp: 0.2, // Amplitud del ángulo de rotación
	frame: 0, // Frame actual (para controlar la animación)
	animate: true, // Controla si la animación es automática
	lineCap: 'butt', // Estilo de los extremos de las líneas ('butt', 'round', 'square')
};

// Función Principal sketch para Dibujar el Contenido
const sketch = () => {
	return ({ context, width, height, frame }) => {
		context.fillStyle = 'coral'; // Color de fondo
		context.fillRect(0, 0, width, height); // Dibuja el fondo

		const cols = params.cols;
		const rows = params.rows;
		const numCells = cols * rows; // Total de celdas (columnas x filas)

		// Definir tamaño de la cuadrícula, tamaño de cada celda y márgenes
		const gridw = width * 0.8;
		const gridh = height * 0.8;
		const cellw = gridw / cols;
		const cellh = gridh / rows;
		const margx = (width - gridw) * 0.5;
		const margy = (height - gridh) * 0.5;

		for (let i = 0; i < numCells; i++) {
			const col = i % cols; // Columna actual
			const row = Math.floor(i / cols); // Fila actual

			const x = col * cellw; // Posición x de la celda
			const y = row * cellh; // Posición y de la celda
			const w = cellw * 0.8; // Ancho de cada línea
			const h = cellh * 0.8; // Alto de cada línea

			const f = params.animate ? frame : params.frame; // Controla si el frame es dinámico o fijo

			// Genera ruido 3D basado en la posición de la celda y el frame
			const n = random.noise3D(x, y, f * 10, params.freq);

			const angle = n * Math.PI * params.amp; // Ángulo de rotación de la línea

			// Calcula el grosor de la línea en función del ruido generado
			const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

			context.save(); // Guarda el estado del contexto
			context.translate(x, y); // Traslada el contexto a la posición de la celda
			context.translate(margx, margy); // Añade el margen
			context.translate(cellw * 0.5, cellh * 0.5); // Centra la línea en la celda
			context.rotate(angle); // Rota la línea según el ángulo calculado

			context.strokeStyle = '#FF0000'

			context.lineWidth = scale; // Establece el grosor de la línea
			context.lineCap = params.lineCap; // Define el estilo de los extremos de las líneas

			// Dibuja la línea en el contexto
			context.beginPath();
			context.moveTo(w * -0.5, 0);
			context.lineTo(w * 0.5, 0);
			context.stroke();

			context.restore(); // Restaura el contexto a su estado anterior
		}
	};
};

// createPane: Crear una Interfaz de Control:
const createPane = () => {
	const pane = new Tweakpane.Pane(); // Inicializa la interfaz de control
	let folder;

	// Carpeta para parámetros de la cuadrícula
	folder = pane.addFolder({ title: 'Grid' });
	folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' } }); // Selector de estilo de extremo de línea
	folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 }); // Control para columnas
	folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 }); // Control para filas
	folder.addInput(params, 'scaleMin', { min: 1, max: 100 }); // Control para escala mínima
	folder.addInput(params, 'scaleMax', { min: 1, max: 100 }); // Control para escala máxima

	// Carpeta para parámetros de ruido
	folder = pane.addFolder({ title: 'Noise' });
	folder.addInput(params, 'freq', { min: -0.01, max: 0.01 }); // Frecuencia del ruido
	folder.addInput(params, 'amp', { min: 0, max: 1 }); // Amplitud de rotación
	folder.addInput(params, 'animate'); // Control para activar/desactivar animación
	folder.addInput(params, 'frame', { min: 0, max: 999 }); // Control para ajustar el frame manualmente
};

createPane(); 
canvasSketch(sketch, settings); // Inicializa el lienzo y comienza la animación

// el noise es similar a la aleatoriedad, pero con una diferencia importante: el noise (ruido) genera valores continuos y coherentes, en lugar de completamente al azar. A diferencia de un valor aleatorio puro (que cambiaría de forma abrupta en cada punto), el ruido genera valores que cambian suavemente de una celda a otra o de un cuadro a otro. Esto crea un efecto visual más natural y suave, como un flujo o patrón orgánico, en lugar de cambios bruscos y caóticos.

// Aleatoriedad pura: produciría una variación abrupta, donde cada celda podría tener un ángulo o tamaño completamente diferente de manera no relacionada a sus celdas vecinas, lo cual haría que el patrón parezca desordenado o sin cohesión.

// Noise (o Perlin noise, que es el tipo más común): genera variaciones que son coherentes espacial y temporalmente, lo que significa que los valores cambian gradualmente en el espacio (de celda a celda) o en el tiempo (de cuadro a cuadro). Esto es útil para crear patrones visuales suaves, como los que se ven en texturas naturales, terrenos y efectos de ondas, ya que imita mejor los fenómenos del mundo real.