const firebaseAdmin = require('firebase-admin');

const firebaseAccessKeys = {
    type: 'service_account',
    project_id: 'development-7475c',
    private_key_id: 'd6633a12e92986698ab5fc559149cabc182eb635',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCjABwAoaUTAiB8\n14ACl/hdFmWhlLXTG9zn4E5WCopq7PWEOKVJ4zzwazcIJdXz+QLRnJwtr01Tu0Qq\ngHSVwjAUlY2zDTbXFEP/iO0Hykm95Q5x7A1JGy4inouikjbk2fnOllypG/j7Aaq6\nEn9fGm2VKpcRiIzIJsvFsBuu/QOYgKhg7AnetD40VS2ORzbLGvWBCwFtbTdzIrMc\n753pRoccn1b8SgmgR+aykj5VsNwJ/v7xeyLRNSKu57hZ0k8ki8xEHTHVZJF7qHH3\nTneg8CaXN2HuTHiCO053Lff1SLEr8QqZqroz2VVbPsoToqhRlceRzPTBhRGXbzDO\nBxZELU3hAgMBAAECggEAJTz96L4FHKfYfLTt44nM/ZVDkCvNc0aTC+1QcDM1xrJO\nb8/SISR3NFTGLIgaTkPF+1W8T2qUb6vhaZVRrTIBMn6tMenzrKTOWRdy0VwLR0UI\nbQnYyioZuuJ+M5yUSmmq+qGa1y6TDeMmWh6mNzeuL80cWK7ZvNMyK/5tAKgAdYsX\nnMrF62XWdGkQFF4n7noXoaQ7DpeBQHrrBNRMt2D627mN8Mz5/9gAk0UNVt2HQ3XC\nkvlDPRlDTg2odk8GNtaZo0n+Ou1fM4ZghhOx3faF95ovryDMbBirFHT5krpa6GNE\nzsGdiVQJve68MKp53GMyT3EeKU955iji6aERMvOPbQKBgQDV9mN0s1MBbOWIq+uc\nAZRNsYaHAzdT5bKrRxtsaxK0OpvmSEVBmoXdbTr3duT66vR5Jdvu+c+6sB86kwtC\ngTHt2mgPvkfGstxkdbNjusziP4+grtGP/VDt9ZDkuAVWw97KVomL6oN16pBX6Vs9\nIgxnTJsYAhtmscfRED6PgCxkrQKBgQDDBn9jhHDCy6i6F3CTKdK9t9SFPbuE3vSD\nNC0WK86A9Qc6nX46zVrboGd/OkqqU1/TUcGtdsYLDmp53r20auDoRIiaxpT+yDSy\nokXJwPfKnPpL2ZZeBlgFZVhJxm93/bDzJxpAQOM6PtYEk0bbt1jxFhPOVcbxmbpr\nlf70CDEAhQKBgQDUi6kq0cTgQpwV06r+07bOI08fKbu5lRGTAdUlM4xmC165OQvL\nasQWPZ75G1vGQsbO3iQH1pNbwf+TwWTLEOpXfMIo+X31zdIP3bhxlqxXCIsWNPOq\nlRri+DGSc5eiJHtaBvMmUbV72qK/Iepn5T3rE/dxtw4fSvXTIc7z4IC5FQKBgQCS\ne+npDMxJdAEqrXpv/uT8fPxSi/iyJ2jOt7z5vzOfZuvkGfF7J02MU2IJjPYSEweR\nyQHJUcIVAeH14djpj7GYpAla/7df227BkeMLVDaKZ/gUSr2HqAorG2ECINsO7G0h\nZYhxJIvH7vR/gUOiuodCpguAWqtQQuBj+MkD8LclpQKBgQCllsOcb2aFb4+tZ57c\nkK+7f6gDgktRcexMIGQQYL5cdPeRJ4hfrXNWZbN+2u51PGqItLAsWbpDIWHZEn5/\n8Utx/Pz833eSbmEft1b1QH/DPKUPM0isReIt7NLkezuAlGNBK2y2BZJOEx5b4j2u\nsxOCyaAMATCDSC188qRn0fPSKg==\n-----END PRIVATE KEY-----\n',
    client_email:
        'firebase-adminsdk-jknx3@development-7475c.iam.gserviceaccount.com',
    client_id: '101323543282438538237',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jknx3%40development-7475c.iam.gserviceaccount.com',
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
