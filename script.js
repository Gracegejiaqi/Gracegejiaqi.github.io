const toggle = document.getElementById("theme-toggle");

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

const wechatBtn = document.getElementById("wechat-btn");
if (wechatBtn) {
  const label = wechatBtn.querySelector(".wechat-label");
  const id = wechatBtn.getAttribute("data-id");
  wechatBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(id);
      label.textContent = "Copied: " + id;
    } catch (e) {
      label.textContent = id;
    }
    setTimeout(() => {
      label.textContent = "WeChat";
    }, 2000);
  });
}
