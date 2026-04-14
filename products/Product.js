fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products.find(p => p.id === productId);

        if (product) {
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('product-img').src = product.image;
            document.getElementById('product-price').innerText = product.price;
            document.getElementById('product-desc').innerHTML = product.description;
        } else {
            document.getElementById('product-name').innerText = "Product Not Found";
        }
    });

function handleProductAdd() {
    const name = document.getElementById('product-name').innerText;
    const priceText = document.getElementById('product-price').innerText;
    const image = document.getElementById('product-img').src;
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const price = parseFloat(priceText.replace(/[^0-9.-]+/g,""));

    if (typeof addToCart === "function") {
        addToCart(id, name, price, image);
        openCart();
    } else {
        console.error("Cart.js is not linked correctly!");
    }
}

function goToCheckout() {
    let cart = JSON.parse(localStorage.getItem('myBasket')) || [];

    if (cart.length === 0) {
        alert("Your basket is empty! Please add products first.");
        return;
    }

    window.location.href = "../checkout.html";
}