const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("../intro2se-firebase-adminsdk-eox3v-c809303b60.json");

dotenv.config({ path: "./config.env" });
// Initialize a firebase application
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
//console.log(firebaseConfig);
admin.initializeApp(firebaseConfig);

const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};
