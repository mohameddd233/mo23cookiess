let cart = [];
const cartSummary = document.getElementById("cart-summary");
const totalElement = document.getElementById("cart-total");
const confirmButton = document.getElementById("confirm-btn");
const orderForm = document.getElementById("order-form");
const cartInput = document.getElementById("cart-input");

const productNames = {
  "classic": "كلاسيك كوكيز",
  "dark": "دارك كوكيز",
  "oreo": "أوريو كوكيز",
  "nutella": "نوتيلا كوكيز",
  "seasonal": "موسمية",
  "brookies": "بروكيز",
  "cake": "كيكة كاملة"
};
const products = {
  "classic": { "small": 10, "medium": 15, "large": 20 },
  "dark": { "small": 10, "medium": 15, "large": 20 },
  "oreo": { "small": 10, "medium": 15, "large": 20 },
  "nutella": { "small": 10, "medium": 15, "large": 20 },
  "seasonal": { "small": 10, "medium": 15, "large": 20 },
  "brookies": { "piece": 15 },
  "cake": { "full": 100 }
};

function addToCart(product) {
  let size = "";
  if (product === "brookies") {
    size = "piece";
  } else if (product === "cake") {
    size = "full";
  } else {
    size = prompt("اختار الحجم: small - medium - large");
    if (!["small", "medium", "large"].includes(size)) {
      alert("حجم غير صالح.");
      return;
    }
  }

  const price = products[product][size];
  cart.push({ product, size, price });
  updateCart();
}

function updateCart() {
  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
   html += `<li>${productNames[item.product]} - ${item.size} = ${item.price} جنيه 
  <button onclick="removeFromCart(${index})">x</button></li>`;
  });

  cartSummary.innerHTML = html || "<li>السلة فاضية</li>";
  totalElement.innerText = total + " جنيه";
  cartInput.value = JSON.stringify(cart);
  confirmButton.disabled = total < 30;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// منع الإرسال لو الإجمالي أقل من 30
orderForm.addEventListener("submit", function (e) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (total < 30) {
    e.preventDefault();
    alert("الحد الأدنى للطلب هو 30 جنيه.");
  }
});