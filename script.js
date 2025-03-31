document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation Variables
    const pages = document.querySelectorAll('.page');
    const totalPages = pages.length;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageIndicator = document.getElementById('page-indicator');
    let currentPage = 0;

    // Section Navigation Variables
    const tocItems = document.querySelectorAll('.toc-item');
    const sectionPages = document.querySelectorAll('.section-page');
    const backButtons = document.querySelectorAll('.back-button');
    const contactForm = document.getElementById('contactForm');

    // Initialize page indicators
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => goToPage(i));
        pageIndicator.appendChild(indicator);
    }

    // Initialize first page
    pages[0].classList.add('active');

    // Navigation functions
    function goToPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= totalPages) return;

        pages[currentPage].classList.remove('active');
        document.querySelectorAll('.indicator')[currentPage].classList.remove('active');
        
        currentPage = pageIndex;
        
        pages[currentPage].classList.add('active');
        document.querySelectorAll('.indicator')[currentPage].classList.add('active');
    }

    function nextPage() {
        goToPage(currentPage + 1);
    }

    function prevPage() {
        goToPage(currentPage - 1);
    }

    // Event listeners for navigation
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            prevPage();
        }
    });

    // Wheel navigation (with debounce to prevent rapid scrolling)
    let wheelTimer;
    document.addEventListener('wheel', function(e) {
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
            if (e.deltaY > 0) {
                nextPage();
            } else {
                prevPage();
            }
        }, 100);
    });

    // Section navigation
    tocItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            // Hide all sections first
            sectionPages.forEach(page => page.classList.remove('active'));
            
            // Show the selected section
            section.classList.add('active');
        });
    });

    // Back button functionality
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            sectionPages.forEach(page => page.classList.remove('active'));
        });
    });

    // Contact form submission (prevent default form submission)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            // But for GitHub Pages, you might want to use a service like Formspree
            console.log('Form submission:', { name, email, message });
            
            // Show a thank you message (in a real app)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add hover effects with JavaScript for better mobile support
    const hoverElements = document.querySelectorAll('.toc-item, .work-item, .contact-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            if (this.classList.contains('toc-item')) {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            if (this.classList.contains('toc-item')) {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
});