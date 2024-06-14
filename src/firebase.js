import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBjIodu34huspngT0lM8i32RjYx4ePol0Y",

  authDomain: "blog-workshop-model.firebaseapp.com",

  projectId: "blog-workshop-model",

  storageBucket: "blog-workshop-model.appspot.com",

  messagingSenderId: "375399823997",

  appId: "1:375399823997:web:6c19e514e7b525f5308f14",

  measurementId: "G-5V3ZP1HXJP"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
