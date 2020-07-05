import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDLlMGLW3ddWbrRSExyEg5fi11-iF7U2Eg",
    authDomain: "crwn-db-9449a.firebaseapp.com",
    databaseURL: "https://crwn-db-9449a.firebaseio.com",
    projectId: "crwn-db-9449a",
    storageBucket: "crwn-db-9449a.appspot.com",
    messagingSenderId: "797365283229",
    appId: "1:797365283229:web:ca418b16e54805066aa774",
    measurementId: "G-G0S5QSY5CT"
};


export const createUserProfileDocument = async (userAuth , additionalData) => {
  if(!userAuth) return ;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if(!snapShot.exists){
    const {displayName , email } = userAuth;
    const createdAt = new Date();
    try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
    }catch(error){
        console.log('error creating user', error.message);
    }
  }
  return userRef;
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
