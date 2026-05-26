document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('customerForm');
    const resetBtn = document.getElementById('resetBtn');
    const tableBody = document.getElementById('tableBody');
    const noDataMessage = document.getElementById('noDataMessage');
    const successMessage = document.getElementById('successMessage');

    // Load existing items from localStorage immediately on startup
    renderSubmissionsTable();

    // Form submission processing block
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop raw page refresh reloading
        
        if (validateForm()) {
            saveData();
            showSuccessToast();
            form.reset();
            clearErrors();
            renderSubmissionsTable();
        }
    });

    // Reset button processing logic
    resetBtn.addEventListener('click', () => {
        form.reset();
        clearErrors();
    });

    // Validates inputs explicitly according to criteria requirements
    function validateForm() {
        let isValid = true;

        // Fetch element inputs
        const nameInput = document.getElementById('fullName').value.trim();
        const phoneInput = document.getElementById('phone').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const vehicleInput = document.getElementById('vehicle').value.trim();
        const complaintInput = document.getElementById('complaint').value.trim();

        // 1. Full Name Validation
        if (nameInput === "") {
            showError('nameError', 'Full name is required.');
            isValid = false;
        } else {
            clearError('nameError');
        }

        // 2. Phone Validation (Exactly 10 Numerical digits checking)
        const phoneRegex = /^\d{10}$/;
        if (phoneInput === "") {
            showError('phoneError', 'Phone number is required.');
            isValid = false;
        } else if (!phoneRegex.test(phoneInput)) {
            showError('phoneError', 'Phone number must be exactly 10 digits.');
            isValid = false;
        } else {
            clearError('phoneError');
        }

        // 3. Email Validation (Standard evaluation parsing)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput === "") {
            showError('emailError', 'Email address is required.');
            isValid = false;
        } else if (!emailRegex.test(emailInput)) {
            showError('emailError', 'Please enter a valid format email address.');
            isValid = false;
        } else {
            clearError('emailError');
        }

        // 4. Vehicle Input Validation
        if (vehicleInput === "") {
            showError('vehicleError', 'Vehicle details are required.');
            isValid = false;
        } else {
            clearError('vehicleError');
        }

        // 5. Complaint Text Validation
        if (complaintInput === "") {
            showError('complaintError', 'Complaint description is required.');
            isValid = false;
        } else {
            clearError('complaintError');
        }

        return isValid;
    }

    // Storage writing engine logic
    function saveData() {
        const newSubmission = {
            name: document.getElementById('fullName').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            vehicle: document.getElementById('vehicle').value.trim(),
            complaint: document.getElementById('complaint').value.trim()
        };

        // Extract old array or establish structural fallback array list configuration
        let submissions = JSON.parse(localStorage.getItem('customerSubmissions')) || [];
        submissions.push(newSubmission);
        
        localStorage.setItem('customerSubmissions', JSON.stringify(submissions));
    }

    // Dynamic rendering extraction logic block
    function renderSubmissionsTable() {
        let submissions = JSON.parse(localStorage.getItem('customerSubmissions')) || [];
        tableBody.innerHTML = ""; // Clear existing UI nodes safely

        if (submissions.length === 0) {
            noDataMessage.classList.remove('hidden');
            document.getElementById('submissionsTable').classList.add('hidden');
        } else {
            noDataMessage.classList.add('hidden');
            document.getElementById('submissionsTable').classList.remove('hidden');

            submissions.forEach(item => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td><strong>${escapeHTML(item.name)}</strong></td>
                    <td>${escapeHTML(item.phone)}</td>
                    <td>${escapeHTML(item.email)}</td>
                    <td>${escapeHTML(item.vehicle)}</td>
                    <td>${escapeHTML(item.complaint)}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }

    // Helper functions for clean modular execution
    function showError(elementId, message) {
        document.getElementById(elementId).innerText = message;
    }

    function clearError(elementId) {
        document.getElementById(elementId).innerText = "";
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-msg');
        errorElements.forEach(el => el.innerText = "");
    }

    function showSuccessToast() {
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 4000); // UI Toast visibility timer bounds
    }

    // Utility script configuration function to block cross-site scripting (XSS vector injection safety)
    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }
});