// Render tabs for an environment - FIXED VERSION
function renderTabs(environment) {
    console.log('=== RENDER TABS DEBUG ===');
    console.log('Rendering tabs for environment:', environment.name);
    
    const tabsContainer = document.querySelector(`[data-environment-id="${environment.id}"] .tabs-container`);
    if (!tabsContainer) {
        console.error('Tabs container not found for environment:', environment.id);
        return;
    }
    
    tabsContainer.innerHTML = '';
    
    if (!environment.tabs || environment.tabs.length === 0) {
        tabsContainer.innerHTML = '<p style="padding: 10px; text-align: center; color: rgba(255,255,255,0.7)">No tabs yet</p>';
        return;
    }
    
    console.log('Rendering', environment.tabs.length, 'tabs');
    
    environment.tabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.className = 'tab-item';
        tabElement.dataset.tabId = tab.id;
        
        if (tab === currentTab && environment === currentEnvironment) {
            tabElement.classList.add('active');
        }
        
        tabElement.innerHTML = `
            <div class="tab-name">${tab.name}</div>
            <div class="tab-actions">
                <button class="tab-action-btn edit-tab" title="Rename Tab">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="tab-action-btn move-tab" title="Move Tab">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="tab-action-btn delete-tab" title="Delete Tab">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        tabsContainer.appendChild(tabElement);
        
        // Add event listener for tab selection
        tabElement.addEventListener('click', () => {
            selectTab(environment, tab);
        });
        
        // Add event listeners for tab actions
        const editBtn = tabElement.querySelector('.edit-tab');
        const moveBtn = tabElement.querySelector('.move-tab');
        const deleteBtn = tabElement.querySelector('.delete-tab');
        
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tabToRename = tab;
            document.getElementById('rename-tab-input').value = tab.name;
            renameTabModal.style.display = 'flex';
        });
        
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMoveTabModal(tab);
        });

        // FIXED DELETE EVENT LISTENER
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('Delete button clicked for tab:', tab.name);
            console.log('Environment:', environment.name);
            
            if (confirm(`Are you sure you want to delete the tab "${tab.name}"?`)) {
                deleteTab(tab, environment); // PASS THE ENVIRONMENT PARAMETER
            }
        });
        
        console.log('Added event listeners for tab:', tab.name);
    });
    
    console.log('Tabs rendered successfully for environment:', environment.name);
}