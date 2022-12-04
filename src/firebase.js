// import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';


// npm install firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDM2Crlabg0gnvF7HY2LIc9sykp2krdloM",
  authDomain: "moonshot-53d0d.firebaseapp.com",
  projectId: "moonshot-53d0d",
  storageBucket: "moonshot-53d0d.appspot.com",
  messagingSenderId: "346500499396",
  appId: "1:346500499396:web:993214cfbdea2d8d330691",
  measurementId: "G-98Q9ZE32VL"
  };
  export const app = initializeApp(firebaseConfig);
  console.log(app)
