
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  const btn = document.querySelector("[data-theme-toggle]");
  const saved = localStorage.getItem("df-theme");
  if(saved){ document.documentElement.setAttribute("data-theme", saved); }
  if(btn){
    btn.addEventListener("click", ()=>{
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", current);
      localStorage.setItem("df-theme", current);
      btn.textContent = current === "dark" ? "☀ Light" : "◐ Dark";
    });
  }
  const form = document.querySelector("[data-newsletter]");
  if(form){
    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      alert("Newsletter integration will be connected later.");
    });
  }
});
