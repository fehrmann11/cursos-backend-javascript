const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function upsert(table, data,isNew) {
    if (data && data.id,isNew===false) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

// aquí está el problema
function query(table, query,join) {
    //usuario , {username:}
    let joinQuery='';
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
        console.log(joinQuery);
    }
    return new Promise((resolve, reject) => {
        //select * from user_follow JOIN user ON user_follow.user_to = user.id where user_follow.user_from: 'TWHo54EZ1FgVM4OpuMoHS'
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query,(err, res) => {
            console.log(res);
            if (err) return reject(err);
            console.log(res[0])
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query,
    insert
};