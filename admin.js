import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
let goToProducts = document.getElementById("goToProducts");
let showNewProductForm = document.getElementById("showNewProductForm");
let addProductbtn = document.getElementById("addProduct");
let productName = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let productImg = document.getElementById("productImg");
let productPrice = document.getElementById("productPrice");

const userSignOut = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
      alert("yay");
    })
    .catch((error) => {
      // An error happened.
    });
};

function productsPage() {
  window.location.href = "products.html";
}

function showProductForm() {
  document.getElementById("newProductForm").style.display = "block";
}

async function getProducts(){
  const querySnapshot = await getDocs(productsCollection);
  let table = document.getElementById("ProductsTable");
  table.innerHTML = "";
  querySnapshot.forEach((doc) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${doc.data().productImg}"></td>
    <td>${doc.data().productName}</td>
    <td>${doc.data().productDescription}</td>
    <td>${doc.data().productPrice}$</td>
    <td><span class="material-symbols-outlined">edit</span></td>
    <td><button onclick="deleteProduct('${doc.id}')"><span class="material-symbols-outlined">delete</span></button></td>`;
      table.appendChild(row);
  });
}

async function addProduct(event) {
  event.preventDefault();
  await addDoc(productsCollection, {
    productName: productName.value,
    productDescription: productDescription.value,
    productImg: productImg.value,
    productPrice: productPrice.value,
  });
  alert("Product added successfully! Hooray!");
  document.getElementById("newProductForm").style.display = "none";
  getProducts();
}

async function deleteProduct(productId){
  await deleteDoc(doc(db, "products", productId));
  getProducts();
}

window.deleteProduct = deleteProduct;


signOutBtn.addEventListener("click", userSignOut);
goToProducts.addEventListener("click", productsPage);
showNewProductForm.addEventListener("click", showProductForm);
addProductbtn.addEventListener("click", addProduct);
window.addEventListener("load", getProducts);
