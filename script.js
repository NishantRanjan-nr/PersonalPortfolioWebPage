document.addEventListener('DOMContentLoaded', () => {
    // Get all sections and elements to animate
    const sections = document.querySelectorAll('.section');
    const skillItems = document.querySelectorAll('.skill-item');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Function to check if an element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        return (
            rect.top <= windowHeight * 0.75 &&
            rect.bottom >= windowHeight * 0.25
        );
    };

    // Function to update active section and animate elements
    const updateActiveSection = () => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('active');
                
                // Animate skill items when skills section is active
                if (section.id === 'skills') {
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }

                // Animate project cards when projects section is active
                if (section.id === 'projects') {
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }

                // Update navigation highlight
                const navLink = document.querySelector(`#navbar a[href="#${section.id}"]`);
                if (navLink) {
                    document.querySelectorAll('#navbar a').forEach(link => {
                        link.style.color = 'var(--text-color)';
                    });
                    navLink.style.color = 'var(--primary-color)';
                }
            } else {
                section.classList.remove('active');
            }
        });
    };

    // Initialize animations
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });

    // Debounce scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveSection();
        });
    });
    
    // Run once on load
    updateActiveSection();

    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
