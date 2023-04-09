// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getDatabase, onValue, push} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUsVPbpCxY4nWCFS4GPZvkhbFmhzC3F4o",
  authDomain: "carpark-497d8.firebaseapp.com",
  databaseURL: "https://carpark-497d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carpark-497d8",
  storageBucket: "carpark-497d8.appspot.com",
  messagingSenderId: "357367885000",
  appId: "1:357367885000:web:ee3039e4aeae39c37189fd",
  measurementId: "G-Y5M5DM811W"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function storeReport(reportData){
    push(ref(database, 'reports'), reportData);
}

export async function fetchReports(){
    return onValue(ref(database, 'reports'));
}