// Open color picker modal for profile
function openProfileColorModal(profile) {
    console.log('Opening color picker for profile:', profile.name);
    
    // Check if modal exists
    let colorModal = document.getElementById('profile-color-modal');
    
    if (!colorModal) {
        // Create modal
        colorModal = document.createElement('div');
        colorModal.id = 'profile-color-modal';
        colorModal.className = 'modal';
        colorModal.innerHTML = `
            <div class="color-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Change Profile Color</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="color-picker-container">
                    <div class="color-options">
                        <div class="color-option" data-color="#3498db" style="background-color: #3498db;"></div>
                        <div class="color-option" data-color="#e74c3c" style="background-color: #e74c3c;"></div>
                        <div class="color-option" data-color="#2ecc71" style="background-color: #2ecc71;"></div>
                        <div class="color-option" data-color="#f39c12" style="background-color: #f39c12;"></div>
                        <div class="color-option" data-color="#9b59b6" style="background-color: #9b59b6;"></div>
                        <div class="color-option" data-color="#1abc9c" style="background-color: #1abc9c;"></div>
                        <div class="color-option" data-color="#34495e" style="background-color: #34495e;"></div>
                        <div class="color-option" data-color="#e67e22" style="background-color: #e67e22;"></div>
                        <div class="color-option" data-color="#27ae60" style="background-color: #27ae60;"></div>
                        <div class="color-option" data-color="#2980b9" style="background-color: #2980b9;"></div>
                        <div class="color-option" data-color="#8e44ad" style="background-color: #8e44ad;"></div>
                        <div class="color-option" data-color="#c0392b" style="background-color: #c0392b;"></div>
                    </div>
                    <div class="selected-color-preview">
                        <span>Selected Color:</span>
                        <div class="color-preview" id="profile-color-preview" style="background-color: ${profile.color || '#3498db'}"></div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-secondary" id="close-profile-color-modal">Cancel</button>
                    <button class="modal-btn modal-btn-primary" id="save-profile-color-btn">Save Color</button>
                </div>
            </div>
        `;
        document.body.appendChild(colorModal);
        
        // Setup event listeners
        setupProfileColorModalEvents(profile);
    }
    
    // Update preview with current color
    const colorPreview = document.getElementById('profile-color-preview');
    if (colorPreview) {
        colorPreview.style.backgroundColor = profile.color || '#3498db';
    }
    
    // Show modal
    colorModal.style.display = 'block';
}

function setupProfileColorModalEvents(profile) {
    const modal = document.getElementById('profile-color-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.getElementById('close-profile-color-modal');
    const saveBtn = modal.getElementById('save-profile-color-btn');
    const colorOptions = modal.querySelectorAll('.color-option');
    const colorPreview = modal.getElementById('profile-color-preview');
    
    let selectedColor = profile.color || '#3498db';
    
    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedColor = this.dataset.color;
            colorPreview.style.backgroundColor = selectedColor;
            
            // Remove selected class from all options
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
    
    // Close events
    closeBtn.onclick = cancelBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    // Save event
    saveBtn.onclick = function() {
        updateProfileColor(profile, selectedColor);
        modal.style.display = 'none';
    };
    
    // Close when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}