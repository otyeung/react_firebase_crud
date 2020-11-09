import firebase from "firebase/app"

require("firebase/database")

// Your web app's Firebase configuratio
var firebaseConfig = {
  apiKey: "AIzaSyAKLpVlHdJImwVVU-hM3GQ3BE8ODZ68F2o",
  authDomain: "react-crud-d487b.firebaseapp.com",
  databaseURL: "https://react-crud-d487b.firebaseio.com",
  projectId: "react-crud-d487b",
  storageBucket: "react-crud-d487b.appspot.com",
  messagingSenderId: "645779934914",
  appId: "1:645779934914:web:a3c9454a6f2c67594ab55b"
};
// Initialize Firebase, returns an object
var fireDb = firebase.initializeApp(firebaseConfig)

// export firebase database reference
export default fireDb.database().ref()