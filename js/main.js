/* =========================================================
   Raicilla Hnos. Arrizón — Interacciones
   ========================================================= */

/* ============ CONFIGURACIÓN (EDITA AQUÍ) ============ */
const CONTACT = {
  whatsappNumber: "523881058508",        // +52 388 105 8508
  whatsappDisplay: "+52 388 105 8508",
  whatsappNumberTour: "523881055998",    // +52 388 105 5998 (visitas y tours)
  email: "hnos.arrizon.raicilla@gmail.com",
  facebook: "https://www.facebook.com/Hnos.Arrizon",
  instagram: "https://www.instagram.com/hnos_arrizon/",
  tiktok: "https://www.tiktok.com/@hnos_arrizon",
  mapLink: "https://www.google.com/maps?q=Rancho+La+Vieja,+Mascota,+Jalisco,+Mexico",
};

const wa = (msg) => `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`;
const waTour = (msg) => `https://wa.me/${CONTACT.whatsappNumberTour}?text=${encodeURIComponent(msg)}`;
const waShare = (msg) => `https://wa.me/?text=${encodeURIComponent(msg)}`;

/* ============ Utilidades ============ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============ Página activa en el menú según la URL ============ */
(() => {
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  const current = file && file !== "/" ? file : "index.html";
  document.querySelectorAll(".nav__links a:not(.nav__cta), .footer__links a").forEach((a) => {
    const href = ((a.getAttribute("href") || "").split("?")[0].split("#")[0]).toLowerCase();
    if (href === current) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });
})();

document.querySelectorAll("section[id]").forEach((el) => (el.style.scrollMarginTop = "88px"));

/* ============ Bloqueo de scroll ============ */
const lockScroll = (on) => document.body.style.overflow = on ? "hidden" : "";

/* ============ AGE GATE ============ */
const ageGate = $("#ageGate");
const AGE_KEY = "arrizon_age_verified";

function initAgeGate() {
  if (!ageGate) return;
  const already = sessionStorage.getItem(AGE_KEY) === "yes";
  if (already) {
    ageGate.classList.add("is-hidden");
  } else {
    lockScroll(true);
  }
  const yes = $("#ageYes");
  const no = $("#ageNo");
  if (yes) yes.addEventListener("click", () => {
    sessionStorage.setItem(AGE_KEY, "yes");
    ageGate.classList.add("is-hidden");
    lockScroll(false);
  });
  if (no) no.addEventListener("click", () => {
    ageGate.classList.add("is-denied");
    const title = $("#ageTitle");
    const sub = $(".age-gate__actions");
    const note = $(".age-gate__note");
    if (title) title.textContent = "Lo sentimos";
    if (sub) sub.style.display = "none";
    if (note) note.innerHTML = "Este sitio está dirigido a mayores de 18 años.<br>Te esperamos cuando cumplas.";
  });
}
initAgeGate();

/* ============ PRELOADER ============ */
window.addEventListener("load", () => {
  const pre = $("#preloader");
  if (pre) setTimeout(() => pre.classList.add("is-done"), 700);
});

/* ============ NAVBAR ============ */
const navbar = $("#navbar");
const burger = $("#burger");
const navLinks = $("#navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 40);
}, { passive: true });

burger.addEventListener("click", () => {
  burger.classList.toggle("is-open");
  navLinks.classList.toggle("is-open");
});
$$("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => {
    burger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
  })
);

/* ============ SCROLL PROGRESS ============ */
const progressBar = $("#progressBar span");
const updateProgress = () => {
  if (!progressBar) return;
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progressBar.style.width = `${(p * 100).toFixed(2)}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* ============ REVEAL ON SCROLL ============ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay;
        if (delay) el.style.transitionDelay = `${delay * 120}ms`;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px -40px 0px" }
);
$$(".reveal").forEach((el) => revealObserver.observe(el));

/* ============ CONTADORES ============ */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      if (prefersReducedMotion) {
        el.textContent = prefix + target + suffix;
        counterObserver.unobserve(el);
        return;
      }
      const dur = 1600;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
$$(".counter").forEach((el) => counterObserver.observe(el));

/* ============ HISTORIA: navegación de capítulos + scrollspy ============ */
const tlNav = $("#tlNav");
const tlFlow = $("#tlFlow");
if (tlNav && tlFlow) {
  const tlItems = $$(".tl-nav__item", tlNav);
  const tlCards = $$(".tl-card", tlFlow);

  const centerNav = (nav, item) => {
    if (!item) return;
    const iRect = item.getBoundingClientRect();
    const nRect = nav.getBoundingClientRect();
    const left = nav.scrollLeft + (iRect.left - nRect.left) - (nRect.width - iRect.width) / 2;
    nav.scrollTo({ left, behavior: "smooth" });
  };

  tlItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = $("#" + btn.dataset.target, tlFlow);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  const tlSpy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      tlItems.forEach((b) => {
        const active = b.dataset.target === id;
        b.classList.toggle("is-active", active);
        if (active) centerNav(tlNav, b);
      });
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
  tlCards.forEach((c) => tlSpy.observe(c));
}

/* ============ PARALLAX HERO ============ */
const heroBg = $(".hero__bg");
window.addEventListener("scroll", () => {
  if (heroBg && !prefersReducedMotion) heroBg.style.transform = `translateY(${window.scrollY * 0.18}px)`;
}, { passive: true });

/* ============ TILT EN TARJETAS ============ */
$$(".pcard").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (prefersReducedMotion) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", () => (card.style.transform = ""));
});

/* ============ LINKS DE CONTACTO ============ */
function wireLinks() {
  const msgNav = "Hola, quiero pedir Raicilla Hnos. Arrizón. ¿Me pueden dar información?";
  const msgFloat = "Hola, quiero información sobre Raicilla Hnos. Arrizón.";
  const msgTour = "Hola, me gustaría reservar una visita y tour en la Taberna La Vieja.";

  const set = (id, href) => { const el = $("#" + id); if (el) el.href = href; };

  set("waNav", wa(msgNav));
  set("floatWa", wa(msgFloat));
  set("reservarWa", wa(msgTour));
  set("waLink", wa("Hola, quiero pedir Raicilla Hnos. Arrizón."));
  set("faqWa", wa("Hola, quiero pedir Raicilla Hnos. Arrizón. ¿Cómo puedo comprar?"));
  set("mapLink", CONTACT.mapLink);
  set("waLinkTour", waTour("Hola, me gustaría reservar una visita y tour en la Taberna La Vieja."));
  set("mailLink", `mailto:${CONTACT.email}?subject=${encodeURIComponent("Información sobre Raicilla Hnos. Arrizón")}`);
  set("reservarMail", `mailto:${CONTACT.email}?subject=${encodeURIComponent("Reserva de visita · Taberna La Vieja")}`);
  set("fbLink", CONTACT.facebook);
  set("igLink", CONTACT.instagram);
  set("ttLink", CONTACT.tiktok);
  set("fbLink2", CONTACT.facebook);
  set("igLink2", CONTACT.instagram);
  set("ttLink2", CONTACT.tiktok);
  set("footerWa", wa("Hola, quiero pedir Raicilla Hnos. Arrizón."));
  set("footerWa2", wa("Hola, quiero pedir Raicilla Hnos. Arrizón."));
  set("footerTel", waTour("Hola, me gustaría reservar una visita y tour en la Taberna La Vieja."));
  set("footerMail", `mailto:${CONTACT.email}?subject=${encodeURIComponent("Información sobre Raicilla Hnos. Arrizón")}`);
  set("footerMap", CONTACT.mapLink);
}
wireLinks();

/* Botones "Compartir por WhatsApp" de cada producto */
$$(".wa-share").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".shopcard");
    const p = PRODUCTOS[card?.dataset.slug];
    let msg;
    if (p) {
      msg = `Te comparto ${p.nombre} (${p.formato}) de Raicilla Hnos. Arrizón — raicilla artesanal de la Sierra de La Vieja, Mascota, Jalisco. Detalles: https://arrizon.mx/productos.html`;
    } else {
      const heading = card?.querySelector("h3");
      const label = heading ? heading.textContent.trim().replace(/\s+/g, " ") : "producto";
      msg = `Te comparto ${label} de Raicilla Hnos. Arrizón. Detalles: https://arrizon.mx/productos.html`;
    }
    window.open(waShare(msg), "_blank", "noopener");
  });
});

/* Botones "Pedir por WhatsApp" de cada producto */
$$(".wa-order").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".pcard, .catrow, .punch, .prow, .mosaic__item, .pmenu__item, .shopcard");
    const heading = card ? card.querySelector("h3, h4") : null;
    let label = "producto";
    if (heading) {
      const clone = heading.cloneNode(true);
      clone.querySelector(".pmenu__tag")?.remove();
      label = clone.textContent.trim().replace(/\s+/g, " ") || "producto";
    }
    window.open(wa(`Hola, me interesa cotizar: ${label} de Raicilla Hnos. Arrizón. ¿Me pueden dar más información?`), "_blank");
  });
});

/* ============ MODAL DE PRODUCTO (foto + ficha) ============ */
const PRODUCTOS = {
  "blanco-750": {
    nombre: "Raicilla Blanco", formato: "750 ml · 40% Alc. Vol.", tag: "Clásica", precio: 350,
    img: "images/productos/raicilla_normal-cutout.webp",
    desc: "Nuestra raicilla insignia. 100% agave maximiliana de la sierra, destilada a mano en la Taberna La Vieja.",
    notas: [
      ["Vista", "Cristalino, brillante"],
      ["Nariz", "Agave cocido, cítricos, amaderado y hierbas de la sierra"],
      ["Boca", "Frutal, ahumado sutil, , untuoso; retrogusto largo y agradable"],
    ],
    chips: ["40% Alc. Vol.", "Mascota, Jalisco", "Una destilación"],
  },



  "madurada": {
    nombre: "Madurada en Vidrio", formato: "750 ml · 40% Alc. Vol.", tag: "Edición especial", precio: 500,
    img: "images/productos/madurado-cutout.webp",
    desc: "Reposa en vidrio durante más de 1 año: la maduración suaviza y redondea el destilado. ",
    notas: [
      ["Vista", "Cristalino, brillante"],
      ["Nariz", "Agave cocido, cítricos, amaderado y frutal"],
      ["Boca", "Redonda, suave, con un toque dulce y elegante final"],
    ],
    chips: ["40% Alc. Vol.", "+1 año en vidrio"],
  },





  "blanco-250": {
    nombre: "Raicilla Blanco", formato: "250 ml · 40% Alc. Vol.", tag: "Degustación", precio: 150,
    img: "images/productos/pachita-cutout.webp",
    desc: "El mismo carácter de la sierra en formato viaje y degustación. Ideal para regalar, probar o llevar contigo.",
    notas: [
      ["Vista", "Cristalino, brillante"],
      ["Nariz", "Agave cocido, cítricos, amaderado y hierbas de la sierra"],
      ["Boca", "Frutal,  ahumado sutil, mineral, untuoso; retrogusto largo y agradable"],
    ],
    chips: ["40% Alc. Vol.", "Formato 250 ml"],
  },
  "ponche-jamaica": {
    nombre: "Ponche de Jamaica", formato: "Artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/jamaica-cutout.webp",
    desc: "Flor de jamaica con raicilla; ácida, refrescante y profunda.",
    notas: [
      ["Sabor", "Floral, ácida y refrescante"],
      ["Maridaje", "Cítricos y postres ligeros"],
    ],
    chips: ["Raicilla + jamaica", "Artesanal"],
  },
  "ponche-mango": {
    nombre: "Ponche de Mango", formato: "Artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/mango-cutout.webp",
    desc: "Mango verde; tropical y de trago largo. ",
    notas: [
      ["Sabor", "Tropical"],
      ["Maridaje", "Mango, chile y sal"],
    ],
    chips: ["Raicilla + mango", "Artesanal"],
  },
  "ponche-tamarindo": {
    nombre: "Ponche de Tamarindo", formato: "Artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/tamarindo-cutout.webp",
    desc: "Tamarindo agrio-dulce; cuerpo medio y carácter generoso.",
    notas: [
      ["Sabor", "Agrio-dulce, cuerpo medio"],
      ["Maridaje", "Comida picante y mariscos"],
    ],
    chips: ["Raicilla + tamarindo", "Artesanal"],
  },
  "ponche-maracuya": {
    nombre: "Ponche de Maracuyá", formato: "Artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/maracuya-cutout.webp",
    desc: "Maracuyá silvestre; cítrico y vibrante",
    notas: [
      ["Sabor", "Cítrico y vibrante"],
      ["Maridaje", "Mariscos y ensaladas"],
    ],
    chips: ["Raicilla + maracuyá", "Artesanal"],
  },
  "licor-cafe": {
    nombre: "Licor de Café", formato: "Artesanal", tag: "Especial", precio: 250,
    img: "images/productos/cafe-cutout.webp",
    desc: "Café de altura de la región; tostado, cálido y con cuerpo. Perfecto para la sobremesa.",
    notas: [
      ["Sabor", "Tostado y cálido"],
      ["Maridaje", "Postres y sobremesa"],
    ],
    chips: ["Café de la región", "Artesanal"],
  },
  "ponche-arrayan": {
    nombre: "Ponche de Arrayán", formato: "Artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/arrayan-cutout.webp",
    desc: "Arrayán cítrico, herbal, agridulce y de carácter único. ",
    notas: [
      ["Sabor", " cítrico, herbal, agridulce"],
      ["Maridaje", "Quesos y frutas secas"],
    ],
    chips: ["Raicilla + arrayán", "Artesanal"],
  },
  "ponche-guayaba-agria": {
    nombre: "Ponche de Guayaba Agria", formato: "Artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/guayaba-agria-cutout.webp",
    desc: "Guayaba agria de la región; ácida, aromática y refrescante.",
    notas: [
      ["Sabor", "Ácida y aromática"],
      ["Maridaje", "Comida picante y cítricos"],
    ],
    chips: ["Raicilla + guayaba agria", "Artesanal"],
  },
  "ponche-limon": {
    nombre: "Ponche de Limón", formato: "Artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/limon-cutout.webp",
    desc: "Limón amarillo; cítrico, brillante y vibrante en nariz y boca.",
    notas: [
      ["Sabor", "Cítrico y brillante"],
      ["Maridaje", "Mariscos y ensaladas"],
    ],
    chips: ["Raicilla + limón", "Artesanal"],
  },
  "ponche-membrillo": {
    nombre: "Ponche de Membrillo", formato: "Artesanal", tag: "Frutal", precio: 250,
    img: "images/productos/membrillo-cutout.webp",
    desc: "Membrillo maduro; dulce, floral y de cuerpo generoso.",
    notas: [
      ["Sabor", "Dulce y floral"],
      ["Maridaje", "Postres y quesos"],
    ],
    chips: ["Raicilla + membrillo", "Artesanal"],
  },
};

const shopModal = $("#shopModal");
if (shopModal) {
  const mImg = $("#modalImg");
  const mTag = $("#modalTag");
  const mName = $("#modalName");
  const mPrice = $("#modalPrice");
  const mFormat = $("#modalFormat");
  const mDesc = $("#modalDesc");
  const mNotes = $("#modalNotes");
  const mChips = $("#modalChips");
  const mWa = $("#modalWa");

  mImg.addEventListener("error", () => { if (!mImg.dataset.fallback) { mImg.dataset.fallback = "1"; mImg.src = "images/productos/raicilla_normal-cutout.png"; } });

  const openShopModal = (slug) => {
    const p = PRODUCTOS[slug];
    if (!p) return;
    mImg.src = p.img;
    mImg.alt = `${p.nombre} ${p.formato}`;
    mTag.textContent = p.tag;
    mName.textContent = p.nombre;
    mPrice.innerHTML = `$${p.precio} <small>MXN</small>`;
    mFormat.textContent = p.formato;
    mDesc.textContent = p.desc;
    mNotes.innerHTML = p.notas.map(([k, v]) => `<li><strong>${k}</strong><span>${v}</span></li>`).join("");
    mChips.innerHTML = p.chips.map((c) => `<span>${c}</span>`).join("");
    mWa.href = wa(`Hola, me interesa cotizar: ${p.nombre} ${p.formato.split(" · ")[0]} de Raicilla Hnos. Arrizón. ¿Me pueden dar más información?`);
    shopModal.classList.add("is-open");
    lockScroll(true);
    mImg.focus?.();
  };

  const closeShopModal = () => {
    shopModal.classList.remove("is-open");
    lockScroll(false);
  };

  $$(".shopcard__open, .shopcard__details").forEach((el) =>
    el.addEventListener("click", () => openShopModal(el.dataset.slug || el.closest(".shopcard")?.dataset.slug))
  );
  $$("[data-close]", shopModal).forEach((el) => el.addEventListener("click", closeShopModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && shopModal.classList.contains("is-open")) closeShopModal();
  });
}

/* ============ AÑO ============ */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============ PROCESO: navegación de pasos + scrollspy + video ============ */
const stepNav = $("#stepNav");
const stepsFlow = $("#stepsFlow");
if (stepNav && stepsFlow) {
  const stepItems = $$(".steps-nav__item", stepNav);
  const steps = $$(".step", stepsFlow);

  const centerNav = (nav, item) => {
    if (!item) return;
    const iRect = item.getBoundingClientRect();
    const nRect = nav.getBoundingClientRect();
    const left = nav.scrollLeft + (iRect.left - nRect.left) - (nRect.width - iRect.width) / 2;
    nav.scrollTo({ left, behavior: "smooth" });
  };

  /* Click en la píldora → desplaza hasta el paso */
  stepItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = $("#step-" + btn.dataset.step, stepsFlow);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  /* Scrollspy: resalta el paso visible */
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const n = e.target.id.replace("step-", "");
      stepItems.forEach((b) => {
        const active = b.dataset.step === n;
        b.classList.toggle("is-active", active);
        if (active) centerNav(stepNav, b);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  steps.forEach((s) => spy.observe(s));

  /* Video por paso: el slot ▶ se activa solo si el paso define data-video.
     Lazy-load: el <video> se crea recién cuando el paso se acerca al viewport
     (IntersectionObserver), así la carga inicial no transfiere bytes de video. */
  steps.forEach((step) => {
    const media = $(".step__media", step);
    const slot = $(".step__video-slot", media);
    const src = step.dataset.video;
    if (!slot || !src) return;

    let video = null;

    const build = () => {
      if (video) return;
      const posterImg = $(".step__media-img img", media);
      video = document.createElement("video");
      video.src = src;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.poster = posterImg ? posterImg.currentSrc || posterImg.src : "";
      slot.append(video);
      slot.classList.add("is-ready");

      /* Preview real: extrae un frame del video como poster */
      const grabFrame = () => {
        if (!video.videoWidth) return;
        try {
          const grab = () => {
            try {
              const c = document.createElement("canvas");
              c.width = video.videoWidth;
              c.height = video.videoHeight;
              c.getContext("2d").drawImage(video, 0, 0, c.width, c.height);
              video.poster = c.toDataURL("image/jpeg", 0.72);
            } catch (e) { /* conserva la foto del paso */ }
            video.removeEventListener("seeked", grab);
          };
          video.addEventListener("seeked", grab);
          video.currentTime = 0.1;
        } catch (e) { /* conserva la foto del paso */ }
      };
      video.addEventListener("loadedmetadata", grabFrame);

      const play = () => {
        video.play().catch(() => {});
        slot.classList.add("is-playing");
      };
      const close = () => {
        video.pause();
        video.currentTime = 0;
        slot.classList.remove("is-playing");
      };
      video.addEventListener("click", () => { video.paused ? play() : close(); });
      video.addEventListener("ended", close);
      /* Si el video no puede cargarse, oculta el slot y deja la foto del paso */
      video.addEventListener("error", () => {
        video.remove();
        slot.classList.remove("is-ready", "is-playing");
        slot.style.display = "none";
      });
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            build();
            io.disconnect();
          }
        });
      }, { rootMargin: "450px 0px" });
      io.observe(media);
    } else {
      build();
    }
  });
}

/* ============ BUSCADOR DE PRODUCTOS ============ */
(function () {
  if (!document.body.classList.contains("page-productos")) return;
  const input = $("#productSearch");
  if (!input) return;
  const clear = $("#searchClear");
  const groups = $$(".shopgroup");
  const cards = $$(".shopcard[data-slug]");
  const empty = document.createElement("p");
  empty.className = "psearch__empty";
  empty.textContent = "No encontramos productos con ese nombre. Prueba con otro término.";
  $(".products .container").append(empty);

  const normalize = (s) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  function apply() {
    const q = normalize(input.value);
    let any = false;
    cards.forEach((card) => {
      const key = normalize((card.dataset.slug + " " + (card.querySelector("h3")?.textContent || "")).replace(/-/g, " "));
      const show = !q || key.includes(q);
      card.classList.toggle("is-hidden", !show);
      card.hidden = !show;
      if (show) any = true;
    });
    groups.forEach((g) => {
      const visibles = g.querySelectorAll(".shopcard[data-slug]:not([hidden])").length;
      g.classList.toggle("is-hidden", visibles === 0);
      g.hidden = visibles === 0;
    });
    empty.hidden = any;
    empty.classList.toggle("is-visible", !any);
    input.parentElement.classList.toggle("has-text", input.value.length > 0);
  }

  input.addEventListener("input", apply);
  clear.addEventListener("click", () => {
    input.value = "";
    apply();
    input.focus();
  });
  apply();
})();
