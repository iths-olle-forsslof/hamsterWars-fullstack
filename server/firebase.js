const admin = require("firebase-admin");
require ("firebase/storage")
require('dotenv').config()
// const serviceAccount = require("./service_account.json");
const serviceAccount = {
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hamster-wars.firebaseio.com",
  storageBucket: "hamster-wars.appspot.com"
});

// let firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: "hamster-wars.firebaseapp.com",
//   databaseURL: "https://hamster-wars.firebaseio.com",
//   projectId: "hamster-wars",
//   storageBucket: "hamster-wars.appspot.com",
//   messagingSenderId: "603191884208",
//   appId: "1:603191884208:web:8ba3ba5ee237cbd80bbe75"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const db = admin.firestore()
const storage = admin.storage()

module.exports = { db, storage }