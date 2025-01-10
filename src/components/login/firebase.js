import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //The API key should be set by the user
  apiKey: "",
  authDomain: "csi-4132-group-project.firebaseapp.com",
  projectId: "csi-4132-group-project",
  storageBucket: "csi-4132-group-project.appspot.com",
  messagingSenderId: "254784708472",
  appId: "1:254784708472:web:b578660a70956744cbf28d",
  measurementId: "G-6RWVCPXCFG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
