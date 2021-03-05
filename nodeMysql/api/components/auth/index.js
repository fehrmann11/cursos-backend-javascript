const store = require('../../../store/dummy');
const ctrl = require('./controller');


//convertimos una función e inyectamos el store
module.exports = ctrl(store);