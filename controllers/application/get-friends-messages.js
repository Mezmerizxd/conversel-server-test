const Firebase = require('../../providers/Firebase');
const Authorizer = require('../../classes/Authorizer');

module.exports = {
    async perform(req, res) {
        console.log('GETFRIENDSMESSAGES starting');
        const reqData = req.body;
        console.log(reqData)
        const user = await Authorizer.App(req.headers.authorization, res);
        if (user.authorized) {
            let messages = [];
            let directMessageId = reqData.userId + user.userId;

            // TODO: verify user exists

            // Get direct message
            let directMessage = null;
            const fbDirectMessages = Firebase.database
                .ref(`conversel`)
                .child('direct_messages')
                .orderByChild('directMessageId')
                .equalTo(directMessageId)
                .limitToFirst(1);
            if ((await fbDirectMessages.get()).toJSON()) {
                (await fbDirectMessages.get()).forEach((child) => {
                    directMessage = child.toJSON();
                    messages = directMessage.messages
                });
            } else {
                const fbUserData = Firebase.database.ref(
                    `conversel/direct_messages/${directMessageId}`
                );
                await fbUserData.set({
                    directMessageId: directMessageId,
                    messages: [],
                    users: [
                        reqData.userId,
                        user.userId
                    ]
                });
            }

            // Return the data
            res.status(200).json({
                success: true,
                error: false,
                errorMessage: null,
                data: {
                    directMessageId: directMessageId,
                    messages: messages,
                },
            });
        }

        console.log('GETFRIENDSMESSAGES finished');
    },
};
