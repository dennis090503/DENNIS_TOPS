// Link Manager Module - Handles all link operations
const LinkManager = (function() {
    let links = []; // Array to store link objects {title, url}
    let followers = 1000; // Starting follower count for demonstration

    // DOM Elements
    let linksContainer;
    let linkCountElement;
    let engagementRateElement;
    let totalReachElement;
    let avgEngagementElement;
    let followerCountElement;
    let verifiedBadgeElement;

    // Initialize the link manager
    function init() {
        // Get DOM elements
        linksContainer = document.getElementById('linksContainer');
        linkCountElement = document.getElementById('linkCount');
        engagementRateElement = document.getElementById('engagementRate');
        totalReachElement = document.getElementById('totalReach');
        avgEngagementElement = document.getElementById('avgEngagement');
        followerCountElement = document.getElementById('followerCount');
        verifiedBadgeElement = document.getElementById('verifiedBadge');

        // Load data from localStorage
        loadData();
        
        // Render initial links
        renderLinks();
        
        // Update stats
        updateStats();
        
        // Setup event listeners for follower simulation
        setupFollowerSimulation();
    }

    // Load data from localStorage
    function loadData() {
        links = window.Storage.loadLinks();
        followers = window.Storage.loadFollowerCount();
        if (followers === 0) {
            followers = 1000; // Default starting value
            window.Storage.saveFollowerCount(followers);
        }
        updateFollowerDisplay();
    }

    // Save data to localStorage
    function saveData() {
        window.Storage.saveLinks(links);
        window.Storage.saveFollowerCount(followers);
    }

    // Add a new link
    function addLink(title, url) {
        // Validate inputs
        if (!window.Validation.isValidTitle(title)) {
            window.Validation.showError('urlError', 'Please enter a valid title (1-50 characters)');
            return false;
        }

        if (!window.Validation.isValidUrl(url)) {
            window.Validation.showError('urlError', 'Please enter a valid URL starting with https://');
            return false;
        }

        // Format URL
        const formattedUrl = window.Validation.formatUrl(url);

        // Create new link object
        const newLink = {
            id: Date.now(), // Unique ID using timestamp
            title: title.trim(),
            url: formattedUrl,
            createdAt: new Date().toISOString()
        };

        // Add to array
        links.push(newLink);
        
        // Save to localStorage
        saveData();
        
        // Re-render
        renderLinks();
        
        // Update stats
        updateStats();
        
        // Clear form
        clearForm();
        
        return true;
    }

    // Delete a link
    function deleteLink(id) {
        // Filter out the link with matching id
        links = links.filter(link => link.id !== id);
        
        // Save to localStorage
        saveData();
        
        // Re-render
        renderLinks();
        
        // Update stats
        updateStats();
    }

    // Clear form inputs
    function clearForm() {
        const titleInput = document.getElementById('linkTitle');
        const urlInput = document.getElementById('linkUrl');
        
        if (titleInput) titleInput.value = '';
        if (urlInput) urlInput.value = '';
        
        window.Validation.hideError('urlError');
    }

    // Render all links dynamically
    function renderLinks() {
        if (!linksContainer) return;

        // Check if there are no links
        if (links.length === 0) {
            linksContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-link"></i>
                    <h3>No links added yet</h3>
                    <p>Add your first social link to get started!</p>
                </div>
            `;
            return;
        }

        // Render links using map() and template literals
        const linksHTML = links.map(link => {
            // Extract domain for display
            let domain = '';
            try {
                const urlObj = new URL(link.url);
                domain = urlObj.hostname;
            } catch (e) {
                domain = link.url;
            }

            // Get icon based on platform
            const icon = getPlatformIcon(link.title);

            return `
                <div class="link-item" data-id="${link.id}">
                    <div class="link-content">
                        <div class="link-icon">
                            <i class="${icon}"></i>
                        </div>
                        <div class="link-info">
                            <div class="link-title">${escapeHtml(link.title)}</div>
                            <div class="link-url">
                                <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                                    ${escapeHtml(domain)}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="link-actions">
                        <button class="delete-btn" data-id="${link.id}" aria-label="Delete link">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        linksContainer.innerHTML = linksHTML;
        
        // Attach delete event listeners to each delete button
        attachDeleteEvents();
    }

    // Get appropriate icon for platform
    function getPlatformIcon(title) {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('github')) return 'fab fa-github';
        if (titleLower.includes('twitter') || titleLower.includes('x')) return 'fab fa-twitter';
        if (titleLower.includes('instagram')) return 'fab fa-instagram';
        if (titleLower.includes('linkedin')) return 'fab fa-linkedin';
        if (titleLower.includes('youtube')) return 'fab fa-youtube';
        if (titleLower.includes('facebook')) return 'fab fa-facebook';
        if (titleLower.includes('tiktok')) return 'fab fa-tiktok';
        if (titleLower.includes('discord')) return 'fab fa-discord';
        if (titleLower.includes('twitch')) return 'fab fa-twitch';
        if (titleLower.includes('portfolio') || titleLower.includes('website')) return 'fas fa-globe';
        return 'fas fa-link';
    }

    // Attach delete events using event delegation
    function attachDeleteEvents() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.removeEventListener('click', handleDeleteClick);
            button.addEventListener('click', handleDeleteClick);
        });
    }

    // Handle delete button click
    function handleDeleteClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const button = event.currentTarget;
        const id = parseInt(button.getAttribute('data-id'));
        
        // Confirm deletion
        if (confirm('Are you sure you want to remove this link?')) {
            deleteLink(id);
        }
    }

    // Update statistics
    function updateStats() {
        if (linkCountElement) {
            linkCountElement.textContent = links.length;
        }

        // Calculate estimated stats based on followers and links
        const baseEngagement = followers > 0 ? ((followers * 0.05) / 100).toFixed(1) : 0;
        const linkMultiplier = Math.min(links.length * 0.5, 3);
        const engagementRate = (parseFloat(baseEngagement) * (1 + linkMultiplier)).toFixed(1);
        
        if (engagementRateElement) {
            engagementRateElement.textContent = `${engagementRate}%`;
        }
        
        if (totalReachElement) {
            totalReachElement.textContent = (followers * (1 + links.length * 0.1)).toFixed(0);
        }
        
        if (avgEngagementElement) {
            avgEngagementElement.textContent = Math.floor(followers * 0.02 * (1 + links.length * 0.2));
        }
    }

    // Update follower display and verified badge
    function updateFollowerDisplay() {
        if (followerCountElement) {
            followerCountElement.textContent = followers.toLocaleString();
        }
        
        // Conditional logic for verified badge (threshold: 5000 followers)
        const VERIFIED_THRESHOLD = 5000;
        if (followers >= VERIFIED_THRESHOLD) {
            if (verifiedBadgeElement) {
                verifiedBadgeElement.classList.remove('hidden');
            }
        } else {
            if (verifiedBadgeElement) {
                verifiedBadgeElement.classList.add('hidden');
            }
        }
    }

    // Setup follower count simulation
    function setupFollowerSimulation() {
        // Simulate follower growth every 30 seconds
        setInterval(() => {
            const growth = Math.floor(Math.random() * 100) + 1; // 1-100 new followers
            followers += growth;
            window.Storage.saveFollowerCount(followers);
            updateFollowerDisplay();
            updateStats(); // Update stats when followers change
        }, 30000); // Update every 30 seconds
    }

    // Escape HTML to prevent XSS
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Public API
    return {
        init,
        addLink,
        deleteLink,
        renderLinks,
        getLinks: () => [...links]
    };
})();