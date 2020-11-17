const functions = require('firebase-functions')
const ref = require('./firebase')
// const axios = require('axios')

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

// Return all contacts from db
app.get('/contacts', (req, res) => {
  //const ref = firebaseDb.ref('contacts')

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    console.log(snapshot.val())
    res.send(snapshot.val())
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code)
    res.send("The read failed: " + errorObject.code)
  })
})

// POST https://us-central1-react-crud-d487b.cloudfunctions.net/api/contacts/converse route
app.post('/contacts/converse', (req, res) => {
  var contact = {
      fullName : req.body.prompts.answers.name,
      address : '',
      email : req.body.prompts.answers.email,
      mobile : req.body.prompts.answers.phone
  }   

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
  ref.push(contact)
    .then((response) => {
      console.log("Added a new contact to Firebase real-time database")
      console.log('👉 Returned data:', response)
      //res.send("Added a new contact to Firebase real-time database : " + response)
      res.status(200).send('')
    }, (error) => {
      console.log(`😱 Axios request failed: ${error}`)
      //res.send(`😱 Axios request failed: ${error}`)
      res.status(400).send('')
    })
})

// POST https://us-central1-react-crud-d487b.cloudfunctions.net/api/contacts route
app.post('/contacts', (req, res) => {
    var contact = {
        fullName : req.body.fullName,
        address : req.body.address,
        email : req.body.email,
        mobile : req.body.mobile
    }   

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
    ref.push(contact)
      .then((response) => {
        console.log("Added a new contact to Firebase real-time database")
        console.log('👉 Returned data:', response)
        res.send("Added a new contact to Firebase real-time database : " + response)
      }, (error) => {
        console.log(`😱 Axios request failed: ${error}`)
        res.send(`😱 Axios request failed: ${error}`)
      })
})

exports.api = functions.https.onRequest(app)