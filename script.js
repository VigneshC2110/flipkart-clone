const searchInput = document.getElementById("searchInput");
const queryParams = new URLSearchParams(window.location.search);
const searchQuery = queryParams.get("q") || "";

function buildProductCard(product) {
    return `
        <div class="card" onclick="viewProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">₹${product.price.toLocaleString()}</p>
        </div>
    `;
}

function renderHomeProducts() {
    const container = document.getElementById("homeProducts");
    if (!container) return;

    const featured = products.slice(0, 6);
    container.innerHTML = featured.map(buildProductCard).join("");
}

function renderProductList() {
    const container = document.getElementById("productList");
    if (!container) return;

    const query = searchQuery.trim().toLowerCase();
    let filtered = products;

    if (query) {
        filtered = products.filter(product => {
            return product.name.toLowerCase().includes(query) ||
                   product.description.toLowerCase().includes(query);
        });
    }

    if (!filtered.length) {
        container.innerHTML = `<p class="no-results">No products found for "${query}". Try another search.</p>`;
        return;
    }

    container.innerHTML = filtered.map(buildProductCard).join("");
}

function renderProductDetail() {
    const container = document.getElementById("productDetail");
    if (!container) return;

    const id = queryParams.get("id");
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        container.innerHTML = `
            <div class="product-detail">
                <div>
                    <h2>Product not found</h2>
                    <p>Please go back to the product list and select another item.</p>
                    <a class="btn outline" href="products.html">View Products</a>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3>₹${product.price.toLocaleString()}</h3>
            <button type="button">Add to Cart</button>
        </div>
    `;
}

function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

function initSearch() {
    if (!searchInput) return;

    if (searchQuery) {
        searchInput.value = searchQuery;
    }

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            const value = searchInput.value.trim();
            const targetUrl = `products.html${value ? `?q=${encodeURIComponent(value)}` : ""}`;
            window.location.href = targetUrl;
        }
    });
}

initSearch();
renderHomeProducts();
renderProductList();
renderProductDetail();
