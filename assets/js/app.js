class APlusInitiative {
    constructor() {
        this.currentUser = null;
        this.studyStreak = 14;
        this.init();
    }

    init() {
        console.log('🎓 A+ Initiative Platform Initialized');
        
        // Initialize components
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupAuthModal();
        this.setupBackToTop();
        this.setupEventListeners();
        this.startAnimations();
        
        // Check for auth state
        this.checkAuthState();
        
        // Show welcome message
        setTimeout(() => {
            this.showToast('Welcome to A+ Initiative! 🎓', 'success');
        }, 2000);
    }

    setupNavigation() {
        // Highlight active navigation link
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === '/') ||
                (href && href.includes(currentPage))) {
                link.classList.add('active');
            }
            
            // Handle anchor links
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        });

        // Dropdown functionality
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('open');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('open');
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('open');
                document.body.style.overflow = 'hidden';
            });

            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });

            // Close when clicking outside
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });

            // Close when clicking a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    setupAuthModal() {
        const authModal = document.getElementById('authModal');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const mobileSignupBtn = document.getElementById('mobileSignupBtn');
        const closeAuthModal = document.getElementById('closeAuthModal');
        const authTabs = document.querySelectorAll('.auth-tab');
        const authForms = document.querySelectorAll('.auth-form');

        // Open modal
        const openModal = () => {
            authModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        };

        [loginBtn, mobileLoginBtn].forEach(btn => {
            if (btn) btn.addEventListener('click', openModal);
        });

        [signupBtn, mobileSignupBtn].forEach(btn => {
            if (btn) btn.addEventListener('click', () => {
                openModal();
                this.switchAuthTab('signup');
            });
        });

        // Close modal
        closeAuthModal.addEventListener('click', () => {
            authModal.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Close on outside click
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });

        // Switch tabs
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchAuthTab(tabName);
            });
        });

        // Handle form submissions
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(loginForm);
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup(signupForm);
            });
        }
    }

    switchAuthTab(tabName) {
        const authTabs = document.querySelectorAll('.auth-tab');
        const authForms = document.querySelectorAll('.auth-form');

        authTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        authForms.forEach(form => {
            form.classList.remove('active');
            if (form.dataset.form === tabName) {
                form.classList.add('active');
            }
        });
    }

    async handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');

        try {
            // Simulate API call
            await this.simulateApiCall();
            
            this.currentUser = {
                email: email,
                name: email.split('@')[0],
                role: 'student'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            document.getElementById('authModal').classList.remove('show');
            document.body.style.overflow = '';
            
            this.showToast('Welcome back! Redirecting to dashboard...', 'success');
            
            // Update UI
            this.updateAuthUI();
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } catch (error) {
            this.showToast('Invalid credentials. Please try again.', 'error');
        }
    }

    async handleSignup(form) {
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const agree = formData.get('agree');

        if (password !== confirmPassword) {
            this.showToast('Passwords do not match.', 'error');
            return;
        }

        if (!agree) {
            this.showToast('Please agree to the Terms of Service.', 'error');
            return;
        }

        try {
            // Simulate API call
            await this.simulateApiCall();
            
            this.currentUser = {
                email: email,
                name: name,
                role: 'student'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            document.getElementById('authModal').classList.remove('show');
            document.body.style.overflow = '';
            
            this.showToast('Account created successfully! Welcome to A+ Initiative.', 'success');
            
            // Update UI
            this.updateAuthUI();
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } catch (error) {
            this.showToast('Registration failed. Please try again.', 'error');
        }
    }

    simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    checkAuthState() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.updateAuthUI();
        }
    }

    updateAuthUI() {
        if (this.currentUser) {
            // Update login button to show user menu
            const loginBtn = document.getElementById('loginBtn');
            const mobileLoginBtn = document.getElementById('mobileLoginBtn');
            
            if (loginBtn) {
                loginBtn.innerHTML = `
                    <i class="fas fa-user mr-2"></i>
                    ${this.currentUser.name}
                `;
                loginBtn.classList.remove('btn-outline');
                loginBtn.classList.add('btn-primary');
                loginBtn.removeEventListener('click', this.openAuthModal);
                loginBtn.addEventListener('click', () => {
                    window.location.href = 'dashboard.html';
                });
            }
            
            if (mobileLoginBtn) {
                mobileLoginBtn.innerHTML = `
                    <i class="fas fa-user mr-2"></i>
                    ${this.currentUser.name}
                `;
                mobileLoginBtn.classList.remove('btn-outline');
                mobileLoginBtn.classList.add('btn-primary');
                mobileLoginBtn.removeEventListener('click', this.openAuthModal);
                mobileLoginBtn.addEventListener('click', () => {
                    window.location.href = 'dashboard.html';
                });
            }
        }
    }

    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupEventListeners() {
        // Explore Courses
        const exploreCoursesBtn = document.getElementById('exploreCourses');
        if (exploreCoursesBtn) {
            exploreCoursesBtn.addEventListener('click', () => {
                window.location.href = 'course_list.html';
            });
        }

        // Watch Demo
        const watchDemoBtn = document.getElementById('watchDemo');
        if (watchDemoBtn) {
            watchDemoBtn.addEventListener('click', () => {
                this.showToast('Opening demo video...', 'info');
            });
        }

        // Free Trial
        const freeTrialBtn = document.getElementById('freeTrial');
        if (freeTrialBtn) {
            freeTrialBtn.addEventListener('click', () => {
                if (!this.currentUser) {
                    document.getElementById('authModal').classList.add('show');
                    this.switchAuthTab('signup');
                } else {
                    this.showToast('Starting your 7-day free trial! 🚀', 'success');
                }
            });
        }

        // Book Demo
        const bookDemoBtn = document.getElementById('bookDemo');
        if (bookDemoBtn) {
            bookDemoBtn.addEventListener('click', () => {
                this.showToast('Redirecting to booking system...', 'info');
            });
        }

        // Course links
        const courseLinks = document.querySelectorAll('[href*="course_detail"]');
        courseLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('href');
                window.location.href = url;
            });
        });

        // Handle query parameters
        this.handleQueryParams();
    }

    handleQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Handle school filter
        const school = urlParams.get('school');
        if (school) {
            this.filterBySchool(school);
        }
        
        // Handle course parameter
        const course = urlParams.get('course');
        if (course && window.location.pathname.includes('course_detail.html')) {
            this.loadCourseDetail(course);
        }
        
        // Handle chapter parameter
        const chapter = urlParams.get('chapter');
        if (chapter && window.location.pathname.includes('chapter.html')) {
            this.loadChapter(chapter);
        }
    }

    filterBySchool(school) {
        // This would filter courses by school in course_list.html
        const schoolMap = {
            'mathematics': 'Mathematics & Natural Sciences',
            'built': 'Built Environment',
            'business': 'Business & Humanities'
        };
        
        if (schoolMap[school]) {
            this.showToast(`Showing courses from ${schoolMap[school]}`, 'info');
        }
    }

    loadCourseDetail(courseId) {
        // Load course details from data or API
        console.log(`Loading course: ${courseId}`);
    }

    loadChapter(chapterId) {
        // Load chapter content from data or API
        console.log(`Loading chapter: ${chapterId}`);
    }

    startAnimations() {
        // Animate counters
        this.animateCounter('studentsCount', 5237);
        
        // Add animation classes
        const elements = document.querySelectorAll('.course-preview-card, .feature-card, .testimonial-card');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        });
        
        // Remove loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }
        }, 1500);
    }

    animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;

        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    }

    showToast(message, type = 'info', duration = 5000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toastId = 'toast-' + Date.now();
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 10);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.hideToast(toast);
        });

        // Auto remove
        setTimeout(() => this.hideToast(toast), duration);
    }

    hideToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showToast('Successfully logged out.', 'success');
        
        // Reload page to update UI
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // Course enrollment
    enrollInCourse(courseId, courseName) {
        if (!this.currentUser) {
            document.getElementById('authModal').classList.add('show');
            this.showToast('Please sign in to enroll in courses.', 'info');
            return;
        }

        this.showToast(`Enrolling in ${courseName}...`, 'success');
        
        // Simulate enrollment
        setTimeout(() => {
            const enrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
            enrollments.push({
                courseId: courseId,
                courseName: courseName,
                enrolledAt: new Date().toISOString(),
                progress: 0
            });
            localStorage.setItem('userEnrollments', JSON.stringify(enrollments));
            
            this.showToast(`Successfully enrolled in ${courseName}! 🎉`, 'success');
            
            // Redirect to course
            setTimeout(() => {
                window.location.href = `chapter.html?course=${courseId}&chapter=1`;
            }, 1500);
        }, 1000);
    }

    // Track study time
    startStudyTimer() {
        const startTime = new Date().getTime();
        localStorage.setItem('studyTimerStart', startTime.toString());
        this.showToast('Study timer started! 📚', 'success');
        
        // Update timer every minute
        this.studyTimer = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsed = Math.floor((currentTime - startTime) / 60000);
            
            // Update streak if needed
            this.updateStudyStreak();
            
            // Save study session
            this.saveStudySession(elapsed);
        }, 60000);
    }

    stopStudyTimer() {
        if (this.studyTimer) {
            clearInterval(this.studyTimer);
            localStorage.removeItem('studyTimerStart');
            this.showToast('Study session saved! ✅', 'success');
        }
    }

    updateStudyStreak() {
        const lastStudy = localStorage.getItem('lastStudyDate');
        const today = new Date().toDateString();
        
        if (lastStudy !== today) {
            this.studyStreak++;
            localStorage.setItem('lastStudyDate', today);
            localStorage.setItem('studyStreak', this.studyStreak.toString());
            
            // Update streak display if on dashboard
            const streakElement = document.getElementById('learning-streak');
            if (streakElement) {
                streakElement.textContent = this.studyStreak;
            }
        }
    }

    saveStudySession(minutes) {
        const sessions = JSON.parse(localStorage.getItem('studySessions') || '[]');
        sessions.push({
            date: new Date().toISOString(),
            minutes: minutes,
            course: window.location.pathname.includes('chapter.html') ? 
                   new URLSearchParams(window.location.search).get('course') : 'General'
        });
        localStorage.setItem('studySessions', JSON.stringify(sessions));
    }

    // Export data
    exportProgressData() {
        const data = {
            user: this.currentUser,
            enrollments: JSON.parse(localStorage.getItem('userEnrollments') || '[]'),
            studySessions: JSON.parse(localStorage.getItem('studySessions') || '[]'),
            lastUpdated: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `aplus-progress-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showToast('Progress data exported successfully!', 'success');
    }
}

// Initialize platform
document.addEventListener('DOMContentLoaded', () => {
    window.aplus = new APlusInitiative();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                window.location.href = 'index.html';
                break;
            case '2':
                e.preventDefault();
                window.location.href = 'course_list.html';
                break;
            case '3':
                e.preventDefault();
                window.location.href = 'resources.html';
                break;
            case 'd':
                e.preventDefault();
                if (window.aplus.currentUser) {
                    window.location.href = 'dashboard.html';
                }
                break;
            case 's':
                e.preventDefault();
                if (window.aplus.startStudyTimer) {
                    window.aplus.startStudyTimer();
                }
                break;
            case 'e':
                e.preventDefault();
                if (window.aplus.stopStudyTimer) {
                    window.aplus.stopStudyTimer();
                }
                break;
        }
    }
});

// Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            (registration) => {
                console.log('ServiceWorker registration successful');
            },
            (err) => {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
}