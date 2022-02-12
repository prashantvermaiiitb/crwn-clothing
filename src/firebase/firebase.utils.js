// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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


// import { initializeApp, auth, firestore, provider } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import 'firebase/auth';
// import 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // Initialize Firebase
// // const app = firebase.initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// export const customAuth = auth();
// export const customFirestore = firestore();

// const customProvider = new provider.GoogleAuthProvider();
// customProvider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopUp(customProvider);

// export default firebase;