const Firebase = require('../../providers/Firebase');
const Authorizer = require('../../classes/Authorizer');

module.exports = {
    async perform(req, res) {
        console.log('GETUSERDATA starting');

        const user = await Authorizer.App(req.headers.authorization, res);
        if (user.authorized) {
            // Return the data
            res.status(200).json({
                success: true,
                error: false,
                errorMessage: null,
                data: user,
            });
        }

        console.log('GETUSERDATA finished');
    },
};
