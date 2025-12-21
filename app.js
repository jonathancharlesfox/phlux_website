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

