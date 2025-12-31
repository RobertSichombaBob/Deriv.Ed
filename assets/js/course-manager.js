/**
 * A+ Initiative Course Manager
 * Manages course enrollment, progress tracking, and interactions
 */

class CourseManager {
    constructor() {
        this.courses = {
            'pure-mathematics': {
                id: 'pure-mathematics',
                title: 'Pure Mathematics',
                color: 'math',
                icon: 'fa-superscript',
                description: 'Master calculus, algebra, and advanced mathematical concepts',
                chapters: 14,
                duration: '120+ hours',
                price: '£49',
                enrolled: false,
                progress: 0,
                chaptersData: [
                    { id: 1, title: 'Algebra Fundamentals', completed: false, score: 0 },
                    { id: 2, title: 'Quadratic Equations', completed: false, score: 0 },
                    { id: 3, title: 'Functions and Graphs', completed: false, score: 0 },
                    { id: 4, title: 'Trigonometry', completed: false, score: 0 },
                    { id: 5, title: 'Calculus: Differentiation', completed: false, score: 0 },
                    { id: 6, title: 'Calculus: Integration', completed: false, score: 0 },
                    { id: 7, title: 'Vectors', completed: false, score: 0 },
                    { id: 8, title: 'Complex Numbers', completed: false, score: 0 },
                    { id: 9, title: 'Sequences and Series', completed: false, score: 0 },
                    { id: 10, title: 'Proof', completed: false, score: 0 },
                    { id: 11, title: 'Numerical Methods', completed: false, score: 0 },
                    { id: 12, title: 'Advanced Calculus', completed: false, score: 0 },
                    { id: 13, title: 'Exam Preparation', completed: false, score: 0 },
                    { id: 14, title: 'Past Papers Practice', completed: false, score: 0 }
                ]
            },
            'mechanics': {
                id: 'mechanics',
                title: 'Mechanics',
                color: 'physics',
                icon: 'fa-cogs',
                description: 'Understand forces, motion, energy, and momentum',
                chapters: 10,
                duration: '90+ hours',
                price: '£49',
                enrolled: false,
                progress: 0,
                chaptersData: [
                    { id: 1, title: 'Forces and Equilibrium', completed: false, score: 0 },
                    { id: 2, title: 'Kinematics', completed: false, score: 0 },
                    { id: 3, title: 'Newton\'s Laws', completed: false, score: 0 },
                    { id: 4, title: 'Momentum', completed: false, score: 0 },
                    { id: 5, title: 'Work, Energy, and Power', completed: false, score: 0 },
                    { id: 6, title: 'Circular Motion', completed: false, score: 0 },
                    { id: 7, title: 'Moments', completed: false, score: 0 },
                    { id: 8, title: 'Projectiles', completed: false, score: 0 },
                    { id: 9, title: 'Friction', completed: false, score: 0 },
                    { id: 10, title: 'Exam Techniques', completed: false, score: 0 }
                ]
            },
            'statistics': {
                id: 'statistics',
                title: 'Statistics',
                color: 'stats',
                icon: 'fa-chart-bar',
                description: 'Master probability, statistical distributions, and data analysis',
                chapters: 12,
                duration: '100+ hours',
                price: '£49',
                enrolled: false,
                progress: 0,
                chaptersData: [
                    { id: 1, title: 'Data Presentation', completed: false, score: 0 },
                    { id: 2, title: 'Probability', completed: false, score: 0 },
                    { id: 3, title: 'Discrete Random Variables', completed: false, score: 0 },
                    { id: 4, title: 'Binomial Distribution', completed: false, score: 0 },
                    { id: 5, title: 'Normal Distribution', completed: false, score: 0 },
                    { id: 6, title: 'Sampling', completed: false, score: 0 },
                    { id: 7, title: 'Hypothesis Testing', completed: false, score: 0 },
                    { id: 8, title: 'Correlation and Regression', completed: false, score: 0 },
                    { id: 9, title: 'Chi-squared Tests', completed: false, score: 0 },
                    { id: 10, title: 'Time Series', completed: false, score: 0 },
                    { id: 11, title: 'Experimental Design', completed: false, score: 0 },
                    { id: 12, title: 'Revision and Practice', completed: false, score: 0 }
                ]
            },
            'physics': {
                id: 'physics',
                title: 'Physics',
                color: 'physics',
                icon: 'fa-atom',
                description: 'Explore the fundamental principles of the universe',
                chapters: 16,
                duration: '140+ hours',
                price: '£49',
                enrolled: false,
                progress: 0,
                chaptersData: [
                    { id: 1, title: 'Measurements and Errors', completed: false, score: 0 },
                    { id: 2, title: 'Particles and Radiation', completed: false, score: 0 },
                    { id: 3, title: 'Waves', completed: false, score: 0 },
                    { id: 4, title: 'Mechanics and Materials', completed: false, score: 0 },
                    { id: 5, title: 'Electricity', completed: false, score: 0 },
                    { id: 6, title: 'Further Mechanics', completed: false, score: 0 },
                    { id: 7, title: 'Thermal Physics', completed: false, score: 0 },
                    { id: 8, title: 'Fields', completed: false, score: 0 },
                    { id: 9, title: 'Nuclear Physics', completed: false, score: 0 },
                    { id: 10, title: 'Astrophysics', completed: false, score: 0 },
                    { id: 11, title: 'Medical Physics', completed: false, score: 0 },
                    { id: 12, title: 'Engineering Physics', completed: false, score: 0 },
                    { id: 13, title: 'Turning Points', completed: false, score: 0 },
                    { id: 14, title: 'Electronics', completed: false, score: 0 },
                    { id: 15, title: 'Practical Skills', completed: false, score: 0 },
                    { id: 16, title: 'Exam Preparation', completed: false, score: 0 }
                ]
            },
            'computer-science': {
                id: 'computer-science',
                title: 'Computer Science',
                color: 'cs',
                icon: 'fa-laptop-code',
                description: 'Learn programming, algorithms, and computational thinking',
                chapters: 18,
                duration: '150+ hours',
                price: '£49',
                enrolled: false,
                progress: 0,
                chaptersData: [
                    { id: 1, title: 'Fundamentals of Programming', completed: false, score: 0 },
                    { id: 2, title: 'Data Structures', completed: false, score: 0 },
                    { id: 3, title: 'Algorithms', completed: false, score: 0 },
                    { id: 4, title: 'Computational Thinking', completed: false, score: 0 },
                    { id: 5, title: 'Data Representation', completed: false, score: 0 },
                    { id: 6, title: 'Computer Systems', completed: false, score: 0 },
                    { id: 7, title: 'Computer Organisation', completed: false, score: 0 },
                    { id: 8, title: 'Software Development', completed: false, score: 0 },
                    { id: 9, title: 'Databases', completed: false, score: 0 },
                    { id: 10, title: 'Networks', completed: false, score: 0 },
                    { id: 11, title: 'Web Technologies', completed: false, score: 0 },
                    { id: 12, title: 'Ethical, Legal Issues', completed: false, score: 0 },
                    { id: 13, title: 'Computational Methods', completed: false, score: 0 },
                    { id: 14, title: 'Systematic Problem Solving', completed: false, score: 0 },
                    { id: 15, title: 'Algorithms in Action', completed: false, score: 0 },
                    { id: 16, title: 'Programming Project', completed: false, score: 0 },
                    { id: 17, title: 'Theory Revision', completed: false, score: 0 },
                    { id: 18, title: 'Practical Exam Prep', completed: false, score: 0 }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.renderCourseProgress();
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('aplus_course_progress');
            if (saved) {
                const progress = JSON.parse(saved);
                Object.keys(progress).forEach(courseId => {
                    if (this.courses[courseId]) {
                        Object.assign(this.courses[courseId], progress[courseId]);
                    }
                });
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    saveProgress() {
        try {
            const progress = {};
            Object.keys(this.courses).forEach(courseId => {
                progress[courseId] = {
                    enrolled: this.courses[courseId].enrolled,
                    progress: this.courses[courseId].progress,
                    chaptersData: this.courses[courseId].chaptersData
                };
            });
            localStorage.setItem('aplus_course_progress', JSON.stringify(progress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    enroll(courseId) {
        if (!this.courses[courseId]) {
            this.showToast('Course not found', 'error');
            return false;
        }

        if (this.courses[courseId].enrolled) {
            this.showToast('Already enrolled in this course', 'info');
            return true;
        }

        this.courses[courseId].enrolled = true;
        this.courses[courseId].progress = 0;
        this.saveProgress();
        
        this.showToast(`Successfully enrolled in ${this.courses[courseId].title}!`, 'success');
        this.renderCourseProgress();
        
        // Trigger enrollment analytics
        this.trackEvent('course_enrolled', {
            course: courseId,
            timestamp: new Date().toISOString()
        });
        
        return true;
    }

    completeChapter(courseId, chapterId, score = 100) {
        if (!this.courses[courseId] || !this.courses[courseId].enrolled) {
            return false;
        }

        const chapter = this.courses[courseId].chaptersData.find(c => c.id === chapterId);
        if (chapter) {
            chapter.completed = true;
            chapter.score = score;
            this.updateCourseProgress(courseId);
            this.saveProgress();
            return true;
        }
        
        return false;
    }

    updateCourseProgress(courseId) {
        if (!this.courses[courseId]) return;
        
        const course = this.courses[courseId];
        const completedChapters = course.chaptersData.filter(c => c.completed).length;
        const totalChapters = course.chaptersData.length;
        
        course.progress = Math.round((completedChapters / totalChapters) * 100);
        
        // Update UI
        this.renderCourseProgress();
        
        // Check if course is completed
        if (completedChapters === totalChapters) {
            this.completeCourse(courseId);
        }
    }

    completeCourse(courseId) {
        if (!this.courses[courseId]) return;
        
        const course = this.courses[courseId];
        const averageScore = course.chaptersData.reduce((sum, c) => sum + c.score, 0) / course.chaptersData.length;
        
        this.showToast(`Congratulations! You completed ${course.title} with ${averageScore.toFixed(1)}% average!`, 'success');
        
        // Award certificate
        this.awardCertificate(courseId, averageScore);
        
        // Trigger completion analytics
        this.trackEvent('course_completed', {
            course: courseId,
            score: averageScore,
            timestamp: new Date().toISOString()
        });
    }

    awardCertificate(courseId, score) {
        const course = this.courses[courseId];
        if (!course) return;
        
        const certificate = {
            id: `cert-${Date.now()}`,
            courseId: courseId,
            courseName: course.title,
            studentName: 'Student Name', // This would come from user profile
            date: new Date().toISOString().split('T')[0],
            score: score,
            certificateNumber: `APL-${courseId.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`
        };
        
        // Save certificate
        const certificates = JSON.parse(localStorage.getItem('aplus_certificates') || '[]');
        certificates.push(certificate);
        localStorage.setItem('aplus_certificates', JSON.stringify(certificates));
        
        // Show certificate
        this.showCertificate(certificate);
    }

    showCertificate(certificate) {
        // In a real implementation, this would open a modal with the certificate
        console.log('Certificate awarded:', certificate);
        
        // Show notification
        this.showToast('Certificate awarded! View in your profile.', 'success');
    }

    renderCourseProgress() {
        // Update course cards with progress
        Object.keys(this.courses).forEach(courseId => {
            const course = this.courses[courseId];
            const progressElement = document.querySelector(`[data-course="${courseId}"] .course-progress`);
            const enrollButton = document.querySelector(`[data-course="${courseId}"] .enroll-btn`);
            
            if (progressElement) {
                progressElement.innerHTML = `
                    <div class="flex justify-between text-sm mb-1">
                        <span class="text-gray-300">Progress</span>
                        <span class="text-${course.color} font-bold">${course.progress}%</span>
                    </div>
                    <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div class="h-full bg-${course.color} rounded-full progress-animate" style="width: ${course.progress}%"></div>
                    </div>
                `;
            }
            
            if (enrollButton) {
                if (course.enrolled) {
                    enrollButton.innerHTML = `
                        <i class="fas fa-play mr-2"></i>
                        Continue Learning
                    `;
                    enrollButton.className = `w-full py-3 rounded-lg bg-${course.color} hover:bg-${course.color}/80 text-white font-semibold text-center transition-colors`;
                } else {
                    enrollButton.innerHTML = `
                        <i class="fas fa-plus mr-2"></i>
                        Enroll Now - ${course.price}
                    `;
                }
            }
        });
        
        // Update dashboard stats if on dashboard
        this.updateDashboardStats();
    }

    updateDashboardStats() {
        const enrolledCount = Object.values(this.courses).filter(c => c.enrolled).length;
        const totalProgress = Object.values(this.courses).reduce((sum, c) => sum + c.progress, 0) / enrolledCount || 0;
        const completedChapters = Object.values(this.courses).reduce((sum, c) => 
            sum + c.chaptersData.filter(ch => ch.completed).length, 0
        );
        
        // Update stats elements
        const enrolledElement = document.getElementById('coursesEnrolled');
        const progressElement = document.getElementById('overallProgress');
        const chaptersElement = document.getElementById('chaptersCompleted');
        
        if (enrolledElement) enrolledElement.textContent = enrolledCount;
        if (progressElement) progressElement.textContent = `${Math.round(totalProgress)}%`;
        if (chaptersElement) chaptersElement.textContent = completedChapters;
    }

    getStudyPlan(courseId) {
        if (!this.courses[courseId] || !this.courses[courseId].enrolled) return null;
        
        const course = this.courses[courseId];
        const incompleteChapters = course.chaptersData.filter(c => !c.completed);
        
        if (incompleteChapters.length === 0) return null;
        
        // Generate a study plan based on progress
        return {
            course: courseId,
            nextChapter: incompleteChapters[0],
            estimatedTime: '2-3 hours',
            priority: 'high',
            studyTips: this.getStudyTips(courseId, incompleteChapters[0].id)
        };
    }

    getStudyTips(courseId, chapterId) {
        const tips = {
            'pure-mathematics': [
                'Practice with step-by-step solutions',
                'Use graphing tools to visualize concepts',
                'Focus on understanding rather than memorizing'
            ],
            'mechanics': [
                'Draw free-body diagrams',
                'Understand the physical meaning of equations',
                'Practice with real-world examples'
            ],
            'statistics': [
                'Work with actual datasets',
                'Use statistical software for practice',
                'Focus on interpretation of results'
            ],
            'physics': [
                'Connect concepts to real-world phenomena',
                'Use simulations to visualize',
                'Practice unit conversions'
            ],
            'computer-science': [
                'Write code every day',
                'Debug and optimize',
                'Understand algorithms visually'
            ]
        };
        
        return tips[courseId] || ['Review notes regularly', 'Practice with past papers', 'Seek help when stuck'];
    }

    generateQuiz(courseId, chapterId, difficulty = 'medium') {
        const quizzes = {
            'pure-mathematics': {
                1: [
                    {
                        question: 'Solve for x: 2x + 5 = 13',
                        options: ['x = 4', 'x = 8', 'x = 6', 'x = 9'],
                        correct: 0,
                        explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4'
                    },
                    {
                        question: 'Simplify: (3x²)(2x³)',
                        options: ['6x⁵', '5x⁵', '6x⁶', '5x⁶'],
                        correct: 0,
                        explanation: 'Multiply coefficients: 3 × 2 = 6, add exponents: 2 + 3 = 5'
                    }
                ]
            },
            // Add more quizzes for each course and chapter
        };
        
        return quizzes[courseId]?.[chapterId] || [];
    }

    submitQuiz(courseId, chapterId, answers) {
        const quiz = this.generateQuiz(courseId, chapterId);
        let score = 0;
        
        answers.forEach((answer, index) => {
            if (answer === quiz[index]?.correct) {
                score += 10;
            }
        });
        
        // Record score
        this.completeChapter(courseId, chapterId, score);
        
        return {
            score,
            total: quiz.length * 10,
            percentage: Math.round((score / (quiz.length * 10)) * 100),
            feedback: this.getFeedback(score, quiz.length * 10)
        };
    }

    getFeedback(score, total) {
        const percentage = (score / total) * 100;
        
        if (percentage >= 90) return 'Excellent work! You have mastered this topic.';
        if (percentage >= 70) return 'Great job! Good understanding with room for improvement.';
        if (percentage >= 50) return 'Good effort. Review the material and try again.';
        return 'Keep practicing. Review the chapter material thoroughly.';
    }

    setupEventListeners() {
        // Course enrollment buttons
        document.addEventListener('click', (e) => {
            const enrollBtn = e.target.closest('.enroll-btn');
            if (enrollBtn) {
                e.preventDefault();
                const courseId = enrollBtn.closest('[data-course]')?.dataset.course;
                if (courseId) {
                    this.enroll(courseId);
                }
            }
        });
        
        // Continue learning buttons
        document.addEventListener('click', (e) => {
            const continueBtn = e.target.closest('.continue-btn');
            if (continueBtn) {
                e.preventDefault();
                const courseId = continueBtn.dataset.course;
                if (courseId) {
                    window.location.href = `/courses/${courseId}.html`;
                }
            }
        });
        
        // Save progress on page unload
        window.addEventListener('beforeunload', () => {
            this.saveProgress();
        });
        
        // Periodic auto-save
        setInterval(() => {
            this.saveProgress();
        }, 30000); // Every 30 seconds
    }

    trackEvent(event, data) {
        const events = JSON.parse(localStorage.getItem('aplus_analytics') || '[]');
        events.push({
            event,
            data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        localStorage.setItem('aplus_analytics', JSON.stringify(events.slice(-1000))); // Keep last 1000 events
    }

    showToast(message, type = 'info') {
        if (window.aplusPlatform?.showToast) {
            window.aplusPlatform.showToast(message, type);
        } else {
            // Fallback toast
            const toast = document.createElement('div');
            toast.className = `fixed bottom-4 right-4 px-4 py-3 rounded-lg bg-gray-800 text-white border-l-4 ${
                type === 'success' ? 'border-green-500' :
                type === 'error' ? 'border-red-500' :
                'border-blue-500'
            }`;
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => toast.remove(), 3000);
        }
    }

    // Export methods for global access
    exportMethods() {
        return {
            enroll: (courseId) => this.enroll(courseId),
            getProgress: (courseId) => this.courses[courseId]?.progress || 0,
            getStudyPlan: (courseId) => this.getStudyPlan(courseId),
            generateQuiz: (courseId, chapterId) => this.generateQuiz(courseId, chapterId),
            submitQuiz: (courseId, chapterId, answers) => this.submitQuiz(courseId, chapterId, answers)
        };
    }
}

// Initialize Course Manager
const courseManager = new CourseManager();
window.courseManager = courseManager;

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CourseManager };
}