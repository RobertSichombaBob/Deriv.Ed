// MIT-style Course Detail Manager
document.addEventListener('DOMContentLoaded', function() {
    console.log('A+ Initiative Course Manager loaded');
    
    // Initialize all components
    initLoadingScreen();
    initMobileMenu();
    initCourseData();
    initNavigationScroll();
    initTimer();
    initAudienceSelector();
    initScheduleFilters();
    initTeamFilters();
    initFAQAccordion();
    initBackToTop();
    initEnrollment();
    initFileManager();
    
    // Show page content
    setTimeout(() => {
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add custom styles for enhanced UX
    addResourceStyles();
});

// Add custom styles for resource links
function addResourceStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .schedule-resources {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
        }
        
        .resource-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .resource-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        .resource-link:active {
            transform: translateY(1px);
        }
        
        .resource-link i {
            font-size: 14px;
        }
        
        .resource-link.pdf {
            background: linear-gradient(135deg, #074519 0%, #054a2b 100%);
        }
        
        .resource-link.pdf:hover {
            background: linear-gradient(135deg, #078975 0%, #492e8d 100%);
        }
        
        .resource-link.video {
            background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
        }
        
        .resource-link.video:hover {
            background: linear-gradient(135deg, #3182ce 0%, #4299e1 100%);
        }
        
        .resource-link.code {
            background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
        }
        
        .resource-link.code:hover {
            background: linear-gradient(135deg, #2f855a 0%, #38a169 100%);
        }
        
        .resource-link.problems {
            background: linear-gradient(135deg, #ac73e5 0%, #6c20dd 100%);
        }
        
        .resource-link.problems:hover {
            background: linear-gradient(135deg, #59710e 0%, #8faa3f 100%);
        }
        
        .schedule-item:hover .resource-link {
            opacity: 1;
        }
        
        .file-info {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: #6c757d;
            margin-top: 8px;
        }
        
        .file-size {
            background: #e9ecef;
            padding: 2px 6px;
            border-radius: 4px;
        }
        
        .file-format {
            background: #d1ecf1;
            color: #0c5460;
            padding: 2px 6px;
            border-radius: 4px;
        }
        
        .week-badge {
            background: var(--primary);
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            margin-left: 8px;
        }
        
        .download-all-btn {
            margin: 20px 0;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .download-all-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1);
        }
        
        .week-separator {
            width: 100%;
            text-align: center;
            margin: 30px 0 20px;
            position: relative;
        }
        
        .week-separator h3 {
            background: white;
            padding: 0 20px;
            display: inline-block;
            color: var(--primary);
            font-weight: 600;
        }
        
        .week-separator::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
            z-index: -1;
        }
    `;
    document.head.appendChild(style);
}

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

// Initialize course data based on URL parameter
function initCourseData() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course') || 'mathematics';
    
    const courses = {
        mathematics: {
            name: 'Mathematics',
            subtitle: 'Pure Mathematics, Mechanics & Statistics',
            description: 'Master A-Level Mathematics with comprehensive coverage of Pure Mathematics, Mechanics, and Statistics. Learn from expert instructors and practice with real exam questions.',
            overview: 'An intensive program covering all A-Level Mathematics topics including calculus, algebra, mechanics, and statistics. Designed to help students achieve top grades through practical problem-solving and expert guidance.',
            time: 'Mon Jan 5 - Fri Aug 7, 2026',
            color: '#8b5cf6'
        },
        chemistry: {
            name: 'Chemistry',
            subtitle: 'Physical, Organic & Inorganic Chemistry',
            description: 'Complete A-Level Chemistry course covering physical, organic, and inorganic chemistry with hands-on laboratory simulations and problem-solving.',
            overview: 'Comprehensive coverage of A-Level Chemistry syllabus with emphasis on practical applications, laboratory techniques, and examination success strategies.',
            time: 'Mon Jan 5 - Fri Jul 31, 2026',
            color: '#3b82f6'
        },
        physics: {
            name: 'Physics',
            subtitle: 'Mechanics, Waves, Electricity & Modern Physics',
            description: 'Master A-Level Physics with interactive simulations, practical problem-solving, and comprehensive coverage of all examination topics.',
            overview: 'From classical mechanics to quantum physics, this course provides complete coverage of A-Level Physics with emphasis on practical applications and exam techniques.',
            time: 'Mon Jan 5 - Fri Jul 31, 2026',
            color: '#06b6d4'
        },
        'computer-science': {
            name: 'Computer Science',
            subtitle: 'Programming, Algorithms & Data Structures',
            description: 'Learn A-Level Computer Science with practical programming, algorithm design, and comprehensive theory coverage for examination success.',
            overview: 'Complete A-Level Computer Science program covering programming, algorithms, data structures, and computational thinking with hands-on projects.',
            time: 'Mon Sep 2 - Fri Dec 13, 2024',
            color: '#059669'
        }
    };
    
    const course = courses[courseId] || courses.mathematics;
    
    // Update page content
    document.title = `${course.name} - A+ Initiative`;
    document.getElementById('courseTitle').textContent = `${course.name} - A+ Initiative`;
    document.getElementById('courseName').textContent = course.name;
    document.getElementById('courseSubtitle').textContent = course.subtitle;
    document.getElementById('courseDescription').textContent = course.description;
    document.getElementById('courseOverview').textContent = course.overview;
    document.getElementById('courseTime').textContent = course.time;
    
    // Update colors
    document.documentElement.style.setProperty('--primary', course.color);
    
    // Generate schedule
    generateSchedule(courseId);
    
    // Generate team
    generateTeam(courseId);
    
    // Generate download all button
    generateDownloadAllButton(courseId);
}

// Initialize navigation scroll
function initNavigationScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', debounce(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100));
}

// Initialize countdown timer
function initTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl) return;
    
    // Set enrollment deadline (4 days from now)
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 4);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = deadline - now;
        
        if (distance < 0) {
            // Enrollment closed
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Initialize audience selector
function initAudienceSelector() {
    const audienceOptions = document.querySelectorAll('.audience-option');
    
    audienceOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            audienceOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            const audience = this.dataset.audience;
            
            // You could show different content based on audience
            if (audience === 'current') {
                showToast('Showing content for current A-Level students', 'info');
            } else {
                showToast('Showing content for everyone', 'info');
            }
        });
    });
}

// Helper function to generate file URLs
function getResourceUrl(course, week, title, type) {
    const baseUrl = 'https://robert-sichomba.github.io/aplus-initiative';
    
    // Clean title for filename
    const cleanTitle = title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '_');
    
    // Map resource types to file extensions
    const extensions = {
        slides: 'pdf',
        notes: 'pdf',
        problems: 'pdf',
        code: 'zip',
        pastpapers: 'pdf',
        exercises: 'pdf',
        project: 'zip',
        guidelines: 'pdf',
        solutions: 'pdf'
    };
    
    const ext = extensions[type] || 'pdf';
    
    // Generate URL based on course and week
    if (week) {
        return `${baseUrl}/resources/${course}/week${week}/${cleanTitle}_${type}.${ext}`;
    } else {
        return `${baseUrl}/resources/${course}/${cleanTitle}_${type}.${ext}`;
    }
}

// Generate complete schedule for all weeks
function generateSchedule(courseId) {
    const baseUrl = 'https://robertsichombabob.github.io/Deriv.Ed';
    const schedules = {
        mathematics: getMathematicsSchedule(baseUrl),
        chemistry: getChemistrySchedule(baseUrl),
        physics: getPhysicsSchedule(baseUrl),
        'computer-science': getComputerScienceSchedule(baseUrl)
    };
    
    const schedule = schedules[courseId] || schedules.mathematics;
    const container = document.getElementById('scheduleGrid');
    
    if (!container) return;
    
    let html = '';
    let currentWeek = 1;
    
    // Add week separator for first week
    html += `<div class="week-separator"><h3>Week ${currentWeek}</h3></div>`;
    
    schedule.forEach((item, index) => {
        // Check if we need to add a new week separator
        if (index > 0 && schedule[index - 1].week !== item.week) {
            currentWeek = item.week;
            html += `<div class="week-separator"><h3>Week ${currentWeek}</h3></div>`;
        }
        
        html += `
            <div class="schedule-item ${item.type}" data-type="${item.type}" data-week="${item.week}">
                <div class="schedule-type ${item.type}">
                    ${getTypeLabel(item.type)}
                </div>
                <h3 class="schedule-title">${item.title}</h3>
                <div class="schedule-date">
                    <i class="far fa-calendar"></i>
                    ${item.date}
                    <span class="week-badge">Week ${item.week}</span>
                </div>
                <div class="schedule-resources">
                    ${generateResourceLinks(item)}
                </div>
                ${(item.notes || item.slides || item.problems) ? `
                    <div class="file-info">
                        <span class="file-format">PDF</span>
                        <span class="file-size">2-5 MB</span>
                        <span class="download-tip">Click to view • Right-click to save</span>
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Generate resource links
function generateResourceLinks(item) {
    let links = [];
    
    const resourceTypes = [
        { key: 'slides', icon: 'file-powerpoint', label: 'Slides', class: 'pdf' },
        { key: 'notes', icon: 'file-pdf', label: 'Notes', class: 'pdf' },
        { key: 'video', icon: 'video', label: 'Video', class: 'video' },
        { key: 'code', icon: 'code', label: 'Code', class: 'code' },
        { key: 'problems', icon: 'tasks', label: 'Problems', class: 'problems' },
        { key: 'exercises', icon: 'dumbbell', label: 'Exercises', class: 'problems' },
        { key: 'pastpapers', icon: 'file-alt', label: 'Past Papers', class: 'pdf' },
        { key: 'solutions', icon: 'check-circle', label: 'Solutions', class: 'pdf' },
        { key: 'project', icon: 'project-diagram', label: 'Project', class: 'code' },
        { key: 'guidelines', icon: 'book', label: 'Guidelines', class: 'pdf' }
    ];
    
    resourceTypes.forEach(resource => {
        if (item[resource.key] && item[resource.key] !== '#') {
            links.push(`
                <a href="${item[resource.key]}" class="resource-link ${resource.class}" 
                   target="_blank" 
                   onclick="trackDownload('${item.title}', '${resource.key}')"
                   title="Download ${resource.label} for ${item.title}">
                    <i class="fas fa-${resource.icon}"></i> ${resource.label}
                </a>
            `);
        }
    });
    
    return links.join('');
}

// Get type label
function getTypeLabel(type) {
    const labels = {
        'lecture': '📚 Lecture',
        'lab': '🔬 Practice Lab',
        'workshop': '💡 Workshop',
        'review': '📝 Review Session',
        'midterm': '📊 Mid-term Review',
        'final': '🎯 Final Review'
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

// Initialize schedule filters
function initScheduleFilters() {
    const filterButtons = document.querySelectorAll('.schedule-filter');
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter items
            scheduleItems.forEach(item => {
                if (filter === 'all' || item.dataset.type === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Generate download all button
function generateDownloadAllButton(courseId) {
    const container = document.getElementById('downloadAllContainer');
    if (!container) return;
    
    container.innerHTML = `
        <button class="download-all-btn" onclick="downloadAllResources('${courseId}')">
            <i class="fas fa-download"></i> Download All Resources (ZIP)
        </button>
        <p style="font-size: 0.9em; color: #666; margin-top: 8px;">
            Contains all PDFs, slides, notes, and problems for the entire course
        </p>
    `;
}

// Download all resources
function downloadAllResources(courseId) {
    showToast('Preparing download bundle...', 'info');
    
    // In a real implementation, you would:
    // 1. Create a server endpoint that zips all resources
    // 2. Provide a download link
    
    setTimeout(() => {
        showToast('Download bundle ready! Starting download...', 'success');
        
        // Simulate download
        setTimeout(() => {
            // This would be the actual download link
            // window.location.href = `/api/download-all/${courseId}`;
            showToast('Download complete! Check your downloads folder.', 'success');
        }, 1500);
    }, 2000);
}

// Initialize file manager
function initFileManager() {
    // Create file manager controls
    const fileManagerHTML = `
        <div class="file-manager" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <h4 style="margin-bottom: 10px;">📁 File Manager</h4>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="showRecentDownloads()" class="resource-link" style="margin: 0;">
                    <i class="fas fa-history"></i> Recent Downloads
                </button>
                <button onclick="clearDownloadHistory()" class="resource-link" style="margin: 0;">
                    <i class="fas fa-trash"></i> Clear History
                </button>
                <button onclick="exportDownloadHistory()" class="resource-link" style="margin: 0;">
                    <i class="fas fa-file-export"></i> Export History
                </button>
            </div>
        </div>
    `;
    
    const scheduleContainer = document.getElementById('scheduleGrid');
    if (scheduleContainer) {
        scheduleContainer.insertAdjacentHTML('beforebegin', fileManagerHTML);
    }
}

// Show recent downloads
function showRecentDownloads() {
    const downloads = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    
    if (downloads.length === 0) {
        showToast('No download history found', 'info');
        return;
    }
    
    let message = 'Recent Downloads:\n';
    downloads.slice(0, 5).forEach((d, i) => {
        const date = new Date(d.timestamp).toLocaleDateString();
        message += `${i+1}. ${d.title} (${date})\n`;
    });
    
    showToast(message, 'info');
}

// Clear download history
function clearDownloadHistory() {
    localStorage.removeItem('downloadHistory');
    showToast('Download history cleared', 'success');
}

// Export download history
function exportDownloadHistory() {
    const downloads = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    
    if (downloads.length === 0) {
        showToast('No download history to export', 'info');
        return;
    }
    
    const csv = [
        ['Date', 'Time', 'Course', 'Resource', 'Type'],
        ...downloads.map(d => [
            new Date(d.timestamp).toLocaleDateString(),
            new Date(d.timestamp).toLocaleTimeString(),
            d.course || 'Unknown',
            d.title,
            d.type || 'download'
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aplus-downloads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast('Download history exported as CSV', 'success');
}

// Track downloads
function trackDownload(title, type) {
    const course = document.getElementById('courseName')?.textContent || 'Unknown';
    const download = {
        title: title,
        type: type,
        timestamp: new Date().toISOString(),
        course: course
    };
    
    // Save to localStorage
    const history = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    history.unshift(download);
    localStorage.setItem('downloadHistory', JSON.stringify(history.slice(0, 100))); // Keep last 100
    
    // Show confirmation
    setTimeout(() => {
        showToast(`Downloaded: ${title}`, 'success');
    }, 500);
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

// ================ MATHEMATICS SCHEDULE (31 Weeks) ================
function getMathematicsSchedule(baseUrl) {
    return [
        // Week 1
        { type: 'lecture', title: 'Set Theory', date: 'Jan 5, 2026', week: 1,
            slides: `${baseUrl}/resources/mathematics/week1/set_theory_slides.pdf`,
            notes: `${baseUrl}/resources/mathematics/week1/set_theory.pdf`,
            video: 'https://youtu.be/example-set-theory' },
        { type: 'workshop', title: 'Set Theory Practice', date: 'Jan 6, 2026', week: 1,
            problems: `${baseUrl}/resources/mathematics/week1/set_theory_problems.pdf`,
            solutions: `${baseUrl}/resources/mathematics/week1/set_theory_solutions.pdf` },
        
        // Week 2
        { type: 'lecture', title: 'Set of Numbers', date: 'Jan 12, 2026', week: 2,
            slides: `${baseUrl}/resources/mathematics/week2/set_of_numbers_slides.pdf`,
            notes: `${baseUrl}/resources/mathematics/week2/set_of_numbers_notes.pdf` },
        { type: 'lecture', title: 'Exponents and Indices', date: 'Jan 13, 2026', week: 2,
            slides: `${baseUrl}/resources/mathematics/week2/exponents_indices_slides.pdf`,
            notes: `${baseUrl}/resources/mathematics/week2/exponents_indices_notes.pdf` },
        // Continue adding weeks 3-30 with similar structure...
];
}

// ================ CHEMISTRY SCHEDULE (30 Weeks) ================
function getChemistrySchedule(baseUrl) {
    return [
        // Week 1
        { type: 'lecture', title: 'Chemical Foundations & Measurement', date: 'Jan 5, 2026', week: 1,
            slides: `${baseUrl}/resources/chemistry/week1/chemical_foundations_slides.pdf`,
            notes: `${baseUrl}/resources/chemistry/week1/chemical_foundations_notes.pdf` },
        { type: 'lecture', title: 'Atomic Structure & Periodicity', date: 'Jan 6, 2026', week: 1,
            slides: `${baseUrl}/resources/chemistry/week1/atomic_structure_slides.pdf`,
            notes: `${baseUrl}/resources/chemistry/week1/atomic_structure_notes.pdf` },
        
        // Week 2
        { type: 'lab', title: 'Chemical Measurement Techniques', date: 'Jan 12, 2026', week: 2,
            problems: `${baseUrl}/resources/chemistry/week2/measurement_techniques_problems.pdf` },
        { type: 'workshop', title: 'Stoichiometry Practice Session', date: 'Jan 13, 2026', week: 2,
            problems: `${baseUrl}/resources/chemistry/week2/stoichiometry_practice_problems.pdf` },
        
        // Continue adding weeks 3-30 with similar structure...
        // For brevity, showing pattern for first 2 weeks
    ];
}

// ================ PHYSICS SCHEDULE (28 Weeks) ================
function getPhysicsSchedule(baseUrl) {
    return [
        // Week 1
        { type: 'lecture', title: 'Dimensions and Units', date: 'Jan 5, 2026', week: 1,
            slides: `${baseUrl}/resources/physics/week1/dimensions_units_slides.pdf`,
            notes: `${baseUrl}/resources/physics/week1/dimensions_units_notes.pdf` },
        { type: 'workshop', title: 'Unit Conversion Practice', date: 'Jan 6, 2026', week: 1,
            problems: `${baseUrl}/resources/physics/week1/unit_conversion_problems.pdf` },
        
        // Week 2
        { type: 'lecture', title: 'Vectors: Properties and Components', date: 'Jan 12, 2026', week: 2,
            slides: `${baseUrl}/resources/physics/week2/vectors_properties_slides.pdf`,
            notes: `${baseUrl}/resources/physics/week2/vectors_properties_notes.pdf` },
        { type: 'lecture', title: 'Vector Operations', date: 'Jan 13, 2026', week: 2,
            slides: `${baseUrl}/resources/physics/week2/vector_operations_slides.pdf`,
            notes: `${baseUrl}/resources/physics/week2/vector_operations_notes.pdf` },
        
        // Continue adding weeks 3-28 with similar structure...
    ];
}

// ================ COMPUTER SCIENCE SCHEDULE (10 Weeks) ================
function getComputerScienceSchedule(baseUrl) {
    return [
        { type: 'lecture', title: 'Introduction to Programming', date: 'Sep 2, 2024', week: 1,
            slides: `${baseUrl}/resources/computer-science/week1/programming_intro_slides.pdf`,
            notes: `${baseUrl}/resources/computer-science/week1/programming_intro_notes.pdf` },
        { type: 'lecture', title: 'Data Structures', date: 'Sep 9, 2024', week: 2,
            slides: `${baseUrl}/resources/computer-science/week2/data_structures_slides.pdf`,
            notes: `${baseUrl}/resources/computer-science/week2/data_structures_notes.pdf` },
        { type: 'lab', title: 'Python Programming Lab', date: 'Sep 16, 2024', week: 3,
            code: `${baseUrl}/resources/computer-science/week3/python_lab_code.zip`,
            exercises: `${baseUrl}/resources/computer-science/week3/python_lab_exercises.pdf` },
        { type: 'lecture', title: 'Algorithms', date: 'Sep 23, 2024', week: 4,
            slides: `${baseUrl}/resources/computer-science/week4/algorithms_slides.pdf`,
            notes: `${baseUrl}/resources/computer-science/week4/algorithms_notes.pdf` },
        { type: 'workshop', title: 'Object-Oriented Programming', date: 'Sep 30, 2024', week: 5,
            slides: `${baseUrl}/resources/computer-science/week5/oop_slides.pdf`,
            code: `${baseUrl}/resources/computer-science/week5/oop_code.zip` },
        { type: 'lecture', title: 'Databases', date: 'Oct 7, 2024', week: 6,
            slides: `${baseUrl}/resources/computer-science/week6/databases_slides.pdf`,
            notes: `${baseUrl}/resources/computer-science/week6/databases_notes.pdf` },
        { type: 'lecture', title: 'Computer Networks', date: 'Oct 14, 2024', week: 7,
            slides: `${baseUrl}/resources/computer-science/week7/networks_slides.pdf`,
            notes: `${baseUrl}/resources/computer-science/week7/networks_notes.pdf` },
        { type: 'lab', title: 'Web Development Project', date: 'Oct 21, 2024', week: 8,
            code: `${baseUrl}/resources/computer-science/week8/web_project_code.zip`,
            project: `${baseUrl}/resources/computer-science/week8/web_project_guidelines.pdf` },
        { type: 'lecture', title: 'Theory of Computation', date: 'Oct 28, 2024', week: 9,
            slides: `${baseUrl}/resources/computer-science/week9/computation_theory_slides.pdf`,
            notes: `${baseUrl}/resources/computer-science/week9/computation_theory_notes.pdf` },
        { type: 'workshop', title: 'Final Project Development', date: 'Nov 4, 2024', week: 10,
            slides: `${baseUrl}/resources/computer-science/week10/final_project_slides.pdf`,
            guidelines: `${baseUrl}/resources/computer-science/week10/final_project_guidelines.pdf` }
    ];
}

// ================ TEAM GENERATION ================
function generateTeam(courseId) {
    const teams = {
        mathematics: [
            { name: 'Mr. R. Sichomba', role: 'Lead Instructor', department: 'Mathematics', bio: 'MSc in Data Science and Exploration Geology from The Copperbelt University, 3+ years teaching experience', avatar: 'JW' },
            ],
        chemistry: [
            { name: 'Mr. R. Sichomba', role: 'Lead Instructor', department: 'Mathematics', bio: 'MSc in Data Science and Exploration Geology from The Copperbelt University, 3+ years teaching experience', avatar: 'JW' },
           ],
        physics: [
            { name: 'Mr. R. Sichomba', role: 'Lead Instructor', department: 'Mathematics', bio: 'MSc in Data Science and Exploration Geology from The Copperbelt University, 3+ years teaching experience', avatar: 'JW' },
           ],
        'computer-science': [
            { name: 'Mr. R. Sichomba', role: 'Lead Instructor', department: 'Mathematics', bio: 'MSc in Data Science and Exploration Geology from The Copperbelt University, 3+ years teaching experience', avatar: 'JW' },
            ]
    };
    
    const team = teams[courseId] || teams.mathematics;
    const container = document.getElementById('teamGrid');
    
    if (!container) return;
    
    container.innerHTML = team.map(member => `
        <div class="team-member" data-role="${member.role.includes('TA') ? 'ta' : 'instructor'}">
            <div class="member-avatar">${member.avatar}</div>
            <h3 class="member-name">${member.name}</h3>
            <div class="member-role">${member.role}</div>
            <div class="member-department">${member.department}</div>
            <p class="member-bio">${member.bio}</p>
            <a href="mailto:${member.avatar.toLowerCase()}@aplus-initiative.edu" class="resource-link" style="margin-top: 10px;">
                <i class="fas fa-envelope"></i> Contact
            </a>
        </div>
    `).join('');
}

// Initialize team filters
function initTeamFilters() {
    const filterButtons = document.querySelectorAll('.team-filter');
    const teamMembers = document.querySelectorAll('.team-member');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.role;
            
            // Filter members
            teamMembers.forEach(member => {
                if (filter === 'all' || member.dataset.role === filter) {
                    member.style.display = 'block';
                    setTimeout(() => {
                        member.style.opacity = '1';
                        member.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    member.style.opacity = '0';
                    member.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        member.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize FAQ accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });
            
            // Toggle current FAQ
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Open first FAQ by default
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
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
    const enrollButtons = document.getElementById('enrollBtn');
    const mobileEnrollBtn = document.getElementById('mobileEnrollBtn');
    
    function handleEnrollment() {
        showToast('Enrollment process starting...', 'info');
        // Simulate enrollment process
        setTimeout(() => {
            showToast('Successfully enrolled in the course! Check your email for details.', 'success');
        }, 1000);
    }
    
    if (enrollButtons) {
        enrollButtons.addEventListener('click', handleEnrollment);
    }
    
    if (mobileEnrollBtn) {
        mobileEnrollBtn.addEventListener('click', handleEnrollment);
    }
    
    // Handle resource downloads with tracking
    document.addEventListener('click', function(e) {
        const resourceLink = e.target.closest('.resource-link');
        if (resourceLink && resourceLink.href) {
            const resourceName = resourceLink.textContent.trim();
            const fileName = resourceLink.href.split('/').pop();
            
            // Track download
            trackDownload(resourceName, fileName);
        }
    });
}