var admin = require("firebase-admin");
require('dotenv').config()
var serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert({
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: "https://hamster-wars.firebaseio.com",
  storageBucket: "hamster-wars.appspot.com"
});

const db = admin.firestore()
// const auth = admin.auth()
const storage = admin.storage()
// firebase.auth.signInWithEmailAndPassword(process.env.USER, process.env.PASSWORD)
// .then(user=> console.log(user))
// .catch(err => console.log(err))

module.exports = { db, storage }