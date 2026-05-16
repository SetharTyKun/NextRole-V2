class SiteNavbar extends HTMLElement {
  connectedCallback() {
    const links = [
      { href: '/index.html', label: 'Home' },
      { href: '/pages/job.html', label: 'Jobs' },
      { href: '/pages/media.html', label: 'Media' },
      { href: '/pages/cv-builder.html', label: 'CV Builder' },
      { href: '/pages/about.html', label: 'About Us' },
      { href: '/pages/contact.html', label: 'Contact Us' },
    ];

    const navLinks = links.map(({ href, label }) => {
      const isActive = window.location.pathname === href;
      const activeClass = isActive
        ? 'text-primary bg-violet-light'
        : 'text-muted hover:text-primary hover:bg-violet-light';
      return `<a href="${href}" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeClass}">${label}</a>`;
    }).join('');

    let session = null;
    try { session = JSON.parse(localStorage.getItem('nextrole_session')); } catch {}

    let authSection;
    if (session) {
      const initials = session.name
        .split(' ')
        .filter(Boolean)
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      const roleLabel = session.role === 'employer' ? 'Employer' : 'Candidate';

      authSection = `
        <div class="relative" id="nr-profile-menu">
          <button id="nr-profile-btn"
            class="w-9 h-9 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center cursor-pointer hover:brightness-90 transition-all select-none">
            ${initials}
          </button>
          <div id="nr-profile-dropdown"
            class="absolute right-0 top-12 w-60 bg-white rounded-2xl shadow-xl border border-border z-50 overflow-hidden hidden">
            <div class="p-4 border-b border-border">
              <p class="font-bold text-secondary text-sm truncate">${session.name}</p>
              <p class="text-xs text-muted truncate">${session.email}</p>
              <span class="inline-block mt-1.5 text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">${roleLabel}</span>
            </div>
            <div class="p-2">
              <button id="nr-logout-btn"
                class="w-full text-left px-3 py-2.5 text-sm font-semibold text-red-500 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      authSection = `
        <a href="/pages/login.html">
          <button class="px-5 py-2 cursor-pointer rounded-lg bg-primary text-white text-sm font-semibold hover:brightness-90 hover:scale-105 transition-all duration-75">Login</button>
        </a>
      `;
    }

    this.innerHTML = `
      <nav class="sticky top-0 z-100 bg-white border-b border-border px-10 flex items-center gap-8 h-16 justify-between">

        <div class="flex items-center gap-2 text-[18px] font-extrabold text-secondary">
          <a href="/index.html" class="flex gap-2">
            <img src="/asset/logo.svg" alt="NextRole" width="28" height="28"
              class="w-7 h-7 hover:scale-110 hover:origin-center hover:rotate-90 transition-all duration-75 cursor-pointer"/>
            <p class="text-secondary">Next Role</p>
          </a>
        </div>

        <div class="flex gap-1">${navLinks}</div>

        <div class="flex justify-center items-center">${authSection}</div>

      </nav>
    `;

    if (session) {
      const btn = this.querySelector('#nr-profile-btn');
      const dropdown = this.querySelector('#nr-profile-dropdown');
      const logoutBtn = this.querySelector('#nr-logout-btn');
      const menu = this.querySelector('#nr-profile-menu');

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('nextrole_session');
        window.location.href = '/index.html';
      });

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });
    }
  }
}

customElements.define('site-navbar', SiteNavbar);
