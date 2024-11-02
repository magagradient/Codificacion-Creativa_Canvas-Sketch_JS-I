
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math'); // Utilidad de funciones matemáticas, incluye funciones como conversión de grados a radianes.
const random = require('canvas-sketch-util/random'); //Utilidad para generar números aleatorios o rangos aleatorios.


const settings = {
	dimensions: [1080, 1080],
	// animate: true
};

//// TRANSFORMACIONES DE CANVA Y EL ESTADO DEL CONTEXTO:  El código incluye transformaciones como rotación, escalado y desplazamiento.

const sketch = () => {
	return ({ context, width, height }) => {
		context.fillStyle = 'coral';
		context.fillRect(0, 0, width, height); // Dibuja un rectángulo azul que cubre todo el canvas.

		context.fillStyle = 'red';

		const cx = width * 0.5; // Coordenada X del centro del canvas.
		const cy = height * 0.5; // Coordenada Y del centro del canvas.

		const w = width * 0.01; // Ancho de cada rectángulo dibujado.
		const h = height * 0.1; // Alto de cada rectángulo.
		let x, y; // La declaración let x, y; se hace sin asignar un valor inicial porque los valores de x y y se calculan dinámicamente dentro del bucle en cada iteración, justo antes de dibujar cada rectángulo.

		const num = 60; // Número total de rectángulos dispuestos en círculo.
		const radius = width * 0.3; // Radio del círculo en el que se colocarán los rectángulos.

		// Bucle para dibujar cada rectángulo en una posición circular:
		for (let i = 0; i < num; i++) {
			const slice = math.degToRad(300 / num); // Calcula el ángulo de separación entre cada rectángulo en radianes.
			const angle = slice * i; // Ángulo de cada rectángulo en función de su posición en el círculo.

			x = cx + radius * Math.sin(angle); // Calcula la posición X del rectángulo en el círculo.
			y = cy + radius * Math.cos(angle); // Calcula la posición Y del rectángulo en el círculo.

			/////* bloque de codigo que utilizaremos mucho: Cada transformacion que veremos estarà en bloques como este: (comienza con un save y termina con un context.restor) 
			context.save(); // Guarda el estado actual del contexto.
			context.translate(x, y); // Mueve el contexto a la posición calculada.
			context.rotate(-angle); // Rota el contexto en función del ángulo calculado.
			context.scale(random.range(0.5, 2), random.range(0.9, 0.9)); /// Escala el rectángulo aleatoriamente en su eje X.

			context.beginPath(); // Inicia un nuevo trazo.
			context.rect(5, random.range(0, -h * 0.9), w, h);  // Dibuja el rectángulo en la posición y escala ajustadas.
			context.fill(); // Rellena el rectángulo con el color rojo.
			context.restore(); // Restaura el contexto al estado guardado (antes de translate y rotate).
			//****final del bloque*****//////////////////


			// otro bloque de transformacion para los arcs:
			context.save(); // Guarda el estado de contexto para el siguiente arco.
			context.translate(cx, cy); // Regresa el contexto al centro del canvas.
			context.rotate(-angle); // Rota el contexto para alinear el arco.
			context.strokeStyle = 'white';
			context.lineWidth = random.range(10, 20); // Define el grosor de línea aleatorio para el arco.

			context.beginPath(); // Inicia el trazo del arco.
			context.arc(8, 6, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5)); // Dibuja un arco con un radio aleatorio y un ángulo aleatorio.
			context.stroke(); // Dibuja el borde del arco.
			context.restore(); // Restaura el estado del contexto después del arco.
		}
	};
};

canvasSketch(sketch, settings);


// Ejecuta el sketch usando la configuración especificada.
class Vector {
	constructor(x, y) { // Inicializa el vector con coordenadas X e Y.
		this.x = x;
		this.y = y;
	}

	getDistance(v) { // Calcula la distancia entre este vector y otro vector 'v'.
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy); // Devuelve la distancia utilizando el teorema de Pitágoras.
	}
};

//Este código utiliza transformaciones de canvas para colocar rectángulos y arcos en una disposición circular en el centro del canvas:

//Transformaciones:
//Cada rectángulo es trasladado, rotado y escalado en función de su posición en un círculo alrededor del centro del canvas.
//Se usa random.range() para variar la escala y la posición, creando un efecto de distribución aleatoria de tamaños y posiciones.

// Dibujo Circular:
// El uso de math.degToRad para convertir ángulos y el cálculo de x e y en un círculo permite colocar los elementos en un patrón circular.

// Uso de Vector:
//La clase Vector no se usa en el dibujo actual, pero proporciona una base para cálculos futuros de distancia entre puntos, útil si se quisiera medir la distancia entre elementos del canvas.

//Este código crea una composición artística de rectángulos y arcos dispuestos en un círculo con variaciones en tamaño, grosor y ángulo de trazo.





