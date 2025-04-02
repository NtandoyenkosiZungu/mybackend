const admin = require("firebase-admin");
const serviceAccountKey = require("./service_key.json");


//Initializing firebase admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

const db = admin.firestore();        //Initializing firebase database (firestore)
const auth = admin.auth()           //Initializing authentification

module.exports =  {db, auth};