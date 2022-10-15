const crypto = require('crypto');
const Firebase = require('../providers/Firebase');

class Generator {
    #max_id_size = 999999999999999;
    #max_token_byte = 64;
    #max_attempts = 5;

    DirectMessageId = async () => {};
    DirectMessage_MessageId = async (directMessageId) => {};
    ChannelId = async (roomId) => {};
    ChannelMessageId = async (roomId, channelId) => {};
    RoomId = async () => {};
    UserId = async () => {
        console.log('Generator - UserId starting');
        let created = false;
        let id = null;
        let attempts = 0;
        while (!created) {
            id = Math.floor(Math.random() * this.#max_id_size);
            if (attempts === this.#max_attempts) {
                console.log('AuthorizationToken - max attempts');
                return { data: null };
            }
            const fbUserAccount = Firebase.database.ref(
                `conversel/user_accounts/${id}`
            );
            const fbUserDataResp = (await fbUserAccount.get()).toJSON();
            if (!fbUserDataResp) created = true;
            attempts += 1;
        }
        console.log('Generator - UserId finished');
        return { data: id };
    };
    AuthorizationToken = async () => {
        console.log('Generator - AuthorizationToken starting');
        let created = false;
        let token = null;
        let attempts = 0;
        while (!created) {
            token = crypto.randomBytes(this.#max_token_byte).toString('hex');
            if (attempts === this.#max_attempts) {
                console.log('AuthorizationToken - max attempts');
                return { data: null };
            }
            const fbUserData = Firebase.database
                .ref(`conversel/`)
                .child('user_data')
                .orderByChild('authorization')
                .equalTo(token)
                .limitToFirst(1);
            const fbUserDataResp = (await fbUserData.get()).toJSON();
            if (!fbUserDataResp) created = true;
            attempts += 1;
        }
        console.log('Generator - AuthorizationToken finished');
        return { data: token };
    };
}

module.exports = new Generator();
