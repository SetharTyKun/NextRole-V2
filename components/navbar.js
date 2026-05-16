// /components/navbar.js
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
      const currentPath = window.location.pathname;
      const isActive = currentPath === href || (currentPath === '/' && href === '/index.html');
      const activeClass = isActive
        ? 'text-primary bg-violet-light'
        : 'text-muted hover:text-primary hover:bg-violet-light';
      return `<a href="${href}" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeClass}">${label}</a>`;
    }).join('');

    const currentUser = JSON.parse(localStorage.getItem('nextrole_current_user') || 'null');
    const isLoggedIn = !!currentUser || localStorage.getItem('isLoggedIn') === 'true';

    const authSection = isLoggedIn 
      ? `
        <div class="flex items-center gap-3 ml-1">
          <div class="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border-2 border-primary/20 shadow-sm text-[15px]">
            ${currentUser && currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <button id="logout-btn" class="px-4 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer">
            Logout
          </button>
        </div>
      `
      : `
        <a href="/pages/login.html">
          <button class="px-5 py-2 cursor-pointer rounded-lg bg-primary text-white text-sm font-semibold hover:brightness-90 hover:scale-105 transition-all duration-75">Login</button>
        </a>
      `;

    this.innerHTML = `
      <nav class="sticky top-0 z-100 bg-white border-b border-border px-10 flex items-center gap-8 h-16 justify-between">

        <div class="flex items-center gap-2 text-[18px] font-extrabold text-secondary">
          <a href="/index.html" class="flex gap-2 items-center" style="text-decoration: none;">
            <img src="/asset/logo.svg" alt="NextRole" width="28" height="28"
              class="w-7 h-7 hover:scale-110 hover:origin-center hover:rotate-90 transition-all duration-75 cursor-pointer"/>
            <p class="text-secondary" style="font-family: 'Plus Jakarta Sans', sans-serif; margin: 0;">Next Role</p>
          </a>
        </div>

        <div class="flex gap-1">${navLinks}</div>

        <div class="flex justify-center items-center">
          ${authSection}
        </div>

      </nav>
    `;

    if (isLoggedIn) {
      const logoutBtn = this.querySelector('#logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('nextrole_current_user');
          localStorage.removeItem('isLoggedIn');
          window.location.reload();
        });
      }
    }
  }
}

customElements.define('site-navbar', SiteNavbar);