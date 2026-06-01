// Validation Module - Handles input validation
const Validation = (function() {
    // Validate URL format
    function isValidUrl(url) {
        // Check if URL is empty
        if (!url || url.trim() === '') {
            return false;
        }

        // URL pattern that requires https:// or http://
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        
        // Check if URL matches pattern
        if (!urlPattern.test(url)) {
            return false;
        }

        // Ensure URL has protocol
        let finalUrl = url;
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = 'https://' + finalUrl;
        }

        // Try to create URL object to validate
        try {
            new URL(finalUrl);
            return true;
        } catch (error) {
            return false;
        }
    }

    // Format URL to ensure it has https://
    function formatUrl(url) {
        if (!url) return '';
        
        let formattedUrl = url.trim();
        if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
            formattedUrl = 'https://' + formattedUrl;
        }
        return formattedUrl;
    }

    // Validate title
    function isValidTitle(title) {
        return title && title.trim().length > 0 && title.trim().length <= 50;
    }

    // Show error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                errorElement.classList.add('hidden');
            }, 3000);
        }
    }

    // Hide error message
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }

    // Expose public methods
    window.Validation = {
        isValidUrl,
        formatUrl,
        isValidTitle,
        showError,
        hideError
    };
})();