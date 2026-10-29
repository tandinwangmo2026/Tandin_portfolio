
// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    // Close menu when a navigation link is clicked

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });

}


// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("theme-toggle");


// Apply saved theme when the page loads

function applyTheme(theme) {

    const darkModeEnabled = theme === "dark";

    document.body.classList.toggle("dark-mode", darkModeEnabled);

    if (themeToggle) {

        themeToggle.textContent = darkModeEnabled ? "☀️" : "🌙";

        themeToggle.setAttribute(
            "aria-label",
            darkModeEnabled
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            darkModeEnabled
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }

}


// Read saved theme

let savedTheme = "light";

try {

    savedTheme = localStorage.getItem("portfolio-theme") || "light";

} catch (error) {

    savedTheme = "light";

}


// Apply theme

applyTheme(savedTheme);


// Change theme when button is clicked

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const darkModeEnabled =
            document.body.classList.contains("dark-mode");

        const newTheme = darkModeEnabled ? "light" : "dark";

        applyTheme(newTheme);


        // Save theme selection

        try {

            localStorage.setItem("portfolio-theme", newTheme);

        } catch (error) {

            // Theme still works if browser storage is unavailable

        }

    });

}


// =========================
// FOOTER YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contact-form");

const formMessage = document.getElementById("form-message");


if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get form values

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const message = document.getElementById("message").value.trim();


        // Check empty fields

        if (name === "" || email === "" || message === "") {

            formMessage.textContent =
                "Please fill in all the fields.";

            return;

        }


        // Check email format

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            return;

        }


        // Show successful validation

        formMessage.textContent =
            "Thank you, " + name +
            "! Your form has been checked successfully.";


        // Clear form

        contactForm.reset();

    });

}
