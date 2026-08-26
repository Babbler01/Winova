
// Establish URL
const params = new URLSearchParams(window.location.search);


// Gets product ID
const productId = Number(params.get("id"));


// Searches products.js for Specific Product by ID
const product = wines.find(wine => wine.id === productId);


// Single Product Page

function displayProduct(product) {

    const container = document.getElementById("product-details");

    container.innerHTML = `
        <div class="single-product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="single-product-info">

            <p class="product-category">
                ${product.category}
            </p>

            <h1>${product.name}</h1>

            <p class="single-product-price">
                ₦${product.price.toLocaleString()}
            </p>

            <p class="single-product-description">
                ${product.description}
            </p>

            <div class="product-meta">

                <div>
                    <strong>Volume</strong>
                    <span>${product.volume}</span>
                </div>

                <div>
                    <strong>Origin</strong>
                    <span>${product.origin}</span>
                </div>

                <div>
                    <strong>Alcohol</strong>
                    <span>${product.alcohol}</span>
                </div>

            </div>

            <div class="product-actions">

                <div class="quantity">
                    <button type="button" id="decrease">−</button>

                    <span id="quantity">1</span>

                    <button type="button" id="increase">+</button>
                </div>

                <button type="button" class="add-to-cart">
                    Add to Cart
                </button>

            </div>

        </div>
    `;
}

if (product) {
    displayProduct(product);
}

// Handle Error and invalid product

if (product) {

    displayProduct(product);

} else {

    document.getElementById("product-details").innerHTML = `
        <div class="product-not-found">
            <h1>Product Not Found</h1>
            <p>Sorry, we couldn't find the product you're looking for.</p>
            <a href="products.html">Back to Products</a>
        </div>
    `;
}