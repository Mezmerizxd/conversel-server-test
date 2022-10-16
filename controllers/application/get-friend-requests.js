const Firebase = require('../../providers/Firebase');
const Authorizer = require('../../classes/Authorizer');

module.exports = {
    async perform(req, res) {
        console.log('GETFRIENDSREQUESTS starting');

        const user = await Authorizer.App(req.headers.authorization, res);
        if (user.authorized) {
            let requestsSent = [];
            let requestsReceived = [];

            // Get sent requests
            if (
                user?.friendRequests?.sent &&
                user?.friendRequests?.sent !== null
            ) {
                // Get the user id from each request
                let userIds = [];
                Object.keys(user.friendRequests.sent).forEach((request) => {
                    userIds.push(user.friendRequests.sent[request]);
                });
                // Get user data from user ids
                for (let i = 0; i < userIds.length; i++) {
                    const fbUserData = Firebase.database.ref(
                        `conversel/user_data/${user.friendRequests.sent[i]}`
                    );
                    const fbUserDataResp = await fbUserData.get();
                    if (fbUserDataResp.toJSON()) {
                        requestsSent.push({
                            userId: fbUserDataResp.toJSON().userId,
                            username: fbUserDataResp.toJSON().username,
                            avatar:
                                fbUserDataResp.toJSON()?.avatar ||
                                'https://i.pravatar.cc/300',
                        });
                    }
                }
            }

            // Get received requests
            if (
                user?.friendRequests?.received &&
                user?.friendRequests?.received !== null
            ) {
                // Get the user id from each request
                let userIds = [];
                Object.keys(user.friendRequests.received).forEach((request) => {
                    userIds.push(user.friendRequests.received[request]);
                });
                // Get user data from user ids
                for (let i = 0; i < userIds.length; i++) {
                    const fbUserData = Firebase.database.ref(
                        `conversel/user_data/${user.friendRequests.received[i]}`
                    );
                    const fbUserDataResp = await fbUserData.get();
                    if (fbUserDataResp.toJSON()) {
                        requestsSent.push({
                            userId: fbUserDataResp.toJSON().userId,
                            username: fbUserDataResp.toJSON().username,
                            avatar:
                                fbUserDataResp.toJSON()?.avatar ||
                                'https://i.pravatar.cc/300',
                        });
                    }
                }
            }

            // Return the data
            res.status(200).json({
                success: true,
                error: false,
                errorMessage: null,
                data: {
                    sent: requestsSent,
                    received: requestsReceived,
                },
            });
        }

        console.log('GETFRIENDSREQUESTS finished');
    },
};
