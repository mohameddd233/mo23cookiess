let cart = [];
let total = 0;

function chooseSize(select, name, image) {
  const price = parseInt(select.value);
  if (!isNaN(price)) {
    addToCart(name, price, image);
    select.selectedIndex = 0;
  }
}

function addToCart(name, price, image) {
  cart.push({ name, price, image });
  total += price;
  updateCart();
}

function updateCart() {
  const preview = document.getElementById('cart-preview');
  const summary = document.getElementById('order-summary');
  const totalInput = document.getElementById('order-total');
  const submitBtn = document.getElementById('submit-btn');

  preview.innerHTML = '';
  let summaryText = '';
  
  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${item.image}" style="width:50px;height:50px;border-radius:5px;margin:5px;" />
      ${item.name} - ${item.price}ج
    `;
    preview.appendChild(div);
    summaryText +=' ${item.name} - ${item.price}ج\n';
  });

  summary.value = summaryText;
  totalInput.value = total + ' جنيه';
  submitBtn.disabled = total < 30;
}

function validateOrder() {
  return cart.length > 0 && total >= 30;
}

function zoomImage(img) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 9999;

  const bigImg = document.createElement('img');
  bigImg.src = img.src;
  bigImg.style.maxWidth = '90%';
  bigImg.style.maxHeight = '90%';
  bigImg.style.borderRadius = '10px';

  modal.appendChild(bigImg);
  modal.onclick = () => document.body.removeChild(modal);
  document.body.appendChild(modal);
}