// phlux_site loader: inject partial <main> blocks and keep hash navigation.
// No build tools required. Works with VS Code Live Server.

document.getElementById("y").textContent = new Date().getFullYear();

const pages = ["home", "how", "use", "pilot", "what", "contact"];

const partials = {
  home: "partials/home.html",
  how: "partials/how.html",
  use: "partials/use.html",
  pilot: "partials/pilot.html",
  what: "partials/who.html",
  contact: "partials/contact.html",
};

function normalizePage(p) {
  return pages.includes(p) ? p : "home";
}

function setActive(page) {
  page = normalizePage(page);

  pages.forEach((p) => {
    const el = document.getElementById(`page-${p}`);
    if (el) el.classList.toggle("active", p === page);
  });

  document.querySelectorAll(".navlink").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("data-page") === page);
  });

  if (location.hash !== `#${page}`) {
    history.replaceState(null, "", `#${page}`);
  }

  window.scrollTo({ top: 0, behavior: "auto" });
}

async function loadPartials() {
  const host = document.getElementById("pages");
  if (!host) return;

  // Load all partials in parallel
  const results = await Promise.all(
    pages.map(async (p) => {
      const res = await fetch(partials[p], { cache: "no-cache" });
      if (!res.ok) throw new Error(`Failed to load ${partials[p]} (${res.status})`);
      return res.text();
    })
  );

  host.innerHTML = results.join("\n\n");
  initPilotResultsViewer();


  // After inject, bind click routing
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-page]");
    if (!target) return;
    const page = target.getAttribute("data-page");
    if (page) {
      e.preventDefault();
      setActive(page);
    }
  });

  // Activate based on hash
  const initial = (location.hash || "#home").replace("#", "");
  setActive(initial);

  window.addEventListener("hashchange", () => {
    const p = (location.hash || "#home").replace("#", "");
    setActive(p);
  });
}

loadPartials().catch((err) => {
  console.error(err);
  const host = document.getElementById("pages");
  if (host) {
    host.innerHTML = `
      <main class="page active">
        <section class="section">
          <div class="wrap">
            <h2>Site load error</h2>
            <p class="lede">Could not load page partials. Check that you are running via a local server (e.g., VS Code Live Server) and that the folder structure matches.</p>
          </div>
        </section>
      </main>`;
  }
});

function initPilotResultsViewer() {
  const btnLow = document.getElementById("pilotBtnLow");
  const btnHigh = document.getElementById("pilotBtnHigh");
  const hero = document.getElementById("pilotHeroFrame");
  const errImg = document.getElementById("pilotErrImg");
  const wearImg = document.getElementById("pilotWearImg");

  // If we’re not on the pilot page (or it hasn’t been injected yet), do nothing.
  if (!btnLow || !btnHigh || !hero || !errImg || !wearImg) return;

  const kpi_mape = document.getElementById("kpi_mape");
  const kpi_p95err = document.getElementById("kpi_p95err");
  const kpi_wearmean = document.getElementById("kpi_wearmean");
  const kpi_wearover = document.getElementById("kpi_wearover");

  const modal = document.getElementById("pilotModal");
  const modalBackdrop = document.getElementById("pilotModalBackdrop");
  const modalClose = document.getElementById("pilotModalClose");
  const modalImg = document.getElementById("pilotModalImg");
  const modalTitle = document.getElementById("pilotModalTitle");

  const SCENARIOS = {
    low:  { key: "low_deg" },
    high: { key: "high_deg" }
  };

  function fmtPct(x) {
    if (x === null || x === undefined || Number.isNaN(Number(x))) return "—";
    return Number(x).toFixed(2) + "%";
  }

  async function loadKpis(scenarioKey) {
    const url = `assets/results/${scenarioKey}/kpis.json`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`kpis fetch failed: ${res.status}`);
      const k = await res.json();

      if (kpi_mape) kpi_mape.textContent = fmtPct(k.mape_pct);
      if (kpi_p95err) kpi_p95err.textContent = fmtPct(k.p95_error_pct);
      if (kpi_wearmean) kpi_wearmean.textContent = fmtPct(k.wear_mean_pct);

      const frac = Number(k.wear_over_5pct_frac);
      const over = Number.isNaN(frac) ? "—" : (frac * 100).toFixed(1) + "%";
      if (kpi_wearover) kpi_wearover.textContent = over;

    } catch (e) {
      if (kpi_mape) kpi_mape.textContent = "—";
      if (kpi_p95err) kpi_p95err.textContent = "—";
      if (kpi_wearmean) kpi_wearmean.textContent = "—";
      if (kpi_wearover) kpi_wearover.textContent = "—";
      // Helpful debug in DevTools console
      console.warn("Pilot KPI load failed:", e);
    }
  }

  function setScenario(which) {
    const s = (which === "high") ? SCENARIOS.high : SCENARIOS.low;
    const isHigh = (which === "high");

    btnLow.classList.toggle("pilotToggleBtnActive", !isHigh);
    btnHigh.classList.toggle("pilotToggleBtnActive", isHigh);

    hero.src = `assets/results/${s.key}/hero.html`;
    errImg.src = `assets/results/${s.key}/error_hist.svg`;
    wearImg.src = `assets/results/${s.key}/wear_hist.svg`;

    // Update zoom sources on thumb buttons
    document.querySelectorAll(".pilotThumbBtn").forEach((b) => {
      const title = (b.getAttribute("data-zoom-title") || "").toLowerCase();
      b.setAttribute(
        "data-zoom-src",
        title.includes("error")
          ? `assets/results/${s.key}/error_hist.svg`
          : `assets/results/${s.key}/wear_hist.svg`
      );
    });

    loadKpis(s.key);
  }

  // modal
  function openModal(src, title) {
    if (!modal) return;
    modalImg.src = src;
    modalTitle.textContent = title || "Plot";
    modal.classList.add("pilotModalOpen");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("pilotModalOpen");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest(".pilotThumbBtn");
    if (b) {
      e.preventDefault();
      openModal(b.getAttribute("data-zoom-src"), b.getAttribute("data-zoom-title"));
    }
  });

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // wire toggles
  btnLow.addEventListener("click", () => setScenario("low"));
  btnHigh.addEventListener("click", () => setScenario("high"));

  // init
  setScenario("low");
}
