// Render environments in the side panel
function renderEnvironments() {
    environmentsContainer.innerHTML = '';
    const currentProfile = getCurrentProfile();
    
    if (!currentProfile || !currentProfile.environments || currentProfile.environments.length === 0) {
        environmentsContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: rgba(255,255,255,0.7)">No environments yet. Create your first one!</p>';
        return;
    }
    
    // Ensure all environments have collapsed property and default to true
    currentProfile.environments.forEach(environment => {
        if (environment.collapsed === undefined) {
            environment.collapsed = true;
        }
    });
    
    currentProfile.environments.forEach(environment => {
        const environmentElement = document.createElement('div');
        environmentElement.className = 'environment';
        environmentElement.dataset.environmentId = environment.id;
        
        // Only expand if not collapsed
        if (!environment.collapsed) {
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

        // Add event listener for reorder tabs button
        const reorderTabsBtn = environmentElement.querySelector('.reorder-tabs-btn');
        reorderTabsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openReorderTabsModal(environment);
        });
        
        // Updated: Single expand behavior with smooth transitions
        const environmentHeader = environmentElement.querySelector('.environment-header');
        environmentHeader.addEventListener('click', () => {
            const wasExpanded = !environment.collapsed;
            
            if (!wasExpanded) {
                // Close all other environments first with smooth transition
                currentProfile.environments.forEach(env => {
                    if (env.id !== environment.id && !env.collapsed) {
                        env.collapsed = true;
                        const otherEnvElement = document.querySelector(`.environment[data-environment-id="${env.id}"]`);
                        if (otherEnvElement) {
                            otherEnvElement.classList.remove('expanded');
                        }
                    }
                });
                
                // Small delay before expanding the clicked one
                setTimeout(() => {
                    environment.collapsed = false;
                    environmentElement.classList.add('expanded');
                    saveWorkbooks();
                }, 50);
            } else {
                // Collapse the currently expanded one
                environment.collapsed = true;
                environmentElement.classList.remove('expanded');
                saveWorkbooks();
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
            openMoveEnvironmentModal(environment);
        });
        
        // Render tabs for this environment
        renderTabs(environment);
    });
    
    // Save the initial state
    saveWorkbooks();
}