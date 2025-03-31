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

        // First disable any active section pages
        sectionPages.forEach(page => page.classList.remove('active'));
        
        // Then change the main page
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

    // Disable wheel navigation to fix scrolling issues
    // Instead, only use button/indicator navigation

    // Section navigation - Fixed to properly navigate to the sections page first
    tocItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            // First, go to the sections page (index 3)
            goToPage(3);
            
            // Then show the selected section after a small delay to ensure page transition is complete
            setTimeout(() => {
                // Hide all sections first
                sectionPages.forEach(page => page.classList.remove('active'));
                
                // Show the selected section
                section.classList.add('active');
            }, 100);
        });
    });

    // Back button functionality - Fixed to properly return to the TOC page
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            sectionPages.forEach(page => page.classList.remove('active'));
            // Go back to the TOC page
            goToPage(2);
        });
    });

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