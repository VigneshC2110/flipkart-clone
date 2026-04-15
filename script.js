// Product Data
var products = [
     {
        id: 1,
        name: "Wireless Headphones",
        discount: 50,
        originalPrice: 5999,
        image: "🎧",
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
        image: "⌚",
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
        image: "👕",
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
        image: "👟",
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
        image: "💡",
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
        image: "🔌",
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
        image: "🧘",
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
        image: "☕",
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
        image: "🔊",
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
        image: "🎒",
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
        image: "📱",
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
        image: "😎",
        rating: 4.4,
        reviews: 523,
        category: "Clothing",
        description: "UV-protected sunglasses with polarized lenses and stylish design."
    }
];

// Cart
var cart = [];

// Calculate price from discount
function getDiscountPrice(originalPrice, discount) {
    return Math.floor(originalPrice - (originalPrice * discount / 100));
}

// Render Products
function renderProducts(productList) {
    var grid = document.getElementById("productsGrid");
    grid.innerHTML = "";

    for (var i = 0; i < productList.length; i++) {
        var product = productList[i];
        var finalPrice = getDiscountPrice(
            product.originalPrice,
            product.discount
        );

        var card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML =
            '<div class="product-image">' + product.image + '</div>' +
            '<div class="product-info">' +
                '<div class="product-name">' + product.name + '</div>' +
                '<div class="product-rating">' +
                    '<span class="stars">⭐ ' + product.rating + '</span>' +
                    '<span class="reviews">(' + product.reviews + ')</span>' +
                '</div>' +
                '<div class="product-price">₹' + finalPrice + '</div>' +
                '<div>' +
                    '<span class="original-price">₹' + product.originalPrice + '</span> ' +
                    '<span class="discount">' + product.discount + '% OFF</span>' +
                '</div>' +
            '</div>';

        card.onclick = (function(productId) {
            return function() {
                openProductDetail(productId);
            };
        })(product.id);

        grid.appendChild(card);
    }

    if (productList.length == 0) {
        grid.innerHTML = "<h2>No products found</h2>";
    }
}

// Search
function searchProducts() {
    var searchText = document.querySelector(".search-input").value.toLowerCase();
    var filteredProducts = [];

    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().indexOf(searchText) != -1) {
            filteredProducts.push(products[i]);
        }
    }

    renderProducts(filteredProducts);
}

// Sort
function sortProducts() {
    var sortValue = document.getElementById("sortBy").value;
    var sortedProducts = [...products];

    if (sortValue == "relevance") {
        renderProducts(products);
        return;
    }

    if (sortValue == "price-low") {
        sortedProducts.sort(function(a, b) {
            return getDiscountPrice(a.originalPrice, a.discount) -
                   getDiscountPrice(b.originalPrice, b.discount);
        });
    }

    if (sortValue == "price-high") {
        sortedProducts.sort(function(a, b) {
            return getDiscountPrice(b.originalPrice, b.discount) -
                   getDiscountPrice(a.originalPrice, a.discount);
        });
    }

    renderProducts(sortedProducts);
}

// Product Detail Popup
function openProductDetail(productId) {
    var product = null;

    for (var i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            product = products[i];
            break;
        }
    }

    var finalPrice = getDiscountPrice(
        product.originalPrice,
        product.discount
    );

    var detailBox = document.getElementById("productDetail");

    detailBox.innerHTML =
        '<div class="detail-image">' + product.image + '</div>' +
        '<div class="detail-info">' +
            '<h2>' + product.name + '</h2>' +
            '<div class="detail-rating">⭐ ' + product.rating + ' (' + product.reviews + ')</div>' +
            '<div class="detail-price">₹' + finalPrice + '</div>' +
            '<div>' +
                '<span class="detail-original-price">₹' + product.originalPrice + '</span> ' +
                '<span class="detail-discount">' + product.discount + '% OFF</span>' +
            '</div>' +
            '<div class="detail-description">' + product.description + '</div>' +
            '<div class="detail-quantity">' +
                '<label>Quantity:</label>' +
                '<div class="quantity-control">' +
                    '<button onclick="decreaseQty()">-</button>' +
                    '<input type="number" id="qtyInput" value="1" min="1">' +
                    '<button onclick="increaseQty()">+</button>' +
                '</div>' +
            '</div>' +
            '<div class="detail-actions">' +
                '<button class="detail-add-to-cart" onclick="addPopupToCart(' + product.id + ')">Add to Cart</button>' +
            '</div>' +
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

// Add popup cart
function addPopupToCart(productId) {
    var qty = parseInt(document.getElementById("qtyInput").value);

    for (var i = 0; i < qty; i++) {
        addToCart(productId);
    }

    document.getElementById("productModal").classList.remove("active");
}

// Add to cart
function addToCart(productId) {
    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }

    if (!found) {
        for (var j = 0; j < products.length; j++) {
            if (products[j].id == productId) {
                cart.push({
                    id: products[j].id,
                    name: products[j].name,
                    price: getDiscountPrice(
                        products[j].originalPrice,
                        products[j].discount
                    ),
                    image: products[j].image,
                    quantity: 1
                });
                break;
            }
        }
    }

    updateCartCount();
}

// Remove
function removeFromCart(productId) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            cart.splice(i, 1);
            break;
        }
    }

    updateCartCount();
    openCart();
}

// Update count
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

    if (cart.length == 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
    } else {
        for (var i = 0; i < cart.length; i++) {
            subtotal += cart[i].price * cart[i].quantity;

            cartItems.innerHTML +=
                '<div class="cart-item">' +
                    '<div class="cart-item-image">' + cart[i].image + '</div>' +
                    '<div class="cart-item-details">' +
                        '<div class="cart-item-name">' + cart[i].name + '</div>' +
                        '<div class="cart-item-price">₹' + cart[i].price + '</div>' +
                        '<div>Qty: ' + cart[i].quantity + '</div>' +
                    '</div>' +
                    '<button class="remove-btn" onclick="removeFromCart(' + cart[i].id + ')">Remove</button>' +
                '</div>';
        }
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

// Close modals
function closeAllModals() {
    document.getElementById("cartModal").classList.remove("active");
    document.getElementById("productModal").classList.remove("active");
}

// Load
window.onload = function () {
    renderProducts(products);

    document.querySelector(".cart-icon").onclick = openCart;
    document.querySelector(".search-btn").onclick = searchProducts;
    document.getElementById("sortBy").onchange = sortProducts;

    document.querySelector(".search-input").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            searchProducts();
        }
    });

    var closeButtons = document.querySelectorAll(".close-modal");

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = closeAllModals;
    }
};