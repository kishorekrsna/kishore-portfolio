// =========================
// MOBILE MENU
// =========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}


// =========================
// CURRENT YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================
// SCROLL ANIMATION
// =========================

const animatedElements = document.querySelectorAll(
    ".section-title, .about-content, .skill-card, .project-card, .experience-card, .contact-content"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("fade-in");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(function (element) {
        observer.observe(element);
    });

} else {

    animatedElements.forEach(function (element) {
        element.classList.add("fade-in");
    });
}


// =========================
// EMAILJS
// =========================

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");


// Initialize EmailJS

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY"
    });

}


// Contact form

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }


        if (typeof emailjs === "undefined") {

            showMessage(
                "EmailJS is not loaded.",
                "error"
            );

            resetButton(submitButton);

            return;
        }


        emailjs.sendForm(
            "service_zzky8pb",
            "template_o7tt5mu",
            contactForm
        )

        .then(function () {

            showMessage(
                "Message sent successfully!",
                "success"
            );

            contactForm.reset();

        })

        .catch(function (error) {

            console.error("EmailJS Error:", error);

            showMessage(
                "Message failed to send. Please try again.",
                "error"
            );

        })

        .finally(function () {

            resetButton(submitButton);

        });

    });

}


// =========================
// FORM MESSAGE
// =========================

function showMessage(message, type) {

    if (!formMessage) {
        alert(message);
        return;
    }

    formMessage.textContent = message;
    formMessage.style.display = "block";

    if (type === "success") {
        formMessage.style.color = "#16a34a";
    } else {
        formMessage.style.color = "#dc2626";
    }

    setTimeout(function () {
        formMessage.style.display = "none";
    }, 5000);
}


// =========================
// RESET BUTTON
// =========================

function resetButton(button) {

    if (button) {
        button.disabled = false;
        button.textContent = "Send Message";
    }

}


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section");
const navigationLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});