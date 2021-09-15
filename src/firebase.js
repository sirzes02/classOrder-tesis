import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv4XdnYAdA6wI9kMzse0Xl9E4zrLRXtUE",
  authDomain: "classorder-34dc5.firebaseapp.com",
  projectId: "classorder-34dc5",
  storageBucket: "classorder-34dc5.appspot.com",
  messagingSenderId: "520116374305",
  appId: "1:520116374305:web:d25bb35bdbb96b05410c60",
};

const app = firebase.initializeApp(firebaseConfig);

export { app };
