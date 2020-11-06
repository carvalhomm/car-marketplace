import * as admin from 'firebase-admin';
const firebaseCredentials = require('../firebase-adminsdk.json');
admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials)
});
admin.firestore().settings({ timestampsInSnapshots: true });
export default admin;
