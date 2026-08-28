// Cart Page

function getCart() {

    return JSON.parse(localStorage.getItem("cart")) || [];

}


function displayCart() {

    const container = document.getElementById("cart-container");

    if (!container) {
        return;
    }

    const cart = getCart();


    // Empty Cart
    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <h3>Your cart is empty</h3>

                <p>
                    You haven't added any wines to your cart yet.
                </p>

                <a href="products.html">
                    Browse Products
                </a>

            </div>
        `;

        return;
    }


    let subtotal = 0;


    const cartItems = cart.map(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;


        return `
            <div class="cart-item">

                <div class="cart-product">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div>
                        <p>${item.name}</p>
                    </div>

                </div>


                <div class="cart-price">
                    ₦${item.price.toLocaleString()}
                </div>


                <div class="cart-quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <div class="cart-total">
                    ₦${itemTotal.toLocaleString()}
                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;

    }).join("");


    container.innerHTML = `

        <div class="cart-table">

            <div class="cart-header">

                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span></span>

            </div>

            ${cartItems}

        </div>


        <div class="cart-summary">

            <div class="summary-row">

                <span>Subtotal</span>

                <strong>
                    ₦${subtotal.toLocaleString()}
                </strong>

            </div>


            <div class="summary-row">

                <span>Shipping</span>

                <span>Calculated at checkout</span>

            </div>


            <div class="summary-row summary-total">

                <span>Total</span>

                <strong>
                    ₦${subtotal.toLocaleString()}
                </strong>

            </div>


            <a
                href="checkout.html"
                class="checkout-button"
            >
                Proceed to Checkout
            </a>

        </div>

    `;
}

// Changing Quantity of Product

function changeQuantity(productId, change) {

    let cart = getCart();


    const product = cart.find(
        item => item.id === productId
    );


    if (!product) {
        return;
    }


    product.quantity += change;


    if (product.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== productId
        );

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}

// Remove from Cart

function removeFromCart(productId) {

    let cart = getCart();


    cart = cart.filter(
        item => item.id !== productId
    );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

}

// Display cart

if (document.getElementById("cart-container")) {
    displayCart();
}

updateCartCount();