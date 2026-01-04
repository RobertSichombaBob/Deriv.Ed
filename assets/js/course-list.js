// Course List Manager
document.addEventListener('DOMContentLoaded', function() {
    console.log('Course List Manager loaded');
    
    // Initialize all components
    initLoadingScreen();
    initMobileMenu();
    initCourseData();
    initCourseFilters();
    initSearchFunctionality();
    initResourceDownloads();
    initModal();
    initBackToTop();
    initEnrollment();
    
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

// Initialize course data
function initCourseData() {
    const courses = [
        {
            id: 'mathematical methods',
            title: 'Mathematical Methods I',
            category: 'math',
            description: 'Master algebra, Geometry, trigonometry, calculus, and advanced mathematical methods concepts with comprehensive resources.',
            image: 'math',
            rating: 4.8,
            lectures: 24,
            resources: 45,
            students: 1567,
            difficulty: 'Intermediate',
            duration: '18 weeks',
            badge: 'popular',
            color: '#8b5cf6'
        },
        {
            id: 'physics',
            title: 'Physics',
            category: 'math',
            description: 'Classical and modern physics with practical applications and problem-solving techniques.',
            image: 'physics',
            rating: 4.7,
            lectures: 20,
            resources: 38,
            students: 1345,
            difficulty: 'Advanced',
            duration: '16 weeks',
            badge: 'new',
            color: '#f59e0b'
        },
        {
            id: 'chemistry',
            title: 'Chemistry',
            category: 'math',
            description: 'Physical, organic, and inorganic chemistry fundamentals with laboratory simulations.',
            image: 'chemistry',
            rating: 4.6,
            lectures: 18,
            resources: 42,
            students: 987,
            difficulty: 'Intermediate',
            duration: '12 weeks',
            badge: null,
            color: '#3b82f6'
        },
        {
            id: 'computer-science',
            title: 'Computer Science',
            category: 'math',
            description: 'Programming, algorithms, data structures, and computational thinking with hands-on projects.',
            image: 'cs',
            rating: 4.9,
            lectures: 22,
            resources: 35,
            students: 2345,
            difficulty: 'Intermediate',
            duration: '15 weeks',
            badge: 'popular',
            color: '#06b6d4'
        },
        {
            id: 'biology',
            title: 'Biology',
            category: 'math',
            description: 'Cellular biology, genetics, human physiology, and ecological systems.',
            image: 'biology',
            rating: 4.5,
            lectures: 16,
            resources: 32,
            students: 876,
            difficulty: 'Intermediate',
            duration: '13 weeks',
            badge: null,
            color: '#10b981'
        }
    ];
    
    const container = document.getElementById('coursesGrid');
    if (!container) return;
    
    container.innerHTML = courses.map(course => `
        <div class="course-card" data-category="${course.category}" data-id="${course.id}">
            <div class="course-image ${course.image}">
                ${course.badge ? `<div class="course-badge ${course.badge}">${course.badge === 'popular' ? 'Most Popular' : 'New'}</div>` : ''}
            </div>
            <div class="course-content">
                <div class="course-category ${course.id}">${getCategoryName(course.id)}</div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-stats">
                        <span><i class="fas fa-video"></i> ${course.lectures}</span>
                        <span><i class="fas fa-file-pdf"></i> ${course.resources}</span>
                        <span><i class="fas fa-users"></i> ${course.students}</span>
                    </div>
                    <div class="course-rating">
                        <i class="fas fa-star"></i> ${course.rating}
                    </div>
                </div>
                <div class="course-actions">
                    <a href="course_detail.html?course=${course.id}" class="btn btn-primary">
                        <i class="fas fa-play-circle mr-2"></i> View Course
                    </a>
                    <button class="btn btn-outline quick-view-btn" data-course="${course.id}">
                        <i class="fas fa-eye mr-2"></i> Quick View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.dataset.course;
            const course = courses.find(c => c.id === courseId);
            if (course) {
                showCourseModal(course);
            }
        });
    });
    
    // Add click event to entire course card
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn') && !e.target.closest('.quick-view-btn')) {
                const courseId = this.dataset.id;
                window.location.href = `course_detail.html?course=${courseId}`;
            }
        });
    });
}

// Initialize course filters
function initCourseFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const sortSelect = document.getElementById('sortCourses');
    const loadMoreBtn = document.getElementById('loadMoreCourses');
    
    // Filter by category
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterCourses(filter);
        });
    });
    
    // Sort courses
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortCourses(this.value);
        });
    }
    
    // Load more courses
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real app, this would load more courses from an API
            showToast('Loading more courses...', 'info');
            setTimeout(() => {
                showToast('More courses loaded successfully!', 'success');
            }, 1000);
        });
    }
}

// Filter courses by category
function filterCourses(filter) {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Sort courses
function sortCourses(sortBy) {
    const container = document.getElementById('coursesGrid');
    const courseCards = Array.from(document.querySelectorAll('.course-card'));
    
    courseCards.sort((a, b) => {
        const aRating = parseFloat(a.querySelector('.course-rating').textContent);
        const bRating = parseFloat(b.querySelector('.course-rating').textContent);
        const aResources = parseInt(a.querySelector('.course-stats span:nth-child(2)').textContent);
        const bResources = parseInt(b.querySelector('.course-stats span:nth-child(2)').textContent);
        
        switch(sortBy) {
            case 'rating':
                return bRating - aRating;
            case 'resources':
                return bResources - aResources;
            case 'newest':
                // For demo, we'll sort by title
                return a.querySelector('.course-title').textContent.localeCompare(b.querySelector('.course-title').textContent);
            case 'popular':
            default:
                return 0; // Keep original order
        }
    });
    
    // Reorder in DOM
    courseCards.forEach(card => {
        container.appendChild(card);
    });
}

// Initialize search functionality
function initSearchFunctionality() {
    const searchInput = document.getElementById('globalSearch');
    const searchBtn = document.querySelector('.search-btn');
    const searchFilters = document.querySelectorAll('input[name="search-in"]');
    const searchYear = document.getElementById('searchYear');
    
    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Search on enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search with debounce
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
    
    // Search on filter change
    searchFilters.forEach(filter => {
        filter.addEventListener('change', performSearch);
    });
    
    if (searchYear) {
        searchYear.addEventListener('change', performSearch);
    }
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('globalSearch');
    const resultsContainer = document.getElementById('searchResults');
    
    if (!searchInput || !resultsContainer) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Mock search results
    const results = [
        { type: 'course', title: 'Pure Mathematics', category: 'Mathematics', description: 'Complete course covering algebra, calculus, and trigonometry', icon: 'fas fa-calculator' },
        { type: 'paper', title: 'Mathematics 2023 Past Paper', category: 'Past Papers', description: '2023 A-Level Mathematics examination paper', icon: 'fas fa-file-pdf' },
        { type: 'solution', title: 'Mathematics 2023 Solutions', category: 'Mark Schemes', description: 'Complete solutions for 2023 Mathematics paper', icon: 'fas fa-check-circle' },
        { type: 'course', title: 'Physics', category: 'Science', description: 'Mechanics, waves, electricity, and modern physics', icon: 'fas fa-atom' },
        { type: 'book', title: 'Complete Pure Mathematics Guide', category: 'Textbooks', description: 'Essential textbook for A-Level Mathematics', icon: 'fas fa-book' }
    ];
    
    if (searchTerm === '') {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Start Searching</h3>
                <p>Enter a search term to find courses and resources</p>
            </div>
        `;
        return;
    }
    
    const filteredResults = results.filter(result => 
        result.title.toLowerCase().includes(searchTerm) ||
        result.description.toLowerCase().includes(searchTerm) ||
        result.category.toLowerCase().includes(searchTerm)
    );
    
    if (filteredResults.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No Results Found</h3>
                <p>Try different keywords or browse our courses above</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = filteredResults.map(result => `
        <a href="#" class="result-item ${result.type}">
            <div class="result-icon">
                <i class="${result.icon}"></i>
            </div>
            <div class="result-content">
                <div class="result-title">${result.title}</div>
                <div class="result-meta">
                    <span>${result.category}</span>
                    <span>${result.description}</span>
                </div>
            </div>
            <div class="result-action">
                <i class="fas fa-arrow-right"></i>
            </div>
        </a>
    `).join('');
}

// Initialize resource downloads
function initResourceDownloads() {
    document.querySelectorAll('.resource-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const resourceName = this.querySelector('span').textContent;
            simulateDownload(resourceName);
        });
    });
}

// Initialize modal
function initModal() {
    const courseModal = document.getElementById('courseModal');
    const closeModal = document.getElementById('closeCourseModal');
    
    if (closeModal && courseModal) {
        closeModal.addEventListener('click', () => {
            courseModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === courseModal) {
            courseModal.classList.remove('show');
        }
    });
}

// Show course modal
function showCourseModal(course) {
    const modalContent = document.getElementById('courseModalContent');
    const modal = document.getElementById('courseModal');
    
    if (!modalContent || !modal) return;
    
    modalContent.innerHTML = `
        <div class="course-modal-header">
            <div class="course-modal-icon ${course.id}">
                <i class="fas fa-${getCourseIcon(course.id)}"></i>
            </div>
            <div>
                <h2 class="course-modal-title">${course.title}</h2>
                <div class="detail-item">
                    <i class="fas fa-graduation-cap"></i>
                    <span>${course.difficulty} • ${course.duration}</span>
                </div>
            </div>
        </div>
        
        <p class="course-modal-description">${course.description}</p>
        
        <div class="course-modal-details">
            <div class="detail-item">
                <i class="fas fa-star"></i>
                <span>Rating: ${course.rating}/5</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-video"></i>
                <span>${course.lectures} Lectures</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-file-pdf"></i>
                <span>${course.resources} Resources</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-users"></i>
                <span>${course.students} Students</span>
            </div>
        </div>
        
        <div class="course-modal-actions">
            <a href="course_detail.html?course=${course.id}" class="btn btn-primary">
                <i class="fas fa-play-circle mr-2"></i> View Full Course
            </a>
            <button class="btn btn-outline" id="enrollCourse">
                <i class="fas fa-user-plus mr-2"></i> Enroll Now
            </button>
        </div>
    `;
    
    modal.classList.add('show');
    
    // Add event listener to enroll button in modal
    const enrollBtn = document.getElementById('enrollCourse');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            enrollInCourse(course.title);
            modal.classList.remove('show');
        });
    }
}

// Initialize back to top
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

// Initialize enrollment
function initEnrollment() {
    const enrollBtn = document.getElementById('enrollNow');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            enrollInCourse('All Courses');
        });
    }
}

// Enroll in course
function enrollInCourse(courseName) {
    showToast(`Enrolling in ${courseName}...`, 'info');
    setTimeout(() => {
        showToast(`Successfully enrolled in ${courseName}!`, 'success');
    }, 1000);
}

// Simulate download
function simulateDownload(resourceName) {
    showToast(`Downloading: ${resourceName}`, 'info');
    
    // Simulate download progress
    setTimeout(() => {
        showToast(`Download complete: ${resourceName}`, 'success');
    }, 1500);
}

// Helper functions
function getCategoryName(courseId) {
    const categories = {
        mathematics: 'Mathematics',
        physics: 'Physics',
        chemistry: 'Chemistry',
        'computer-science': 'Computer Science',
        biology: 'Biology'
    };
    return categories[courseId] || 'Course';
}

function getCourseIcon(courseId) {
    const icons = {
        mathematics: 'calculator',
        physics: 'atom',
        chemistry: 'flask',
        'computer-science': 'laptop-code',
        biology: 'dna'
    };
    return icons[courseId] || 'book';
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast container if not exists
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Remove existing toasts
    const existingToasts = toastContainer.querySelectorAll('.toast');
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
    
    toastContainer.appendChild(toast);
    
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

// Utility function for debouncing
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