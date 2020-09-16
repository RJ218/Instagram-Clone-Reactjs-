// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDzuracfSQpEYlhhgUiRV7BgNZtgOxN3Ns",
    authDomain: "instagram-clone-fec8f.firebaseapp.com",
    databaseURL: "https://instagram-clone-fec8f.firebaseio.com",
    projectId: "instagram-clone-fec8f",
    storageBucket: "instagram-clone-fec8f.appspot.com",
    messagingSenderId: "313198298280",
    appId: "1:313198298280:web:13da45cdfc725b9f47ae9d",
    measurementId: "G-JQ29J74PWX"
});
    const db= firebaseApp.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage();


  export  {db, auth,storage};