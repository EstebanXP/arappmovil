import firebase from 'firebase';

import 'firebase/firestore';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBLbUC8BT6f-ZJF3WLTwN6WbJajcca28LE",
    authDomain: "abbey-road-app.firebaseapp.com",
    projectId: "abbey-road-app",
    storageBucket: "abbey-road-app.appspot.com",
    messagingSenderId: "126323543490",
    appId: "1:126323543490:web:23c0f99d65cfb044c51a5b"
};

firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();

export default{
    firebase,
    db,
}