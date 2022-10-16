// Controllers
const Test = require('../controllers/test');
const SignUp = require('../controllers/authentication/signup');
const Login = require('../controllers/authentication/login');
const GetFriends = require('../controllers/application/get-friends');
const GetUserData = require('../controllers/application/get-userdata');
const GetFriendRequests = require('../controllers/application/get-friend-requests');
const GetFriendMessages = require('../controllers/application/get-friends-messages');

module.exports = (express) => {
    express.post('/api/test', Test.perform);
    express.post('/api/auth/signup', SignUp.perform);
    express.post('/api/auth/login', Login.perform);
    express.post('/api/app/get-friends', GetFriends.perform);
    express.post('/api/app/get-userdata', GetUserData.perform);
    express.post('/api/app/get-friend-requests', GetFriendRequests.perform);
    express.post('/api/app/get-friends-messages', GetFriendMessages.perform);
};
