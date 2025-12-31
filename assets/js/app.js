// Main Application JavaScript

class APlusPlatform {
    constructor() {
        this.user = null;
        this.courses = {};
        this.progress = {};
        this.init();
    }

    init() {
        console.log('A+ Platform Initializing...');
        this.loadUserData();
        this.setupServiceWorker();
        this.setupOfflineDetection();
        this.setupAnalytics();
    }

    loadUserData() {
        const userData = localStorage.getItem('aplus_user');
        if (userData) {
            this.user = JSON.parse(userData);
            this.progress = JSON.parse(localStorage.getItem('aplus_progress') || '{}');
            this.updateUI();
        }
    }

    saveUserData() {
        if (this.user) {
            localStorage.setItem('aplus_user', JSON.stringify(this.user));
            localStorage.setItem('aplus_progress', JSON.stringify(this.progress));
        }
    }

    login(email, password) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.user = {
                    id: Date.now(),
                    email,
                    name: email.split('@')[0],
                    joined: new Date().toISOString()
                };
                this.saveUserData();
                this.updateUI();
                resolve(this.user);
            }, 1000);
        });
    }

    logout() {
        this.user = null;
        localStorage.removeItem('aplus_user');
        localStorage.removeItem('aplus_progress');
        this.updateUI();
    }

    updateUI() {
        // Update UI based on auth state
        const authElements = document.querySelectorAll('[data-auth]');
        authElements.forEach(el => {
            if (this.user) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                    registration => {
                        console.log('ServiceWorker registered:', registration.scope);
                    },
                    error => {
                        console.log('ServiceWorker registration failed:', error);
                    }
                );
            });
        }
    }

    setupOfflineDetection() {
        window.addEventListener('online', () => {
            window.aplusPlatform?.showToast('You are back online!', 'success');
        });

        window.addEventListener('offline', () => {
            window.aplusPlatform?.showToast('You are offline. Some features may be limited.', 'warning');
        });
    }

    setupAnalytics() {
        // Simple analytics tracking
        window.addEventListener('load', () => {
            this.trackEvent('page_view', {
                page: window.location.pathname,
                timestamp: new Date().toISOString()
            });
        });
    }

    trackEvent(event, data) {
        const events = JSON.parse(localStorage.getItem('aplus_analytics') || '[]');
        events.push({ event, data, timestamp: new Date().toISOString() });
        localStorage.setItem('aplus_analytics', JSON.stringify(events.slice(-100)));
    }

    // Course Management
    enrollInCourse(courseId) {
        if (!this.user) {
            window.aplusPlatform?.showToast('Please login to enroll in courses', 'warning');
            return false;
        }

        this.progress[courseId] = this.progress[courseId] || {
            enrolled: new Date().toISOString(),
            completed: false,
            chapters: {},
            score: 0
        };

        this.saveUserData();
        window.aplusPlatform?.showToast('Successfully enrolled in course!', 'success');
        return true;
    }

    updateProgress(courseId, chapterId, score) {
        if (!this.progress[courseId]) return;

        this.progress[courseId].chapters[chapterId] = {
            completed: true,
            score,
            completedAt: new Date().toISOString()
        };

        // Update overall score
        const chapters = Object.values(this.progress[courseId].chapters);
        if (chapters.length > 0) {
            this.progress[courseId].score = chapters.reduce((sum, c) => sum + c.score, 0) / chapters.length;
        }

        this.saveUserData();
        return this.progress[courseId];
    }
}

// Initialize platform
const platform = new APlusPlatform();
window.aplus = platform;

// Export for use in other modules
export { platform as APlusPlatform };