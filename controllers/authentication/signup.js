const Generator = require("../../classes/Generator")
const sjcl = require("sjcl")
const Firebase = require("../../providers/Firebase");

module.exports = {
    async perform(req, res) {
        console.log("SIGNUP starting")
        const reqData = req.body;

        // TODO: Check if username is taken
        // TODO: Check if email is in use

        const userId = await Generator.UserId()
        if (!userId.data) {
            // TODO: RESPONSE ERROR
            console.log("userId generator error")
            return;
        }
        const token = await Generator.AuthorizationToken()
        if (!token.data) {
            // TODO: RESPONSE ERROR
            console.log("token generator error")
            return;
        }

        // Encrypt password
        const encryptedPassword = sjcl.codec.hex.fromBits(
            sjcl.hash.sha256.hash(reqData.password)
        );

        // Set vars
        let CreationDate = new Date();

        // Insert account data
        const fbUserAccount = Firebase.database.ref(
            `conversel/user_account/${userId.data}`
        );
        await fbUserAccount.set({
            userId: userId.data,
            email: reqData.email,
            password: encryptedPassword,
            creation_date: CreationDate
        })

        // Insert user data
        const fbUserData = Firebase.database.ref(
            `conversel/user_data/${userId.data}`
        );
        await fbUserData.set({
            userId: userId.data,
            username: reqData.username,
            authorization: token.data,
            creation_date: CreationDate
        })

        res.status(200).json({
            success: true,
            error: false,
            errorMessage: null,
            authorization: token.data
        });
        console.log("SIGNUP finished")
    },
};
