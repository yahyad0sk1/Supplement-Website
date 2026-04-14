let cart = JSON.parse(localStorage.getItem('myBasket')) || [];

function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    localStorage.setItem('myBasket', JSON.stringify(cart));
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
    renderCartItems();
}

function openCart() { document.getElementById('cart-sidebar').classList.add('open'); }
function closeCart() { document.getElementById('cart-sidebar').classList.remove('open'); }

updateCart();

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('total-amount');
    let totalPrice = 0;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x $${item.price}</p>
                </div>
                <i class="fa-solid fa-trash" onclick="removeFromCart(${index})"></i>
            </div>
        `;
    });

    totalElement.innerText = `$${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function goToCheckout() {
    let cart = JSON.parse(localStorage.getItem('myBasket')) || [];

    if (cart.length === 0) {
        alert("Your basket is empty! Please add products first.");
        return;
    }

    window.location.href = "checkout.html";
}