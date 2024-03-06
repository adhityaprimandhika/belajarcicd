import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB35oyYimWM7OSsMchfgBCJ8c_81l6Qv7o",
  authDomain: "testfb-1277b.firebaseapp.com",
  projectId: "testfb-1277b",
  storageBucket: "testfb-1277b.appspot.com",
  messagingSenderId: "917110757190",
  appId: "1:917110757190:web:62e5aee89645aa4d1ef747",
  measurementId: "G-V44S0JS1Z0",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;
