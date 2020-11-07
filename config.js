import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCH5eeb6A0zesh5SxTM4PvdgMgifTvcwMA",
    authDomain: "barter-system-fcaff.firebaseapp.com",
    databaseURL: "https://barter-system-fcaff.firebaseio.com",
    projectId: "barter-system-fcaff",
    storageBucket: "barter-system-fcaff.appspot.com",
    messagingSenderId: "363517712203",
    appId: "1:363517712203:web:f83981d7ee5e1a7f13bace"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore;