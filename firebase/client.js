import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHirvOTrAtQybq7Ar__bUpaQpDb9K-_PY",
  authDomain: "devter-fd47a.firebaseapp.com",
  projectId: "devter-fd47a",
  storageBucket: "devter-fd47a.appspot.com",
  messagingSenderId: "725424392688",
  appId: "1:725424392688:web:b9db45fdb74a8da4073535",
  measurementId: "G-WEGW1XRK2P",
};

/* Si no tenemos ninguna app de firebase inicializada entonces que inicialice la que queremos */
firebase.apps.length === 0 &&
  firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email: email,
  };
};

/* Metodo para cuando recargamos la pagina no se pierda el usuario */
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    // If user is signed in
    const normalizedUser = user
      ? mapUserFromFirebaseAuthToUser(user)
      : null;
    onChange(normalizedUser);
  });
  // If user is not signed return null
};

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  /* nos devuelve una promesa que indica si tenemos o no un usuario */
  return firebase.auth().signInWithPopup(githubProvider);
};
