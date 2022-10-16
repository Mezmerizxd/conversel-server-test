const Firebase = require('../../providers/Firebase');
const Authorizer = require('../../classes/Authorizer');

module.exports = {
    async perform(req, res) {
        console.log('GETFRIENDS starting');

        const user = await Authorizer.App(req.headers.authorization, res);
        if (user.authorized) {
            let friends = [];

            // Check if user has friends
            if (user?.friends && user?.friends != null) {
                // Get the user data from each friend
                let friendIds = [];
                Object.keys(user.friends).forEach(async (friend) => {
                    friendIds.push(user.friends[friend]);
                });

                for (let i = 0; i < friendIds.length; i++) {
                    const fbUserData = Firebase.database.ref(
                        `conversel/user_data/${user.friends[i]}`
                    );
                    const fbUserDataResp = await fbUserData.get();
                    if (fbUserDataResp.toJSON()) {
                        friends.push({
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
                data: friends,
            });
        }

        console.log('GETFRIENDS finished');
    },
};
