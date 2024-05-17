import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

//sign up
let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");

function signUp() {
  let signUpEmail = document.getElementById("signUpEmail").value;
  let signUpPass = document.getElementById("signUpPass").value;
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPass)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      window.location.href = "products.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorCode);
      // ..
    });
}

function signIn(){
    let signInEmail = document.getElementById("signInEmail").value;
    let signInPass = document.getElementById("signInPass").value;
    signInWithEmailAndPassword(auth, signInEmail, signInPass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "products.html";
  })
  .catch((error) => {
    const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorCode);
  });
}

//admin page
function showNewProductForm(){
    document.getElementById("showNewProductForm").style="display: none;"
}

signUpBtn.addEventListener("click", signUp);
signInBtn.addEventListener("click", signIn);