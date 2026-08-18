// Kente Luxe Interactive Engine: Lightbox Modal & Category Filtering
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. LIGHTBOX MODAL FUNCTIONALITY
    // ==========================================
    var lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = 
        '<div class="lightbox-overlay"></div>' +
        '<div class="lightbox-content">' +
            '<span class="lightbox-close">&times;</span>' +
            '<img class="lightbox-img" src="" alt="Full view image">' +
            '<div class="lightbox-caption"></div>' +
        '</div>';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('.lightbox-img');
    var lightboxCaption = lightbox.querySelector('.lightbox-caption');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var overlay = lightbox.querySelector('.lightbox-overlay');

    function openLightbox(e) {
        e.preventDefault();
        var src = this.getAttribute('src');
        var alt = this.getAttribute('alt') || 'Kente Luxe Collection';
        
        lightboxImg.setAttribute('src', src);
        lightboxCaption.textContent = alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function bindLightbox() {
        var galleryImages = document.querySelectorAll('.product-img, .gallery-item img');
        galleryImages.forEach(function(img) {
            img.style.cursor = 'zoom-in';
            img.removeEventListener('click', openLightbox);
            img.addEventListener('click', openLightbox);
        });
    }

    function closeModal() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeModal();
        }
    });

    bindLightbox();

    // ==========================================
    // 2. CATEGORY FILTER TABS FUNCTIONALITY
    // ==========================================
    var filterButtons = document.querySelectorAll('.filter-btn');
    var productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Active Tab Switching
            filterButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var filterValue = btn.getAttribute('data-filter');

            productCards.forEach(function(card) {
                var category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(function() {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(function() {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});