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

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email: email,
    uid,
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

export const addDevit = ({
  avatar,
  content,
  userId,
  userName,
}) => {
  // collection devulve una promesa
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(
      new Date()
    ),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        /* Transformamos el documento a un objeto plano */
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};

export const upLoadImage = (file) => {
  const ref = firebase
    .storage()
    .ref(`/images/${file.name}`);
  const task = ref.put(file);

  return task;
};
