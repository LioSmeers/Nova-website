const header = document.querySelector("#siteHeader");
const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
const floatLayer = document.querySelector("#floatLayer");
const contactForm = document.querySelector("#contactForm");
const sendText = document.querySelector("#sendText");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState);

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  header.classList.toggle("menu-active", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    header.classList.remove("menu-active");
    menuButton.setAttribute("aria-expanded", "false");
    target.scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("mousemove", (event) => {
  if (!floatLayer) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 20;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;
  floatLayer.style.transform = `translate(${x}px, ${y}px)`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll(".service-card").forEach((card) => {
  const accent = card.dataset.accent || "#3B82F6";

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.classList.add("is-hovered");
    card.style.borderColor = `${accent}66`;
    card.style.boxShadow = `0 20px 60px ${accent}25, 0 0 0 1px ${accent}30`;
    card.style.transform = `perspective(1000px) rotateX(${y * -12}deg) rotateY(${x * 12}deg) scale(1.02)`;
    card.style.setProperty("--shine-x", `${50 + x * 40}%`);
    card.style.setProperty("--shine-y", `${50 + y * 40}%`);
    card.style.setProperty("--shine-color", `${accent}14`);
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("is-hovered");
    card.style.borderColor = "";
    card.style.boxShadow = "";
    card.style.transform = "";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();
  sendText.textContent = "Demo verstuurd!";

  window.setTimeout(() => {
    sendText.textContent = "Verstuur bericht";
  }, 4000);
});
