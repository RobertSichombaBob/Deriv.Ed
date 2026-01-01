// Resource Manager for course_list.html

document.addEventListener('DOMContentLoaded', function() {
    // Sample resource data
    const resources = [
        {
            id: 1,
            title: "Pure Mathematics 2023 Past Paper",
            subject: "mathematics",
            year: "2023",
            type: "past-paper",
            format: "PDF",
            size: "2.4 MB",
            url: "https://drive.google.com/uc?export=download&id=MATH_PP_2023",
            category: "past-paper"
        },
        {
            id: 2,
            title: "Physics 2023 Mark Scheme",
            subject: "physics",
            year: "2023",
            type: "solution",
            format: "PDF",
            size: "1.8 MB",
            url: "https://drive.google.com/uc?export=download&id=PHYS_SOL_2023",
            category: "solution"
        },
        {
            id: 3,
            title: "Computer Science Tutorial Sheets",
            subject: "computer-science",
            year: "2023",
            type: "tutorial",
            format: "PDF",
            size: "3.2 MB",
            url: "https://drive.google.com/uc?export=download&id=CS_TUTORIALS",
            category: "tutorial"
        },
        {
            id: 4,
            title: "Statistics Recommended Textbook",
            subject: "statistics",
            year: "2022",
            type: "textbook",
            format: "External Link",
            size: "-",
            url: "https://www.amazon.com/statistics-textbook",
            category: "textbook"
        },
        {
            id: 5,
            title: "Mechanics 2022 Past Paper",
            subject: "mechanics",
            year: "2022",
            type: "past-paper",
            format: "PDF",
            size: "2.1 MB",
            url: "https://drive.google.com/uc?export=download&id=MECH_PP_2022",
            category: "past-paper"
        }
    ];

    // DOM Elements
    const searchInput = document.getElementById('resourceSearch');
    const subjectFilter = document.getElementById('subjectFilter');
    const yearFilter = document.getElementById('yearFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchResults = document.getElementById('searchResults');
    const searchBtn = document.querySelector('.search-btn');

    // Initialize search
    performSearch();

    // Event Listeners
    searchInput.addEventListener('input', performSearch);
    subjectFilter.addEventListener('change', performSearch);
    yearFilter.addEventListener('change', performSearch);
    typeFilter.addEventListener('change', performSearch);
    searchBtn.addEventListener('click', performSearch);

    // Perform search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const subject = subjectFilter.value;
        const year = yearFilter.value;
        const type = typeFilter.value;

        // Filter resources
        const filteredResources = resources.filter(resource => {
            const matchesSearch = !searchTerm || 
                resource.title.toLowerCase().includes(searchTerm) ||
                resource.subject.toLowerCase().includes(searchTerm);
            
            const matchesSubject = !subject || resource.subject === subject;
            const matchesYear = !year || resource.year === year;
            const matchesType = !type || resource.category === type;

            return matchesSearch && matchesSubject && matchesYear && matchesType;
        });

        displaySearchResults(filteredResources);
    }

    // Display search results
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search fa-3x text-gray-300 mb-4"></i>
                    <h3>No resources found</h3>
                    <p>Try adjusting your search filters or browse by category above.</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(resource => `
            <div class="resource-card">
                <div class="resource-icon">
                    ${getIconForType(resource.type)}
                </div>
                <div class="resource-info">
                    <div class="resource-title">${resource.title}</div>
                    <div class="resource-meta">
                        <span><i class="fas fa-book"></i> ${formatSubject(resource.subject)}</span>
                        <span><i class="far fa-calendar"></i> ${resource.year}</span>
                        <span><i class="fas fa-file"></i> ${resource.format}</span>
                        <span><i class="fas fa-download"></i> ${resource.size}</span>
                    </div>
                </div>
                <div class="resource-action">
                    ${resource.type === 'textbook' ? 
                        '<a href="' + resource.url + '" target="_blank"><i class="fas fa-external-link-alt"></i></a>' :
                        '<a href="' + resource.url + '"><i class="fas fa-download"></i></a>'
                    }
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    // Helper functions
    function getIconForType(type) {
        const icons = {
            'past-paper': '<i class="fas fa-file-pdf text-red-500"></i>',
            'solution': '<i class="fas fa-check-circle text-green-500"></i>',
            'tutorial': '<i class="fas fa-clipboard-list text-purple-500"></i>',
            'textbook': '<i class="fas fa-book text-blue-500"></i>'
        };
        return icons[type] || '<i class="fas fa-file"></i>';
    }

    function formatSubject(subject) {
        const subjects = {
            'mathematics': 'Mathematics',
            'physics': 'Physics',
            'computer-science': 'Computer Science',
            'statistics': 'Statistics',
            'mechanics': 'Mechanics'
        };
        return subjects[subject] || subject;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Track downloads
    document.addEventListener('click', function(e) {
        if (e.target.closest('.resource-action a')) {
            const link = e.target.closest('.resource-action a');
            const resourceTitle = link.closest('.resource-card').querySelector('.resource-title').textContent;
            
            // You can add analytics tracking here
            console.log('Resource downloaded:', resourceTitle);
            
            // Show download confirmation
            showToast('Download started: ' + resourceTitle, 'success');
        }
    });

    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} mr-2"></i>
            ${message}
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
});