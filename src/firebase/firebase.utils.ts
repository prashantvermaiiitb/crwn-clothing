// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";
// import { getFirestore, doc, getDoc, addDoc, collection, writeBatch, setDoc, query, getDocs } from "firebase/firestore";
import {
  Auth,
  GoogleAuthProvider,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Category } from "../store/categories/category.types";

//https://www.geeksforgeeks.org/firebase-integration-with-web/
// https://www.educative.io/answers/firebase-as-simple-database-to-react-app
const firebaseConfig = {
  apiKey: "AIzaSyAwy7ajW5HkB2Ii8CYxlw1Aqgi6Yr_hEEk",
  authDomain: "crwn-db-b9805.firebaseapp.com",
  projectId: "crwn-db-b9805",
  storageBucket: "crwn-db-b9805.appspot.com",
  messagingSenderId: "212850492257",
  appId: "1:212850492257:web:5672269a4cd268c3283b20",
  measurementId: "G-D6JP17ZKLV",
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
export const auth = getAuth();
auth.languageCode = "it";
provider.setCustomParameters({
  login_hint: "user@example.com",
  prompt: "select_account",
});

export const db = getFirestore(); // getting connection to DB

export type AdditionalData = {
  displayName?: string;
};
export type UserData = {
  email: string;
  displayName: string;
  createdAt: string;
};
export const createUserProfileDocument = async (
  userAuth: User,
  additionalData = {} as AdditionalData
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const docRef = doc(db, "users", userAuth.uid); //connecting to users collection & then document => document reference
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    const { displayName: name, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(docRef, {
        name,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error(
        "🚀 ~ file: firebase.utils.js ~ line 43 ~ createUserProfileDocument ~ error",
        error
      );
    }
  }
  // return docRef; // so that we can get the data and store this inside the reducer.
  return snapshot as QueryDocumentSnapshot<UserData>; // so that we can get the data and store this inside the reducer.
};

export const signInWithGoogle2 = async () => {
  const { user } = await signInWithPopup(auth, provider);
  // console.log("🚀 ~ file: firebase.utils.js:60 ~ .then ~ user:", user);
  return user;
};
export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // console.log("🚀 ~ file: firebase.utils.js:58 ~ .then ~ token:", token)
      // The signed-in user info.
      const user = result.user;
      // todo we have not set the user in the context ???
      // ...
    })
    .catch((error) => {
      console.log("🚀 ~ file: firebase.utils.js:69 ~ .then ~ error:", error);
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

export const customCreateUserWithEmailAndPassword = (
  auth: Auth,
  email: string,
  password: string
) => createUserWithEmailAndPassword(auth, email, password);

export const customSignInWithEmailAndPassword = (
  auth: Auth,
  email: string,
  password: string
) => signInWithEmailAndPassword(auth, email, password);

/**
 * whenever user login or logout this authentication listener will be changed
 * @param {*} callback
 * @returns
 */
export const onAuthenticationStatusChange = (callback: NextOrObserver<User>) =>
  callback && onAuthStateChanged(auth, callback);

export type ObjectsToAdd = {
  title: string;
};

/**
 * method for uploading the shop_data into firebase
 */
export const addCollectionAndDocuments = async <T extends ObjectsToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
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
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  /**
   * Commit the batch with all the data.
   */
  await batch.commit();
  console.log("done DB entry");
};

/**
 * Categories map from the firebase
 */
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  /**
   * get hold of categories collection in DB
   */
  const collectionRef = collection(db, "categories");
  // Allow to query on this collection reference.
  const q = query(collectionRef);
  /**
   * get the Documents in the collection in form snapshots.
   */
  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.map(
    (docSnapShot) => docSnapShot.data() as Category
  );
  /**
   * Create the JSON object that we used in the start
   * hats : {title:'hats',items:[{id,title,imageUrl,price},{...}]}
   */
  //! commenting out because we are planing to return most basic form of Data.
  // const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
  //     const { title, items } = docSnapShot.data(); // regain data in the document
  //     acc[title.toLowerCase()] = items;
  //     return acc;
  // }, {});
  // return the category map once that is created.
  return categoryMap;
};

/**
 * To convert observable listener into a promise based call
 */
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        // callback triggered on change
        unsubscribe();
        resolve(userAuth);
      },
      reject // will run when there is an Error
    );
  });
};

export const signOutUser = () => signOut(auth);
