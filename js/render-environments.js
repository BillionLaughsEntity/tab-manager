// Render environments in the side panel
function renderEnvironments() {
    environmentsContainer.innerHTML = '';
    const currentProfile = getCurrentProfile();
    
    if (!currentProfile || !currentProfile.environments || currentProfile.environments.length === 0) {
        environmentsContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: rgba(255,255,255,0.7)">No environments yet. Create your first one!</p>';
        return;
    }
    
    currentProfile.environments.forEach(environment => {
        const environmentElement = document.createElement('div');
        environmentElement.className = 'environment';
        if (environment === currentEnvironment) {
            environmentElement.classList.add('expanded');
        }
        
        environmentElement.innerHTML = `
            <div class="environment-header" style="border-left-color: ${getCurrentProfile().color}">
                <div class="environment-name">
                    <i class="fas fa-chevron-down"></i>
                    ${environment.name}
                </div>
                <div class="environment-actions">
                    <button class="environment-action-btn reorder-tabs-btn" title="Reorder Tabs">
                        <i class="fas fa-sort"></i>
                    </button>
                    <button class="environment-action-btn rename-environment-btn" title="Rename Environment">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="environment-action-btn move-environment-btn" title="Move Environment">
                        <i class="fas fa-arrows-alt"></i>
                    </button>
                    <button class="environment-action-btn delete-environment-btn" title="Delete Environment">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="environment-content">
                <div class="tabs-list" id="tabs-${environment.id}">
                    <!-- Tabs will be added here -->
                </div>
            </div>
        `;
        
        environmentsContainer.appendChild(environmentElement);

        // Add event listener for reorder tabs button (add this with the other environment action buttons)
        const reorderTabsBtn = environmentElement.querySelector('.reorder-tabs-btn');
        reorderTabsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openReorderTabsModal(environment);
        });
        
        // Add event listeners for environment header
        const environmentHeader = environmentElement.querySelector('.environment-header');
        environmentHeader.addEventListener('click', () => {
            // Toggle expanded class
            const wasExpanded = environmentElement.classList.contains('expanded');
            
            // Close all environments first
            document.querySelectorAll('.environment.expanded').forEach(env => {
                env.classList.remove('expanded');
            });
            
            // If it wasn't expanded, expand it
            if (!wasExpanded) {
                environmentElement.classList.add('expanded');
            }
        });
        
        // Add event listeners for environment actions
        const renameBtn = environmentElement.querySelector('.rename-environment-btn');
        const moveBtn = environmentElement.querySelector('.move-environment-btn');
        const deleteBtn = environmentElement.querySelector('.delete-environment-btn');
        
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof openRenameEnvironmentModal === 'function') {
                openRenameEnvironmentModal(environment);
            }
        });
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Are you sure you want to delete the environment "${environment.name}"?`)) {
                deleteEnvironment(environment);
            }
        });

        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMoveEnvironmentModal(environment); // This is correct for environments
        });
        
        // Render tabs for this environment
        renderTabs(environment);
    });
}