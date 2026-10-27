const toggle = document.getElementById("theme-toggle");

const syncThemeButton = () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
};

syncThemeButton();

toggle.addEventListener("click", () => {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
  syncThemeButton();
});

const navLinks = Array.from(document.querySelectorAll(".nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-30% 0px -60% 0px" }
);

sections.forEach((section) => observer.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();
