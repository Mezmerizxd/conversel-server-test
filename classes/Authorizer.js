const Firebase = require("../providers/Firebase")

class Authorizer {
    App = async (token, resHandler) => {
        if (!token) {
            if (resHandler) {
                resHandler.status(400).json({
                    success: false,
                    error: true,
                    errorMessage: "No authorization token was passed."
                })
            }
            return { authorized: false };
        }
        let fbUserDataResp = null;
        const fbUserData = Firebase.database
            .ref(`conversel`)
            .child('user_data')
            .orderByChild('authorization')
            .equalTo(token)
            .limitToFirst(1);
        (await fbUserData.get()).forEach((child) => {
            fbUserDataResp = child.toJSON();
        });
        if (fbUserDataResp) {
            return { authorized: true, userData: fbUserDataResp };
        } else {
            if (resHandler) {
                resHandler.status(400).json({
                    success: false,
                    error: true,
                    errorMessage: "Refused authorization"
                })
            }
            return { authorized: false };
        }
    }
}

module.exports = new Authorizer()