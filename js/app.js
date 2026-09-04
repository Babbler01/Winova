// Function to Create Product Card
function createProductCard(wine) {
    return `
        <div class="product-card">

            <div class="product-image">
                <img src="${wine.image}" alt="${wine.name}">
            </div>

            <div class="product-info">

                <div>
                    <p class="product-category">${wine.category}</p>

                    <h3 class="product-name">${wine.name}</h3>
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


// Function to Display Products
function displayProducts(products, containerId) {

    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    if (products.length === 0) {

        container.innerHTML = `
            <div class="no-products">
                <h3>No Products Found</h3>
                <p>
                    Try changing or removing some filters.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML = products.map(wine => createProductCard(wine)).join("");
}

displayProducts(wines, "all-products");

// Featured Products - Homepage
const featuredContainer = document.getElementById("featured-products");

if (featuredContainer) {

    const featuredProducts = wines.filter(wine => wine.featured).slice(0, 4);

    displayProducts(featuredProducts, "featured-products");
}


// All Products / Category Filter - Products Page
const productsContainer = document.getElementById("all-products");

if (productsContainer) {

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    const productsTitle =
        document.getElementById("products-title");

    const categoryFilter =
        document.getElementById("category-filter");

    const priceFilter =
        document.getElementById("price-filter");

    const alcoholFilter =
        document.getElementById("alcohol-filter");


    // Set category from URL
    if (category && categoryFilter) {

        categoryFilter.value = category;

        if (productsTitle) {
            productsTitle.textContent = category;
        }
    }


    // Filter Function
    function filterProducts() {

        let filteredProducts = [...wines];


        // Category
        if (categoryFilter.value !== "all") {

            filteredProducts = filteredProducts.filter(
                wine => wine.category === categoryFilter.value
            );
        }


        // Price
        if (priceFilter.value !== "all") {

            const [minPrice, maxPrice] =
                priceFilter.value.split("-").map(Number);

            filteredProducts = filteredProducts.filter(
                wine =>
                    wine.price >= minPrice &&
                    wine.price <= maxPrice
            );
        }


        // Alcohol
        if (alcoholFilter.value !== "all") {

            const [minAlcohol, maxAlcohol] =
                alcoholFilter.value.split("-").map(Number);

            filteredProducts = filteredProducts.filter(
                wine =>
                    wine.alcohol >= minAlcohol &&
                    wine.alcohol <= maxAlcohol
            );
        }

        // Display all products
        displayProducts(filteredProducts, "all-products");
    }


    // Listen for filter changes
    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

    priceFilter.addEventListener(
        "change",
        filterProducts
    );

    alcoholFilter.addEventListener(
        "change",
        filterProducts
    );


    // Initial display
    filterProducts();
}

const categoryFilter = document.getElementById("category-filter");
const priceFilter = document.getElementById("price-filter");
const alcoholFilter = document.getElementById("alcohol-filter");


function filterProducts() {

    let filteredProducts = [...wines];

    // Category Filter
    if (categoryFilter.value !== "all") {

        filteredProducts = filteredProducts.filter(
            wine => wine.category === categoryFilter.value
        );
    }


    // Price Filter
    if (priceFilter.value !== "all") {

        const [minPrice, maxPrice] =
            priceFilter.value.split("-").map(Number);

        filteredProducts = filteredProducts.filter(
            wine =>
                wine.price >= minPrice && wine.price <= maxPrice
        );
    }


    // Alcohol Filter
    if (alcoholFilter.value !== "all") {

        const [minAlcohol, maxAlcohol] =
            alcoholFilter.value.split("-").map(Number);

        filteredProducts = filteredProducts.filter(
            wine =>
                wine.alcohol >= minAlcohol && wine.alcohol <= maxAlcohol
        );
    }


    displayProducts(filteredProducts, "all-products");
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
}

if (priceFilter) {
    priceFilter.addEventListener("change", filterProducts);
}

if (alcoholFilter) {
    alcoholFilter.addEventListener("change", filterProducts);
}