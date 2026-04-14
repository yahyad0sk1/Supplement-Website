let allProducts = [];

fetch('../products/products.json')
    .then(res => res.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);
    });

function displayProducts(items) {
    const grid = document.getElementById('catalog-grid');
    grid.innerHTML = "";

    items.forEach(product => {
        const card = `
            <div class="card">
                <div class="card-image">
                    <img src="${product.image}" alt="card-img">
                </div>
                <h2 class="product-name">${product.name}</h2>
                <p>${product.shortDesc}</p>
                <div class="order-price">
                <a class="order-button" href="../products/Product.html?id=${product.id}">View</a>
                    <p class="price">${product.price}</p>      
                </div>
        `;
        grid.innerHTML += card;
    });
}

function toggleFilter() {
    const menu = document.getElementById('filterMenu');
    const toggle = document.querySelector('.filter-mobile-head');
    if (!menu || !toggle) return;

    const isOpen = menu.classList.toggle('show-menu');
    if (isOpen) {
        menu.style.display = 'flex';
        toggle.classList.add('open');
    } else {
        menu.style.display = 'none';
        toggle.classList.remove('open');
    }
}

function closeFilterMenu() {
    const menu = document.getElementById('filterMenu');
    const toggle = document.querySelector('.filter-mobile-head');
    if (!menu || !toggle) return;

    menu.classList.remove('show-menu');
    menu.style.display = 'none';
    toggle.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
        closeFilterMenu();
    }
});

document.addEventListener('click', (event) => {
    if (window.matchMedia('(max-width: 768px)').matches && !document.querySelector('header').contains(event.target)) {
        closeFilterMenu();
    }
});

function filterItems(category, element) {
    const listItems = document.querySelectorAll('.filter-list li');
    listItems.forEach(li => li.classList.remove('active-filter'));
    element.classList.add('active-filter');

    const currentCategory = document.getElementById('current-category');
    const label = element.querySelector('a')?.innerText?.trim() || element.innerText.trim();
    if (currentCategory && label) {
        currentCategory.innerText = label;
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
        closeFilterMenu();
    }

    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
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