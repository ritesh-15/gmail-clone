import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9pImnlhX5OABM9Eon_YRIY7Gu2zmhApc",
  authDomain: "clone-4127c.firebaseapp.com",
  projectId: "clone-4127c",
  storageBucket: "clone-4127c.appspot.com",
  messagingSenderId: "210611751579",
  appId: "1:210611751579:web:29861029b8fc1168da543e",
  measurementId: "G-2Y2WNR0TGR",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
