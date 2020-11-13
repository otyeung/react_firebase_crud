const functions = require('firebase-functions')
const axios = require('axios')

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

    //console.log("Received contact : " + contact)
    //res.send("Added a new contact to Firebase real-time database")

//    axios.post('https://react-crud-d487b.firebaseio.com/contacts.json', contact)
//    .then(res => {
//      console.log("Added a new contact to Firebase real-time database")
//    })

      axios.post('https://react-crud-d487b.firebaseio.com/contacts.json', contact)
      .then((response) => {
        console.log("Added a new contact to Firebase real-time database")
        console.log('👉 Returned data:', response);
        res.send("Added a new contact to Firebase real-time database : " + response)
      }, (error) => {
        console.log(`😱 Axios request failed: ${error}`);
        res.send(`😱 Axios request failed: ${error}`)
      });

});
exports.api = functions.https.onRequest(app)