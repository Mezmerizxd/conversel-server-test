// Controllers
const SendFriendMessage = require("../controllers/application/send-friend-message");

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Connected');

        socket.on('disconnect', () => {
            console.log('Disconnected');
        });

        socket.on(
            'handleSendFriendMessage',
            async (data) => await SendFriendMessage.perform(data, io)
        );
    });
};
