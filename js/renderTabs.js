// Render tabs for an environment - UPDATED VERSION
function renderTabs(environment) {
    const tabsContainer = document.getElementById(`tabs-${environment.id}`);
    tabsContainer.innerHTML = '';
    
    if (!environment.tabs || environment.tabs.length === 0) {
        tabsContainer.innerHTML = '<p style="padding: 10px; text-align: center; color: rgba(255,255,255,0.7)">No tabs yet</p>';
        return;
    }
    
    environment.tabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.className = 'tab-item';
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
            if (typeof openRenameTabModal === 'function') {
                openRenameTabModal(tab);
            }
        });
        
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Use the function approach instead of direct modal access
            if (typeof openMoveTabModal === 'function') {
                openMoveTabModal(tab);
            } else {
                // Fallback to old way if function doesn't exist
                tabToMove = tab;
                document.getElementById('move-tab-modal').style.display = 'flex';
            }
        });

        // FIX ONLY THE DELETE BUTTON - add environment parameter
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Are you sure you want to delete the tab "${tab.name}"?`)) {
                deleteTab(tab, environment); // ADDED environment parameter
            }
        });
    });
}