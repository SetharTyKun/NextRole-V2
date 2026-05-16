function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    const lb = document.getElementById('lightbox');
    lb.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Close on background click
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});