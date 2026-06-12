// Custom JS for justintrinh.com

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Typing Text Animation ---
    const phrases = [
        "AI Agent Teams 🤖",
        "Smart Workflows ⚡",
        "MCP Servers 🛠️",
        "Automated Setups 🚀"
    ];
    
    const typedSpan = document.getElementById("typed-text");
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster when deleting
        } else {
            typedSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // normal typing speed
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 1500; // pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation if element exists
    if (typedSpan) {
        setTimeout(type, 1000);
    }
    
    // --- 2. Navbar Scroll Behavior ---
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    
    // Close mobile navbar on nav-link click
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbarCollapse.classList.contains("show")) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // --- 3. Glow Hover Coordinate Tracking ---
    const projectCards = document.querySelectorAll(".project-card");
    
    projectCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });
    
    // --- 4. Back to Top Button ---
    const backToTopBtn = document.getElementById("back-to-top");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });
    
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // --- 5. Scroll Reveal Animation (Fade-in-up) ---
    const elementsToReveal = [
        document.querySelector("#about .about-card"),
        document.querySelector("#about .tech-grid"),
        ...document.querySelectorAll(".setup-card"),
        ...document.querySelectorAll(".project-card"),
        document.querySelector(".contact-box")
    ];
    
    // Filter out null elements (to prevent errors if some elements are absent)
    const validElements = elementsToReveal.filter(el => el !== null);
    
    // Add base class
    validElements.forEach(el => el.classList.add("fade-in-element"));
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // stop observing once visible
            }
        });
    }, observerOptions);
    
    validElements.forEach(el => revealObserver.observe(el));
    
    // --- 6. Contact Form Submission Toast/Notification ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Simple mockup feedback
            const btn = contactForm.querySelector("button[type='submit']");
            const originalHTML = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Đang gửi...`;
            
            setTimeout(() => {
                btn.innerHTML = `<i class="bi bi-check-lg me-2"></i>Đã gửi thành công!`;
                btn.classList.remove("btn-primary");
                btn.classList.add("btn-success");
                
                // Reset form
                contactForm.reset();
                
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                    btn.classList.remove("btn-success");
                    btn.classList.add("btn-primary");
                }, 3000);
            }, 1500);
        });
    }
});
