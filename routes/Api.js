// Controllers
const Test = require('../controllers/test');
const SignUp = require("../controllers/authentication/signup");

module.exports = (express) => {
    express.post('/api/test', Test.perform);
    express.post('/api/auth/signup', SignUp.perform);
};
