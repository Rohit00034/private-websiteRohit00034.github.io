document.addEventListener('DOMContentLoaded', function() {
    // Set background images for each page
    const backgroundImages = {
        'cover-bg': 'images/ryan-kim-ADvoB9pDkow-unsplash.jpg',
        'intro-bg': 'images/portfolioimage.jpg',
        'about-bg': 'images/ryan-kim-ADvoB9pDkow-unsplash.jpg',
        'contents-bg': 'images/david-becker-mGx5-xt1uec-unsplash.jpg',
        'sections-bg': 'images/ryan-kim-ADvoB9pDkow-unsplash.jpg',
        'contact-bg': 'images/david-becker-mGx5-xt1uec-unsplash.jpg'
    };
    
    // Apply background images to each section
    document.querySelectorAll('.page').forEach(page => {
        const bgKey = page.getAttribute('data-bg');
        if (bgKey && backgroundImages[bgKey]) {
            page.style.backgroundImage = `url('${backgroundImages[bgKey]}')`;
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.navigation a, .toc-item').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            let targetId;
            if (this.classList.contains('toc-item')) {
                // For TOC items, navigate to sections and activate the correct subsection
                targetId = 'sections';
                const subsectionId = this.getAttribute('data-section');
                
                // Wait for scroll to complete, then activate the correct subsection
                setTimeout(() => {
                    activateSubsection(subsectionId);
                }, 1000);
            } else {
                // For regular nav items
                targetId = this.getAttribute('href').substring(1);
            }
            
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Subsection navigation
    document.querySelectorAll('.subsection-btn').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            activateSubsection(sectionId);
        });
    });
    
    // Function to activate the correct subsection
    function activateSubsection(sectionId) {
        // Remove active class from all buttons and sections
        document.querySelectorAll('.subsection-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.subsection').forEach(section => {
            section.classList.remove('active');
        });
        
        // Add active class to selected button and section
        document.querySelector(`.subsection-btn[data-section="${sectionId}"]`).classList.add('active');
        document.getElementById(sectionId).classList.add('active');
    }
    
    // Add scroll animation for elements
    window.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
        const contentBoxes = document.querySelectorAll('.content-box');
        
        contentBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (boxTop < windowHeight - 100) {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize the opacity for content boxes
    document.querySelectorAll('.content-box').forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(50px)';
        box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial reveal
    revealOnScroll();
    
    // Form submission (prevent default for demonstration)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission functionality would be implemented here.');
            this.reset();
        });
    }
});