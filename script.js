const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn?.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    mobileNav.classList.remove("open");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
