// Open reorder environments modal
function openReorderEnvironmentsModal() {
    const currentProfile = getCurrentProfile();
    const reorderEnvironmentsList = document.getElementById('reorder-environments-list');
    reorderEnvironmentsList.innerHTML = '';
    
    if (!currentProfile.environments || currentProfile.environments.length === 0) {
        reorderEnvironmentsList.innerHTML = '<div style="padding: 20px; text-align: center;">No environments to reorder</div>';
        return;
    }
    
    currentProfile.environments.forEach((environment, index) => {
        const environmentItem = document.createElement('div');
        environmentItem.className = 'reorder-link-item';
        environmentItem.dataset.environmentId = environment.id;
        
        environmentItem.innerHTML = `
            <i class="fas fa-grip-lines"></i>
            <div class="reorder-link-title">${environment.name}</div>
            <div class="reorder-link-url">Environment</div>
            <div class="reorder-actions">
                <button class="reorder-btn move-up-btn" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="reorder-btn move-down-btn" ${index === currentProfile.environments.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
        `;
        
        reorderEnvironmentsList.appendChild(environmentItem);
        
        // Add event listeners for move up/down buttons
        const moveUpBtn = environmentItem.querySelector('.move-up-btn');
        const moveDownBtn = environmentItem.querySelector('.move-down-btn');
        
        moveUpBtn.addEventListener('click', () => {
            moveEnvironmentUp(environment.id);
            openReorderEnvironmentsModal(); // Refresh the modal
        });
        
        moveDownBtn.addEventListener('click', () => {
            moveEnvironmentDown(environment.id);
            openReorderEnvironmentsModal(); // Refresh the modal
        });
    });
    
    document.getElementById('reorder-environments-modal').style.display = 'flex';
}