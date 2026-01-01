// Resource Manager - Course List Enhancement
document.addEventListener('DOMContentLoaded', function() {
    console.log('Resource Manager loaded');
    
    // Initialize all components
    initLoadingScreen();
    initMobileMenu();
    initSearchFilter();
    initResourceCards();
    initDownloadProgress();
    initBackToTop();
    initStatsCounter();
    initSchoolFilter();
    
    // Show page content
    setTimeout(() => {
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }, 500);
    }
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(e.target) &&
            e.target !== mobileMenuBtn) {
            mobileMenu.classList.remove('open');
        }
    });
}

// Initialize search and filter
function initSearchFilter() {
    const searchInput = document.getElementById('resourceSearch');
    const subjectFilter = document.getElementById('subjectFilter');
    const typeFilter = document.getElementById('typeFilter');
    const yearFilter = document.getElementById('yearFilter');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterResources, 300));
    }
    
    if (subjectFilter) {
        subjectFilter.addEventListener('change', filterResources);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterResources);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterResources);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterResources);
    }
}

// Initialize resource cards
function initResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card[data-download]');
    
    resourceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!this.href || this.href === '#') {
                e.preventDefault();
                const resourceName = this.querySelector('.resource-title').textContent;
                simulateDownload(resourceName, this.dataset.download);
            }
        });
    });
}

// Initialize download progress indicator
function initDownloadProgress() {
    // Create download progress element if not exists
    if (!document.getElementById('downloadProgress')) {
        const progressHTML = `
            <div class="download-progress" id="downloadProgress">
                <div class="download-progress-header">
                    <h4>Downloading...</h4>
                    <button class="download-progress-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="download-progress-bar">
                    <div class="download-progress-fill" style="width: 0%"></div>
                </div>
                <div class="download-progress-info">
                    <span class="download-speed">Preparing download...</span>
                    <span class="download-time">Estimating time...</span>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', progressHTML);
        
        const closeBtn = document.querySelector('.download-progress-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.getElementById('downloadProgress').classList.remove('show');
            });
        }
    }
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        if (!isNaN(target)) {
            animateCounter(stat, target);
        }
    });
}

// Initialize school filter
function initSchoolFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const school = urlParams.get('school');
    
    if (school) {
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href')?.includes(school)) {
                btn.classList.add('active');
                // Scroll to specific school section
                setTimeout(() => {
                    const section = document.getElementById(school);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        });
    }
}

// Filter resources function
function filterResources() {
    const searchInput = document.getElementById('resourceSearch');
    const subjectFilter = document.getElementById('subjectFilter');
    const typeFilter = document.getElementById('typeFilter');
    const yearFilter = document.getElementById('yearFilter');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const subject = subjectFilter ? subjectFilter.value : '';
    const type = typeFilter ? typeFilter.value : '';
    const year = yearFilter ? yearFilter.value : '';
    
    let visibleCount = 0;
    
    resourceCards.forEach(card => {
        const title = card.querySelector('.resource-title').textContent.toLowerCase();
        const cardSubject = card.dataset.subject || '';
        const cardType = card.dataset.type || '';
        const cardYear = card.dataset.year || '';
        
        const matchesSearch = !searchTerm || title.includes(searchTerm);
        const matchesSubject = !subject || cardSubject === subject;
        const matchesType = !type || cardType === type;
        const matchesYear = !year || cardYear === year;
        
        if (matchesSearch && matchesSubject && matchesType && matchesYear) {
            card.style.display = 'flex';
            visibleCount++;
            // Add animation
            card.style.animation = 'fadeInUp 0.3s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show empty state if no resources found
    const emptyState = document.querySelector('.empty-state');
    if (visibleCount === 0) {
        if (!emptyState) {
            const resourceGrid = document.querySelector('.resource-grid');
            if (resourceGrid) {
                const emptyStateHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">
                            <i class="fas fa-search"></i>
                        </div>
                        <h3>No Resources Found</h3>
                        <p>Try adjusting your search filters or browse different categories</p>
                    </div>
                `;
                resourceGrid.innerHTML = emptyStateHTML;
            }
        }
    } else if (emptyState) {
        emptyState.remove();
    }
}

// Simulate download with progress
function simulateDownload(resourceName, fileSize = '2.4 MB') {
    const progressElement = document.getElementById('downloadProgress');
    const progressFill = progressElement.querySelector('.download-progress-fill');
    const downloadSpeed = progressElement.querySelector('.download-speed');
    const downloadTime = progressElement.querySelector('.download-time');
    
    // Update progress title
    progressElement.querySelector('h4').textContent = `Downloading: ${resourceName}`;
    
    // Show progress
    progressElement.classList.add('show');
    
    let progress = 0;
    const totalTime = Math.random() * 3000 + 2000; // 2-5 seconds
    const interval = totalTime / 100;
    
    const intervalId = setInterval(() => {
        progress += 1;
        progressFill.style.width = `${progress}%`;
        
        // Update download info
        const speed = Math.random() * 5 + 1; // 1-6 MB/s
        const remainingTime = ((100 - progress) * interval) / 1000;
        
        downloadSpeed.textContent = `${speed.toFixed(1)} MB/s`;
        downloadTime.textContent = `${remainingTime.toFixed(1)}s remaining`;
        
        if (progress >= 100) {
            clearInterval(intervalId);
            
            // Complete download
            setTimeout(() => {
                progressElement.classList.remove('show');
                
                // Show success toast
                showToast(`Download complete: ${resourceName}`, 'success');
                
                // Reset progress
                setTimeout(() => {
                    progressFill.style.width = '0%';
                    downloadSpeed.textContent = 'Preparing download...';
                    downloadTime.textContent = 'Estimating time...';
                }, 500);
            }, 500);
        }
    }, interval);
}

// Show toast notification
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.querySelector('.toast-container').appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    });
}

// Utility functions
function debounce(func, wait) {
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

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 20);
}

// Handle external links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="http"]');
    if (link && !link.href.includes(window.location.hostname)) {
        e.preventDefault();
        if (confirm('You are about to leave A+ Initiative. Continue?')) {
            window.open(link.href, '_blank');
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('resourceSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modals/menus
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
        }
        
        const downloadProgress = document.getElementById('downloadProgress');
        if (downloadProgress && downloadProgress.classList.contains('show')) {
            downloadProgress.classList.remove('show');
        }
    }
});

// Print functionality
window.addEventListener('beforeprint', () => {
    // Add print-specific classes
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    // Remove print-specific classes
    document.body.classList.remove('printing');
});

// Initialize when page is fully loaded
window.addEventListener('load', function() {
    // Add loaded class for transition effects
    document.body.classList.add('loaded');
    
    // Initialize tooltips
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.title = `Click to download ${card.querySelector('.resource-title').textContent}`;
    });
    
    // Log page view
    console.log('Resource Center loaded successfully');
});