// Populate environments for clone operation
function populateProfileEnvironmentsForClone(profile, container) {
    container.innerHTML = '';
    
    if (!profile.environments || profile.environments.length === 0) {
        container.innerHTML = `
            <div style="padding: 15px; text-align: center; color: #7f8c8d;">
                <p>No environments in this profile</p>
                <button class="modal-btn modal-btn-primary" onclick="createEnvironmentForClone('${profile.id}')" style="margin-top: 10px;">
                    <i class="fas fa-plus"></i>Create Environment
                </button>
            </div>
        `;
        return;
    }
    
    profile.environments.forEach(environment => {
        const environmentElement = document.createElement('div');
        environmentElement.className = 'move-link-environment';
        environmentElement.dataset.environmentId = environment.id;
        
        environmentElement.innerHTML = `
            <div class="move-link-environment-header">
                <span>${environment.name}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="move-link-environment-content">
                <!-- Tabs will be added here -->
            </div>
        `;
        
        container.appendChild(environmentElement);
        
        const environmentHeader = environmentElement.querySelector('.move-link-environment-header');
        const environmentContent = environmentElement.querySelector('.move-link-environment-content');
        
        environmentHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            environmentElement.classList.toggle('expanded');
            
            if (environmentElement.classList.contains('expanded') && environmentContent.innerHTML === '') {
                populateEnvironmentTabsForClone(environment, environmentContent, profile.id);
            } else if (!environmentElement.classList.contains('expanded')) {
                environmentContent.innerHTML = '';
            }
        });
    });
}