// MIT-style Course Detail Manager
document.addEventListener('DOMContentLoaded', function() {
    console.log('MIT Course Manager loaded');
    
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
            time: 'Mon Sep 2 - Fri Dec 13, 2024',
            color: '#8b5cf6'
        },
        chemistry: {
            name: 'Chemistry',
            subtitle: 'Physical, Organic & Inorganic Chemistry',
            description: 'Complete A-Level Chemistry course covering physical, organic, and inorganic chemistry with hands-on laboratory simulations and problem-solving.',
            overview: 'Comprehensive coverage of A-Level Chemistry syllabus with emphasis on practical applications, laboratory techniques, and examination success strategies.',
            time: 'Mon Sep 2 - Fri Dec 13, 2024',
            color: '#3b82f6'
        },
        physics: {
            name: 'Physics',
            subtitle: 'Mechanics, Waves, Electricity & Modern Physics',
            description: 'Master A-Level Physics with interactive simulations, practical problem-solving, and comprehensive coverage of all examination topics.',
            overview: 'From classical mechanics to quantum physics, this course provides complete coverage of A-Level Physics with emphasis on practical applications and exam techniques.',
            time: 'Mon Sep 2 - Fri Dec 13, 2024',
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
            console.log(`Audience selected: ${audience}`);
            
            // You could show different content based on audience
            if (audience === 'current') {
                showToast('Showing content for current A-Level students', 'info');
            } else {
                showToast('Showing content for everyone', 'info');
            }
        });
    });
}

// Generate schedule
function generateSchedule(courseId) {
    const schedules = {
       mathematics: [
    // Week 1 (Jan 5-9, 2026)
    { type: 'lecture', title: 'Set Theory', date: 'Jan 5, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Set Theory Practice', date: 'Jan 6, 2026', slides: '#', problems: '#' },
    
    // Week 2 (Jan 12-16, 2026)
                    { type: 'lecture', title: 'Set of Numbers', date: 'Jan 12, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Exponents and Indices', date: 'Jan 13, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 3 (Jan 19-23, 2026)
    { type: 'lab', title: 'Surds Practice Session', date: 'Jan 19, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Laws of Indices Review', date: 'Jan 20, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 4 (Jan 26-30, 2026)
    { type: 'lecture', title: 'Complex Numbers - Introduction', date: 'Jan 26, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Complex Numbers Workshop', date: 'Jan 27, 2026', slides: '#', problems: '#' },
    
    // Week 5 (Feb 2-6, 2026)
    { type: 'lecture', title: 'Equations and Problem Solving', date: 'Feb 2, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Inequalities Fundamentals', date: 'Feb 3, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 6 (Feb 9-13, 2026)
    { type: 'lab', title: 'Equations Practice Lab', date: 'Feb 9, 2026', code: '#', problems: '#' },
    { type: 'workshop', title: 'Inequalities Workshop', date: 'Feb 10, 2026', slides: '#', problems: '#' },
    
    // Week 7 (Feb 16-20, 2026)
    { type: 'lecture', title: 'Quadratic Equations', date: 'Feb 16, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Quadratic Formula Applications', date: 'Feb 17, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 8 (Feb 23-27, 2026)
    { type: 'lab', title: 'Quadratic Equations Practice', date: 'Feb 23, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Functions Introduction', date: 'Feb 24, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 9 (Mar 2-6, 2026)
    { type: 'lecture', title: 'Function Properties and Graphs', date: 'Mar 2, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Functions Workshop', date: 'Mar 3, 2026', slides: '#', problems: '#' },
    
    // Week 10 (Mar 9-13, 2026)
    { type: 'lecture', title: 'Quadratic Functions', date: 'Mar 9, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Polynomial Functions', date: 'Mar 10, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 11 (Mar 16-20, 2026)
    { type: 'lab', title: 'Polynomial Practice', date: 'Mar 16, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Polynomial Equations', date: 'Mar 17, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 12 (Mar 23-27, 2026)
    { type: 'lecture', title: 'Sketching Rational Functions', date: 'Mar 23, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Piece-wise Functions Workshop', date: 'Mar 24, 2026', slides: '#', problems: '#' },
    
    // Week 13 (Mar 30 - Apr 3, 2026)
    { type: 'lecture', title: 'Arithmetic Sequences', date: 'Mar 30, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Geometric Sequences', date: 'Mar 31, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 14 (Apr 6-10, 2026) - Spring Break Week
    { type: 'workshop', title: 'Sequences Problem Solving', date: 'Apr 6, 2026', slides: '#', problems: '#' },
    { type: 'review', title: 'Mid-Term Review Session', date: 'Apr 7, 2026', slides: '#', problems: '#' },
    
    // Week 15 (Apr 13-17, 2026)
    { type: 'lecture', title: 'Mathematical Induction', date: 'Apr 13, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Induction Practice Lab', date: 'Apr 14, 2026', code: '#', problems: '#' },
    
    // Week 16 (Apr 20-24, 2026)
    { type: 'lecture', title: 'Partial Fractions', date: 'Apr 20, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Partial Fractions Workshop', date: 'Apr 21, 2026', slides: '#', problems: '#' },
    
    // Week 17 (Apr 27 - May 1, 2026)
    { type: 'lecture', title: 'Combinations and Permutations', date: 'Apr 27, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Binomial Theorem', date: 'Apr 28, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 18 (May 4-8, 2026)
    { type: 'workshop', title: 'Binomial Expansion Workshop', date: 'May 4, 2026', slides: '#', problems: '#' },
    { type: 'lab', title: 'Counting Problems Lab', date: 'May 5, 2026', code: '#', problems: '#' },
    
    // Week 19 (May 11-15, 2026)
    { type: 'lecture', title: 'Matrices - Fundamentals', date: 'May 11, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Matrix Operations', date: 'May 12, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 20 (May 18-22, 2026)
    { type: 'lab', title: 'Matrix Operations Lab', date: 'May 18, 2026', code: '#', problems: '#' },
    { type: 'workshop', title: 'Matrix Applications Workshop', date: 'May 19, 2026', slides: '#', problems: '#' },
    
    // Week 21 (May 25-29, 2026)
    { type: 'lecture', title: 'Exponential Functions', date: 'May 25, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Logarithmic Functions', date: 'May 26, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 22 (Jun 1-5, 2026)
    { type: 'workshop', title: 'Exponential & Logarithm Workshop', date: 'Jun 1, 2026', slides: '#', problems: '#' },
    { type: 'lab', title: 'Exponential Applications Lab', date: 'Jun 2, 2026', code: '#', problems: '#' },
    
    // Week 23 (Jun 8-12, 2026)
    { type: 'lecture', title: 'Coordinate Geometry', date: 'Jun 8, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Coordinate Geometry Workshop', date: 'Jun 9, 2026', slides: '#', problems: '#' },
    
    // Week 24 (Jun 15-19, 2026)
    { type: 'lecture', title: 'Trigonometry Fundamentals', date: 'Jun 15, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Trigonometric Functions', date: 'Jun 16, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 25 (Jun 22-26, 2026)
    { type: 'lab', title: 'Trigonometry Practice Lab', date: 'Jun 22, 2026', code: '#', problems: '#' },
    { type: 'workshop', title: 'Trigonometric Equations Workshop', date: 'Jun 23, 2026', slides: '#', problems: '#' },
    
    // Week 26 (Jun 29 - Jul 3, 2026)
    { type: 'lecture', title: 'Further Complex Numbers', date: 'Jun 29, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Hyperbolic Functions', date: 'Jun 30, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 27 (Jul 6-10, 2026)
    { type: 'workshop', title: 'Complex & Hyperbolic Functions Workshop', date: 'Jul 6, 2026', slides: '#', problems: '#' },
    { type: 'lecture', title: 'Polar Coordinate System', date: 'Jul 7, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 28 (Jul 13-17, 2026)
    { type: 'lecture', title: 'Calculus Introduction', date: 'Jul 13, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Differentiation Fundamentals', date: 'Jul 14, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 29 (Jul 20-24, 2026)
    { type: 'lab', title: 'Differentiation Practice Lab', date: 'Jul 20, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Integration Fundamentals', date: 'Jul 21, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 30 (Jul 27-31, 2026)
    { type: 'workshop', title: 'Integration Workshop', date: 'Jul 27, 2026', slides: '#', problems: '#' },
    { type: 'review', title: 'Comprehensive Review Session', date: 'Jul 28, 2026', slides: '#', problems: '#' },
    
    // Week 31 (Aug 3-7, 2026)
    { type: 'workshop', title: 'Final Exam Preparation Workshop', date: 'Aug 3, 2026', slides: '#', pastpapers: '#' },
    { type: 'lab', title: 'Past Paper Practice Session', date: 'Aug 4, 2026', code: '#', problems: '#' }
],
        chemistry: [
    // Week 1-2: Fundamental Concepts (Chapters 1-3 Review)
    { type: 'lecture', title: 'Review: Chemical Foundations & Measurement', date: 'Jan 5, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Review: Atomic Structure & Periodicity', date: 'Jan 6, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Chemical Measurement Techniques', date: 'Jan 12, 2026', code: '#', problems: '#' },
    { type: 'workshop', title: 'Stoichiometry Practice Session', date: 'Jan 13, 2026', slides: '#', problems: '#' },
    
    // Week 3-4: Chapter 4 - Solution Chemistry
    { type: 'lecture', title: 'Water as Solvent & Electrolyte Solutions', date: 'Jan 19, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Solution Composition & Concentration', date: 'Jan 20, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Solution Preparation Lab', date: 'Jan 26, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Precipitation & Acid-Base Reactions', date: 'Jan 27, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 5-6: Chapter 5 - Gases
    { type: 'lecture', title: 'Gas Laws & Ideal Gas Behavior', date: 'Feb 2, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Gas Stoichiometry & Dalton\'s Law', date: 'Feb 3, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Gas Laws Laboratory', date: 'Feb 9, 2026', code: '#', problems: '#' },
    { type: 'workshop', title: 'Kinetic Molecular Theory Workshop', date: 'Feb 10, 2026', slides: '#', problems: '#' },
    
    // Week 7-8: Chapter 6 - Thermochemistry
    { type: 'lecture', title: 'Energy Concepts & Enthalpy', date: 'Feb 16, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Calorimetry & Hess\'s Law', date: 'Feb 17, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Calorimetry Lab', date: 'Feb 23, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Energy Sources & Applications', date: 'Feb 24, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 9-10: Chapter 7 - Atomic Structure & Periodicity
    { type: 'lecture', title: 'Quantum Theory & Atomic Spectra', date: 'Mar 2, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Quantum Mechanical Model', date: 'Mar 3, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Quantum Numbers Workshop', date: 'Mar 9, 2026', slides: '#', problems: '#' },
    { type: 'lecture', title: 'Periodic Trends & Properties', date: 'Mar 10, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 11-12: Chapter 8 - Chemical Bonding
    { type: 'lecture', title: 'Chemical Bonds & Electronegativity', date: 'Mar 16, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Lewis Structures & VSEPR Theory', date: 'Mar 17, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Molecular Modeling Lab', date: 'Mar 23, 2026', code: '#', problems: '#' },
    { type: 'workshop', title: 'Resonance & Exceptions Workshop', date: 'Mar 24, 2026', slides: '#', problems: '#' },
    
    // Week 13-14: Chapter 9 - Advanced Bonding Concepts
    { type: 'lecture', title: 'Hybridization & Molecular Orbitals', date: 'Mar 30, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Bonding in Diatomic Molecules', date: 'Mar 31, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'midterm', title: 'Mid-Term Review Session', date: 'Apr 6, 2026', slides: '#', problems: '#' },
    { type: 'workshop', title: 'Photoelectron Spectroscopy Workshop', date: 'Apr 7, 2026', slides: '#', problems: '#' },
    
    // Week 15-16: Chapter 10 - Liquids & Solids
    { type: 'lecture', title: 'Intermolecular Forces & Properties', date: 'Apr 13, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Solid State Chemistry', date: 'Apr 14, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Phase Changes Laboratory', date: 'Apr 20, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Network Solids & Phase Diagrams', date: 'Apr 21, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 17-18: Chapter 11 - Properties of Solutions
    { type: 'lecture', title: 'Solution Formation & Solubility', date: 'Apr 27, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Colligative Properties', date: 'Apr 28, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Colligative Properties Problem Solving', date: 'May 4, 2026', slides: '#', problems: '#' },
    { type: 'lab', title: 'Osmotic Pressure Lab', date: 'May 5, 2026', code: '#', problems: '#' },
    
    // Week 19-20: Chapter 12 - Chemical Kinetics
    { type: 'lecture', title: 'Reaction Rates & Rate Laws', date: 'May 11, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Reaction Mechanisms & Catalysis', date: 'May 12, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Kinetics Laboratory', date: 'May 18, 2026', code: '#', problems: '#' },
    { type: 'workshop', title: 'Integrated Rate Laws Workshop', date: 'May 19, 2026', slides: '#', problems: '#' },
    
    // Week 21-22: Chapter 13 - Chemical Equilibrium
    { type: 'lecture', title: 'Equilibrium Concepts & Constants', date: 'May 25, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Equilibrium Calculations', date: 'May 26, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Equilibrium Problem Solving', date: 'Jun 1, 2026', slides: '#', problems: '#' },
    { type: 'lecture', title: 'Le Châtelier\'s Principle', date: 'Jun 2, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 23-24: Chapters 14-15 - Acids & Bases
    { type: 'lecture', title: 'Acid-Base Theories & pH Scale', date: 'Jun 8, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Weak Acid/Base Calculations', date: 'Jun 9, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Acid-Base Titration Lab', date: 'Jun 15, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Buffers & Titration Curves', date: 'Jun 16, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 25-26: Chapters 16-17 - Advanced Equilibria & Thermodynamics
    { type: 'lecture', title: 'Solubility Equilibria & Ksp', date: 'Jun 22, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Entropy & Spontaneous Processes', date: 'Jun 23, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Thermodynamics Problem Solving', date: 'Jun 29, 2026', slides: '#', problems: '#' },
    { type: 'lecture', title: 'Free Energy & Equilibrium', date: 'Jun 30, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 27-28: Chapters 18-20 - Electrochemistry & Representative Elements
    { type: 'lecture', title: 'Electrochemistry Fundamentals', date: 'Jul 6, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Galvanic Cells & Batteries', date: 'Jul 7, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'Electrochemistry Laboratory', date: 'Jul 13, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Nuclear Chemistry', date: 'Jul 14, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 29-30: Final Review & Advanced Topics
    { type: 'lecture', title: 'Representative Elements Survey', date: 'Jul 20, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Comprehensive Problem Review', date: 'Jul 21, 2026', slides: '#', problems: '#' },
    { type: 'review', title: 'Final Exam Preparation Workshop', date: 'Jul 27, 2026', slides: '#', pastpapers: '#' },
    { type: 'lab', title: 'Final Review Laboratory Session', date: 'Jul 28, 2026', code: '#', problems: '#' }
],
        physics: [
    // Week 1: Fundamentals
    { type: 'lecture', title: 'Dimensions and Units: SI System & Dimensional Analysis', date: 'Jan 5, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Unit Conversion & Dimensional Analysis Practice', date: 'Jan 6, 2026', slides: '#', problems: '#' },
    
    // Week 2: Vectors
    { type: 'lecture', title: 'Vectors: Properties, Components & Unit Vectors', date: 'Jan 12, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Vector Operations: Dot Product & Cross Product', date: 'Jan 13, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 3: 1D Kinematics
    { type: 'lab', title: 'Vector Analysis Laboratory', date: 'Jan 19, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Motion in One Dimension: Position, Velocity & Acceleration', date: 'Jan 20, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 4: 1D Motion Applications
    { type: 'lecture', title: 'Constant Acceleration & Free Fall', date: 'Jan 26, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: '1D Kinematics Problem Solving Workshop', date: 'Jan 27, 2026', slides: '#', problems: '#' },
    
    // Week 5: 2D Kinematics
    { type: 'lecture', title: 'Motion in Two Dimensions: Vector Approach', date: 'Feb 2, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Projectile Motion', date: 'Feb 3, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 6: Circular Motion
    { type: 'lab', title: 'Projectile Motion Laboratory', date: 'Feb 9, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Uniform Circular Motion & Tangential Acceleration', date: 'Feb 10, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 7: Newton's Laws
    { type: 'lecture', title: 'Force and Motion: Newton\'s Laws of Motion', date: 'Feb 16, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Types of Forces: Gravity, Normal, Friction, Tension', date: 'Feb 17, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 8: Force Applications
    { type: 'workshop', title: 'Newton\'s Laws Application Problems', date: 'Feb 23, 2026', slides: '#', problems: '#' },
    { type: 'lab', title: 'Force & Acceleration Laboratory', date: 'Feb 24, 2026', code: '#', problems: '#' },
    
    // Week 9: Work & Energy
    { type: 'lecture', title: 'Work: Constant & Variable Forces', date: 'Mar 2, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Work-Energy Theorem', date: 'Mar 3, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 10: Conservation of Energy
    { type: 'lecture', title: 'Conservative Forces & Potential Energy', date: 'Mar 9, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Conservation of Mechanical Energy', date: 'Mar 10, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 11: Energy Applications
    { type: 'workshop', title: 'Energy Conservation Problem Solving', date: 'Mar 16, 2026', slides: '#', problems: '#' },
    { type: 'lab', title: 'Energy Conservation Laboratory', date: 'Mar 17, 2026', code: '#', problems: '#' },
    
    // Week 12: Momentum
    { type: 'lecture', title: 'Linear Momentum & Impulse', date: 'Mar 23, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Conservation of Linear Momentum', date: 'Mar 24, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 13: Collisions
    { type: 'lecture', title: 'Elastic & Inelastic Collisions', date: 'Mar 30, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'midterm', title: 'Mechanics Mid-Term Review', date: 'Mar 31, 2026', slides: '#', problems: '#' },
    
    // Week 14: Center of Mass
    { type: 'lecture', title: 'Center of Mass & Its Dynamics', date: 'Apr 6, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Systems of Variable Mass & Rocket Propulsion', date: 'Apr 7, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 15: Rotational Kinematics
    { type: 'workshop', title: 'Collisions & Center of Mass Workshop', date: 'Apr 13, 2026', slides: '#', problems: '#' },
    { type: 'lecture', title: 'Rotational Motion: Angular Quantities & Kinematics', date: 'Apr 14, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 16: Rotational Dynamics
    { type: 'lecture', title: 'Rotational Dynamics: Torque & Moment of Inertia', date: 'Apr 20, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Newton\'s Second Law for Rotation', date: 'Apr 21, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 17: Rotational Energy & Rolling
    { type: 'lab', title: 'Rotational Motion Laboratory', date: 'Apr 27, 2026', code: '#', problems: '#' },
    { type: 'lecture', title: 'Rotational Kinetic Energy & Rolling Motion', date: 'Apr 28, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 18: Electricity Introduction
    { type: 'lecture', title: 'Electric Charge & Coulomb\'s Law', date: 'May 4, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Coulomb\'s Law Problem Solving', date: 'May 5, 2026', slides: '#', problems: '#' },
    
    // Week 19: Electric Fields
    { type: 'lecture', title: 'Electric Field Concept & Point Charge Fields', date: 'May 11, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Electric Dipoles & Field Lines', date: 'May 12, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 20: Continuous Charge Distributions
    { type: 'lecture', title: 'Electric Fields of Continuous Distributions: Part 1', date: 'May 18, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Electric Fields of Continuous Distributions: Part 2', date: 'May 19, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 21: Charged Particle Motion
    { type: 'workshop', title: 'Electric Field Calculations Workshop', date: 'May 25, 2026', slides: '#', problems: '#' },
    { type: 'lab', title: 'Electric Field Mapping Laboratory', date: 'May 26, 2026', code: '#', problems: '#' },
    
    // Week 22: Electric Current & Resistance
    { type: 'lecture', title: 'Electric Current, Current Density & Ohm\'s Law', date: 'Jun 1, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Electric Resistance & Power', date: 'Jun 2, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 23: Circuits Fundamentals
    { type: 'lecture', title: 'Electromotive Force & Simple Circuits', date: 'Jun 8, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lecture', title: 'Resistors in Series and Parallel', date: 'Jun 9, 2026', slides: '#', video: '#', notes: '#' },
    
    // Week 24: Circuit Analysis
    { type: 'workshop', title: 'Circuit Analysis Problem Solving', date: 'Jun 15, 2026', slides: '#', problems: '#' },
    { type: 'lab', title: 'Basic Circuits Laboratory', date: 'Jun 16, 2026', code: '#', problems: '#' },
    
    // Week 25: Kirchhoff's Rules
    { type: 'lecture', title: 'Kirchhoff\'s Rules & Complex Circuit Analysis', date: 'Jun 22, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'workshop', title: 'Kirchhoff\'s Rules Application Workshop', date: 'Jun 23, 2026', slides: '#', problems: '#' },
    
    // Week 26: RC Circuits
    { type: 'lecture', title: 'RC Circuits: Charging & Discharging', date: 'Jun 29, 2026', slides: '#', video: '#', notes: '#' },
    { type: 'lab', title: 'RC Circuit Laboratory', date: 'Jun 30, 2026', code: '#', problems: '#' },
    
    // Week 27: Comprehensive Review
    { type: 'review', title: 'Mechanics Comprehensive Review', date: 'Jul 6, 2026', slides: '#', problems: '#' },
    { type: 'review', title: 'Electricity & Circuits Review', date: 'Jul 7, 2026', slides: '#', problems: '#' },
    
    // Week 28: Final Preparation
    { type: 'workshop', title: 'Integrated Physics Problem Solving', date: 'Jul 13, 2026', slides: '#', problems: '#' },
    { type: 'final', title: 'Final Exam Preparation & Past Papers', date: 'Jul 14, 2026', slides: '#', pastpapers: '#' }
]
        'computer-science': [
            { type: 'lecture', title: 'Introduction to Programming', date: 'Sep 2, 2024', slides: '#', video: '#', notes: '#' },
            { type: 'lecture', title: 'Data Structures', date: 'Sep 9, 2024', slides: '#', video: '#', notes: '#' },
            { type: 'lab', title: 'Python Programming Lab', date: 'Sep 16, 2024', code: '#', exercises: '#' },
            { type: 'lecture', title: 'Algorithms', date: 'Sep 23, 2024', slides: '#', video: '#', notes: '#' },
            { type: 'workshop', title: 'Object-Oriented Programming', date: 'Sep 30, 2024', slides: '#', code: '#' },
            { type: 'lecture', title: 'Databases', date: 'Oct 7, 2024', slides: '#', video: '#', notes: '#' },
            { type: 'lecture', title: 'Computer Networks', date: 'Oct 14, 2024', slides: '#', video: '#', notes: '#' },
            { type: 'lab', title: 'Web Development Project', date: 'Oct 21, 2024', code: '#', project: '#' },
            { type: 'lecture', title: 'Theory of Computation', date: 'Oct 28, 2024', slides: '#', video: '#', notes: '#' },
            { type: 'workshop', title: 'Final Project Development', date: 'Nov 4, 2024', slides: '#', guidelines: '#' }
        ]
    };
    
    const schedule = schedules[courseId] || schedules.mathematics;
    const container = document.getElementById('scheduleGrid');
    
    if (!container) return;
    
    container.innerHTML = schedule.map((item, index) => `
        <div class="schedule-item ${item.type}" data-type="${item.type}">
            <div class="schedule-type ${item.type}">
                ${item.type === 'lecture' ? 'Lecture' : item.type === 'lab' ? 'Practice Lab' : 'Workshop'}
            </div>
            <h3 class="schedule-title">${item.title}</h3>
            <div class="schedule-date">
                <i class="far fa-calendar"></i>
                ${item.date}
            </div>
            <div class="schedule-resources">
                ${item.slides ? `
                    <a href="${item.slides}" class="resource-link" data-download="${item.title} Slides">
                        <i class="fas fa-file-powerpoint"></i> Slides
                    </a>
                ` : ''}
                ${item.video ? `
                    <a href="${item.video}" class="resource-link" data-download="${item.title} Video">
                        <i class="fas fa-video"></i> Video
                    </a>
                ` : ''}
                ${item.notes ? `
                    <a href="${item.notes}" class="resource-link" data-download="${item.title} Notes">
                        <i class="fas fa-file-pdf"></i> Notes
                    </a>
                ` : ''}
                ${item.code ? `
                    <a href="${item.code}" class="resource-link" data-download="${item.title} Code">
                        <i class="fas fa-code"></i> Code
                    </a>
                ` : ''}
                ${item.problems ? `
                    <a href="${item.problems}" class="resource-link" data-download="${item.title} Problems">
                        <i class="fas fa-tasks"></i> Problems
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
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

// Generate team
function generateTeam(courseId) {
    const teams = {
        mathematics: [
            { name: 'Dr. James Wilson', role: 'Lead Instructor', department: 'Mathematics', bio: 'PhD in Mathematics from Cambridge University, 15+ years teaching experience', avatar: 'JW' },
            { name: 'Prof. Sarah Chen', role: 'Co-Instructor', department: 'Applied Mathematics', bio: 'Specialist in mathematical modeling and exam techniques', avatar: 'SC' },
            { name: 'Michael Rodriguez', role: 'Lead TA', department: 'Mathematics Education', bio: 'MSc Mathematics, 5 years tutoring experience', avatar: 'MR' },
            { name: 'Emma Johnson', role: 'Teaching Assistant', department: 'Statistics', bio: 'Data scientist specializing in statistical analysis', avatar: 'EJ' }
        ],
        chemistry: [
            { name: 'Dr. Benjamin Carter', role: 'Lead Instructor', department: 'Chemistry', bio: 'PhD in Organic Chemistry, research background in pharmaceuticals', avatar: 'BC' },
            { name: 'Prof. Olivia Martinez', role: 'Co-Instructor', department: 'Physical Chemistry', bio: 'Expert in chemical kinetics and thermodynamics', avatar: 'OM' },
            { name: 'Sophia Williams', role: 'Lead TA', department: 'Chemistry Education', bio: 'Specialist in practical chemistry techniques', avatar: 'SW' }
        ],
        physics: [
            { name: 'Dr. Alexander Lee', role: 'Lead Instructor', department: 'Physics', bio: 'PhD in Particle Physics, former CERN researcher', avatar: 'AL' },
            { name: 'Prof. Maria Garcia', role: 'Co-Instructor', department: 'Astrophysics', bio: 'Expert in modern physics and cosmology', avatar: 'MG' },
            { name: 'David Thompson', role: 'Lead TA', department: 'Physics Education', bio: 'Specialist in physics problem-solving techniques', avatar: 'DT' }
        ],
        'computer-science': [
            { name: 'Dr. Robert Miller', role: 'Lead Instructor', department: 'Computer Science', bio: 'PhD in AI, 10+ years software engineering experience', avatar: 'RM' },
            { name: 'Prof. Jennifer Davis', role: 'Co-Instructor', department: 'Algorithms', bio: 'Expert in data structures and algorithm design', avatar: 'JD' },
            { name: 'Thomas Anderson', role: 'Lead TA', department: 'Software Engineering', bio: 'Full-stack developer and coding instructor', avatar: 'TA' }
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
    
    // Handle resource downloads
    document.addEventListener('click', function(e) {
        const downloadLink = e.target.closest('[data-download]');
        if (downloadLink && (!downloadLink.href || downloadLink.href === '#')) {
            e.preventDefault();
            const resourceName = downloadLink.dataset.download;
            simulateDownload(resourceName);
        }
    });
}

// Simulate download
function simulateDownload(resourceName) {
    showToast(`Downloading: ${resourceName}`, 'info');
    
    // Simulate download progress
    setTimeout(() => {
        showToast(`Download complete: ${resourceName}`, 'success');
    }, 1500);
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