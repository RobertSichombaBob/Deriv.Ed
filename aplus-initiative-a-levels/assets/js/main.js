// A+ Initiative A-Levels - Main JavaScript

class APlusInitiative {
    constructor() {
        this.initializeComponents();
        this.setupEventListeners();
        this.initializeAnimations();
    }

    initializeComponents() {
        // Initialize tooltips
        this.initializeTooltips();
        
        // Initialize progress bars
        this.initializeProgressBars();
        
        // Initialize counters
        this.initializeCounters();
        
        // Initialize course filters
        this.initializeCourseFilters();
    }

    setupEventListeners() {
        // Navigation scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Form submissions
        this.handleFormSubmissions();
        
        // Resource downloads
        this.handleResourceDownloads();
        
        // Course enrollment
        this.handleCourseEnrollment();
    }

    initializeAnimations() {
        // Initialize scroll animations
        this.initializeScrollAnimations();
        
        // Initialize hover effects
        this.initializeHoverEffects();
        
        // Initialize loading animations
        this.initializeLoadingAnimations();
    }

    initializeTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', (e) => {
                const text = e.target.dataset.tooltip;
                this.showTooltip(e.target, text);
            });
            
            tooltip.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        // Remove existing tooltip
        this.hideTooltip();
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-box';
        tooltip.textContent = text;
        tooltip.style.position = 'absolute';
        tooltip.style.background = '#1F2937';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '14px';
        tooltip.style.zIndex = '1000';
        tooltip.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        
        document.body.appendChild(tooltip);
        this.currentTooltip = tooltip;
    }

    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }

    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const fill = bar.querySelector('.progress-fill');
            if (fill) {
                const width = fill.dataset.progress || '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            }
        });
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            // Start counter when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    initializeCourseFilters() {
        const filterButtons = document.querySelectorAll('.course-filter');
        const courseCards = document.querySelectorAll('.course-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter courses
                const filter = button.dataset.filter;
                courseCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    handleScroll() {
        // Update navigation background
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active section in navigation
        this.updateActiveNavSection();
    }

    updateActiveNavSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    handleFormSubmissions() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                // Show loading state
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
                submitButton.disabled = true;
                
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success message
                    this.showNotification('Form submitted successfully!', 'success');
                    form.reset();
                } catch (error) {
                    this.showNotification('Error submitting form. Please try again.', 'error');
                } finally {
                    // Restore button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }
            });
        });
    }

    handleResourceDownloads() {
        const downloadButtons = document.querySelectorAll('.download-btn');
        downloadButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const resourceId = button.dataset.resourceId;
                const fileName = button.dataset.fileName;
                
                // Show downloading state
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Downloading...';
                button.disabled = true;
                
                try {
                    // Simulate download
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Create download link
                    const link = document.createElement('a');
                    link.href = `pdfs/${resourceId}/${fileName}`;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    this.showNotification('Download started!', 'success');
                } catch (error) {
                    this.showNotification('Download failed. Please try again.', 'error');
                } finally {
                    // Restore button
                    button.innerHTML = originalText;
                    button.disabled = false;
                }
            });
        });
    }

    handleCourseEnrollment() {
        const enrollButtons = document.querySelectorAll('.enroll-btn');
        enrollButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const courseId = button.dataset.courseId;
                const courseName = button.dataset.courseName;
                
                // Show enrollment modal or process
                const confirmed = confirm(`Enroll in ${courseName}?`);
                if (confirmed) {
                    // Simulate enrollment process
                    this.showNotification(`Successfully enrolled in ${courseName}!`, 'success');
                    
                    // Update UI
                    button.innerHTML = '<i class="fas fa-check mr-2"></i>Enrolled';
                    button.disabled = true;
                    button.classList.remove('btn-primary');
                    button.classList.add('bg-gray-300', 'text-gray-600');
                }
            });
        });
    }

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    initializeHoverEffects() {
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.interactive');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('hover-effect');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('hover-effect');
            });
        });
    }

    initializeLoadingAnimations() {
        // Remove loading class when page loads
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
                <span>${message}</span>
            </div>
            <button class="ml-4 text-lg">&times;</button>
        `;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '16px 20px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.3s ease-out';
        
        // Set colors based on type
        const colors = {
            success: { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
            error: { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' },
            info: { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' }
        };
        
        const color = colors[type] || colors.info;
        notification.style.background = color.bg;
        notification.style.color = color.text;
        notification.style.border = `1px solid ${color.border}`;
        
        // Add close button functionality
        const closeButton = notification.querySelector('button');
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        document.body.appendChild(notification);
        
        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aPlusInitiative = new APlusInitiative();
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Initialize MathJax if available
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
    
    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        .loading {
            position: relative;
        }
        .loading::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            z-index: 9999;
            animation: loading 1s infinite;
        }
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove loading state after page loads
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        style.remove();
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APlusInitiative;
}