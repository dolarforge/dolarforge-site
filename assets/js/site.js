
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const pageSlug = (() => {
    const filename = window.location.pathname.split("/").pop() || "home";
    return filename.replace(/\.html$/i, "").replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "home";
  })();

  const trafficSource = (() => {
    if(!document.referrer) return "direct";
    try {
      const hostname = new URL(document.referrer).hostname.toLowerCase();
      if(hostname.includes("pinterest")) return "pinterest";
      if(hostname.includes("google")) return "google";
      if(hostname.includes("bing")) return "bing";
      if(hostname.includes("yahoo")) return "yahoo";
      return "referral";
    } catch (_) {
      return "unknown";
    }
  })();

  document.querySelectorAll('a[href*="hop.clickbank.net"]').forEach((link, index) => {
    const trackingId = `df_${pageSlug}_${trafficSource}_${index + 1}`.slice(0, 100);

    try {
      const affiliateUrl = new URL(link.href);
      affiliateUrl.searchParams.set("tid", trackingId);
      link.href = affiliateUrl.toString();
    } catch (_) {
      // Keep the original HopLink if the URL cannot be parsed.
    }

    link.dataset.affiliateTrackingId = trackingId;
    link.addEventListener("click", () => {
      if(typeof window.gtag === "function") {
        window.gtag("event", "affiliate_click", {
          affiliate_product: pageSlug,
          affiliate_position: index + 1,
          traffic_source: trafficSource,
          tracking_id: trackingId,
          link_text: link.textContent.trim(),
          page_path: window.location.pathname
        });
      }
    });
  });

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
