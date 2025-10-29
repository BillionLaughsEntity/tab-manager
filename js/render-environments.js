// In render-environments.js - Update the environment rendering to include proper delete functionality
function renderEnvironments() {
    console.log('=== RENDER ENVIRONMENTS DEBUG ===');
    const environmentsContainer = document.getElementById('environments-container');
    const currentProfile = getCurrentProfile();
    
    console.log('Current profile:', currentProfile);
    console.log('Environments container:', environmentsContainer);
    
    if (!currentProfile || !environmentsContainer) {
        console.error('Cannot render environments: missing profile or container');
        environmentsContainer.innerHTML = '<div class="no-environments">No environments available</div>';
        return;
    }
    
    environmentsContainer.innerHTML = '';
    
    if (currentProfile.environments.length === 0) {
        environmentsContainer.innerHTML = '<div class="no-environments">No environments yet. Click + to add one.</div>';
        console.log('No environments to render');
        return;
    }
    
    console.log('Rendering', currentProfile.environments.length, 'environments');
    
    currentProfile.environments.forEach(environment => {
        const environmentElement = document.createElement('div');
        environmentElement.className = 'environment';
        environmentElement.dataset.environmentId = environment.id;
        
        environmentElement.innerHTML = `
            <div class="environment-header">
                <div class="environment-name">${environment.name}</div>
                <div class="environment-actions">
                    <button class="environment-action-btn rename-environment-btn" title="Rename Environment">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="environment-action-btn move-environment-btn" title="Move Environment to Another Profile">
                        <i class="fas fa-arrows-alt"></i>
                    </button>
                    <button class="environment-action-btn delete-environment-btn" title="Delete Environment">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="tabs-container" data-environment-id="${environment.id}">
                <!-- Tabs will be rendered here by renderTabs.js -->
            </div>
        `;
        
        environmentsContainer.appendChild(environmentElement);
        
        // Render tabs for this environment
        renderTabs(environment);
        
        // Add event listeners for this environment
        addEnvironmentEventListeners(environmentElement, environment);
    });
    
    console.log('Environments rendered successfully');
}

// Add this function to handle environment event listeners
function addEnvironmentEventListeners(environmentElement, environment) {
    console.log('Adding event listeners for environment:', environment.name);
    
    // Delete button
    const deleteBtn = environmentElement.querySelector('.delete-environment-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Delete button clicked for environment:', environment.name);
            
            const confirmDelete = confirm(`Are you sure you want to delete the environment "${environment.name}" and all its tabs?`);
            if (confirmDelete) {
                deleteEnvironment(environment);
            }
        });
        console.log('Delete event listener added');
    } else {
        console.error('Delete button not found for environment:', environment.name);
    }
    
    // Rename button
    const renameBtn = environmentElement.querySelector('.rename-environment-btn');
    if (renameBtn) {
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            environmentToRename = environment;
            document.getElementById('rename-environment-input').value = environment.name;
            renameEnvironmentModal.style.display = 'flex';
        });
    }
    
    // Move button
    const moveBtn = environmentElement.querySelector('.move-environment-btn');
    if (moveBtn) {
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMoveEnvironmentModal(environment);
        });
    }
    
    // Environment click (to select it)
    environmentElement.addEventListener('click', (e) => {
        if (!e.target.closest('.environment-actions')) {
            selectEnvironment(environment);
        }
    });
}

// Add this function if it doesn't exist
function selectEnvironment(environment) {
    console.log('Selecting environment:', environment.name);
    currentEnvironment = environment;
    currentTab = null;
    
    // Update UI to show selected state
    document.querySelectorAll('.environment').forEach(envEl => {
        envEl.classList.remove('active');
    });
    
    document.querySelector(`.environment[data-environment-id="${environment.id}"]`).classList.add('active');
    
    // Update tab header
    document.getElementById('current-tab-name').textContent = 'Select a tab';
    
    // Clear links display
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    
    if (linksGrid) linksGrid.style.display = 'none';
    if (noTabsMessage) noTabsMessage.style.display = 'block';
    
    // Hide add link section
    const addLinkSection = document.getElementById('add-link-section');
    if (addLinkSection) addLinkSection.style.display = 'none';
    
    console.log('Environment selected:', environment.name);
}