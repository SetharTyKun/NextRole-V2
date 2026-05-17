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

    // Mobile drawer links (full-width, with separator lines)
    const mobileNavLinks = links.map(({ href, label }) => {
      const isActive = window.location.pathname === href;
      const activeClass = isActive ? 'text-primary font-semibold' : 'text-secondary';
      return `
        <a href="${href}" class="flex items-center justify-between px-6 py-4 border-b border-gray-100 text-[15px] ${activeClass} hover:text-primary transition-colors">
          ${label}
        </a>
      `;
    }).join('');

    let session = null;
    try { session = JSON.parse(localStorage.getItem('nextrole_session')); } catch {}

    let authSection;
    let mobileAuthSection;

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

      mobileAuthSection = `
        <div class="px-6 py-4 border-t border-gray-100 mt-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center select-none">${initials}</div>
            <div>
              <p class="font-bold text-secondary text-sm">${session.name}</p>
              <p class="text-xs text-muted">${session.email}</p>
              <span class="inline-block mt-0.5 text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">${roleLabel}</span>
            </div>
          </div>
          <button id="nr-mobile-logout-btn"
            class="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-500 rounded-xl border border-red-100 hover:bg-red-50 transition-colors flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      `;
    } else {
      authSection = `
        <a href="/pages/login.html">
          <button class="px-5 py-2 cursor-pointer rounded-lg bg-primary text-white text-sm font-semibold hover:brightness-90 hover:scale-105 transition-all duration-75">Login</button>
        </a>
      `;

      mobileAuthSection = `
        <div class="px-6 py-5 border-t border-gray-100 flex gap-3 mt-2">
          <a href="/pages/login.html" class="flex-1">
            <button class="w-full py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:brightness-90 transition-all">Login</button>
          </a>
          <a href="/pages/register.html" class="flex-1">
            <button class="w-full py-2.5 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-all">Register</button>
          </a>
        </div>
      `;
    }

    this.innerHTML = `
      <!-- Desktop Navbar -->
      <nav class="sticky top-0 z-[100] bg-white border-b border-border px-10 flex items-center gap-8 h-16 justify-between">

        <!-- Logo -->
        <div class="flex items-center gap-2 text-[18px] font-extrabold text-secondary">
          <a href="/index.html" class="flex gap-2">
            <img src="/asset/logo.svg" alt="NextRole" width="28" height="28"
              class="w-7 h-7 hover:scale-110 hover:origin-center hover:rotate-90 transition-all duration-75 cursor-pointer"/>
            <p class="text-secondary">Next Role</p>
          </a>
        </div>

        <!-- Desktop Nav Links (hidden on mobile) -->
        <div class="hidden md:flex gap-1">${navLinks}</div>

        <!-- Desktop Auth (hidden on mobile) -->
        <div class="hidden md:flex justify-center items-center">${authSection}</div>

        <!-- Mobile: hamburger button (visible on mobile only) -->
        <button id="nr-mobile-menu-btn" class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </nav>

      <!-- Mobile Drawer Overlay -->
      <div id="nr-mobile-overlay"
        class="fixed inset-0 bg-black/40 z-[150] hidden opacity-0 transition-opacity duration-300 md:hidden">
      </div>

      <!-- Mobile Drawer Panel -->
      <div id="nr-mobile-drawer"
        class="fixed top-0 left-0 h-full w-[320px] max-w-[85vw] bg-white z-[200] shadow-2xl flex flex-col
               translate-x-[-100%] transition-transform duration-300 ease-in-out md:hidden">

        <!-- Drawer Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <button id="nr-mobile-close-btn" aria-label="Close menu"
            class="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <a href="/index.html" class="flex items-center gap-2">
            <img src="/asset/logo.svg" alt="NextRole" width="24" height="24" class="w-6 h-6"/>
            <span class="text-[16px] font-extrabold text-secondary">Next Role</span>
          </a>
          <div class="w-9"></div><!-- spacer -->
        </div>

        <!-- Drawer Nav Links -->
        <div class="flex-1 overflow-y-auto">
          <nav class="mt-2">
            ${mobileNavLinks}
          </nav>

          <!-- Auth section at bottom of links -->
          ${mobileAuthSection}

          <!-- Follow Us / Social -->
          <div class="px-6 py-5 text-center border-t border-gray-100">
            <p class="text-sm font-bold text-secondary mb-3">Follow Us</p>
            <div class="flex justify-center gap-3">
              <a href="#" class="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-[#0a66c2] flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e1306c] to-[#833ab4] flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    // ── Desktop dropdown logic ──
    if (session) {
      const btn = this.querySelector('#nr-profile-btn');
      const dropdown = this.querySelector('#nr-profile-dropdown');
      const logoutBtn = this.querySelector('#nr-logout-btn');
      const menu = this.querySelector('#nr-profile-menu');

      if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
          if (!menu.contains(e.target)) {
            dropdown.classList.add('hidden');
          }
        });
      }

      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('nextrole_session');
          window.location.href = '/index.html';
        });
      }

      const mobileLogoutBtn = this.querySelector('#nr-mobile-logout-btn');
      if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', () => {
          localStorage.removeItem('nextrole_session');
          window.location.href = '/index.html';
        });
      }
    }

    // ── Mobile drawer logic ──
    const menuBtn = this.querySelector('#nr-mobile-menu-btn');
    const closeBtn = this.querySelector('#nr-mobile-close-btn');
    const overlay = this.querySelector('#nr-mobile-overlay');
    const drawer = this.querySelector('#nr-mobile-drawer');

    const openDrawer = () => {
      overlay.classList.remove('hidden');
      // Force reflow so transition fires
      requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        drawer.classList.remove('translate-x-[-100%]');
        drawer.classList.add('translate-x-0');
      });
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0');
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('translate-x-[-100%]');
      document.body.style.overflow = '';
      setTimeout(() => {
        overlay.classList.add('hidden');
      }, 300);
    };

    menuBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }
}

customElements.define('site-navbar', SiteNavbar);