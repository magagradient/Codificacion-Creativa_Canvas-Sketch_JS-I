// necesitamos una variable para hacer referecia al elementos de canvas en el html aca en el js:
// establecemos el valor de una variable llamada "canvas" en una expresion, utilizamos document (el dom) para hacer referencia al documento html, luego el punto (.) indica que queremos algo que sea parte de ese objeto, en este caso una funcion llamada querySelector que selecciona un elemento del documento, se necesita dar el nombre del elemento que queremos seleccionar en este caso 'canvas'
let canvas = document.querySelector('canvas');
// obtenemos un objeto de canvas que da la orden a una funcion, "getContext" y  pasa un parametro como una secuencia, el context es donde hacemos el dibujo y puede ser en 2d o 3d: 
let context = canvas.getContext('2d');
// fillRect es una funcion que tomas cuatro parametros: x, y ancho y alto. (son coordenadas en un espacio 2d, nuestro canvas es un plano de 600x600px, el 0,0 esta en la esquina superior izquierda)

////////////////////////////////////////////////////
// context.beginPath(); // Inicia un nuevo trazo (esto es necesario antes de comenzar a dibujar formas en el canvas).

// beginPath() le indica al contexto de dibujo que comience un nuevo "camino" (o "ruta") en el canvas. Esto es fundamental en gráficos 2D porque:

// Separa cada forma de las demás: Evita que las formas se conecten entre sí. Sin beginPath(), las formas podrían dibujarse unidas, ya que el contexto de dibujo seguiría "recordando" las rutas previas.

// Permite dibujar trazos y rellenos independientes: Cada vez que se llama a beginPath(), se puede especificar un nuevo conjunto de instrucciones de dibujo sin afectar las formas anteriores.
/////////////////////////////////////////////////////

context.lineWidth = 4; // Establece el grosor de las líneas de los trazos en 4 píxeles.

const width = 60; // Define el ancho de cada cuadrado pequeño en 60 píxeles.
const height = 60; // Define la altura de cada cuadrado pequeño en 60 píxeles.
const gap = 20; // Define el espacio (gap) entre cada cuadrado en 20 píxeles.


// dibujar con loops: 
for (let i = 0; i < 5; i++) { // Primer bucle 'for' que controla las filas (recorre 5 veces, para 5 filas).
    for (let j = 0; j < 5; j++) { // Segundo bucle 'for' anidado que controla las columnas (recorre 5 veces por cada fila, para 5 columnas).
    let x = 100 + (width + gap) * i; // Calcula la posición 'x' de cada cuadrado según su columna.
    let y = 100 + (height + gap) * j;  // Calcula la posición 'y' de cada cuadrado según su fila.

    //Aquí se llama a beginPath() antes de context.rect(...), de modo que cada rectángulo dibujado en el bucle es independiente de los demás. Si no estuviera beginPath() antes de cada rectángulo, todos los rectángulos en el bucle se unirían en una sola forma al ejecutarse stroke().
    //Sin beginPath(), los trazos de rectángulos se acumularían, y stroke() intentaría dibujar todos los rectángulos juntos en un solo "camino" continuo, causando un efecto de conexión visual no deseado.
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke(); 

    if (Math.random() > 0.5) { // Condición aleatoria (50% de probabilidad) para dibujar un cuadrado más pequeño dentro del cuadrado actual.
    context.beginPath(); // Inicia un nuevo trazo para el cuadrado interior.
    context.rect(x + 8, y + 8, width - 16, height - 16); // Dibuja un cuadrado más pequeño centrado dentro del cuadrado grande.
    context.stroke(); // Dibuja el borde del cuadrado interior.
        }
    }
} 


//////////////////////////////////////////////

// let year = 2042;
// let nextYear = year + 1;

// let dinner = 'pasta'
// let sentence = 'tonigth, dinner will be ' + dinner;  

// la oracion quedaria esta noche, la cena sera pasta, si yo cambio el valor de la variable dinner a ensalada, quedaria esta noche la cena sera ensalada 
// las variables estan en todas partes y son escensiales para programar, esta por si solas no hacen demasiado, no tienen funcionalidad, entonces para eso estan las FUNCTION = FUNCIONES:
// UNA FUNCION es un bloque de codigo que realiza una tarea, pueden considerarse acciones, cuando llamamos a la funcion ejecutamos un fragmento de codigo. las funciones se identifican por los parentesis(asi se llama a la funcion), que significan acción y entre llaves escribimos lo que hara la funcion. 

// parametro para que la consola registre todo lo que hace la funcion. (se puede usar cualquier paralabra para identificar el parametro)

// function saySomething(parametro) {
//     console.log(parametro);
// }

// saySomething('hey there');

// podemos usar la oracion que creamos antes como variable (linea 19)

// saySomething(sentence);

// otro ejemplo: una funcion llamada sumar que tomas dos parametros: A y B.

// function add(a,b)  {
//     return a + b;
// }

// podemos dar la orden a la funcion y guardar el resultado en una variable:
// y registrarlo en la consola para que nos de un resultado. 
// las funciones solo suma numeros pero no los devuelve, entonces si queremos que la funcion realice una tarea y tambien devuekva un valor debemos agregar la palabra return. 

// let result = add(5, 7);
// console.log(result);

// otro tipo de funcion es la funcion flecha:
// usamos una variable para hacer referecia a una funcion: 

// let multiplicacion = (a, b) => {
//     return a * b;
// }

// console.log(multiplicacion(5, 7));

/////////////////////////////////////////////////////////////////////////////
// arrays y bucles:

// los arrays son listas, que se los valores se colocan entre corchetes y se separan por comas. y los string van entre comillas. 

// let years = [2042, 2043, 2044, 2045, 2046, 2047, 2048]
let years = []
let frutas = ['naranja','frutilla','uva','durazno', 'banana']

// los bucles son fragmentos de codigos ejecutados una y otra vez limitadamente. 
// el bucle for: (dentros de las llaves colocamos el fragmento de codigo que quremos ejecutar varias veces)y dentro de los () se escribe una expresion para controlar el loop el cual se compone de 3 partes: 

// * parte 1: declaramos que una variable es el indice del loop (usualmente se utiliza la letra i y el valor a 0: let i = 0), 
// Inicialización (let i = 0;): Define una variable i y la inicializa en 0. En este contexto, i actuará como un índice que representa la posición actual dentro del arreglo frutas.

// * parte 2: la duracion del bucle o cuantas veces queremos que se ejecute (queremos que funciones mientras que i sea menos a 4) (i < frutas.length)
// Este es el criterio que debe cumplirse para que el bucle continúe ejecutándose. frutas.length representa el número total de elementos en el arreglo frutas. Mientras i sea menor que frutas.length, el bucle continuará; una vez que i alcance el tamaño del arreglo, el bucle se detendrá.

// * parte 3: es lo que queremos que la variable i haga en cada iteracion del bucle (queremos incrementarlo en 1) i += 1 o i++
// Al final de cada iteración, el valor de i aumenta en 1 (gracias al operador ++). Esto permite recorrer el arreglo frutas desde el primer elemento (índice 0) hasta el último.
// con esto estamos diciendo que comenzamos con 0 y luego ejecutamos algo, luego cambia a 1 y ejecutamos algo otra vez, luego a 2 y 3 y cuando llegamos al 4 saltamos del loop y continua con el resto del codigo. Este loop se ejecutara durante 4 iteraciones.

// se utiliza para recorrer el array de frutas: Su propósito es iterar sobre cada elemento de este arreglo y mostrar cada uno en la consola.
// iterar implica ir uno por uno en esa lista y aplicar una operación (como mostrar cada fruta en consola).

//  Iterar es una de las operaciones más comunes y esenciales en programación, especialmente para recorrer arreglos o listas. Los arreglos suelen contener múltiples elementos, y a menudo necesitamos procesar cada uno, por ejemplo, para mostrarlos en pantalla, hacer cálculos, o aplicarles alguna transformación.

// posicion 0 en el array; funciones mientras que i sea menos a 4; 
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}
//////////////////////////////////////////////////////////////////////////////////////

// en este loop le insertamos valores al array a diferencia del anterior que lo usamos para recorrer los valores ya establecidos:
// La idea es empezar desde el año 2040 y agregar los siguientes 10 años al arreglo years.

for (let i = 0; i < 10; i++) {
    years.push(2040 + i);
}

console.log(years); // devuelve: years = [2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049];


// Inicialización (let i = 0;): Se declara la variable i y se le asigna el valor 0. En este bucle, i se usará como un contador.
// Condición (i < 10): Mientras i sea menor que 10, el bucle seguirá ejecutándose. Esto significa que el bucle se repetirá exactamente 10 veces, ya que i comienza en 0 y llega hasta 9.
// Incremento (i++): Después de cada iteración, i aumenta en 1 gracias al operador ++. Este incremento asegura que el bucle eventualmente se detendrá cuando i alcance 10.

// Cuerpo del bucle (years.push(2040 + i);): En cada iteración, se ejecuta years.push(2040 + i). 
// years.push() es un método que agrega un nuevo elemento al final del arreglo years.
// En cada paso, se calcula 2040 + i, lo que genera una secuencia de años que comienza en 2040 y aumenta en uno con cada iteración.
// Así, en la primera iteración (cuando i = 0), se agrega 2040. En la siguiente iteración (i = 1), se agrega 2041, y así sucesivamente hasta llegar a 2049.

//////////////////////////////////////////////////////////////////////

frutas.forEach(item => {
    console.log(item);
})

// usar indice: 
// permite controlar manualmente qué elementos iterar en el arreglo, y en qué momento detener el bucle. Esto es útil cuando:
//No quieres iterar sobre todos los elementos (por ejemplo, solo quieres recorrer algunos).
//Quieres comenzar desde un punto específico del arreglo, o ir de atrás hacia adelante.
//Necesitas acceder a un índice específico para hacer comparaciones, saltos condicionales, o cambios basados en la posición de los elementos.

// Por otro lado, el método forEach es más adecuado y conciso cuando:
//Quieres iterar sobre todos los elementos sin excepción.
//No necesitas el índice del elemento (aunque forEach permite obtenerlo opcionalmente).
//Solo necesitas realizar una acción en cada elemento sin modificar el flujo del bucle.

