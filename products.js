import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth,signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAaEgi2EzsfKgFxwXc95MZPENHK2VAQcLI",
    authDomain: "e-commerce-project-be341.firebaseapp.com",
    projectId: "e-commerce-project-be341",
    storageBucket: "e-commerce-project-be341.appspot.com",
    messagingSenderId: "1017025355575",
    appId: "1:1017025355575:web:2744729d889f8a314344b2",
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  let signOutBtn = document.getElementById("signOutBtn");

  const userSignOut = () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        // An error happened.
      });
}

signOutBtn.addEventListener("click", userSignOut);