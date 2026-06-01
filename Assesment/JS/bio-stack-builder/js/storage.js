// Storage Module - Handles localStorage operations
const Storage = (function() {
    const STORAGE_KEYS = {
        LINKS: 'bioStackLinks',
        THEME: 'bioStackTheme',
        FOLLOWER_COUNT: 'bioStackFollowers'
    };

    // Save links to localStorage
    function saveLinks(links) {
        try {
            localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
            return true;
        } catch (error) {
            console.error('Error saving links:', error);
            return false;
        }
    }

    // Load links from localStorage
    function loadLinks() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.LINKS);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading links:', error);
            return [];
        }
    }

    // Save theme preference
    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEYS.THEME, theme);
            return true;
        } catch (error) {
            console.error('Error saving theme:', error);
            return false;
        }
    }

    // Load theme preference
    function loadTheme() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.THEME);
            return stored || 'light';
        } catch (error) {
            console.error('Error loading theme:', error);
            return 'light';
        }
    }

    // Save follower count
    function saveFollowerCount(count) {
        try {
            localStorage.setItem(STORAGE_KEYS.FOLLOWER_COUNT, count);
            return true;
        } catch (error) {
            console.error('Error saving follower count:', error);
            return false;
        }
    }

    // Load follower count
    function loadFollowerCount() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.FOLLOWER_COUNT);
            return stored ? parseInt(stored) : 0;
        } catch (error) {
            console.error('Error loading follower count:', error);
            return 0;
        }
    }

    // Clear all data (for testing)
    function clearAllData() {
        try {
            localStorage.removeItem(STORAGE_KEYS.LINKS);
            localStorage.removeItem(STORAGE_KEYS.THEME);
            localStorage.removeItem(STORAGE_KEYS.FOLLOWER_COUNT);
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }

    // Expose public methods
    window.Storage = {
        saveLinks,
        loadLinks,
        saveTheme,
        loadTheme,
        saveFollowerCount,
        loadFollowerCount,
        clearAllData
    };
})();