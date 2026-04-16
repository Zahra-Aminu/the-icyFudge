document.addEventListener("DOMContentLoaded", () => {

const products = [
  { name: "Chocolate Cake", type: "Cake", price: 18000, img: "Images/allout-cake.jpg" },
  { name: "Milk Cake", type: "Milk Cake", price: 3500, img: "Images/milkcake.jpg" },
  { name: "8-inch Choco Cake", type: "cake", price: 15000, img: "Images/custom-order.jpg" },
  { name: "Snacks", type: "Doughnut,samosa,springrolls", price: 10000, img: "Images/snacks.jpg" },
  { name: "Brithday Cake", type: "layer cake", price: 22000, img: "Images/allout-bday-cake.jpg" },
  { name: "Bento & Cupcakes", type: "bento&cupcake", price: 12000, img: "Images/bento-cupcake.jpg" },
  { name: "Bento Cake", type: "layer cake", price: 4500, img: "Images/simple-bento.jpg" }
];

let cart = [];

const cartItemsDiv = document.querySelector(".cart-items");
const totalEl = document.querySelector(".total");
const productGrid = document.querySelector(".product-grid");

const checkoutBtn = document.getElementById("checkout-btn");
const modal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const processing = document.getElementById("processing");
const success = document.getElementById("success");

const checkoutForm = document.getElementById("checkoutForm");
const payNowBtn = document.getElementById("payNow");
const summaryBox = document.getElementById("order-summary");

const closeSuccessBtn = document.getElementById("closeSuccess");


function updateCart() {
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "Total: ₦0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <span class="cart-item-info">
        ${item.name} - ₦${item.price}
      </span>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartItemsDiv.appendChild(div);
  });

  totalEl.textContent = `Total: ₦${total}`;

  
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.onclick = (e) => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      updateCart();
    };
  });
}


products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₦${product.price}</p>
    <button class="add-to-cart">Add to Cart</button>
  `;

  productGrid.appendChild(card);

  card.querySelector(".add-to-cart").addEventListener("click", () => {
    cart.push(product);
    updateCart();
  });
});


checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  summaryBox.innerHTML = "<h4>Your Order:</h4>";
  cart.forEach(item => {
    summaryBox.innerHTML += `<p>${item.name} — ₦${item.price}</p>`;
  });

  modal.classList.add("active");
  resetModal();
});


closeCheckout.addEventListener("click", () => {
  modal.classList.remove("active");
  resetModal(true);
});


function resetModal(fullClose = false) {
  step1.style.display = "block";
  step2.style.display = "none";
  processing.style.display = "none";
  success.style.display = "none";

  checkoutForm.reset();

  if (fullClose) {
    payNowBtn.disabled = false;
    payNowBtn.textContent = "Pay Now";
  }
}


checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  step1.style.display = "none";
  step2.style.display = "block";
});


payNowBtn.addEventListener("click", () => {
  payNowBtn.disabled = true;
  payNowBtn.textContent = "Processing...";

  step2.style.display = "none";
  processing.style.display = "block";

  setTimeout(() => {
    processing.style.display = "none";
    success.style.display = "block";

    const orderId = "ICF-" + Math.floor(Math.random() * 90000 + 10000);

    success.innerHTML = `
      <p>🎉 Payment successful!</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <button id="closeSuccess">Close</button>
    `;

    cart = [];
    updateCart();

    document.getElementById("closeSuccess").onclick = () => {
      modal.classList.remove("active");
      resetModal(true);
    };

  }, 2000);
});

});