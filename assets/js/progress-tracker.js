/**
 * A+ Initiative Progress Tracker
 * Advanced learning analytics and progress tracking
 */

class ProgressTracker {
    constructor() {
        this.studySessions = [];
        this.learningGoals = [];
        this.performanceMetrics = {};
        this.streak = 0;
        this.init();
    }

    init() {
        this.loadData();
        this.setupStudyTimer();
        this.setupGoalTracking();
        this.setupPerformanceAnalytics();
        this.updateDashboard();
        this.startAutoTracking();
    }

    loadData() {
        // Load study sessions
        const sessions = localStorage.getItem('aplus_study_sessions');
        if (sessions) {
            this.studySessions = JSON.parse(sessions);
        }

        // Load goals
        const goals = localStorage.getItem('aplus_learning_goals');
        if (goals) {
            this.learningGoals = JSON.parse(goals);
        }

        // Load metrics
        const metrics = localStorage.getItem('aplus_performance_metrics');
        if (metrics) {
            this.performanceMetrics = JSON.parse(metrics);
        }

        // Load streak
        this.streak = parseInt(localStorage.getItem('aplus_streak') || '0');
        
        this.updateStreak();
    }

    saveData() {
        localStorage.setItem('aplus_study_sessions', JSON.stringify(this.studySessions));
        localStorage.setItem('aplus_learning_goals', JSON.stringify(this.learningGoals));
        localStorage.setItem('aplus_performance_metrics', JSON.stringify(this.performanceMetrics));
        localStorage.setItem('aplus_streak', this.streak.toString());
    }

    setupStudyTimer() {
        this.currentSession = null;
        this.timerInterval = null;
        this.elapsedTime = 0;

        // Start timer button
        const startBtn = document.getElementById('startStudyTimer');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startStudySession());
        }

        // Stop timer button
        const stopBtn = document.getElementById('stopStudyTimer');
        if (stopBtn) {
            stopBtn.addEventListener('click', () => this.stopStudySession());
        }

        // Pause timer button
        const pauseBtn = document.getElementById('pauseStudyTimer');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pauseStudySession());
        }

        // Update timer display
        this.updateTimerDisplay();
    }

    startStudySession(course = null, topic = null) {
        if (this.currentSession) {
            this.showToast('A study session is already active', 'info');
            return;
        }

        this.currentSession = {
            id: `session_${Date.now()}`,
            startTime: new Date().toISOString(),
            course: course,
            topic: topic,
            duration: 0,
            focusScore: 100,
            interruptions: 0
        };

        this.elapsedTime = 0;
        this.startTime = Date.now();

        // Start timer
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateTimerDisplay();
            
            // Decrease focus score over time
            if (this.currentSession && this.elapsedTime % 300 === 0) { // Every 5 minutes
                this.currentSession.focusScore = Math.max(50, this.currentSession.focusScore - 5);
            }
        }, 1000);

        // Setup inactivity detection
        this.setupInactivityDetection();

        this.showToast('Study session started! 🎯', 'success');
        this.updateSessionUI(true);
    }

    stopStudySession() {
        if (!this.currentSession) return;

        clearInterval(this.timerInterval);
        this.timerInterval = null;

        this.currentSession.endTime = new Date().toISOString();
        this.currentSession.duration = this.elapsedTime;
        
        // Calculate productivity score
        this.currentSession.productivityScore = this.calculateProductivityScore();
        
        // Save session
        this.studySessions.push(this.currentSession);
        
        // Update streak
        this.updateStreak();
        
        // Update metrics
        this.updatePerformanceMetrics();
        
        // Save data
        this.saveData();
        
        // Show summary
        this.showSessionSummary(this.currentSession);
        
        // Reset
        this.currentSession = null;
        this.elapsedTime = 0;
        
        this.updateTimerDisplay();
        this.updateSessionUI(false);
        
        this.showToast('Study session completed! 📚', 'success');
    }

    pauseStudySession() {
        if (!this.currentSession || !this.timerInterval) return;
        
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        
        this.showToast('Study session paused', 'info');
    }

    resumeStudySession() {
        if (!this.currentSession || this.timerInterval) return;
        
        this.startTime = Date.now() - (this.elapsedTime * 1000);
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.updateTimerDisplay();
        }, 1000);
        
        this.showToast('Study session resumed', 'info');
    }

    calculateProductivityScore() {
        if (!this.currentSession) return 0;
        
        const baseScore = Math.min(100, Math.floor(this.elapsedTime / 60)); // 1 point per minute, max 100
        const focusBonus = this.currentSession.focusScore * 0.5;
        const interruptionPenalty = this.currentSession.interruptions * 10;
        
        return Math.max(0, baseScore + focusBonus - interruptionPenalty);
    }

    setupInactivityDetection() {
        let lastActivity = Date.now();
        
        const activityHandler = () => {
            lastActivity = Date.now();
        };
        
        // Track user activity
        ['mousemove', 'keypress', 'click', 'scroll'].forEach(event => {
            document.addEventListener(event, activityHandler);
        });
        
        // Check for inactivity every minute
        const inactivityCheck = setInterval(() => {
            if (!this.currentSession) {
                clearInterval(inactivityCheck);
                return;
            }
            
            const inactiveTime = Date.now() - lastActivity;
            if (inactiveTime > 300000) { // 5 minutes
                this.currentSession.interruptions++;
                this.currentSession.focusScore = Math.max(20, this.currentSession.focusScore - 20);
                lastActivity = Date.now(); // Reset
                
                this.showToast('Taking a break? Your focus score decreased.', 'warning');
            }
        }, 60000);
        
        // Store interval for cleanup
        this.inactivityInterval = inactivityCheck;
    }

    updateTimerDisplay() {
        const timerDisplay = document.getElementById('studyTimerDisplay');
        if (!timerDisplay) return;
        
        const hours = Math.floor(this.elapsedTime / 3600);
        const minutes = Math.floor((this.elapsedTime % 3600) / 60);
        const seconds = this.elapsedTime % 60;
        
        timerDisplay.textContent = 
            `${hours.toString().padStart(2, '0')}:` +
            `${minutes.toString().padStart(2, '0')}:` +
            `${seconds.toString().padStart(2, '0')}`;
        
        // Update focus score display
        const focusDisplay = document.getElementById('focusScore');
        if (focusDisplay && this.currentSession) {
            focusDisplay.textContent = `${this.currentSession.focusScore}%`;
            focusDisplay.style.color = 
                this.currentSession.focusScore >= 80 ? '#22c55e' :
                this.currentSession.focusScore >= 60 ? '#f59e0b' :
                '#ef4444';
        }
    }

    updateSessionUI(isActive) {
        const startBtn = document.getElementById('startStudyTimer');
        const stopBtn = document.getElementById('stopStudyTimer');
        const pauseBtn = document.getElementById('pauseStudyTimer');
        const resumeBtn = document.getElementById('resumeStudyTimer');
        
        if (startBtn) startBtn.style.display = isActive ? 'none' : 'block';
        if (stopBtn) stopBtn.style.display = isActive ? 'block' : 'none';
        if (pauseBtn) pauseBtn.style.display = isActive ? 'block' : 'none';
        if (resumeBtn) resumeBtn.style.display = 'none';
    }

    showSessionSummary(session) {
        const summary = `
            <div class="glass rounded-xl p-6 mb-4">
                <h4 class="text-white font-bold mb-4">Session Summary</h4>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-gray-400 text-sm">Duration</div>
                        <div class="text-white font-bold">${Math.floor(session.duration / 60)} min</div>
                    </div>
                    <div>
                        <div class="text-gray-400 text-sm">Focus Score</div>
                        <div class="text-white font-bold">${session.focusScore}%</div>
                    </div>
                    <div>
                        <div class="text-gray-400 text-sm">Productivity</div>
                        <div class="text-white font-bold">${session.productivityScore} pts</div>
                    </div>
                    <div>
                        <div class="text-gray-400 text-sm">Interruptions</div>
                        <div class="text-white font-bold">${session.interruptions}</div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert summary into page
        const summaryContainer = document.getElementById('sessionSummary');
        if (summaryContainer) {
            summaryContainer.innerHTML = summary;
        }
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastStudy = localStorage.getItem('aplus_last_study_date');
        
        if (lastStudy === today) {
            // Already studied today
            return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastStudy === yesterday.toDateString()) {
            // Studied yesterday, increase streak
            this.streak++;
        } else if (lastStudy && lastStudy !== today) {
            // Missed a day, reset streak
            this.streak = 1;
        } else {
            // First time studying
            this.streak = 1;
        }
        
        localStorage.setItem('aplus_last_study_date', today);
        this.saveData();
        
        // Update streak display
        this.updateStreakDisplay();
    }

    updateStreakDisplay() {
        const streakDisplay = document.getElementById('learningStreak');
        if (streakDisplay) {
            streakDisplay.textContent = `${this.streak} days`;
            
            // Add flame emojis based on streak length
            let flames = '';
            if (this.streak >= 7) flames = '🔥 '.repeat(Math.min(3, Math.floor(this.streak / 7)));
            streakDisplay.innerHTML += ` ${flames}`;
        }
    }

    setupGoalTracking() {
        // Load default goals if none exist
        if (this.learningGoals.length === 0) {
            this.learningGoals = [
                {
                    id: 'goal_1',
                    title: 'Complete Pure Mathematics Course',
                    course: 'pure-mathematics',
                    target: 100,
                    current: 0,
                    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
                    priority: 'high'
                },
                {
                    id: 'goal_2',
                    title: 'Study 20 hours this week',
                    type: 'study_hours',
                    target: 20,
                    current: 0,
                    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
                    priority: 'medium'
                }
            ];
            this.saveData();
        }
        
        this.updateGoalProgress();
        this.renderGoals();
    }

    updateGoalProgress() {
        // Update course-based goals
        this.learningGoals.forEach(goal => {
            if (goal.course && window.courseManager) {
                const progress = window.courseManager.courses[goal.course]?.progress || 0;
                goal.current = progress;
            } else if (goal.type === 'study_hours') {
                // Calculate study hours from sessions in the last 7 days
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                const recentSessions = this.studySessions.filter(s => 
                    new Date(s.startTime) > weekAgo
                );
                goal.current = recentSessions.reduce((total, s) => 
                    total + (s.duration || 0) / 3600, 0
                );
            }
        });
    }

    renderGoals() {
        const goalsContainer = document.getElementById('learningGoals');
        if (!goalsContainer) return;
        
        goalsContainer.innerHTML = this.learningGoals.map(goal => `
            <div class="glass rounded-xl p-4 mb-3">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="text-white font-semibold">${goal.title}</h4>
                    <span class="px-2 py-1 rounded text-xs ${
                        goal.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                    }">
                        ${goal.priority}
                    </span>
                </div>
                <div class="mb-2">
                    <div class="flex justify-between text-sm mb-1">
                        <span class="text-gray-300">Progress</span>
                        <span class="text-primary font-bold">${Math.round(goal.current)}/${goal.target}</span>
                    </div>
                    <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div class="h-full bg-primary rounded-full" 
                             style="width: ${Math.min(100, (goal.current / goal.target) * 100)}%"></div>
                    </div>
                </div>
                <div class="text-xs text-gray-400">
                    Deadline: ${new Date(goal.deadline).toLocaleDateString()}
                </div>
            </div>
        `).join('');
    }

    setupPerformanceAnalytics() {
        this.performanceMetrics = this.performanceMetrics || {
            dailyAverage: 0,
            weeklyTotal: 0,
            focusTrend: [],
            productivityHistory: [],
            improvementRate: 0
        };
        
        this.calculateMetrics();
        this.setupPerformanceCharts();
    }

    calculateMetrics() {
        // Calculate daily average study time
        const today = new Date().toDateString();
        const todaySessions = this.studySessions.filter(s => 
            new Date(s.startTime).toDateString() === today
        );
        this.performanceMetrics.dailyAverage = todaySessions.reduce((total, s) => 
            total + (s.duration || 0), 0
        ) / 3600; // Convert to hours
        
        // Calculate weekly total
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const weeklySessions = this.studySessions.filter(s => 
            new Date(s.startTime) > weekAgo
        );
        this.performanceMetrics.weeklyTotal = weeklySessions.reduce((total, s) => 
            total + (s.duration || 0), 0
        ) / 3600;
        
        // Update focus trend (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toDateString();
        }).reverse();
        
        this.performanceMetrics.focusTrend = last7Days.map(date => {
            const daySessions = this.studySessions.filter(s => 
                new Date(s.startTime).toDateString() === date
            );
            const avgFocus = daySessions.length > 0 ? 
                daySessions.reduce((sum, s) => sum + (s.focusScore || 0), 0) / daySessions.length : 
                0;
            return { date, focus: avgFocus };
        });
    }

    setupPerformanceCharts() {
        // Focus Trend Chart
        const focusCtx = document.getElementById('focusTrendChart');
        if (focusCtx) {
            new Chart(focusCtx, {
                type: 'line',
                data: {
                    labels: this.performanceMetrics.focusTrend.map(d => 
                        new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })
                    ),
                    datasets: [{
                        label: 'Focus Score',
                        data: this.performanceMetrics.focusTrend.map(d => d.focus),
                        borderColor: '#0ea5e9',
                        backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }
        
        // Productivity Chart
        const productivityCtx = document.getElementById('productivityChart');
        if (productivityCtx) {
            // Group sessions by day for last 7 days
            const productivityByDay = this.performanceMetrics.focusTrend.map(day => {
                const daySessions = this.studySessions.filter(s => 
                    new Date(s.startTime).toDateString() === day.date
                );
                return daySessions.reduce((total, s) => total + (s.productivityScore || 0), 0);
            });
            
            new Chart(productivityCtx, {
                type: 'bar',
                data: {
                    labels: this.performanceMetrics.focusTrend.map(d => 
                        new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })
                    ),
                    datasets: [{
                        label: 'Productivity Score',
                        data: productivityByDay,
                        backgroundColor: '#22c55e',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }
    }

    updateDashboard() {
        // Update dashboard metrics
        this.updateGoalProgress();
        this.renderGoals();
        this.updateStreakDisplay();
        
        // Update metrics display
        const dailyAvg = document.getElementById('dailyStudyAvg');
        const weeklyTotal = document.getElementById('weeklyStudyTotal');
        const focusAvg = document.getElementById('averageFocus');
        
        if (dailyAvg) {
            dailyAvg.textContent = `${this.performanceMetrics.dailyAverage.toFixed(1)}h`;
        }
        
        if (weeklyTotal) {
            weeklyTotal.textContent = `${this.performanceMetrics.weeklyTotal.toFixed(1)}h`;
        }
        
        if (focusAvg) {
            const avgFocus = this.performanceMetrics.focusTrend.length > 0 ? 
                this.performanceMetrics.focusTrend.reduce((sum, d) => sum + d.focus, 0) / 
                this.performanceMetrics.focusTrend.length : 0;
            focusAvg.textContent = `${avgFocus.toFixed(0)}%`;
        }
    }

    startAutoTracking() {
        // Update metrics every minute
        setInterval(() => {
            this.calculateMetrics();
            this.updateDashboard();
        }, 60000);
        
        // Save data every 5 minutes
        setInterval(() => {
            this.saveData();
        }, 300000);
    }

    generateStudyReport(period = 'week') {
        const now = new Date();
        let startDate;
        
        switch (period) {
            case 'day':
                startDate = new Date(now.setDate(now.getDate() - 1));
                break;
            case 'week':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'month':
                startDate = new Date(now.setMonth(now.getMonth() - 1));
                break;
            default:
                startDate = new Date(now.setDate(now.getDate() - 7));
        }
        
        const sessions = this.studySessions.filter(s => 
            new Date(s.startTime) > startDate
        );
        
        const totalTime = sessions.reduce((total, s) => total + (s.duration || 0), 0);
        const avgFocus = sessions.length > 0 ? 
            sessions.reduce((sum, s) => sum + (s.focusScore || 0), 0) / sessions.length : 0;
        const totalProductivity = sessions.reduce((total, s) => total + (s.productivityScore || 0), 0);
        
        return {
            period,
            totalSessions: sessions.length,
            totalTime: Math.round(totalTime / 3600 * 10) / 10, // hours
            averageFocus: Math.round(avgFocus),
            totalProductivity,
            averageSessionLength: sessions.length > 0 ? 
                Math.round(totalTime / sessions.length / 60) : 0, // minutes
            bestSession: sessions.reduce((best, s) => 
                s.productivityScore > (best?.productivityScore || 0) ? s : best, null
            ),
            recommendations: this.generateRecommendations(sessions)
        };
    }

    generateRecommendations(sessions) {
        const recommendations = [];
        
        // Check for irregular study patterns
        const sessionTimes = sessions.map(s => new Date(s.startTime).getHours());
        const morningSessions = sessionTimes.filter(h => h < 12).length;
        const afternoonSessions = sessionTimes.filter(h => h >= 12 && h < 18).length;
        const eveningSessions = sessionTimes.filter(h => h >= 18).length;
        
        if (morningSessions < sessions.length * 0.3) {
            recommendations.push('Try studying more in the morning when focus is typically higher');
        }
        
        // Check for short sessions
        const shortSessions = sessions.filter(s => (s.duration || 0) < 900).length; // Less than 15 minutes
        if (shortSessions > sessions.length * 0.5) {
            recommendations.push('Aim for longer, more focused study sessions (25-50 minutes)');
        }
        
        // Check focus scores
        const lowFocusSessions = sessions.filter(s => (s.focusScore || 0) < 70).length;
        if (lowFocusSessions > sessions.length * 0.4) {
            recommendations.push('Consider using focus techniques like Pomodoro or eliminating distractions');
        }
        
        // Default recommendation
        if (recommendations.length === 0) {
            recommendations.push('Great study habits! Keep up the consistency');
        }
        
        return recommendations;
    }

    showToast(message, type = 'info') {
        if (window.aplusPlatform?.showToast) {
            window.aplusPlatform.showToast(message, type);
        }
    }

    // Export methods
    exportMethods() {
        return {
            startStudySession: (course, topic) => this.startStudySession(course, topic),
            stopStudySession: () => this.stopStudySession(),
            getStudyReport: (period) => this.generateStudyReport(period),
            getStreak: () => this.streak,
            addGoal: (goal) => {
                goal.id = `goal_${Date.now()}`;
                this.learningGoals.push(goal);
                this.saveData();
                this.renderGoals();
            }
        };
    }
}

// Initialize Progress Tracker
const progressTracker = new ProgressTracker();
window.progressTracker = progressTracker;

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProgressTracker };
}