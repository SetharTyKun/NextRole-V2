
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fields = ['fullName', 'email', 'subject', 'message'];
    let valid = true;

    fields.forEach(id => {
        const input = document.getElementById(id);
        const error = document.getElementById(id + '-error');
        if (!input.value.trim()) {
            input.classList.add('error');
            error.style.display = 'block';
            valid = false;
        } else {
            input.classList.remove('error');
            error.style.display = 'none';
        }
    });

    if (valid) {
        alert('Message sent successfully!');
        this.reset();
    }
});

// Clear error on input
['fullName', 'email', 'subject', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        this.classList.remove('error');
        document.getElementById(id + '-error').style.display = 'none';
    });
});