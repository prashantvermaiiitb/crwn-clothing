// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, collection, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwy7ajW5HkB2Ii8CYxlw1Aqgi6Yr_hEEk",
    authDomain: "crwn-db-b9805.firebaseapp.com",
    projectId: "crwn-db-b9805",
    storageBucket: "crwn-db-b9805.appspot.com",
    messagingSenderId: "212850492257",
    appId: "1:212850492257:web:5672269a4cd268c3283b20",
    measurementId: "G-D6JP17ZKLV"
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const auth = getAuth();
auth.languageCode = 'it';
provider.setCustomParameters({
    'login_hint': 'user@example.com'
});

export const db = getFirestore(); // getting connection to DB

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // console.log("🚀 ~ file: firebase.utils.js ~ line 29 ~ createUserProfileDocument ~ userAuth", userAuth)
    if (!userAuth) return;
    const docRef = doc(db, 'users', userAuth.uid); //connecting to users collection & then document => document reference
    const snapshot = await getDoc(docRef);
    // console.log("🚀 ~ file: firebase.utils.js ~ line 32 ~ createUserProfileDocument ~ snapshot", snapshot)

    if (!snapshot.exists()) {
        const { displayName: name, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(docRef, {
                name, email, createdAt, ...additionalData
            });
        } catch (error) {
            console.error("🚀 ~ file: firebase.utils.js ~ line 43 ~ createUserProfileDocument ~ error", error)

        }
    }
    // console.log("🚀 ~ file: firebase.utils.js ~ line 48 ~ createUserProfileDocument ~ docRef", docRef)
    return docRef;
    // getDoc(docRef).then(response => console.log(response));
}

export const signInWithGoogle = () => signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

export const customCreateUserWithEmailAndPassword = (auth, email, password) => createUserWithEmailAndPassword(auth, email, password)

export const customSignInWithEmailAndPassword = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);