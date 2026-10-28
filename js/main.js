/* =========================================================================
   LE MATANA — Interactions
   Les contenus viennent de data/site.js (window.SITE) et data/menu.js (window.MENU).
   ========================================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  const SITE = window.SITE || {};
  const MENU = window.MENU || [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  /* ---------- Coordonnées : injectées depuis data/site.js ---------- */
  function bindSiteData() {
    if (!SITE.phone) return;
    const a = SITE.address || {};
    const text = {
      phone: SITE.phone,
      email: SITE.email,
      address: `${a.street}, ${a.zip} ${a.city}`,
      kosher: SITE.kosherCertification,
      rating: SITE.google && SITE.google.rating,
      count: SITE.google && SITE.google.count,
      hoursNote: SITE.hoursNote,
    };
    const href = {
      tel: `tel:${SITE.phoneIntl}`,
      email: `mailto:${SITE.email}`,
      google: SITE.google && SITE.google.url,
      deliveroo: SITE.delivery && SITE.delivery.deliveroo,
      ubereats: SITE.delivery && SITE.delivery.ubereats,
      instagram: SITE.social && SITE.social.instagram,
      facebook: SITE.social && SITE.social.facebook,
    };
    $$("[data-bind]").forEach((el) => {
      const v = text[el.dataset.bind];
      if (v != null && v !== "") el.textContent = v;
    });
    $$("[data-href]").forEach((el) => {
      const v = href[el.dataset.href];
      if (v) el.setAttribute("href", v);
    });
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- Horaires ---------- */
  function renderHours() {
    const hours = SITE.hours || [];
    // getDay() : 0 = dimanche ; nos horaires commencent le lundi
    const todayIndex = (new Date().getDay() + 6) % 7;
    $$("#hours, #hours-footer").forEach((dl) => {
      dl.innerHTML = "";
      hours.forEach((h, i) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = h.day;
        dd.textContent = h.closed ? `Fermé${h.note ? " · " + h.note : ""}` : `${h.open} – ${h.close}`;
        if (h.closed) dd.classList.add("is-closed");
        if (i === todayIndex) { dt.classList.add("is-today"); dd.classList.add("is-today"); }
        dl.append(dt, dd);
      });
    });
  }

  /* ---------- En-tête compact + barre mobile ---------- */
  function initHeader() {
    const header = $("#header");
    const bar = $(".mobile-bar");
    const hero = $(".hero");
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      if (bar) bar.classList.toggle("is-visible", y > hero.offsetHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Menu burger plein écran ---------- */
  function initDrawer() {
    const burger = $("#burger");
    const drawer = $("#drawer");
    const header = $("#header");
    const setOpen = (open) => {
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      document.body.style.overflow = open ? "hidden" : "";
      header.classList.toggle("is-menu-open", open);
      if (open) {
        drawer.hidden = false;
        requestAnimationFrame(() => drawer.classList.add("is-open"));
      } else {
        drawer.classList.remove("is-open");
        setTimeout(() => { if (!drawer.classList.contains("is-open")) drawer.hidden = true; }, 450);
      }
    };
    burger.addEventListener("click", () => setOpen(burger.getAttribute("aria-expanded") !== "true"));
    $$("a", drawer).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") { setOpen(false); burger.focus(); }
    });
  }

  /* ---------- Carrousel du hero ---------- */
  function initHero() {
    const slides = $$(".hero__slide");
    const titles = $$(".hero__title");
    const dots = $$(".hero__dots button[role=tab]");
    const pauseBtn = $(".hero__pause");
    let paused = reduceMotion;
    if (slides.length < 2) return;
    let current = 0;
    let timer = null;
    const DELAY = 6500;

    const go = (n) => {
      current = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
      titles.forEach((t, i) => t.classList.toggle("is-active", i === current));
      dots.forEach((d, i) => d.setAttribute("aria-selected", String(i === current)));
    };
    const start = () => { stop(); if (!paused) timer = setInterval(() => go(current + 1), DELAY); };
    const stop = () => clearInterval(timer);

    dots.forEach((d, i) => d.addEventListener("click", () => { go(i); start(); }));
    const setPaused = (p) => {
      paused = p;
      pauseBtn.setAttribute("aria-pressed", String(p));
      pauseBtn.setAttribute("aria-label", p ? "Relancer le diaporama" : "Mettre le diaporama en pause");
      start();
    };
    if (pauseBtn) {
      setPaused(paused);
      pauseBtn.addEventListener("click", () => setPaused(!paused));
    }
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    start();
  }

  /* ---------- La carte ---------- */
  const formatPrice = (p) =>
    p == null ? "" : `${Number.isInteger(p) ? p : p.toFixed(2).replace(".", ",")} €`;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function renderCategory(cat) {
    const items = cat.items.map((it) => {
      const tagClass = /v[ée]g/i.test(it.tag || "") ? " dish__tag--veg" : "";
      const tag = it.tag ? `<span class="dish__tag${tagClass}">${escapeHtml(it.tag)}</span>` : "";
      const price = formatPrice(it.price);
      return `
        <li class="dish">
          <div class="dish__top">
            <h4 class="dish__name">${escapeHtml(it.name)}${tag}</h4>
            ${price ? `<span class="dish__dots" aria-hidden="true"></span><span class="dish__price">${price}</span>` : ""}
          </div>
          ${it.desc ? `<p class="dish__desc">${escapeHtml(it.desc)}</p>` : ""}
        </li>`;
    }).join("");
    return `
      <div class="menu__cat-head">
        <h3 class="menu__cat-title">${escapeHtml(cat.title)}</h3>
        ${cat.note ? `<p class="menu__cat-note">${escapeHtml(cat.note)}</p>` : ""}
      </div>
      <ul class="menu__list">${items}</ul>`;
  }

  let selectTab = () => {};

  function initMenu() {
    const tabs = $("#menu-tabs");
    const panel = $("#menu-panel");
    if (!tabs || !panel || !MENU.length) return;

    tabs.innerHTML = MENU.map((c, i) =>
      `<button class="menu__tab" role="tab" id="tab-${c.id}" aria-controls="menu-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-id="${c.id}">${escapeHtml(c.title)}</button>`
    ).join("");
    const buttons = $$(".menu__tab", tabs);

    selectTab = (id, focus) => {
      const cat = MENU.find((c) => c.id === id) || MENU[0];
      buttons.forEach((b) => {
        const on = b.dataset.id === cat.id;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        if (on) {
          if (focus) b.focus();
          b.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "auto" : "smooth" });
        }
      });
      panel.setAttribute("aria-labelledby", `tab-${cat.id}`);
      if (reduceMotion) { panel.innerHTML = renderCategory(cat); return; }
      panel.classList.add("is-changing");
      setTimeout(() => {
        panel.innerHTML = renderCategory(cat);
        panel.classList.remove("is-changing");
      }, 220);
    };

    panel.innerHTML = renderCategory(MENU[0]);
    panel.setAttribute("aria-labelledby", `tab-${MENU[0].id}`);

    tabs.addEventListener("click", (e) => {
      const b = e.target.closest(".menu__tab");
      if (b) selectTab(b.dataset.id);
    });
    // Navigation clavier entre onglets (flèches gauche / droite)
    tabs.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const i = buttons.findIndex((b) => b.getAttribute("aria-selected") === "true");
      const next = buttons[(i + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length];
      selectTab(next.dataset.id, true);
    });
    // Liens "Voir les pizzas", etc. depuis les plats signatures
    $$("[data-tab]").forEach((a) => a.addEventListener("click", () => selectTab(a.dataset.tab)));
  }

  /* ---------- Apparition au scroll ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // léger décalage en cascade pour les éléments voisins
        const siblings = $$(".reveal", el.parentElement);
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 4) * 90}ms`;
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Formulaire de réservation ---------- */
  function initForm() {
    const form = $("#booking-form");
    const status = $("#form-status");
    if (!form) return;

    const date = form.elements.date;
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    date.min = today.toISOString().slice(0, 10);

    const setStatus = (msg, type) => {
      status.textContent = msg;
      status.className = `form__status ${type ? "is-" + type : ""}`;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let firstInvalid = null;
      $$("[required]", form).forEach((f) => {
        const bad = !f.value.trim();
        f.setAttribute("aria-invalid", String(bad));
        if (bad && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) {
        setStatus("Merci de remplir les champs nom, téléphone, date, heure et couverts.", "error");
        firstInvalid.focus();
        return;
      }

      const d = Object.fromEntries(new FormData(form));
      const dateFr = new Date(d.date + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

      if (SITE.formspreeId) {
        try {
          const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(form),
          });
          if (!res.ok) throw new Error();
          form.reset();
          setStatus("Merci, votre demande est envoyée. Nous vous rappelons pour la confirmer.", "ok");
        } catch {
          setStatus(`L'envoi n'a pas abouti. Appelez-nous au ${SITE.phone}.`, "error");
        }
        return;
      }

      // Sans Formspree : ouverture du logiciel de messagerie
      const subject = `Réservation · ${d.couverts} pers. · ${dateFr} ${d.heure}`;
      const body = [
        `Nom : ${d.nom}`,
        `Téléphone : ${d.telephone}`,
        `Date : ${dateFr}`,
        `Heure : ${d.heure}`,
        `Couverts : ${d.couverts}`,
        d.message ? `Message : ${d.message}` : "",
      ].filter(Boolean).join("\n");
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Votre messagerie s'ouvre avec la demande pré-remplie. Il ne reste qu'à l'envoyer.", "ok");
    });

    form.addEventListener("input", (e) => {
      if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) e.target.setAttribute("aria-invalid", "false");
    });
  }

  bindSiteData();
  renderHours();
  initHeader();
  initDrawer();
  initHero();
  initMenu();
  initReveal();
  initForm();
})();
