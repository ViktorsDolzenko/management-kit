import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAsNX7Jkd0MVLJT7ZDVig35h3zoneXtZQI",
  authDomain: "management-kit-awsick.firebaseapp.com",
  databaseURL: "https://management-kit-awsick-default-rtdb.firebaseio.com",
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
export default app;
