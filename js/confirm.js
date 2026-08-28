// Get saved order

const order = JSON.parse(
    localStorage.getItem("order")
);


// Check if an order exists

if (!order) {

    document.querySelector(".confirmation-section").innerHTML = `

        <div class="layout">

            <div class="confirmation-header">

                <h1>
                    No Order Found
                </h1>

                <p>
                    We couldn't find a recent order.
                </p>

                <a
                    href="products.html"
                    class="continue-shopping"
                >
                    Browse Products
                </a>

            </div>

        </div>

    `;

} else {


    // Order Number

    document.getElementById(
        "order-number"
    ).textContent = order.orderId;



    // Customer Information

    document.getElementById(
        "customer-name"
    ).textContent =
        `${order.customer.firstName} ${order.customer.lastName}`;


    document.getElementById(
        "customer-email"
    ).textContent =
        order.customer.email;


    document.getElementById(
        "customer-phone"
    ).textContent =
        order.customer.phone;



    // Delivery Information

    document.getElementById(
        "customer-address"
    ).textContent =
        order.customer.address;


    document.getElementById(
        "customer-city"
    ).textContent =
        order.customer.city;


    document.getElementById(
        "customer-state"
    ).textContent =
        order.customer.state;


    document.getElementById(
        "shipping-method"
    ).textContent =
        order.shipping.method;



    // Payment Method

    const paymentMethod =
        order.payment === "card"
            ? "Card Payment"
            : "Bank Transfer";


    document.getElementById(
        "payment-method"
    ).textContent =
        paymentMethod;



    // Order Items

    const itemsContainer =
        document.getElementById(
            "confirmation-items"
        );


    let subtotal = 0;


    itemsContainer.innerHTML =
        order.items.map(item => {

            const itemTotal =
                item.price * item.quantity;


            subtotal += itemTotal;


            return `

                <div class="confirmation-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="confirmation-item-info">

                        <p>
                            ${item.name}
                        </p>

                        <span>
                            Quantity: ${item.quantity}
                        </span>

                    </div>

                    <div class="confirmation-item-price">

                        ₦${itemTotal.toLocaleString()}

                    </div>

                </div>

            `;

        }).join("");



    // Shipping

    const shipping =
        Number(order.shipping.price);



    // Total

    const total =
        subtotal + shipping;



    // Display totals

    document.getElementById(
        "confirmation-subtotal"
    ).textContent =
        `₦${subtotal.toLocaleString()}`;


    document.getElementById(
        "confirmation-shipping"
    ).textContent =
        `₦${shipping.toLocaleString()}`;


    document.getElementById(
        "confirmation-total"
    ).textContent =
        `₦${total.toLocaleString()}`;

}