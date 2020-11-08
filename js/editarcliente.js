(function (){

    //Selectores
    const formulario = document.querySelector('#formulario');
    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const telefono = document.querySelector('#telefono');
    const empresa = document.querySelector('#empresa');
    ////////////

    let DB;
    const indexedDB = window.indexedDB;

    //ID del cliente
    const url = new URLSearchParams(window.location.search);
    const idCLiente = url.get('id');
    console.log(idCLiente);

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        setTimeout(() => {
            conectarCliente();
        }, 200);

        formulario.addEventListener('submit', validarForm);

    });

    function conectarDB(){
        const request = indexedDB.open('crm', 1);

        request.onsuccess = function(){
            console.log('Editar-Cliente conectado al DataBase');
            DB = request.result;
        }

        //OJO: aquí no se coloca onupgradeneeded porque la base de datos ya se creó previamente en el index.html(Clientes)

        request.onerror = function(){
            console.log('No se pudo conectar editar cliente con el DB');
        }
    }

    function conectarCliente(){
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        const request = objectStore.get(Number(idCLiente));

        request.onsuccess = function(){
            const cliente = request.result;
            nombre.value = cliente.nombre;
            email.value = cliente.email;
            telefono.value = cliente.telefono;
            empresa.value = cliente.empresa;
        }
    }

    function validarForm(e){
        e.preventDefault();
        
        if( nombre.value === '' || email.value === '' || telefono.value === '' || empresa.value === '' ){
            imprimir('Todos los campos son obligatorios', 'error');

            return
        }

        const clienteActualizado = {
            nombre: nombre.value,
            email: email.value,
            telefono: telefono.value,
            empresa: empresa.value,
            id: Number(idCLiente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        const request = objectStore.put(clienteActualizado);

        request.onsuccess = function(){
            console.log('cliente actualizado');
            imprimir('Cliente actualizado');
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 3000);
        }

        request.onerror = function(){
            console.log('Hubo un error');
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

})();