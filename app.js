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

  // Bind click routing (after inject)
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

  // Initialize pilot results (now that DOM exists)
  initPilotResultsViewer();
  // Mobile: scroll tabs so items aren't hidden behind the logo
  nudgeNavTabsIntoView();
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

// ============================================================
// PILOT RESULTS (final-only): wear-colored parity scatters
// - Low wear case:  assets/results/pilot_low_wear/results_slim.csv + kpis.json
// - High wear case: assets/results/pilot_wear/results_slim.csv + kpis.json
// - Flow used: ml_flow_corrected__m3_h (final)
// - Color used: ml_wear_pred__frac (clamped to 0–15%)
// ============================================================
function initPilotResultsViewer() {
  const cLow = document.getElementById("pilotCanvasLow");
  const cHigh = document.getElementById("pilotCanvasHigh");
  if (!cLow || !cHigh) return; // not on pilot page yet

  const KPI = {
    low:  {
      wearMean: document.getElementById("kpi_low_wear_mean"),
      flowP95:  document.getElementById("kpi_low_flow_p95"),
    },
    high: {
      wearMean: document.getElementById("kpi_high_wear_mean"),
      flowP95:  document.getElementById("kpi_high_flow_p95"),
    }
  };

  const CASES = [
    {
      key: "low",
      folder: "pilot_low_wear",
      canvas: cLow,
      kpi: KPI.low
    },
    {
      key: "high",
      folder: "pilot_high_wear",
      canvas: cHigh,
      kpi: KPI.high
    }
  ];

  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }

  // wear% -> color (teal -> amber -> deep red)
  function wearColor(wearPct, alpha) {
    const t = clamp(wearPct / 15, 0, 1);
    const stops = [
      { t: 0.0, c: [  9, 121, 107] }, // teal
      { t: 0.5, c: [242, 193,  78] }, // amber
      { t: 1.0, c: [161,  33,  41] }, // red
    ];

    let a = stops[0], b = stops[stops.length - 1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (t >= stops[i].t && t <= stops[i + 1].t) { a = stops[i]; b = stops[i + 1]; break; }
    }
    const u = (t - a.t) / (b.t - a.t || 1);
    const r = Math.round(a.c[0] + (b.c[0] - a.c[0]) * u);
    const g = Math.round(a.c[1] + (b.c[1] - a.c[1]) * u);
    const b2 = Math.round(a.c[2] + (b.c[2] - a.c[2]) * u);
    const al = (alpha === undefined) ? 0.92 : alpha;
    return `rgba(${r},${g},${b2},${al})`;
  }

  function parseCSV(text) {
    // Assumes simple CSV (no embedded commas/quotes in numeric fields)
    const lines = text.replace(/\r/g, "").trim().split("\n");
    if (!lines.length) return [];

    const header = lines[0].split(",").map(h => h.trim());
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;

      const cols = lines[i].split(",");
      if (cols.length !== header.length) continue;

      const row = {};
      for (let j = 0; j < header.length; j++) {
        row[header[j]] = (cols[j] ?? "").trim();
      }
      rows.push(row);
    }
    return rows;
  }

  function niceTicks(minV, maxV, n) {
    // Simple "nice" ticks (not perfect, but consistent)
    const span = maxV - minV;
    if (span <= 0) return [minV];
    const rawStep = span / Math.max(1, (n - 1));
    const pow10 = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const candidates = [1, 2, 2.5, 5, 10].map(k => k * pow10);
    let step = candidates[0];
    for (const c of candidates) {
      if (Math.abs(c - rawStep) < Math.abs(step - rawStep)) step = c;
    }
    const start = Math.floor(minV / step) * step;
    const ticks = [];
    for (let v = start; v <= maxV + 0.5 * step; v += step) ticks.push(v);
    return ticks;
  }

  function resizeCanvasToCSS(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(320, Math.round(rect.width));
    const h = Math.max(260, Math.round(rect.height));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function drawParityScatter(canvas, points, opts) {
    const { ctx, w, h } = resizeCanvasToCSS(canvas);

    // Layout
    const padL = 62, padR = 18, padT = 18, padB = 50;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    // background
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // Bounds
    const xs = points.map(p => p.x).filter(v => Number.isFinite(v));
    const ys = points.map(p => p.y).filter(v => Number.isFinite(v));
    const minV = Math.min(...xs, ...ys);
    const maxV = Math.max(...xs, ...ys);
    const pad = (maxV - minV) * 0.06;
    const xMin = minV - pad, xMax = maxV + pad;
    const yMin = xMin, yMax = xMax; // parity square

    function xPix(x) { return padL + (x - xMin) / (xMax - xMin) * plotW; }
    function yPix(y) { return padT + (1 - (y - yMin) / (yMax - yMin)) * plotH; }

    // Grid + ticks
    const ticks = niceTicks(xMin, xMax, 6);
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 1;
    for (const t of ticks) {
      const x = xPix(t);
      const y = yPix(t);

      // vertical
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, padT + plotH);
      ctx.stroke();

      // horizontal
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + plotW, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(0,0,0,0.22)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // Tick labels
    ctx.fillStyle = "rgba(0,0,0,0.80)";
    ctx.font = "12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (const t of ticks) {
      const y = yPix(t);
      ctx.fillText(t.toFixed(0), padL - 8, y);
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (const t of ticks) {
      const x = xPix(t);
      ctx.fillText(t.toFixed(0), x, padT + plotH + 8);
    }

    // Axis labels
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.font = "600 12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
    ctx.textAlign = "center";
    ctx.fillText("Measured Flow (m³/h)", padL + plotW / 2, h - 18);

    ctx.save();
    ctx.translate(18, padT + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Estimated Flow (m³/h)", 0, 0);
    ctx.restore();

    // y=x dashed line
    ctx.strokeStyle = "rgba(0,0,0,0.55)";
    ctx.setLineDash([6, 5]);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(xPix(xMin), yPix(xMin));
    ctx.lineTo(xPix(xMax), yPix(xMax));
    ctx.stroke();
    ctx.setLineDash([]);

    // Points
    for (const p of points) {
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;
      const wearPct = clamp(p.wearPct, 0, 15);
      ctx.fillStyle = wearColor(wearPct, 0.92);
      const r = 4.2;
      ctx.beginPath();
      ctx.arc(xPix(p.x), yPix(p.y), r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Annotation
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.font = "12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Perfect prediction (linear, zero error)", padL + plotW * 0.60, padT + plotH * 0.62);
  }

  async function loadCase(caseCfg) {
    const base = `assets/results/${caseCfg.folder}/`;
    const csvUrl = base + "results_slim.csv";
    const kpiUrl = base + "kpis.json";

    // CSV
    const csvRes = await fetch(csvUrl, { cache: "no-store" });
    if (!csvRes.ok) throw new Error(`Failed to load ${csvUrl} (${csvRes.status})`);
    const csvText = await csvRes.text();
    const rows = parseCSV(csvText);

    const pts = rows.map(r => {
      const x = Number(r["virplant_flow__m3_h"]);
      const y = Number(r["ml_flow_corrected__m3_h"]);
      const w = Number(r["ml_wear_pred__frac"]) * 100;
      return { x, y, wearPct: w };
    }).filter(p => Number.isFinite(p.x) && Number.isFinite(p.y));

    // KPIs (final = corrected)
    let k = null;
    try {
      const kpiRes = await fetch(kpiUrl, { cache: "no-store" });
      if (kpiRes.ok) k = await kpiRes.json();
    } catch (_) {}

    return { pts, k };
  }

  function fmtPct(x) {
    if (x === null || x === undefined || Number.isNaN(Number(x))) return "—";
    return Number(x).toFixed(1) + "%";
  }

  function fmtFracAsPct(x) {
    if (x === null || x === undefined || Number.isNaN(Number(x))) return "—";
    // incoming is already percent in our kpis.json blocks (true_mean_pct)
    return Number(x).toFixed(1) + "%";
  }

  function applyKpis(which, k) {
    // Expecting k.flow_corrected + k.wear (may be null)
    const flow = k?.flow_corrected || null;
    const wear = k?.wear || null;

    if (which.wearMean) which.wearMean.textContent = wear ? fmtFracAsPct(wear.true_mean_pct) : "—";
    if (which.flowP95) which.flowP95.textContent = flow ? fmtPct(flow.p95_pct) : "—";
  }

  // Render with resize support
  const observers = [];
  async function boot() {
    try {
      const [low, high] = await Promise.all(CASES.map(loadCase));

      // initial draw
      drawParityScatter(CASES[0].canvas, low.pts, {});
      drawParityScatter(CASES[1].canvas, high.pts, {});

      if (low.k) applyKpis(CASES[0].kpi, low.k);
      if (high.k) applyKpis(CASES[1].kpi, high.k);

      // resize redraw
      const ro = new ResizeObserver(() => {
        drawParityScatter(CASES[0].canvas, low.pts, {});
        drawParityScatter(CASES[1].canvas, high.pts, {});
      });
      ro.observe(CASES[0].canvas);
      ro.observe(CASES[1].canvas);
      observers.push(ro);
    } catch (e) {
      console.warn("Pilot plots failed to load:", e);
    }
  }

  boot();
}

// ============================================================
// Mobile UX: if tabs overflow, start scrolled to the right
// (prevents tabs being hidden under the logo on narrow screens)
// ============================================================
function nudgeNavTabsIntoView() {
  const tabs = document.querySelector(".links");
  if (!tabs) return;

  // If overflow exists, push scroll so the right-most items are visible.
  if (tabs.scrollWidth > tabs.clientWidth + 8) {
    tabs.scrollLeft = tabs.scrollWidth;
  }
}

window.addEventListener("load", () => { setTimeout(nudgeNavTabsIntoView, 60); });
