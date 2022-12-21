/**
 * Partiendo de un documento html vacío, crea los elementos HTML de una calculadora mediante los métodos del objeto predefinido document. 
 * Ni document.write() ni fichero.css están permitidos.
 * 
 * @author josemi
 * @version 3.0.0 Objeto Predefinido Calculadora
 * 
 */

{

    //variables de bloque

    const calculadora = {

        input: undefined,
        operando1: undefined,
        operando2: undefined,
        suma: false,
        resta: false,


        init: () => {
            calculadora.crearDiv(),
                calculadora.crearInput(),
                calculadora.crearBotones();
        },

        comportamiento(valor) {

            if (valor <= '9' && valor >= '1') {
                return () => {
                    if (calculadora.input.value === '0') {
                        calculadora.input.value = valor;
                    } else { // se puede usar también return en vez de else{}
                        calculadora.input.value += valor; //concatenamos el nuevo valor podemos usar calculadora.input.innerhtml
                    }
                }
            }

            switch (valor) {

                case 'CE':
                    return () => {
                        calculadora.input.value = 0;
                    }

                case '←':

                    return () => {
                        calculadora.input.value = calculadora.input.value.substring(0, (calculadora.input.value.length - 1));
                        // vamos borrando el último elemento 
                        if (calculadora.input.value == "") {
                            calculadora.input.value = 0;
                        }
                    }

                case ',':

                    return () => {
                        if (!calculadora.input.value.includes('.')) {
                            //si el imput no contiene un punto, se lo añadimos cuando lo pulsamos
                            calculadora.input.value += '.';
                        }
                    }

                case '0':

                    return () => {
                        if (calculadora.input.value != '0') {
                            calculadora.input.value += valor;
                        }
                    }

                case '±':

                    return () => {

                        if (calculadora.input.value.includes('-')) {
                            calculadora.input.value = calculadora.input.value.substring(1, calculadora.input.value.length);
                        } else {
                            if (calculadora.input.value != '0') {
                                calculadora.input.value = '-' + calculadora.input.value;
                            }
                        }
                    }

                case '+':

                    return () => {
                        calculadora.operando1 = calculadora.input.value;
                        reset();
                        calculadora.suma = true;
                    }

                case '-':

                    return () => {
                        calculadora.operando1 = calculadora.input.value;
                        reset();
                        calculadora.resta = true;
                    }

                case 'x':

                    return () => {
                        calculadora.operando1 = calculadora.input.value;
                        reset();
                        calculadora.multiplicacion = true;
                    }

                case '÷':

                    return () => {
                        calculadora.operando1 = calculadora.input.value;
                        reset();
                        calculadora.division = true;
                    }

                case '%':

                    return () => {
                        calculadora.operando1 = calculadora.input.value;
                        reset();
                        calculadora.porcentaje = true;
                    }

                case '=':

                    return () => {

                        if (calculadora.suma) {
                            calculadora.operando2 = calculadora.input.value;
                            calculadora.input.value = parseFloat(calculadora.operando1) + parseFloat(calculadora.operando2);
                            calculadora.suma = false;
                        } else if (calculadora.resta) {
                            calculadora.operando2 = calculadora.input.value;
                            calculadora.input.value = parseFloat(calculadora.operando1) - parseFloat(calculadora.operando2);
                            calculadora.resta = false;
                        }else if (calculadora.multiplicacion) {
                            calculadora.operando2 = calculadora.input.value;
                            calculadora.input.value = parseFloat(calculadora.operando1) * parseFloat(calculadora.operando2);
                            calculadora.multiplicacion = false;
                        }else if (calculadora.division) {
                            calculadora.operando2 = calculadora.input.value;
                            calculadora.input.value = parseFloat(calculadora.operando1) / parseFloat(calculadora.operando2);
                            calculadora.division = false;
                        }else if (calculadora.porcentaje) {
                            calculadora.operando2 = calculadora.input.value;
                            calculadora.input.value = parseFloat(calculadora.operando1) % parseFloat(calculadora.operando2);
                            calculadora.porcentaje = false;
                        }

                    }

                default:
                    // calcular(valor);

                    break; //sino puede hacer nada rompe el ciclo
            }

            // function calcular(valor) {

            //     if (calculadora.suma) {
            //         calculadora.input.value = parseFloat(calculadora.operando1) + parseFloat(calculadora.operando2);
            //         calculadora.suma = false;
            //     }
            // }

            function reset() {
                calculadora.input.value = 0;
            }

        },

        // operaciones: (valor, op1, op2) => {
        //     switch (valor) {
        //         case "+":
        //             return op1 + op2;

        //         case "-":
        //             return op1 - op2;

        //         case "x":
        //             return op1 * op2;

        //         case "÷":
        //             return op1 / op2;

        //         case "%":
        //             return op1 * op2 / 100;
        //         default:
        //             break;
        //     }
        // },

        crearDiv: () => {

            //h1 y su css
            let h1 = document.createElement("h1");
            let div = document.createElement("div");

            h1.innerHTML = 'Calculadora';
            h1.style.textAlign = 'center';
            document.body.appendChild(h1);

            // css al div mediante javascript
            div.style.display = 'grid';
            div.style.gridTemplateColumns = 'repeat(4,1fr)';
            div.style.width = '400px';
            div.style.height = '400px';
            div.style.margin = '0 auto';
            div.style.border = '1px solid black';

            // document.body.appendChild(calculadora.div); // nos esta creado y da error
            calculadora.div = div; // es como si pusieramos arriba div:null 
            document.body.appendChild(calculadora.div); // nos esta creado y da error
        },

        crearInput: () => {
            let input = document.createElement('input');
            input.value = 0;
            input.setAttribute('readonly', '');

            input.style.textAlign = 'right';
            input.style.fontSize = '30px';
            input.style.gridColumn = "1 / 5";
            input.style.margin = "4px";
            input.style.padding = "4px";

            calculadora.input = input;
            calculadora.div.appendChild(input);
        },

        crearBotones: () => {
            const arraySimbolos = ['CE', '←', '%', '+', '7', '8', '9', '-', '4', '5', '6', 'x', '1', '2', '3', '÷', '0', '±', ',', '='];
            arraySimbolos.forEach(element => {
                let boton = document.createElement('button');
                boton.innerHTML = element;
                boton.style.margin = '4px';
                boton.style.padding = '4px';
                boton.style.fontSize = '30px';
                calculadora.div.appendChild(boton);
                // le pasamos el comportamiento cada vez que se hace click en un botón
                boton.addEventListener('click', calculadora.comportamiento(element));
            });
        }
    }

    document.addEventListener("DOMContentLoaded", calculadora.init);

}
