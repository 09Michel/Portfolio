document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector('.editorial-hero');
    if (hero) setTimeout(() => hero.classList.add('active'), 100);

    const reveal = () => {
        const items = document.querySelectorAll('.split-section, .full-section, .gallery-item');
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                item.classList.add('active');
            }
        });
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.querySelector(".scroll-progress").style.width = scrollPercent + "%";
    };

    let lastScrollY = window.scrollY;
    const nav = document.querySelector('.editorial-nav');

    const handleScrollNav = () => {
        if (!nav) return;
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", () => {
        reveal();
        handleScrollNav();
    });
    reveal();
    handleScrollNav();
});

function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Gallery modal functions
function openGallery(projectName) {
    const gallery = document.getElementById('gallery-modal');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryImages = document.getElementById('gallery-images');

    galleryTitle.textContent = projectName;

    // Sample gallery images - you can customize these per project
    const galleries = {
        'TrueGreen Nurseries': ['images/truegreen1.png', 'images/truegreen2.png', 'images/truegreen3.png', 'images/truegreen4.png', 'images/truegreen5.png', 'images/truegreen6.png'],
        'Junior League of Nairobi': ['images/jln1.png', 'images/jln2.png', 'images/jln3.png', 'images/jln4.png', 'images/jln5.png', 'images/jln6.png'],
        'Institute of Design and Innovation': ['images/idi1.png', 'images/idi2.png', 'images/idi3.png']
    };

    const images = galleries[projectName] || [];
    galleryImages.innerHTML = images.map((img, idx) =>
        `<div class="gallery-modal-item" style="background-image: url('${img}');"></div>`
    ).join('');

    gallery.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    document.getElementById('gallery-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}