import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB64_HdzlNEoW8xZ4JsIKCCMtI73IE7gKc",
    authDomain: "netflix-gpt-61aed.firebaseapp.com",
    projectId: "netflix-gpt-61aed",
    storageBucket: "netflix-gpt-61aed.firebasestorage.app",
    messagingSenderId: "544097791710",
    appId: "1:544097791710:web:be4070003d490b9da4dc4f",
    measurementId: "G-TG9F38CVNV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); 