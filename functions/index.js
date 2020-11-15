const functions = require('firebase-functions')
// const axios = require('axios')

// #### Firebase database initialization
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
//require("firebase/auth");
require("firebase/database");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKLpVlHdJImwVVU-hM3GQ3BE8ODZ68F2o",
  authDomain: "react-crud-d487b.firebaseapp.com",
  databaseURL: "https://react-crud-d487b.firebaseio.com",
  projectId: "react-crud-d487b",
  storageBucket: "react-crud-d487b.appspot.com",
  messagingSenderId: "645779934914",
  appId: "1:645779934914:web:a3c9454a6f2c67594ab55b"
};

// Initialize Firebase, returns an object
const database = firebase.initializeApp(firebaseConfig)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require('express')

const app = express()

//  GET https://us-central1-react-crud-d487b.cloudfunctions.net/api/login route
app.get('/login', (req, res) => {
    res.send('GET /api/login is working')     
})

// GET https://us-central1-react-crud-d487b.cloudfunctions.net/api/admin route
app.get('/admin', (req, res) => {
    res.send('GET /api/admin is working')
})

// POST https://us-central1-react-crud-d487b.cloudfunctions.net/api/contacts route
app.post('/contacts', (req, res) => {
    const contact = {
        fullName : req.body.fullName,
        address : req.body.address,
        email : req.body.email,
        mobile : req.body.mobile
    };    

    // Method 1 : use HTTP post to add record into realtime database
/*       axios.post('https://react-crud-d487b.firebaseio.com/contacts.json', contact)
      .then((response) => {
        console.log("Added a new contact to Firebase real-time database")
        console.log('👉 Returned data:', response);
        res.send("Added a new contact to Firebase real-time database : " + response)
      }, (error) => {
        console.log(`😱 Axios request failed: ${error}`);
        res.send(`😱 Axios request failed: ${error}`)
      }); */

    // Method 2 : use Firebase SDK to add record into realtime database
    // Authentication is disabled to make it simple
    const ref = database.ref('contacts')
    ref.push(contact)
});

exports.api = functions.https.onRequest(app)