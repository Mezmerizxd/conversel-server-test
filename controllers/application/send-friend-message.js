const Firebase = require('../../providers/Firebase');
const Authorizer = require('../../classes/Authorizer');
const Generator = require("../../classes/Generator");

module.exports = {
    async perform(data, socket) {
        console.log('SENDFRIENDMESSAGE starting');
        const user = await Authorizer.App(data.authorization);
        if (user.authorized) {
            const messageId = await Generator.DirectMessage_MessageId();
            if (!messageId.data) {
                console.log('messageId generator error');
                return;
            }
            
            // Stack data
            const messageData = {
                messageId: messageId.data,
                userId: user.userId,
                username: user.username,
                dateSent: new Date(),
                content: data.messageContent,
                avatar: user.avatar || 'https://i.pravatar.cc/300',
            };

            // Return data
            socket.emit(
                `send_friend_message_${data.userId + user.userId}`,
                messageData
            );
        }

        console.log('SENDFRIENDMESSAGE finished');
    },
};
