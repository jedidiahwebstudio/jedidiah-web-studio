//Generate script.js for kente-luxe
js_content = """//Lightbox Modal Functionality for Kente Luxe
document.addEventListener('DOMContentLoaded', () => {
    // Create Lightbox DOM Elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="Full view image">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const overlay = lightbox.querySelector('.lightbox-overlay');

    // Target all product and lookbook images
    const galleryImages = document.querySelectorAll('.product-img, .gallery-item img');

    galleryImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || 'Kente Luxe Collection';
            
            lightboxImg.setAttribute('src', src);
            lightboxCaption.textContent = alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Modal Events
    const closeModal = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeModal();
        }
    });
});
"""

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("script.js generated successfully.")<!-- Lightbox Script -->
    <script src="script.js"></script>
</body>
</html>