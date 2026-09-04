const checkoutItems = document.getElementById("checkout-items");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutShipping = document.getElementById("checkout-shipping");
const checkoutTotal = document.getElementById("checkout-total");

const shippingOptions = document.querySelectorAll(
    'input[name="shipping"]'
);


function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}


function displayCheckout() {

    const cart = getCart();

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>

            <a href="products.html">
                Browse Products
            </a>
        `;

        return;
    }


    let subtotal = 0;


    checkoutItems.innerHTML = cart.map(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;


        return `
            <div class="checkout-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="checkout-item-info">

                    <p>${item.name}</p>

                    <span>
                        Quantity: ${item.quantity}
                    </span>

                </div>

                <div class="checkout-item-price">
                    ₦${itemTotal.toLocaleString()}
                </div>

            </div>
        `;

    }).join("");


    updateCheckoutTotal(subtotal);

}


function updateCheckoutTotal(subtotal) {

    const selectedShipping =
        document.querySelector(
            'input[name="shipping"]:checked'
        );

    const shipping = Number(selectedShipping.value);

    const total = subtotal + shipping;


    checkoutSubtotal.textContent =
        `₦${subtotal.toLocaleString()}`;

    checkoutShipping.textContent =
        `₦${shipping.toLocaleString()}`;

    checkoutTotal.textContent =
        `₦${total.toLocaleString()}`;

}


shippingOptions.forEach(option => {

    option.addEventListener("change", () => {

        const cart = getCart();

        const subtotal = cart.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        updateCheckoutTotal(subtotal);

    });

});


displayCheckout();


// Place Order

const checkoutForm = document.getElementById("checkout-form");


checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    const selectedShipping =
        document.querySelector(
            'input[name="shipping"]:checked'
        );


    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    const order = {

        orderId:
            "WIN-" +
            Date.now(),

        customer: {

            email:
                document.getElementById("email").value,

            firstName:
                document.getElementById("first-name").value,

            lastName:
                document.getElementById("last-name").value,

            address:
                document.getElementById("address").value,

            city:
                document.getElementById("city").value,

            state:
                document.getElementById("state").value,

            phone:
                document.getElementById("phone").value

        },

        items: cart,

        shipping: {

            method:
                selectedShipping.dataset.name,

            price:
                Number(selectedShipping.value)

        },

        payment:
            selectedPayment.value,

        date:
            new Date().toISOString()

    };


    localStorage.setItem(
        "order",
        JSON.stringify(order)
    );


    // Clear cart

    localStorage.removeItem("cart");


    // Go to confirmation page

    window.location.href = "confirm.html";

});