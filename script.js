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

document.querySelectorAll(".phone-link").forEach((link) => {
    const parts = link.dataset.phoneParts?.split("|");

    if (!parts || parts.length !== 3) return;

    const phoneNumber = `+1${parts.join("")}`;

    link.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = `tel:${phoneNumber}`;
    });
});

document.querySelectorAll(".email-link").forEach((link) => {
    const user = link.dataset.emailUser;
    const domain = link.dataset.emailDomain;

    if (!user || !domain) return;

    const email = `${user}@${domain}`;

    link.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = `mailto:${email}`;
    });
});