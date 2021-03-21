import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAsNX7Jkd0MVLJT7ZDVig35h3zoneXtZQI",
  authDomain: "management-kit-awsick.firebaseapp.com",
  projectId: "management-kit-awsick",
  storageBucket: "management-kit-awsick.appspot.com",
  messagingSenderId: "239211949496",
  appId: "1:239211949496:web:2f55946880ba9994f4b34d",
  measurementId: "G-N0BFPDFDVE",
});

export const actionCodeSettings = {
  url: "https://management-kit-2jgjni8tl.vercel.app/",
  handleCodeInApp: true,
  iOS: {
    bundleId: "com.example.ios",
  },
  android: {
    packageName: "com.example.android",
    installApp: true,
    minimumVersion: "12",
  },
  dynamicLinkDomain: "example.page.link",
};

export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();

export const fieldValue = firebase.firestore.FieldValue;
export const deleteField = firebase.firestore.FieldValue.delete();
export const timestamp = firebase.firestore.Timestamp.now();

export const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: (authResult: any) => {
      db.collection("users").doc(authResult.user?.uid).set({
        userName: authResult.user.displayName,
      });
      return true;
    },
  },
};
