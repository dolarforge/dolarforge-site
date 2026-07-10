
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
});
