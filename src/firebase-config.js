import { initializeApp } from "firebase/app";

const firebaseConfig= {
  apiKey: "AIzaSyDL1Ri4_VXxiWkB7E6eVEfRWXpGQasQTjw",
  authDomain: "legalcapital-corp.firebaseapp.com",
  databaseURL: "https://legalcapital-corp-default-rtdb.firebaseio.com",
  projectId: "legalcapital-corp",
  storageBucket: "legalcapital-corp.appspot.com",
  messagingSenderId: "669174083220",
  appId: "1:669174083220:web:61390e57f33eea2b90ce81"
};

const appFirebase=initializeApp(firebaseConfig);
export default appFirebase;