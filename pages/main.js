window.handleApplyNow = function (jobTitle) {
    const existing = document.getElementById('apply-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'apply-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(2rem);
        background: #22C55E;
        color: #fff;
        padding: 1rem 1.75rem;
        border-radius: 1rem;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 800;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 8px 32px rgba(34,197,94,0.35);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 9999;
        white-space: nowrap;
    `;
    toast.innerHTML = `
        <span style="font-size:1.4rem;">✓</span>
        Application submitted! We'll be in touch soon.
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(2rem)';
        setTimeout(() => toast.remove(), 350);
    }, 3500);
};
