'use strict';

/* ------------------------------------------------------------------
   Theme toggle (light  <->  dark), persisted in localStorage.
   The initial theme is set by an inline script in <head> to avoid a
   flash; here we just keep the button icon in sync and handle clicks.
   ------------------------------------------------------------------ */
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = toggle ? toggle.querySelector('i') : null;

  function syncIcon() {
    if (!icon) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    // Show the icon for the theme you'd switch TO.
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  if (toggle) {
    syncIcon();
    toggle.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
      syncIcon();
    });
  }
})();

/* ------------------------------------------------------------------
   Navbar shadow once the page is scrolled.
   ------------------------------------------------------------------ */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = function () {
    nav.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ------------------------------------------------------------------
   Render the project gallery from projects.json.
   ------------------------------------------------------------------ */
(function () {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  const escapeAttr = (s) => String(s).replace(/"/g, '&quot;');

  function cardHTML(p) {
    const badge = p.live
      ? '<span class="badge"><span class="dot"></span> Live</span>'
      : '';

    const tags = Array.isArray(p.tags) && p.tags.length
      ? '<div class="project-tags">' + p.tags.map((t) => `<span>${t}</span>`).join('') + '</div>'
      : '';

    const demo = p.link
      ? `<a href="${escapeAttr(p.link)}" target="_blank" rel="noopener">
           <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${p.live ? 'Visit site' : 'Demo'}
         </a>`
      : '';

    const source = p.source
      ? `<a href="${escapeAttr(p.source)}" target="_blank" rel="noopener">
           <i class="fab fa-github" aria-hidden="true"></i> Source
         </a>`
      : '';

    return `
      <article class="project-card">
        <div class="project-thumb">
          ${badge}
          <img src="./images/${escapeAttr(p.img)}" alt="${escapeAttr(p.name)} screenshot" loading="lazy" />
        </div>
        <div class="project-body">
          <h3>${p.name}</h3>
          <p class="project-desc">${p.description || ''}</p>
          ${tags}
          <div class="project-links">${demo}${source}</div>
        </div>
      </article>`;
  }

  fetch('projects.json')
    .then((res) => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then((projects) => {
      // Featured projects float to the front, order preserved otherwise.
      const ordered = projects
        .map((p, i) => ({ p, i }))
        .sort((a, b) => (b.p.featured ? 1 : 0) - (a.p.featured ? 1 : 0) || a.i - b.i)
        .map((x) => x.p);
      container.innerHTML = ordered.map(cardHTML).join('');
    })
    .catch((err) => {
      console.error('Could not load projects.json:', err);
      container.innerHTML =
        '<p style="text-align:center">Projects are taking a break. Browse them on ' +
        '<a href="https://github.com/Yujiman85?tab=repositories">GitHub</a>.</p>';
    });
})();

/* ------------------------------------------------------------------
   Footer year.
   ------------------------------------------------------------------ */
(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
