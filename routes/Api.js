// Controllers
const Test = require('../controllers/test');

module.exports = (express) => {
    express.post('/test', Test.perform);
};
