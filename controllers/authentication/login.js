const Generator = require('../../classes/Generator');
const sjcl = require('sjcl');
const Firebase = require('../../providers/Firebase');

module.exports = {
    async perform(req, res) {
        console.log('LOGIN starting');
        const reqData = req.body;

        // TODO: Check request data

        // Get user account
        let account = null;
        const fbUserAccount = Firebase.database
            .ref(`conversel`)
            .child('user_account')
            .orderByChild('email')
            .equalTo(reqData.email)
            .limitToFirst(1);
        (await fbUserAccount.get()).forEach((child) => {
            account = child.toJSON();
        });
        if (!account) {
            res.status(200).json({
                success: false,
                error: true,
                errorMessage: 'Account does not exist',
            });
            console.log('no account found');
            return;
        }

        // Encrypt password
        const encryptedPassword = sjcl.codec.hex.fromBits(
            sjcl.hash.sha256.hash(reqData.password)
        );

        if (account.password !== encryptedPassword) {
            res.status(200).json({
                success: false,
                error: true,
                errorMessage: 'Passwords do not match',
            });
            console.log('passwords dont match');
            return;
        }

        // Get user account
        const fbUserData = Firebase.database.ref(
            `conversel/user_data/${account.userId}`
        );
        const fbUserDataResp = (await fbUserData.get()).toJSON();
        if (!fbUserDataResp) {
            res.status(200).json({
                success: false,
                error: true,
                errorMessage: 'No user data found',
            });
            console.log('no user data found');
            return;
        }

        // Return data
        res.status(200).json({
            success: true,
            error: false,
            errorMessage: null,
            data: {
                userId: fbUserDataResp.userId,
                username: fbUserDataResp.username,
            },
            authorization: fbUserDataResp.authorization,
        });
        console.log('LOGIN finished');
    },
};
