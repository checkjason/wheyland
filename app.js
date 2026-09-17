/* ============================================================
   In Loving Memory of Vanessa Wheyland — page logic
   Reads everything from config.js (window.SITE). No build step.
   ============================================================ */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function isUrl(u) { return typeof u === "string" && /^https?:\/\//i.test(u.trim()); }
  function show(el, on) { if (el) el.hidden = !on; }

  /* ---------- Hero / names ---------- */
  var name = S.name || "Vanessa Wheyland";
  document.title = "In Loving Memory of " + name;
  $("heroName").textContent = name;
  $("footerName").textContent = name;
  if (S.dates) { $("heroDates").textContent = S.dates; show($("heroDates"), true); }
  $("heroTagline").textContent = S.tagline || "";
  if (S.heroPhoto) {
    var fig = $("heroPhoto");
    fig.classList.add("has-photo");
    fig.innerHTML = '<div class="hero__rays" aria-hidden="true"></div><div class="hero__rays hero__rays--2" aria-hidden="true"></div><img src="' + esc(S.heroPhoto) + '" alt="' + esc(name) + '">';
    // soft blurred echo of the portrait in the sky behind the content
    var echo = document.createElement("img");
    echo.className = "hero__echo"; echo.src = S.heroPhoto; echo.alt = ""; echo.setAttribute("aria-hidden", "true");
    var hero = document.querySelector(".hero");
    hero.insertBefore(echo, document.querySelector(".hero__waves"));
  }

  if (S.heroBackground) {
    var bg = $("heroBg");
    bg.style.backgroundImage = 'url("' + S.heroBackground.replace(/"/g, "%22") + '")';
    document.querySelector(".hero").classList.add("has-bg");
  }

  /* ---------- Drifting motes of light ---------- */
  (function motes() {
    var wrap = document.createElement("div"); wrap.className = "motes"; wrap.setAttribute("aria-hidden", "true");
    var html = "";
    for (var i = 0; i < 26; i++) {
      var left = Math.random() * 100, size = 3 + Math.random() * 5, dur = 14 + Math.random() * 16, delay = -Math.random() * 30, dx = (Math.random() * 120 - 60).toFixed(0);
      html += '<span class="mote" style="left:' + left.toFixed(1) + '%;width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) + 'px;animation-duration:' + dur.toFixed(1) + 's;animation-delay:' + delay.toFixed(1) + 's;--dx:' + dx + 'px"></span>';
    }
    wrap.innerHTML = html;
    document.querySelector(".hero").insertBefore(wrap, document.querySelector(".hero__content"));
  })();

  /* ---------- Candles along the shoreline ---------- */
  (function candles() {
    var wrap = document.querySelector(".candles");
    if (!wrap) return;
    var n = Math.max(14, Math.min(34, Math.round(window.innerWidth / 42)));
    var html = "";
    for (var i = 0; i < n; i++) {
      var left = (i / (n - 1)) * 96 + 2 + (Math.random() * 2 - 1);
      var scale = 0.7 + Math.random() * 0.7;
      var delay = (Math.random() * 1.6).toFixed(2);
      html += '<div class="candle" style="left:' + left.toFixed(2) + '%;transform:scale(' + scale.toFixed(2) + ');opacity:' + (0.55 + scale * 0.3).toFixed(2) + '">' +
              '<div class="flame" style="animation-delay:-' + delay + 's"></div></div>';
    }
    wrap.innerHTML = html;
  })();

  /* ---------- Nav ---------- */
  var nav = $("nav"), toggle = $("navToggle"), links = $("navLinks");
  function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) { if (e.target.tagName === "A") links.classList.remove("is-open"); });

  /* ---------- Events ---------- */
  var ICON = {
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };
  (function events() {
    var list = $("eventsList");
    var evs = Array.isArray(S.events) ? S.events : [];
    if (!evs.length) { list.innerHTML = '<p class="lead lead--center">Details of upcoming gatherings will be posted here.</p>'; return; }
    list.innerHTML = evs.map(function (ev) {
      var meta = "";
      if (ev.date) meta += "<li>" + ICON.cal + "<div><strong>" + esc(ev.date) + "</strong></div></li>";
      if (ev.time) meta += "<li>" + ICON.clock + "<div><strong>" + esc(ev.time) + "</strong></div></li>";
      if (ev.place) meta += "<li>" + ICON.pin + "<div><strong>" + esc(ev.place) + "</strong>" + (ev.address ? "<span>" + esc(ev.address) + "</span>" : "") + "</div></li>";
      var parking = "";
      if (ev.parking) {
        parking = '<div class="event__parking"><div class="event__parking-icon">P</div><div><strong>Parking &amp; shuttle</strong><p>' + esc(ev.parking) + "</p>" +
          (isUrl(ev.parkingMapUrl) ? '<a href="' + esc(ev.parkingMapUrl) + '" target="_blank" rel="noopener">Directions to the shuttle lot</a>' : "") + "</div></div>";
      }
      var actions = "";
      if (isUrl(ev.mapUrl)) actions += '<a class="btn btn--primary" href="' + esc(ev.mapUrl) + '" target="_blank" rel="noopener">Get directions</a>';
      if (ev.flyerPdf) actions += '<a class="btn btn--ghost-dark" href="' + esc(ev.flyerPdf) + '" target="_blank" rel="noopener">Download the flyer</a>';
      var flyer = ev.flyerImage
        ? '<div class="event__flyer"><img src="' + esc(ev.flyerImage) + '" alt="' + esc(ev.title || "Event") + ' flyer">' +
          (ev.flyerPdf ? '<a href="' + esc(ev.flyerPdf) + '" target="_blank" rel="noopener" aria-label="Open flyer"></a><span class="event__flyer-hint">Tap to open</span>' : "") + "</div>"
        : "";
      return '<article class="event reveal">' +
        '<div class="event__body"><h3 class="event__title">' + esc(ev.title || "Gathering") + "</h3>" +
        '<ul class="event__meta">' + meta + "</ul>" +
        (ev.notes ? '<p class="event__notes">' + esc(ev.notes) + "</p>" : "") + parking +
        '<div class="event__actions">' + actions + "</div></div>" + flyer + "</article>";
    }).join("");
  })();

  /* ---------- GoFundMe ---------- */
  if (isUrl(S.gofundmeUrl)) {
    $("giveBtn").href = S.gofundmeUrl.trim();
    $("giveBlurb").textContent = S.gofundmeBlurb || "";
    show($("give"), true); show($("navGive"), true);
    $("heroSupportBtn").href = S.gofundmeUrl.trim(); show($("heroSupport"), true);
  }

  /* ---------- Updates ---------- */
  (function updates() {
    var list = $("updatesList");
    var ups = Array.isArray(S.updates) ? S.updates : [];
    if (!ups.length) { list.innerHTML = '<p class="lead lead--center">Updates from the family will be shared here.</p>'; return; }
    list.innerHTML = ups.map(function (u) {
      return '<article class="update reveal">' +
        (u.date ? '<p class="update__date">' + esc(u.date) + "</p>" : "") +
        (u.title ? '<h3 class="update__title">' + esc(u.title) + "</h3>" : "") +
        (u.text ? "<p>" + esc(u.text).replace(/\n/g, "<br>") + "</p>" : "") + "</article>";
    }).join("");
  })();

  /* ---------- Life story ---------- */
  if (S.lifeStory && S.lifeStory.trim()) {
    $("lifeStory").innerHTML = S.lifeStory.trim().split(/\n\s*\n/).map(function (p) { return "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>"; }).join("");
    show($("life"), true); show($("navLife"), true);
  }

  /* ---------- Gallery ---------- */
  var photos = Array.isArray(S.gallery) ? S.gallery.filter(function (p) { return p && p.src; }) : [];
  (function gallery() {
    if (isUrl(S.photoAlbumUrl)) {
      $("albumBtn").href = S.photoAlbumUrl.trim(); show($("albumBtn"), true);
      $("albumViewBtn").href = S.photoAlbumUrl.trim(); show($("albumViewBtn"), true);
    } else {
      $("galleryIntro").textContent = "Photos of Vanessa shared by family and friends.";
    }
    var grid = $("galleryGrid");
    if (!photos.length) { show($("galleryEmpty"), true); return; }
    grid.innerHTML = photos.map(function (p, i) {
      return '<button class="gallery__item reveal" data-i="' + i + '" type="button"><img src="' + esc(p.src) + '" alt="' + esc(p.caption || name) + '" loading="lazy">' +
        (p.caption ? "<figcaption>" + esc(p.caption) + "</figcaption>" : "") + "</button>";
    }).join("");
    grid.addEventListener("click", function (e) {
      var b = e.target.closest(".gallery__item"); if (b) openLightbox(+b.getAttribute("data-i"));
    });
  })();

  /* ---------- Lightbox ---------- */
  var lb = $("lightbox"), lbImg = $("lightboxImg"), lbCap = $("lightboxCap"), cur = 0;
  function openLightbox(i) { cur = i; renderLb(); show(lb, true); document.body.style.overflow = "hidden"; }
  function closeLightbox() { show(lb, false); document.body.style.overflow = ""; }
  function renderLb() { var p = photos[cur]; lbImg.src = p.src; lbImg.alt = p.caption || name; lbCap.textContent = p.caption || ""; }
  function step(d) { cur = (cur + d + photos.length) % photos.length; renderLb(); }
  $("lightboxClose").addEventListener("click", closeLightbox);
  $("lightboxPrev").addEventListener("click", function () { step(-1); });
  $("lightboxNext").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1);
  });

  /* ---------- Message board ---------- */
  (function messages() {
    var formWrap = $("messageFormWrap"), status = $("messagesStatus"), list = $("messagesList");
    var formUrl = isUrl(S.messageFormUrl) ? S.messageFormUrl.trim() : "";
    var csvUrl = isUrl(S.messageSheetCsvUrl) ? S.messageSheetCsvUrl.trim() : "";

    if (formUrl) {
      var embed = formUrl.replace(/\?.*$/, "") + "?embedded=true";
      formWrap.innerHTML =
        '<iframe src="' + esc(embed) + '" title="Leave a message" loading="lazy">Loading…</iframe>' +
        '<a class="btn btn--ghost-dark" href="' + esc(formUrl) + '" target="_blank" rel="noopener">Open the form in a new tab</a>';
    } else if (S.contactEmail) {
      formWrap.innerHTML = '<p class="muted">You can send a message to the family at <a href="mailto:' + esc(S.contactEmail) + '">' + esc(S.contactEmail) + "</a>.</p>";
    }

    if (!csvUrl) { status.textContent = "Messages from friends and family will appear here."; return; }
    show($("messagesNote"), true);
    status.textContent = "Loading messages…";

    var bust = csvUrl + (csvUrl.indexOf("?") > -1 ? "&" : "?") + "t=" + Date.now();
    fetch(bust, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status); return r.text();
    }).then(function (text) {
      var rows = parseCSV(text);
      if (rows.length < 2) { status.textContent = "Be the first to leave a message."; return; }
      var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
      var find = function (re) { for (var i = 0; i < head.length; i++) if (re.test(head[i])) return i; return -1; };
      var iName = find(/name/), iMsg = find(/message|memory|note|words/), iTime = find(/timestamp|date|time/);
      var iHide = find(/^(hide|hidden|remove|approved|show)$/);
      var hideIsApproved = iHide > -1 && /approved|show/.test(head[iHide]);
      if (iMsg === -1) iMsg = head.length > 2 ? 2 : head.length - 1;

      var items = rows.slice(1).filter(function (r) {
        if (!r[iMsg] || !r[iMsg].trim()) return false;
        if (iHide > -1) {
          var v = (r[iHide] || "").trim().toLowerCase();
          if (hideIsApproved) return v === "yes" || v === "y" || v === "true" || v === "x" || v === "approved";
          return v === "";
        }
        return true;
      }).reverse();

      if (!items.length) { status.textContent = "Be the first to leave a message."; return; }
      status.textContent = items.length + (items.length === 1 ? " message" : " messages") + " of love";
      list.innerHTML = items.map(function (r) {
        var who = iName > -1 && r[iName].trim() ? r[iName].trim() : "A friend";
        return '<article class="message reveal"><p class="message__text">' + esc(r[iMsg].trim()) + "</p>" +
          '<div class="message__meta"><strong>— ' + esc(who) + "</strong><span>" + esc(niceDate(iTime > -1 ? r[iTime] : "")) + "</span></div></article>";
      }).join("");
      observeReveals();
    }).catch(function () {
      status.textContent = "Messages could not be loaded right now. Please try again in a moment.";
    });
  })();

  function niceDate(s) {
    if (!s) return "";
    var d = new Date(s); if (isNaN(d)) return s;
    return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  }

  // RFC-4180-ish CSV parser (handles quoted fields, embedded commas, quotes and newlines)
  function parseCSV(text) {
    var rows = [], row = [], field = "", i = 0, q = false, c;
    text = text.replace(/^﻿/, "");
    while (i < text.length) {
      c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
        else field += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else field += c;
      i++;
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (v) { return v.trim() !== ""; }); });
  }

  /* ---------- Footer contact ---------- */
  if (S.contactEmail) {
    $("footerContact").innerHTML = 'Questions or photos to share? <a href="mailto:' + esc(S.contactEmail) + '">' + esc(S.contactEmail) + "</a>";
    show($("footerContact"), true);
  }

  /* ---------- Reveal on scroll ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 }) : null;
  function observeReveals() {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) { io ? io.observe(el) : el.classList.add("is-visible"); });
  }
  observeReveals();
})();
