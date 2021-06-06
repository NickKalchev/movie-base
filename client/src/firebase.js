import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDpev0-31YcclcNv-aIP6DqMbmLfWQdS_M",
  authDomain: "movie-base-nick.firebaseapp.com",
  projectId: "movie-base-nick",
  storageBucket: "movie-base-nick.appspot.com",
  messagingSenderId: "1082938213963",
  appId: "1:1082938213963:web:e7ee82536f03b947ee2fce",
  measurementId: "G-NRH52GXWBK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();

const db = firebase.firestore();

const auth = firebase.auth();

export { db, auth, provider, storage };

export default firebaseApp;
