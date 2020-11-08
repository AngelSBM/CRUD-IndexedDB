(function(){
    
    //SELECTORES
    const formulario = document.querySelector('#formulario');
    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const telefono = document.querySelector('#telefono');
    const empresa = document.querySelector('#empresa');
    ///////////

    let DB;
    const indexedDB = window.indexedDB;

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', validarFormulario);

    });

    function conectarDB(){
        const request = indexedDB.open('crm', 1);

        request.onsuccess = function(){
            console.log('Nuevo-Cliente conectado al DataBase');
            DB = request.result;
        }

        //OJO: aquí no se coloca onupgradeneeded porque la base de datos ya se creó previamente en el index.html(Clientes)

        request.onerror = function(){
            console.log('No se pudo conectar nuevo cliente con el DB');
        }
    }

    function validarFormulario(e){
        e.preventDefault();

        if( nombre.value === '' || email.value === '' || telefono.value === '' || empresa.value === '' ){
            imprimir('Todos los campos son obligatorios', 'error');

            return
        }

        const cliente = {
            nombre: nombre.value,
            email: email.value,
            telefono: telefono.value,
            empresa: empresa.value,
            id: Date.now()
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        const request = objectStore.add(cliente);

        request.onsuccess = function(){
            imprimir('Cliente añadido');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }

        request.onerror = function(){
            console.log('Hubo un error al añadir un cliente');
        }

    }

    function imprimir(mensaje, tipo){

        const alerta = document.querySelector('.alerta');
        if(!alerta){

            const divMensaje = document.createElement('div');
            divMensaje.classList.add('px-4', 'py-3', 'rounded', 'mx-auto', 'mt-6', 'text-center', 'alerta');
    
            if( tipo === 'error' ){
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            }else{
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
    
            divMensaje.textContent = mensaje;
            formulario.appendChild(divMensaje);
    
            setTimeout(() => {
                divMensaje.remove();
            }, 3000);

        }

    }

})()