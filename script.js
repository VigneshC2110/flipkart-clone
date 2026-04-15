// Sample Product Data
let products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2999,
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
        price: 4999,
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
        price: 499,
        originalPrice: 1299,
        image: "👕",
        rating: 4.3,
        reviews: 456,
        category: "Clothing",
        description: "Comfortable and stylish casual t-shirt made from premium cotton."
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 3499,
        originalPrice: 7999,
        image: "👟",
        rating: 4.6,
        reviews: 678,
        category: "Sports",
        description: "Professional running shoes with advanced cushioning technology."
    },
    {
        id: 5,
        name: "Desk Lamp",
        price: 1299,
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
        price: 399,
        originalPrice: 899,
        image: "🔌",
        rating: 4.4,
        reviews: 892,
        category: "Electronics",
        description: "Durable and fast-charging USB-C cable compatible with all devices."
    },
    {
        id: 7,
        name: "Yoga Mat",
        price: 799,
        originalPrice: 1999,
        image: "🧘",
        rating: 4.3,
        reviews: 234,
        category: "Sports",
        description: "Non-slip yoga mat with extra cushioning for comfort and support."
    },
    {
        id: 8,
        name: "Coffee Mug",
        price: 349,
        originalPrice: 799,
        image: "☕",
        rating: 4.5,
        reviews: 567,
        category: "Home & Garden",
        description: "Ceramic coffee mug with heat-resistant handle and modern design."
    },
    {
        id: 9,
        name: "Portable Speaker",
        price: 1899,
        originalPrice: 4999,
        image: "🔊",
        rating: 4.4,
        reviews: 345,
        category: "Electronics",
        description: "Waterproof bluetooth speaker with 360-degree surround sound."
    },
    {
        id: 10,
        name: "Backpack",
        price: 1599,
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
        price: 299,
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
        price: 899,
        originalPrice: 2499,
        image: "😎",
        rating: 4.4,
        reviews: 523,
        category: "Clothing",
        description: "UV-protected sunglasses with polarized lenses and stylish design."
    }
];

// Global Variables
let cart = [];
let wishlist = [];
let filteredProducts = [...products];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupEventListeners();
    loadCartFromStorage();
    loadWishlistFromStorage();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    document.querySelector('.search-btn').addEventListener('click', handleSearch);
    document.querySelector('.search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') handleSearch();
    });

    // Sort functionality
    document.getElementById('sortBy').addEventListener('change', handleSort);

    // Cart icon
    document.querySelector('.cart-icon').addEventListener('click', openCartModal);

    // Category filters
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Price range filter
    document.getElementById('priceRange').addEventListener('input', function() {
        document.getElementById('priceValue').textContent = this.value;
        applyFilters();
    });

    // Rating filters
    document.querySelectorAll('.rating-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Account link
    document.querySelector('.nav-item:not(.cart-icon)').addEventListener('click', showAlert);
}

// Render Products
function renderProducts(productsToRender) {
    let productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</p>';
        return;
    }

    productsToRender.forEach(product => {
        let productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card Element
function createProductCard(product) {
    let card = document.createElement('div');
    card.className = 'product-card';
    
    let discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    let isInWishlist = wishlist.some(item => item.id === product.id);

    card.innerHTML = `
        <div class="product-image">${product.image}</div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-rating">
                <span class="stars">⭐ ${product.rating}</span>
                <span class="reviews">(${product.reviews})</span>
            </div>
            <div class="product-price">
                ₹${product.price}
                <span class="original-price">₹${product.originalPrice}</span>
                <span class="discount">${discount}% off</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" data-id="${product.id}">♥</button>
            </div>
        </div>
    `;

    // Add to Cart Handler
    card.querySelector('.add-to-cart-btn').addEventListener('click', function() {
        addToCart(product);
        this.textContent = 'Added ✓';
        this.classList.add('active');
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.classList.remove('active');
        }, 1500);
    });

    // Wishlist Handler
    card.querySelector('.wishlist-btn').addEventListener('click', function() {
        toggleWishlist(product);
        this.classList.toggle('active');
    });

    // View Details
    card.querySelector('.product-image').addEventListener('click', () => openProductDetail(product));
    card.querySelector('.product-name').addEventListener('click', () => openProductDetail(product));

    return card;
}

// Add to Cart
function addToCart(product) {
    let existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartCount();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    openCartModal();
}

// Update Cart Item Quantity
function updateCartQuantity(productId, quantity) {
    let item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            updateCartCount();
            openCartModal();
        }
    }
}

// Update Cart Count
function updateCartCount() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Toggle Wishlist
function toggleWishlist(product) {
    let index = wishlist.findIndex(item => item.id === product.id);
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(product);
    }

    saveWishlistToStorage();
}

// Open Cart Modal
function openCartModal() {
    let cartModal = document.getElementById('cartModal');
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart-message"><p>Your cart is empty</p></div>';
    } else {
        cart.forEach(item => {
            let cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    updateCartSummary();
    cartModal.classList.add('active');
}

// Update Cart Summary
function updateCartSummary() {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let tax = Math.round(subtotal * 0.18);
    let shipping = subtotal > 500 ? 0 : 100;
    let total = subtotal + tax + shipping;

    document.getElementById('subtotal').textContent = subtotal;
    document.getElementById('tax').textContent = tax;
    document.getElementById('shipping').textContent = shipping;
    document.getElementById('total').textContent = total;
}

// Open Product Detail Modal
function openProductDetail(product) {
    let productModal = document.getElementById('productModal');
    let productDetail = document.getElementById('productDetail');
    let isInWishlist = wishlist.some(item => item.id === product.id);

    productDetail.innerHTML = `
        <div class="product-detail-content">
            <div class="detail-image">${product.image}</div>
            <div class="detail-info">
                <h2>${product.name}</h2>
                <div class="detail-rating">
                    <span class="stars">⭐ ${product.rating}</span>
                    <span class="reviews">(${product.reviews} reviews)</span>
                </div>
                <div class="detail-price">
                    ₹${product.price}
                    <span class="detail-original-price">₹${product.originalPrice}</span>
                    <span class="detail-discount">${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off</span>
                </div>
                <div class="detail-description">
                    ${product.description}
                </div>
                <div class="detail-quantity">
                    <label>Quantity:</label>
                    <div class="quantity-control">
                        <button onclick="decreaseQuantity()">-</button>
                        <input type="number" id="detailQuantity" value="1" min="1">
                        <button onclick="increaseQuantity()">+</button>
                    </div>
                </div>
                <div class="detail-actions">
                    <button class="detail-add-to-cart" onclick="addDetailToCart(${product.id})">Add to Cart</button>
                    <button class="detail-buy-now">Buy Now</button>
                    <button class="detail-wishlist ${isInWishlist ? 'active' : ''}" onclick="toggleDetailWishlist(${product.id})">♥</button>
                </div>
            </div>
        </div>
    `;

    productModal.classList.add('active');
}

// Quantity control functions
function increaseQuantity() {
    let input = document.getElementById('detailQuantity');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    let input = document.getElementById('detailQuantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addDetailToCart(productId) {
    let product = products.find(p => p.id === productId);
    let quantity = parseInt(document.getElementById('detailQuantity').value);

    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }

    showAlert(`Added ${quantity} item(s) to cart!`);
    document.getElementById('productModal').classList.remove('active');
}

function toggleDetailWishlist(productId) {
    let product = products.find(p => p.id === productId);
    toggleWishlist(product);
    document.querySelector('.detail-wishlist').classList.toggle('active');
}

// Search Handler
function handleSearch() {
    let searchTerm = document.querySelector('.search-input').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    renderProducts(filteredProducts);
}

// Sort Handler
function handleSort(event) {
    let sortValue = event.target.value;
    let sortedProducts = [...filteredProducts];

    switch(sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
        case 'relevance':
        default:
            sortedProducts = [...filteredProducts];
    }

    renderProducts(sortedProducts);
}

// Apply Filters
function applyFilters() {
    let filtered = [...products];

    // Category filter
    let selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(checkbox => checkbox.parentElement.textContent.trim());
    
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Price filter
    let maxPrice = parseInt(document.getElementById('priceRange').value);
    filtered = filtered.filter(product => product.price <= maxPrice);

    // Rating filter
    let selectedRatings = Array.from(document.querySelectorAll('.rating-filter:checked'))
        .map((checkbox, index) => 5 - index);
    
    if (selectedRatings.length > 0) {
        filtered = filtered.filter(product => {
            return selectedRatings.some(rating => product.rating >= rating - 1);
        });
    }

    filteredProducts = filtered;
    renderProducts(filteredProducts);
}

// Local Storage Functions
function saveCartToStorage() {
    localStorage.setItem('flipkart_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    let stored = localStorage.getItem('flipkart_cart');
    if (stored) {
        cart = JSON.parse(stored);
        updateCartCount();
    }
}

function saveWishlistToStorage() {
    localStorage.setItem('flipkart_wishlist', JSON.stringify(wishlist));
}

function loadWishlistFromStorage() {
    let stored = localStorage.getItem('flipkart_wishlist');
    if (stored) {
        wishlist = JSON.parse(stored);
    }
}

// Alert Function
function showAlert(message) {
    alert(typeof message === 'string' ? message : 'Feature coming soon!');
}