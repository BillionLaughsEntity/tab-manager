// renderTabs.js - Fixed version
function renderTabs(environment) {
    console.log('=== RENDER TABS DEBUG ===');
    console.log('Environment:', environment);
    
    if (!environment) {
        console.error('No environment provided to renderTabs');
        return;
    }
    
    // Fix the selector - it should find the tabs container within the specific environment
    const environmentElement = document.querySelector(`.environment[data-environment-id="${environment.id}"]`);
    if (!environmentElement) {
        console.error('Environment element not found for:', environment.id);
        return;
    }
    
    const tabsContainer = environmentElement.querySelector('.tabs-container');
    console.log('Tabs container found:', tabsContainer);
    
    if (!tabsContainer) {
        console.error('Tabs container not found for environment:', environment.id);
        return;
    }
    
    tabsContainer.innerHTML = '';
    
    if (environment.tabs.length === 0) {
        tabsContainer.innerHTML = '<div class="no-tabs">No tabs yet</div>';
        console.log('No tabs to render');
        return;
    }
    
    console.log('Rendering', environment.tabs.length, 'tabs');
    
    environment.tabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.className = 'tab';
        tabElement.dataset.tabId = tab.id;
        
        tabElement.innerHTML = `
            <div class="tab-header">
                <div class="tab-name">${tab.name}</div>
                <div class="tab-actions">
                    <button class="tab-action-btn rename-tab-btn" title="Rename Tab">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="tab-action-btn move-tab-btn" title="Move Tab to Another Environment">
                        <i class="fas fa-arrows-alt"></i>
                    </button>
                    <button class="tab-action-btn delete-tab-btn" title="Delete Tab">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        tabsContainer.appendChild(tabElement);
        
        // Add event listeners for this tab
        addTabEventListeners(tabElement, tab, environment);
    });
    
    console.log('Tabs rendered successfully');
}

function addTabEventListeners(tabElement, tab, environment) {
    console.log('Adding event listeners for tab:', tab.name);
    
    // Tab click (to select it)
    tabElement.addEventListener('click', (e) => {
        if (!e.target.closest('.tab-actions')) {
            selectTab(tab, environment);
        }
    });
    
    // Delete button
    const deleteBtn = tabElement.querySelector('.delete-tab-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Delete button clicked for tab:', tab.name);
            
            const confirmDelete = confirm(`Are you sure you want to delete the tab "${tab.name}" and all its links?`);
            if (confirmDelete) {
                deleteTab(tab, environment);
            }
        });
    }
    
    // Rename button
    const renameBtn = tabElement.querySelector('.rename-tab-btn');
    if (renameBtn) {
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tabToRename = tab;
            document.getElementById('rename-tab-input').value = tab.name;
            renameTabModal.style.display = 'flex';
        });
    }
    
    // Move button
    const moveBtn = tabElement.querySelector('.move-tab-btn');
    if (moveBtn) {
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMoveTabModal(tab, environment);
        });
    }
}