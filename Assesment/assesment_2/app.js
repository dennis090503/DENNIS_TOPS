import { storageUtil } from './storageUtil.js';

/**
 * CLASS: CustomerFormHandler
 * Handles intake form management, real-time validation execution, and serialization state pipes.
 */
export class CustomerFormHandler {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.delegationWrapper = document.getElementById('formDelegationWrapper');
        this.resetBtn = document.getElementById('resetBtn');
        this.messageBox = document.getElementById('messageBox');
        
        if (this.form) {
            this.initListeners();
        }
    }

    initListeners() {
        // Event Delegation for handling input field validation in real-time
        this.delegationWrapper.addEventListener('input', (event) => {
            if (event.target.matches('.form-control')) {
                this.validateField(event.target);
            }
        });

        // Form interception logic
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Manual form reset pipeline
        this.resetBtn.addEventListener('click', () => this.clearForm());
    }

    /**
     * Real-time routing validator logic matching fields to validation criteria rules
     */
    validateField(input) {
        const value = input.value.trim();
        const id = input.id;
        let isValid = true;
        let msg = "";

        switch(id) {
            case 'fullName':
                if (value.length < 3) {
                    isValid = false;
                    msg = "Name must be equal to or greater than 3 characters long.";
                }
                break;
            case 'phone':
                const phonePattern = /^\d{10}$/;
                if (!phonePattern.test(value)) {
                    isValid = false;
                    msg = "Phone parameter entry must comprise exactly 10 numerical values.";
                }
                break;
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    isValid = false;
                    msg = "Please insert a syntactically correct operational Email reference.";
                }
                break;
            case 'aadhar':
                const aadharPattern = /^\d{12}$/;
                if (!aadharPattern.test(value)) {
                    isValid = false;
                    msg = "Aadhar context properties require exactly 12 continuous digits.";
                }
                break;
            case 'checkIn':
            case 'checkOut':
                if (value === "") {
                    isValid = false;
                    msg = "Date field parameter configuration state cannot persist unassigned.";
                } else {
                    const chosenDate = new Date(value);
                    chosenDate.setHours(0, 0, 0, 0);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    // Allows choosing today or future dates, explicitly rejecting past dates
                    if (chosenDate < today) {
                        isValid = false;
                        msg = "Date cannot align backwards into chronological past paths.";
                    }
                }
                break;
            case 'adults':
                const num = parseInt(value, 10);
                if (isNaN(num) || num < 1) {
                    isValid = false;
                    msg = "Capacity head count constraints demand at least 1 adult guest.";
                }
                break;
            case 'address':
                if (value === "") {
                    isValid = false;
                    msg = "Residential layout details must be supplied.";
                }
                break;
            case 'purpose':
                if (value === "") {
                    isValid = false;
                    msg = "Purpose designation metric requires explicitly defined descriptive tracking details.";
                }
                break;
        }

        this.toggleFieldUI(input, isValid, msg);
        return isValid;
    }

    toggleFieldUI(input, isValid, msg) {
        const errorContainer = document.getElementById(`${input.id}Err`);
        if (!isValid) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            if (errorContainer) errorContainer.innerText = msg;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (errorContainer) errorContainer.innerText = "";
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const inputs = this.form.querySelectorAll('.form-control');
        let formValid = true;

        inputs.forEach(input => {
            const fieldValid = this.validateField(input);
            if (!fieldValid) formValid = false;
        });

        // Extra logic verification checking that departure checkout dates follow entry checkin dates
        if (formValid) {
            const cin = new Date(document.getElementById('checkIn').value);
            const cout = new Date(document.getElementById('checkOut').value);
            if (cout < cin) {
                formValid = false;
                this.toggleFieldUI(document.getElementById('checkOut'), false, "Checkout parameters cannot sit structurally behind checkin values.");
            }
        }

        if (formValid) {
            this.saveToLocalStorage();
            this.showMessage("Success! Registration successfully captured into Local Storage array.", "success");
            this.clearForm();
        } else {
            this.showMessage("Validation check failure. Confirm missing structural field items are rectified.", "danger");
        }
    }

    saveToLocalStorage() {
        const currentData = storageUtil.getItems();
        
        const payload = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5), // Unique reference identification mechanism
            fullName: document.getElementById('fullName').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            aadhar: document.getElementById('aadhar').value.trim(),
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            adults: document.getElementById('adults').value,
            address: document.getElementById('address').value.trim(),
            purpose: document.getElementById('purpose').value.trim()
        };

        currentData.push(payload);
        storageUtil.setItems(currentData);
    }

    clearForm() {
        this.form.reset();
        const inputs = this.form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        const errors = this.form.querySelectorAll('.error-feedback');
        errors.forEach(err => err.innerText = "");
    }

    showMessage(text, type) {
        this.messageBox.className = `alert alert-${type} d-block`;
        this.messageBox.innerText = text;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * CLASS: SubmissionViewer
 * Monitors data filtering analytics logic matrices across administrative monitoring views.
 */
export class SubmissionViewer {
    constructor() {
        this.tableBody = document.getElementById('submissionTableBody');
        this.searchInput = document.getElementById('dashboardSearch');
        this.noDataAlert = document.getElementById('noDataAlert');
        this.tableElement = document.getElementById('submissionsTable');

        if (this.tableBody) {
            this.init();
        }
    }

    init() {
        this.renderTable(storageUtil.getItems());

        // Event listener tracking search entry mapping components
        this.searchInput.addEventListener('input', () => this.handleSearch());

        // Event delegation logic intercepting row deletion sequences
        this.tableBody.addEventListener('click', (e) => {
            if (e.target.matches('.delete-record-btn') || e.target.closest('.delete-record-btn')) {
                const btn = e.target.matches('.delete-record-btn') ? e.target : e.target.closest('.delete-record-btn');
                this.deleteRecord(btn.dataset.id);
            }
        });
    }

    renderTable(records) {
        this.tableBody.innerHTML = "";

        if (records.length === 0) {
            this.noDataAlert.classList.remove('d-none');
            this.tableElement.classList.add('d-none');
            return;
        }

        this.noDataAlert.classList.add('d-none');
        this.tableElement.classList.remove('d-none');

        records.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${this.escapeHtml(item.fullName)}</strong></td>
                <td>${this.escapeHtml(item.phone)}</td>
                <td>${this.escapeHtml(item.email)}</td>
                <td>${this.escapeHtml(item.aadhar)}</td>
                <td><span class="badge bg-secondary">${this.escapeHtml(item.checkIn)}</span></td>
                <td><span class="badge bg-secondary">${this.escapeHtml(item.checkOut)}</span></td>
                <td class="text-center">${this.escapeHtml(item.adults)}</td>
                <td><small>${this.escapeHtml(item.address)}</small></td>
                <td><small>${this.escapeHtml(item.purpose)}</small></td>
                <td class="text-center">
                    <button class="btn btn-outline-danger btn-sm delete-record-btn" data-id="${item.id}" title="Remove Record">
                        🗑 Delete
                    </button>
                </td>
            `;
            this.tableBody.appendChild(tr);
        });
    }

    handleSearch() {
        const term = this.searchInput.value.toLowerCase().trim();
        const allRecords = storageUtil.getItems();

        const filtered = allRecords.filter(item => {
            return item.fullName.toLowerCase().includes(term) || item.checkIn.includes(term);
        });

        this.renderTable(filtered);
    }

    deleteRecord(id) {
        if (confirm("Are you sure you want to permanently delete this registration record?")) {
            const allRecords = storageUtil.getItems();
            const matchingOutput = allRecords.filter(item => item.id !== id);
            storageUtil.setItems(matchingOutput);
            this.handleSearch(); // Refresh data grid layout with current queries intact
        }
    }

    escapeHtml(str) {
        if (!str) return '';
        return str.toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}