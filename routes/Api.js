// Controllers
const Test = require('../controllers/test');
const SignUp = require("../controllers/authentication/signup");
const Login = require("../controllers/authentication/login");

module.exports = (express) => {
    express.post('/api/test', Test.perform);
    express.post('/api/auth/signup', SignUp.perform);
    express.post('/api/auth/login', Login.perform);
};
