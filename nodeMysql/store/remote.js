const request = require('request');

/*La principal diferencia es que no hemos exclusivamente
cogido los datos atacando contra el servicio de mysql que
hemos creado en el archivo,estamos en nuestro servicio de api
haciendo una petición http a nuestro microservicio de mysql (este)
 que está resolviendo los datos y devolviendonos el resultado a 
 nuestra api, nuestra api no sabe que base de datos hay por detrás 
 cuál es la query, la syntax,etc, ya no es problema para la api
 sino para el microservicio de datos. */

function createRemoteDB(host, port) {
    const URL = 'http://'+ host + ':' + port;

    function list(table) {
        return req('GET', table);
    }

    function get(table,id){
        return req('GET',table,id);
    }

    function insert(table, data) {
		return req('POST', table, data);
	}
    function update(table, data) {
		return req('PUT', table, data);
	}

    function upsert(table, data,isNew) {
        console.log(isNew);
		if (data.id && isNew ===false) {
			return update(table, data);
		}

		return insert(table, data);
	}
    function query(table, query, join) {
		return req('POST', table + '/query', { query, join });
	}

    // function get(table, id)
    // function upsert(table, data)
    // function query(table, query, join)

    function req(method, table, data) {
        let url = URL + '/' + table;
        body = '';
        if(method==='GET' && data){
            url +=`/${data}`
        }else if (data){
            body = JSON.stringify(data);
        }

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body,
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);
                return resolve(resp.body);
            })
        })
    }

    return {
        list,
        get,
        insert,
        update,
        upsert,
        query
    }
}

module.exports = createRemoteDB;