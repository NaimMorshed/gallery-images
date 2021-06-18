import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAnVn_V6zzi5S4qD18NukT1B4q-Xr_f4VU",
    authDomain: "gallery-929ec.firebaseapp.com",
    projectId: "gallery-929ec",
    storageBucket: "gallery-929ec.appspot.com",
    messagingSenderId: "532342042101",
    appId: "1:532342042101:web:f2bcd5931d1fbee57d44bc"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };