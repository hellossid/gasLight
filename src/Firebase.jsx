import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBF7nx8JLtCfFrKO56lAr8FX99ox5-bRmc",
    authDomain: "gaslight-cd166.firebaseapp.com",
    projectId: "gaslight-cd166",
    storageBucket: "gaslight-cd166.appspot.com",
    messagingSenderId: "311037107115",
    appId: "1:311037107115:web:534b986b981dc0178f50ee",
    measurementId: "G-L2LNZHZYWB"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }