var admin = require("firebase-admin");
require('dotenv').config()
// var serviceAccount = require("./service_account.json");
var serviceAccount = {
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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