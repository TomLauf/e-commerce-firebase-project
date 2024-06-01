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
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
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
let showNewProductFormBtn = document.getElementById("showNewProductForm");
let addProductbtn = document.getElementById("addProduct");
let productName = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let productImg = document.getElementById("productImg");
let productPrice = document.getElementById("productPrice");
// let updateProductBtn = document.getElementById("updateProduct");
 
const userSignOut = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
      alert("see you later aligator");
    })
    .catch((error) => {
      // An error happened.
    });
};
 
function productsPage() {
  window.location.href = "products.html";
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
    <td><button onclick="openProductForm('${doc.id}')"><span class="material-symbols-outlined" >edit</span></button></td>
    <td><button onclick="deleteProduct('${doc.id}')"><span class="material-symbols-outlined">delete</span></button></td>`;
      table.appendChild(row);
  });
}
 
function showNewProductForm(){
  document.getElementById("newProductForm").style.display="block";
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
 
async function openProductForm(productId){
  const docRef = doc(db, "products",productId);
  const product = await getDoc(docRef);
  console.log(product);
  const existingForm = document.getElementById("updateProductForm");
  if (existingForm) {
    existingForm.remove();
  }
  let div = document.createElement("div");
  div.innerHTML = `
  <form id="updateProductForm" onsubmit="updateProduct(event, '${product.id}')">
  <input type="text" placeholder="Name" id="updatedProductName" value="${product.data().productName}"><br>
            <input type="text" placeholder="updatedDescription" id="updatedDescription" value="${product.data().productDescription}"><br>
            <input type="url" placeholder="Image link" id="updatedProductImg" value="${product.data().productImg}"><br>
            <input type="number" placeholder="Price" id="updatedProductPrice" value="${product.data().productPrice}"><br>
            <input type="submit" id="updateProductBtn" value = "Update Product">
</form>`
document.body.appendChild(div);
}
 
async function deleteProduct(productId){
  await deleteDoc(doc(db, "products", productId));
  getProducts();
}
 
async function updateProduct(event,productId){
  event.preventDefault();
  let productName = document.getElementById("updatedProductName").value;
  let productDescription = document.getElementById("updatedDescription").value;
  let productImg = document.getElementById("updatedProductImg").value;
  let productPrice = document.getElementById("updatedProductPrice").value;
 
  await updateDoc(doc(db, "products", productId), {
    productName: productName,
    productDescription: productDescription,
    productImg: productImg,
    productPrice: productPrice,
  });
  document.getElementById("updateProductForm").style.display="none";
  await getProducts();
}
 
window.deleteProduct = deleteProduct;
window.openProductForm = openProductForm;
window.updateProduct = updateProduct;
 
signOutBtn.addEventListener("click", userSignOut);
goToProducts.addEventListener("click", productsPage);
showNewProductFormBtn.addEventListener("click", showNewProductForm);
addProductbtn.addEventListener("click", addProduct);
window.addEventListener("load", getProducts);
// updateProductBtn.addEventListener("click",updateProduct);