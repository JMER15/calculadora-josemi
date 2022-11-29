/**
 * Partiendo de un documento html vacío, crea los elementos HTML de una calculadora mediante los métodos del objeto predefinido document. 
 * Ni document.write() ni fichero.css están permitidos.
 * 
 * @author josemi
 */

document.addEventListener('DOMContentLoaded',function(){
    
    const arraySimbolos = ['CE','←','%','+','7','8','9','-','4','5','6','x','1','2','3','÷','0','±',',','='];

    // crear h1 y aplicar css
    let h1 = document.createElement('h1');
    h1.innerHTML = 'Calculadora';
    document.body.appendChild(h1);
    h1.style.textAlign = 'center';
    
    // crear div
    let div = document.createElement('div');
    document.body.appendChild(div);
    
    // css al div mediante javascript
    div.style.display = 'grid';
    div.style.gridTemplateColumns = 'repeat(4,1fr)';
    div.style.width = '300px';
    div.style.height = '300px';
    div.style.margin = '0 auto';
    div.style.border = '1px solid black';

    // crear input y añadir css mediante javascript
    let input = document.createElement('input');
    input.value = 0;
    input.setAttribute('readonly',''); 

    input.style.textAlign = 'right';
    input.style.gridColumn = "1 / 5";
    input.style.margin = "4px";
    input.style.padding = "4px";
    div.appendChild(input);
    

    // mostrar botones
    arraySimbolos.forEach(element => {
        let boton = document.createElement('button');
        boton.innerHTML = element;
        div.appendChild(boton);
        boton.style.margin = '4px';
        boton.style.padding= '4px';
    });

});