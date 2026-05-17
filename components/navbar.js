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

    const mobileNavLinks = links.map(({ href, label }) => {
      const isActive = window.location.pathname === href;
      const activeClass = isActive
        ? 'text-primary bg-violet-light'
        : 'text-muted hover:text-primary hover:bg-violet-light';
      return `<a href="${href}" class="block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${activeClass}">${label}</a>`;
    }).join('');

    let session = null;
    try { session = JSON.parse(localStorage.getItem('nextrole_session')); } catch {}

    let desktopAuthSection;
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

      desktopAuthSection = `
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
        <div class="flex items-center justify-between px-3 py-3 border-t border-border mt-1">
          <div>
            <p class="font-bold text-secondary text-sm">${session.name}</p>
            <p class="text-xs text-muted">${session.email}</p>
            <span class="inline-block mt-1 text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">${roleLabel}</span>
          </div>
          <button id="nr-mobile-logout-btn"
            class="px-3 py-2 text-sm font-semibold text-red-500 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      `;
    } else {
      desktopAuthSection = `
        <a href="/pages/login.html">
          <button class="px-5 py-2 cursor-pointer rounded-lg bg-primary text-white text-sm font-semibold hover:brightness-90 hover:scale-105 transition-all duration-75">Login</button>
        </a>
      `;

      mobileAuthSection = `
        <div class="px-3 py-3 border-t border-border mt-1">
          <a href="/pages/login.html">
            <button class="w-full px-5 py-2.5 cursor-pointer rounded-lg bg-primary text-white text-sm font-semibold hover:brightness-90 transition-all">Login</button>
          </a>
        </div>
      `;
    }

    this.innerHTML = `
      <nav class="sticky top-0 z-100 bg-white border-b border-border px-4 lg:px-10 flex items-center h-16 justify-between">

        <div class="flex items-center gap-2 text-[18px] font-extrabold text-secondary">
          <a href="/index.html" class="flex gap-2">
            <img src="/asset/logo.svg" alt="NextRole" width="28" height="28"
              class="w-7 h-7 hover:scale-110 hover:origin-center hover:rotate-90 transition-all duration-75 cursor-pointer"/>
            <p class="text-secondary">Next Role</p>
          </a>
        </div>

        <div class="hidden lg:flex gap-1">${navLinks}</div>

        <div class="flex items-center gap-3">
          <div class="hidden lg:flex justify-center items-center">${desktopAuthSection}</div>

          <button id="nr-hamburger" class="lg:hidden flex flex-col gap-[5px] p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
            <span class="block w-5 h-0.5 bg-secondary transition-all duration-300 origin-center" id="nr-ham-line1"></span>
            <span class="block w-5 h-0.5 bg-secondary transition-all duration-300" id="nr-ham-line2"></span>
            <span class="block w-5 h-0.5 bg-secondary transition-all duration-300 origin-center" id="nr-ham-line3"></span>
          </button>
        </div>

      </nav>

      <div id="nr-mobile-menu" class="hidden fixed top-16 left-0 right-0 z-99 bg-white border-b border-border shadow-lg lg:hidden">
        <div class="flex flex-col px-4 pt-3 pb-1 gap-0.5">
          ${mobileNavLinks}
        </div>
        ${mobileAuthSection}
      </div>
    `;

    if (session) {
      const btn = this.querySelector('#nr-profile-btn');
      const dropdown = this.querySelector('#nr-profile-dropdown');
      const logoutBtn = this.querySelector('#nr-logout-btn');
      const menu = this.querySelector('#nr-profile-menu');
      const mobileLogoutBtn = this.querySelector('#nr-mobile-logout-btn');

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      const handleLogout = () => {
        localStorage.removeItem('nextrole_session');
        window.location.href = '/index.html';
      };

      logoutBtn.addEventListener('click', handleLogout);
      if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });
    }

    const hamburger = this.querySelector('#nr-hamburger');
    const mobileMenu = this.querySelector('#nr-mobile-menu');
    const line1 = this.querySelector('#nr-ham-line1');
    const line2 = this.querySelector('#nr-ham-line2');
    const line3 = this.querySelector('#nr-ham-line3');

    hamburger.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');

      if (!isOpen) {
        line1.style.transform = 'translateY(7px) rotate(45deg)';
        line2.style.opacity = '0';
        line3.style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        line1.style.transform = '';
        line2.style.opacity = '';
        line3.style.transform = '';
      }
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        line1.style.transform = '';
        line2.style.opacity = '';
        line3.style.transform = '';
      }
    });
  }
}

customElements.define('site-navbar', SiteNavbar);
