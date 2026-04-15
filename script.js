// Product Data
var products = [
    {
        id: 1,
        name: "Wireless Headphones",
        discount: 50,
        originalPrice: 5999,
        image: "Img/headphone.jpg",
        rating: 4.5,
        reviews: 245,
        category: "Electronics",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Watch",
        discount: 50,
        originalPrice: 9999,
        image: "Img/Smart Watch.jpg",
        rating: 4.2,
        reviews: 189,
        category: "Electronics",
        description: "Feature-rich smartwatch with fitness tracking and heart rate monitor."
    },
    {
        id: 3,
        name: "Casual T-Shirt",
        discount: 60,
        originalPrice: 1299,
        image: "Img/T-Shirt.jpg",
        rating: 4.3,
        reviews: 456,
        category: "Clothing",
        description: "Comfortable and stylish casual t-shirt made from premium cotton."
    },
    {
        id: 4,
        name: "Shoes",
        discount: 56,
        originalPrice: 7999,
        image: "Img/Shoe.jpg",
        rating: 4.6,
        reviews: 678,
        category: "Sports",
        description: "Professional running shoes with advanced cushioning technology."
    },
    {
        id: 5,
        name: "Lamp",
        discount: 50,
        originalPrice: 2999,
        image: "Img/Lamp.jpg",
        rating: 4.1,
        reviews: 123,
        category: "Home & Garden",
        description: "LED desk lamp with adjustable brightness and eye-care technology."
    },
    {
        id: 6,
        name: "USB-C Cable",
        discount: 56,
        originalPrice: 899,
        image: "Img/Cable.jpg",
        rating: 4.4,
        reviews: 892,
        category: "Electronics",
        description: "Durable and fast-charging USB-C cable compatible with all devices."
    },
    {
        id: 7,
        name: "Mat",
        discount: 60,
        originalPrice: 1999,
        image: "Img/mat.jpg",
        rating: 4.3,
        reviews: 234,
        category: "Sports",
        description: "Non-slip mat with extra cushioning for comfort and support."
    },
    {
        id: 8,
        name: "Mug",
        discount: 56,
        originalPrice: 799,
        image: "Img/mug.jpg",
        rating: 4.5,
        reviews: 567,
        category: "Home & Garden",
        description: "Ceramic coffee mug with heat-resistant handle and modern design."
    },
    {
        id: 9,
        name: "Speaker",
        discount: 50,
        originalPrice: 4999,
        image: "Img/Speaker.jpg",
        rating: 4.4,
        reviews: 345,
        category: "Electronics",
        description: "Waterproof bluetooth speaker with 360-degree surround sound."
    },
    {
        id: 10,
        name: "Bag",
        discount: 60,
        originalPrice: 3999,
        image: "Img/Bag.jpg",
        rating: 4.2,
        reviews: 412,
        category: "Clothing",
        description: "Durable and spacious backpack with multiple compartments and USB charging."
    },
    {
        id: 11,
        name: "Phone Stand",
        discount: 56,
        originalPrice: 699,
        image: "Img/Phone.jpg",
        rating: 4.3,
        reviews: 198,
        category: "Electronics",
        description: "Adjustable phone stand compatible with all smartphone sizes."
    },
    {
        id: 12,
        name: "Sunglasses",
        discount: 60,
        originalPrice: 2499,
        image: "Img/Glass.jpg",
        rating: 4.4,
        reviews: 523,
        category: "Clothing",
        description: "UV-protected sunglasses with polarized lenses and stylish design."
    }
];

var cart = [];

// Calculate final price
function getPrice(product) {
    return Math.floor(product.originalPrice * (100 - product.discount) / 100);
}

// Render Products
function renderProducts(productList) {
    var grid = document.getElementById("productsGrid");
    grid.innerHTML = "";

    for (var i = 0; i < productList.length; i++) {
        var product = productList[i];
        var finalPrice = getPrice(product);

        var card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML =
            '<div class="product-image">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
            '</div>' +
            '<div class="product-info">' +
                '<div class="product-name">' + product.name + '</div>' +
                '<div>⭐ ' + product.rating + ' (' + product.reviews + ')</div>' +
                '<div class="product-price">₹' + finalPrice + '</div>' +
                '<div>' +
                    '<span class="original-price">₹' + product.originalPrice + '</span> ' +
                    '<span class="discount">' + product.discount + '% OFF</span>' +
                '</div>' +
            '</div>';

        card.onclick = (function(id) {
            return function() {
                openProductDetail(id);
            };
        })(product.id);

        grid.appendChild(card);
    }
}

// Search
function searchProducts() {
    var text = document.querySelector(".search-input").value.toLowerCase();

    var filtered = products.filter(function(product) {
        return product.name.toLowerCase().includes(text);
    });

    renderProducts(filtered);
}

// Sort
function sortProducts() {
    var value = document.getElementById("sortBy").value;
    var sorted = [...products];

    if (value == "price-low") {
        sorted.sort(function(a, b) {
            return getPrice(a) - getPrice(b);
        });
    }

    if (value == "price-high") {
        sorted.sort(function(a, b) {
            return getPrice(b) - getPrice(a);
        });
    }

    renderProducts(sorted);
}

// Product Detail
function openProductDetail(productId) {
    var product = products.find(p => p.id == productId);
    var finalPrice = getPrice(product);

    var detail = document.getElementById("productDetail");

    detail.innerHTML =
        '<div class="detail-image">' +
            '<img src="' + product.image + '" alt="' + product.name + '">' +
        '</div>' +
        '<div>' +
            '<h2>' + product.name + '</h2>' +
            '<div>⭐ ' + product.rating + ' (' + product.reviews + ')</div>' +
            '<div class="detail-price">₹' + finalPrice + '</div>' +
            '<div>' +
                '<span class="detail-original-price">₹' + product.originalPrice + '</span> ' +
                '<span class="detail-discount">' + product.discount + '% OFF</span>' +
            '</div>' +
            '<p class="detail-description">' + product.description + '</p>' +

            '<label>Quantity:</label>' +
            '<div class="quantity-control">' +
                '<button onclick="decreaseQty()">-</button>' +
                '<input type="number" id="qtyInput" value="1" min="1">' +
                '<button onclick="increaseQty()">+</button>' +
            '</div>' +

            '<button class="detail-add-to-cart" onclick="addPopupToCart(' + product.id + ')">Add to Cart</button>' +
        '</div>';

    document.getElementById("productModal").classList.add("active");
}

// Quantity
function increaseQty() {
    var qty = document.getElementById("qtyInput");
    qty.value = parseInt(qty.value) + 1;
}

function decreaseQty() {
    var qty = document.getElementById("qtyInput");
    if (parseInt(qty.value) > 1) {
        qty.value = parseInt(qty.value) - 1;
    }
}

// Add from popup
function addPopupToCart(productId) {
    var qty = parseInt(document.getElementById("qtyInput").value);

    for (var i = 0; i < qty; i++) {
        addToCart(productId);
    }

    closeAllModals();
}

// Add to cart
function addToCart(productId) {
    var product = products.find(p => p.id == productId);
    var finalPrice = getPrice(product);

    var existing = cart.find(item => item.id == productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: finalPrice,
            image: product.image,
            quantity: 1
        });
    }

    updateCartCount();
}

// Remove cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    updateCartCount();
    openCart();
}

// Cart count
function updateCartCount() {
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        total += cart[i].quantity;
    }

    document.querySelector(".cart-count").innerHTML = total;
}

// Open cart
function openCart() {
    var cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    var subtotal = 0;

    for (var i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantity;

        cartItems.innerHTML +=
            '<div class="cart-item">' +
                '<img src="' + cart[i].image + '" class="cart-img">' +
                '<div>' +
                    '<div>' + cart[i].name + '</div>' +
                    '<div>₹' + cart[i].price + '</div>' +
                    '<div>Qty: ' + cart[i].quantity + '</div>' +
                '</div>' +
                '<button class="remove-btn" onclick="removeFromCart(' + cart[i].id + ')">Remove</button>' +
            '</div>';
    }

    var tax = Math.floor(subtotal * 0.18);
    var shipping = subtotal > 0 ? 100 : 0;
    var total = subtotal + tax + shipping;

    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("tax").innerHTML = tax;
    document.getElementById("shipping").innerHTML = shipping;
    document.getElementById("total").innerHTML = total;

    document.getElementById("cartModal").classList.add("active");
}

// Close modal
function closeAllModals() {
    document.getElementById("cartModal").classList.remove("active");
    document.getElementById("productModal").classList.remove("active");
}

// Load
window.onload = function() {
    renderProducts(products);

    document.querySelector(".search-btn").onclick = searchProducts;
    document.querySelector(".cart-icon").onclick = openCart;
    document.getElementById("sortBy").onchange = sortProducts;

    var buttons = document.querySelectorAll(".close-modal");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = closeAllModals;
    }
};