
// Create Product Card
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



// Display Products

function displayProducts(products, containerId) {

    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = products
        .map(wine => createProductCard(wine))
        .join("");
}



// Homepage featured producta

const featuredProducts = wines
    .filter(wine => wine.featured)
    .slice(0, 4);

displayProducts(featuredProducts, "featured-products");



// All products

displayProducts(wines, "all-products");