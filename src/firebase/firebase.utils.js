// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, addDoc, collection, writeBatch, setDoc, query, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


//https://www.geeksforgeeks.org/firebase-integration-with-web/
// https://www.educative.io/answers/firebase-as-simple-database-to-react-app
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
    'login_hint': 'user@example.com',
    'prompt': 'select_account'
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
        console.log("🚀 ~ file: firebase.utils.js:58 ~ .then ~ token:", token)
        // The signed-in user info.
        const user = result.user;
        console.log("🚀 ~ file: firebase.utils.js:60 ~ .then ~ user:", user);
        // todo we have not set the user in the context ???     
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

/**
 * whenever user login or logout this authentication listener will be changed
 * @param {*} callback 
 * @returns 
 */
export const onAuthenticationStatusChange = (callback) => callback && onAuthStateChanged(auth, callback)

/**
 * method for uploading the shop_data into firebase 
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    /**
     * get the reference of this collection in DB 
     * Collectionkey is the name of the table 
     */
    const collectionRef = collection(db, collectionKey);
    /**
     * get the batch instance for this DB so that different reads, writes and sets can be used on it.
     */
    const batch = writeBatch(db);
    /**
     * For each of the objects in the shop_data
     * set the key and add the documents in the table
     */
    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    /**
     * Commit the batch with all the data.
     */
    await batch.commit();
    console.log('done DB entry');
};

/**
 * Categories map from the firebase
 */
export const getCategoriesAndDocuments = async () => {
    /**
     * get hold of categories collection in DB
     */
    const collectionRef = collection(db, 'categories');
    // Allow to query on this collection reference.
    const q = query(collectionRef);
    /**
     * get the Documents in the collection in form snapshots. 
     */
    const querySnapShot = await getDocs(q);
    /**
     * Create the JSON object that we used in the start
     * hats : {title:'hats',items:[{id,title,imageUrl,price},{...}]}
     */
    const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
        const { title, items } = docSnapShot.data(); // regain data in the document 
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    // return the category map once that is created.
    return categoryMap;
};