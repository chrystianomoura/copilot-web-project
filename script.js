document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const currentYear = document.getElementById("current-year");

  // Atualiza o ano no rodapé
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Tema claro/escuro com persistência no localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Modo Claro";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  });

  // Menu mobile
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Filtro de projetos por categoria
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      projectCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !matches);
      });
    });
  });

  // Validação simples do formulário de contato
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formFeedback.textContent = "Por favor, preencha todos os campos.";
      formFeedback.className = "form-feedback error";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formFeedback.textContent = "Informe um endereço de e-mail válido.";
      formFeedback.className = "form-feedback error";
      return;
    }

    formFeedback.textContent = `Obrigado, ${name}! Sua mensagem foi validada com sucesso.`;
    formFeedback.className = "form-feedback success";
    contactForm.reset();
  });
});
