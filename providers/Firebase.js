const firebaseAdmin = require('firebase-admin');

// Firebase account deleted
const firebaseAccessKeys = {
    type: 'service_account',
    project_id: '',
    private_key_id: '',
    private_key:
        '',
    client_email:
        '',
    client_id: '',
    auth_uri: '',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        '',
};

class Firebase {
    initialize = async () => {
        try {
            this.firebase = firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.cert(firebaseAccessKeys),
                databaseURL:
                    'https://development-7475c-default-rtdb.firebaseio.com',
            });
            this.database = firebaseAdmin.database(this.firebase);
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = new Firebase();
