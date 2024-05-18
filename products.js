import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth,signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore,getDocs,collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
  
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
  const db = getFirestore(app);

  const productsCollection = collection(db, "products");


  let signOutBtn = document.getElementById("signOutBtn");
  let goToAdmin = document.getElementById("goToAdmin");

  const userSignOut = () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        // An error happened.
      });
}

function adminPage(){
  window.location.href = "admin.html";
}

async function getProducts(){
  const querySnapshot = await getDocs(productsCollection);
  let productsContainer = document.getElementById("productsContainer");
  querySnapshot.forEach((doc) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <img src="${doc.data().productImg}">
    <h1>${doc.data().productName}</h1>
    <h1>${doc.data().productDescription}</h1>
    <h1>${doc.data().productPrice}$</h1>`;
    productsContainer.appendChild(div);
  });
}

signOutBtn.addEventListener("click", userSignOut);
goToAdmin.addEventListener("click", adminPage);
window.addEventListener("load", getProducts);