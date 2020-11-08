(function(){
    
    let DB;
    const indexedDB = window.indexedDB;
    const tabla = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', crearDB);

    function crearDB(){
        const request = indexedDB.open('crm', 1);

        request.onsuccess = function(){
            console.log('Acceso a DataBase');
            DB = request.result;
            readData();
        }

        request.onupgradeneeded = function(){
            console.log('DataBase creada/actualizada');
            DB = request.result;
            //Creamos el almacen de datos
            const objectStore = DB.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true
            })

            //Creamos los index del almacen de datos
            objectStore.createIndex('nombre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email', {unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: true});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});

        }

        request. onerror = function(){
            console.log('Hubo un error en el DataBase');
        }
    }

    function readData(){
        
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        const request = objectStore.openCursor();

        request.onsuccess = function(){
            
            const cursor = request.result;
            if( cursor ){
                clienteHTML(cursor);
                cursor.continue();
            }

        }

        request.onerror = function(){

            console.log('Hubo un error');

        }

    }

    function clienteHTML(cursor){
        const clienteHTML = document.createElement('tr');

        const cliente = cursor.value

        clienteHTML.innerHTML = `
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${cliente.nombre} </p>
            <p class="text-sm leading-10 text-gray-700"> ${cliente.email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${cliente.telefono}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                <p class="text-gray-600">${cliente.empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a href="editar-cliente.html?id=${cliente.id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                <a href="#" data-cliente="${cliente.id}" class="text-red-600 hover:text-red-900">Eliminar</a>
            </td>
        `;

        tabla.appendChild(clienteHTML)
    }

})()