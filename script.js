const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");

if (year) {
    year.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const open = navMenu.classList.toggle("is-open");

        navToggle.classList.toggle("is-open", open);
        navToggle.setAttribute("aria-expanded", String(open));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("is-open");
            navToggle.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// Report taps on phone, text and email links to Google Analytics.
document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="tel:"], a[href^="sms:"], a[href^="mailto:"]');

    if (!link || typeof gtag !== "function") {
        return;
    }

    const href = link.getAttribute("href");
    const name = href.startsWith("tel:") ? "call_click" : href.startsWith("sms:") ? "text_click" : "email_click";
    const area = link.closest("section[id], header, footer");

    gtag("event", name, {
        click_location: area ? area.id || area.tagName.toLowerCase() : "page"
    });
});

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealEls.forEach((el) => observer.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
}

window.addEventListener(
    "scroll",
    () => {
        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        }
    },
    { passive: true }
);