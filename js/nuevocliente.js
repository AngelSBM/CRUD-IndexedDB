(function(){
    
    let DB;
    const indexedDB = window.indexedDB;

    document.addEventListener('DOMContentLoaded', conectarDB);

    function conectarDB(){
        const request = indexedDB.open('crm', 1);

        request.onsuccess = function(){
            console.log('Nuevo-Cliente conectado al DataBase');
            DB = request.result;
        }

        request.onerror = function(){
            console.log('No se pudo conectar nuevo cliente con el DB');
        }

    }

})()