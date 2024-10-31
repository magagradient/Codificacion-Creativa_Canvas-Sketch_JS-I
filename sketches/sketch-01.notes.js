const canvasSketch = require('canvas-sketch');

const settings = {
	dimensions: [1080, 1080],
	// animate: true
};

// Función principal que define cómo dibujar en el lienzo
const sketch = () => {
	// Devuelve una función de dibujo con acceso al contexto, ancho y alto del lienzo:	
	return ({ context, width, height }) => {
		// Configura el color de fondo para el lienzo:		
		context.fillStyle = 'coral';
		// Dibuja un rectángulo que cubre todo el fondo del lienzo:		
		context.fillRect(0, 0, width, height);
		// Configura el grosor de las líneas; es negativo para ajustar el borde
		context.lineWidth = width * 0.01;

		// Variables para el ancho y alto de cada cuadrado
		const w = width * 0.10;// Ancho del cuadrado (10% del ancho total)
		const h = height * 0.10;// Alto del cuadrado (10% del alto total)
		const gap = width * 0.03;// Espacio entre cada cuadrado
		const ix = width * 0.17;// Posición inicial en el eje x
		const iy = height * 0.17;// Posición inicial en el eje y

		const off = width * 0.02; // Tamaño de desplazamiento para el segundo rectángulo

		// Esta parte del código, con los bucles for, se usa para calcular la posición (x, y) de cada rectángulo antes de dibujarlo. Así se define una cuadrícula de posiciones donde luego se colocarán los rectángulos.
		// Bucle para crear 5 filas de cuadrados:
		// Primer bucle for: for (let i = 0; i < 5; i++) Este bucle recorre 5 filas, cada una representada por i. En cada iteración de i, se crea una nueva fila de 5 columnas.
		for (let i = 0; i < 5; i++) {
			// Bucle para crear 5 columnas de cuadrados en cada fila: Este bucle interno recorre 5 columnas en cada fila, cada una representada por j.
			for (let j = 0; j < 5; j++) {
				// Calcula la posición x del cuadrado actual: calcula la posición en el eje horizontal de cada rectángulo. ix es el punto de inicio en x, mientras que (w + gap) * i desplaza cada rectángulo en función de su ancho (w) y del espacio entre rectángulos (gap).
				x = ix + (w + gap) * i;
				// Calcula la posición y del cuadrado actual: calcula la posición en el eje vertical. iy es el punto de inicio en y, y (h + gap) * j desplaza cada rectángulo hacia abajo, dependiendo de su alto (h) y del espacio entre rectángulos.
				y = iy + (h + gap) * j;

				// Inicia un nuevo camino de dibujo para un cuadrado (de los cuadrados que van por dentro de los cuadrados principales):
				context.beginPath();
				// Dibuja el rectángulo principal
				context.rect(x, y, w, h);
				// Traza el contorno del rectángulo
				context.stroke();

				// Condición para dibujar un segundo rectángulo dentro del cuadrado con un 50% de probabilidad:
				if (Math.random() > 0.5) {
				    // Inicia un nuevo camino para el segundo rectángulo
					context.beginPath();
					// Dibuja el segundo rectángulo más pequeño, desplazado y con menor tamaño
					context.rect(x + off / 2, y + off / 2, w - off, h - off);
					// Traza el contorno del segundo rectángulo
					context.stroke();
				}
			}
		}
	};
};

canvasSketch(sketch, settings);

// La razón para escribir el código de posicionamiento antes de dibujar cada cuadrado es para calcular y definir la ubicación exacta en el lienzo donde queremos que aparezca cada cuadrado, permitiendo que se dibujen en posiciones organizadas y específicas dentro de la cuadrícula. Este enfoque de "configurar antes de dibujar" es común en gráficos y programación visual para mantener la estructura y evitar cálculos innecesarios durante el dibujo.
