// Theme Manager Module - Handles light/dark mode
const ThemeManager = (function() {
    let currentTheme = 'light';
    let themeToggleBtn;
    let moonIcon;
    let sunIcon;

    function init() {
        // Get DOM elements
        themeToggleBtn = document.getElementById('themeToggle');
        if (themeToggleBtn) {
            moonIcon = themeToggleBtn.querySelector('.fa-moon');
            sunIcon = themeToggleBtn.querySelector('.fa-sun');
        }

        // Load saved theme
        const savedTheme = window.Storage.loadTheme();
        setTheme(savedTheme);

        // Setup event listener
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', toggleTheme);
        }
    }

    function setTheme(theme) {
        currentTheme = theme;
        
        // Apply theme to document
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (moonIcon && sunIcon) {
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (moonIcon && sunIcon) {
                moonIcon.classList.remove('hidden');
                sunIcon.classList.add('hidden');
            }
        }
        
        // Save preference
        window.Storage.saveTheme(theme);
    }

    function toggleTheme() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        
        // Add animation effect
        if (themeToggleBtn) {
            themeToggleBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                if (themeToggleBtn) {
                    themeToggleBtn.style.transform = 'scale(1)';
                }
            }, 200);
        }
    }

    function getCurrentTheme() {
        return currentTheme;
    }

    // Public API
    window.ThemeManager = {
        init,
        toggleTheme,
        getCurrentTheme,
        setTheme
    };
})();