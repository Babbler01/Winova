// Establish URL
const params = new URLSearchParams(window.location.search);

// Get product ID
const productId = Number(params.get("id"));

// Find product
const product = wines.find(wine => wine.id === productId);


// Display Single Product
function displayProduct(product) {

    const container = document.getElementById("product-details");

    const breadcrumbProduct =
        document.getElementById("breadcrumb-product");

    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = product.name;
    }

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
                    <span>${product.alcohol}%</span>
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

// Add to cart
function setupProductCart() {

    let quantity = 1;

    const quantityDisplay = document.getElementById("quantity");
    const decreaseButton = document.getElementById("decrease");
    const increaseButton = document.getElementById("increase");
    const addToCartButton = document.querySelector(".add-to-cart");


    decreaseButton.addEventListener("click", () => {

        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }

    });


    increaseButton.addEventListener("click", () => {

        quantity++;
        quantityDisplay.textContent = quantity;

    });


    addToCartButton.addEventListener("click", () => {

        addToCart(product, quantity);

    });

}

function addToCart(product, quantity) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
        item => item.id === product.id
    );


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });

    }


    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(`${product.name} has been added to your cart.`);

}

// Create Related Product Card
function createRelatedProductCard(wine) {

    return `
        <div class="product-card">

            <div class="product-image">
                <img src="${wine.image}" alt="${wine.name}">
            </div>

            <div class="product-info">

                <div>

                    <p class="product-category">
                        ${wine.category}
                    </p>

                    <h3 class="product-name">
                        ${wine.name}
                    </h3>

                </div>

                <div class="product-bottom">

                    <span class="product-price">
                        ₦${wine.price.toLocaleString()}
                    </span>

                    <a href="product.html?id=${wine.id}" class="view-product">
                        View Details
                    </a>

                </div>

            </div>

        </div>
    `;
}


// Display Related Products
function displayRelatedProducts() {

    const relatedContainer =
        document.getElementById("related-products");

    if (!relatedContainer) {
        return;
    }

    const relatedProducts = wines
        .filter(wine =>
            wine.category === product.category &&
            wine.id !== product.id
        )
        .slice(0, 4);

    relatedContainer.innerHTML = relatedProducts
        .map(wine => createRelatedProductCard(wine))
        .join("");
}



// Display Page
if (product) {

    displayProduct(product);

    displayRelatedProducts();

    setupProductCart();

} else {

    document.getElementById("product-details").innerHTML = `
        <div class="product-not-found">
            <h1>Product Not Found</h1>

            <p>
                Sorry, we couldn't find the product you're looking for.
            </p>

            <a href="products.html">
                Back to Products
            </a>
        </div>
    `;
}