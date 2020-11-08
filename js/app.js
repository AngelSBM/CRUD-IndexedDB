(function(){
    
    let DB;
    const indexedDB = window.indexedDB;

    document.addEventListener('DOMContentLoaded', crearDB);

    function crearDB(){
        const request = indexedDB.open('crm', 1);

        request.onsuccess = function(){
            console.log('Acceso a DataBase');
            DB = request.result
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

})()