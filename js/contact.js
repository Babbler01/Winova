const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const subjectError = document.getElementById("subject-error");
        const messageError = document.getElementById("message-error");

        const successMessage = document.getElementById("form-success");

        // Clear previous messages
        nameError.textContent = "";
        emailError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";

        let isValid = true;


        // Name validation
        if (name === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }


        // Email validation
        if (email === "") {
            emailError.textContent = "Please enter your email address.";
            isValid = false;
        } else if (!email.includes("@")) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }


        // Subject validation
        if (subject === "") {
            subjectError.textContent = "Please enter a subject.";
            isValid = false;
        }


        // Message validation
        if (message === "") {
            messageError.textContent = "Please enter your message.";
            isValid = false;
        }


        // Submit form
        if (isValid) {

            successMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            contactForm.reset();
        }

    });

}