// Main Application - Initializes and orchestrates all modules
const App = (function() {
    let form;
    let titleInput;
    let urlInput;

    function init() {
        console.log('Bio-Stack Builder Initialized');
        
        // Initialize all modules
        window.Storage;
        window.Validation;
        window.LinkManager = LinkManager;
        window.ThemeManager = ThemeManager;
        
        // Initialize theme manager
        ThemeManager.init();
        
        // Initialize link manager
        LinkManager.init();
        
        // Setup form submission
        setupFormHandler();
        
        // Setup real-time URL validation
        setupRealtimeValidation();
        
        // Log initialization
        console.log(`Loaded ${LinkManager.getLinks().length} links from storage`);
    }

    function setupFormHandler() {
        form = document.getElementById('linkForm');
        
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                titleInput = document.getElementById('linkTitle');
                urlInput = document.getElementById('linkUrl');
                
                if (titleInput && urlInput) {
                    const success = LinkManager.addLink(titleInput.value, urlInput.value);
                    
                    if (success) {
                        // Clear form after successful addition
                        titleInput.value = '';
                        urlInput.value = '';
                        
                        // Show success feedback (optional)
                        showTemporaryMessage('Link added successfully!', 'success');
                    }
                }
            });
        }
    }

    function setupRealtimeValidation() {
        urlInput = document.getElementById('linkUrl');
        
        if (urlInput) {
            urlInput.addEventListener('input', function() {
                const url = this.value;
                if (url && !Validation.isValidUrl(url)) {
                    Validation.showError('urlError', 'Please enter a valid URL (e.g., https://example.com)');
                } else {
                    Validation.hideError('urlError');
                }
            });
            
            titleInput = document.getElementById('linkTitle');
            if (titleInput) {
                titleInput.addEventListener('input', function() {
                    if (this.value && this.value.length > 50) {
                        Validation.showError('urlError', 'Title must be 50 characters or less');
                    } else {
                        Validation.hideError('urlError');
                    }
                });
            }
        }
    }

    function showTemporaryMessage(message, type = 'success') {
        // Create temporary message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `temporary-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remove after 2 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 2000);
    }

    // Public API
    return {
        init,
        getState: () => ({
            links: LinkManager.getLinks(),
            theme: ThemeManager.getCurrentTheme()
        })
    };
})();

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Optional: Add keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + D to toggle dark mode
    if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        ThemeManager.toggleTheme();
    }
    
    // Escape to clear form
    if (event.key === 'Escape') {
        const titleInput = document.getElementById('linkTitle');
        const urlInput = document.getElementById('linkUrl');
        if (titleInput && urlInput) {
            titleInput.value = '';
            urlInput.value = '';
            Validation.hideError('urlError');
        }
    }
});