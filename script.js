/* ==========================================================================
   PORTFOLIO INTERACTIVE MASTER ENGINE (Navigation, Scroll & Form Validation)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. INTERACTIVE NAVIGATION & MOBILE AUTO-CLOSE SYSTEM
    // ==========================================================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".main-nav ul li a");
    const menuCheckbox = document.getElementById("menu-toggle");

    // Tracks user scroll positions and highlights the active section link in real-time
    const changeActiveLink = () => {
        let scrollPosition = window.scrollY + 200; // Cushion offset so updates feel snappy

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    // Listeners for click navigation adjustments and scroll tracking
    window.addEventListener("scroll", changeActiveLink);

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            // Instantly collapses the expanded mobile hamburger bar upon link selection
            if (menuCheckbox && menuCheckbox.checked) {
                menuCheckbox.checked = false;
            }
        });
    });

    // ==========================================================================
    // 2. SECURE CONTACT FORM VALIDATION ENGINE
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    
    // Only execute form tracking logic if the contactForm element exists on the page
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const mobile = document.getElementById('mobileNumber').value.trim();
            const message = document.getElementById('message').value.trim();
            const errorDisplay = document.getElementById('formError');

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const mobilePattern = /^\d{10}$/;

            if (errorDisplay) {
                errorDisplay.style.color = "#ef4444"; // Reset to vibrant red

                // Presence Check
                if (name === "" || email === "" || mobile === "" || message === "") {
                    errorDisplay.innerText = "All fields are required.";
                    return;
                }

                // Email Verification
                if (!emailPattern.test(email)) {
                    errorDisplay.innerText = "Please enter a valid email address.";
                    return;
                }

                // Mobile Pattern Test Verification
                if (!mobilePattern.test(mobile)) {
                    errorDisplay.innerText = "Please enter a valid 10-digit mobile number.";
                    return;
                }

                // Success validation state confirmation
                errorDisplay.style.color = "#22c55e"; // Emerald green
                errorDisplay.innerText = "Message sent successfully.";
            }
            
            contactForm.reset();
        }); 
    } 
});