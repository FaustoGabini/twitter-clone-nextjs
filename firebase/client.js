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

firebase.initializeApp(firebaseConfig);

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  /* nos devuelve una promesa que indica si tenemos o no un usuario */
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((user) => {
      const { additionalUserInfo } = user;
      const { username, profile } = additionalUserInfo;
      const { avatar_url, blog } = profile;

      return {
        avatar: avatar_url,
        username: username,
        url: blog,
      };
    });
};
