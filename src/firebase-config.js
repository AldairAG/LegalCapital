import { initializeApp } from "firebase/app";

const firebaseConfig= {
  apiKey: "AIzaSyC7tKm8rbkmYLQ6IqQZn5uri_X1RQV7KLc",
  authDomain: "legalcapital-1f52c.firebaseapp.com",
  databaseURL: "https://legalcapital-1f52c-default-rtdb.firebaseio.com",
  projectId: "legalcapital-1f52c",
  storageBucket: "legalcapital-1f52c.appspot.com",
  messagingSenderId: "484884229897",
  appId: "1:484884229897:web:3c76833fe481fedd112dd8"
};

const appFirebase=initializeApp(firebaseConfig);
export default appFirebase;

