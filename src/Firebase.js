import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCBlJB6wLds3I5KHvujt1l26RgQvaj1PRg",
  authDomain: "realtor-clone-ba81e.firebaseapp.com",
  projectId: "realtor-clone-ba81e",
  storageBucket: "realtor-clone-ba81e.appspot.com",
  messagingSenderId: "81851017238",
  appId: "1:81851017238:web:2dfa8d3e3ebd0114ddad37"
};

initializeApp(firebaseConfig);
export const db = getFirestore()