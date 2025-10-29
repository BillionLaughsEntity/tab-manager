// Complete renderLinks function with view type support and proper checkbox handling
function renderLinks(tab) {
    console.log('=== RENDER LINKS DEBUG ===');
    console.log('Current tab:', tab);
    
    // Get DOM elements at the start
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    const addLinkSection = document.getElementById('add-link-section');
    const reorderLinksBtn = document.getElementById('reorder-links-btn');
    const currentTabName = document.getElementById('current-tab-name');
    const linksCounter = document.getElementById('links-counter');
    
    if (!linksGrid) {
        console.error('links-grid element not found');
        return;
    }

    // Add null check - FIXED VERSION
    if (!tab) {
        console.warn('renderLinks called with null tab, clearing links display');
        linksGrid.innerHTML = '';
        linksGrid.style.display = 'none';
        if (noTabsMessage) noTabsMessage.style.display = 'block';
        if (addLinkSection) addLinkSection.style.display = 'none';
        if (reorderLinksBtn) reorderLinksBtn.style.display = 'none';
        if (currentTabName) currentTabName.textContent = 'Select a tab to get started';
        if (linksCounter) linksCounter.textContent = '0 Links';
        return;
    }
    
    // Add links null check
    if (!tab.links) {
        console.warn('Tab has no links array:', tab);
        tab.links = [];
    }
    
    console.log(`Rendering ${tab.links.length} links for tab:`, tab.name);
    
    // Update UI state
    linksGrid.style.display = 'grid';
    if (noTabsMessage) noTabsMessage.style.display = 'none';
    if (addLinkSection) addLinkSection.style.display = 'flex';
    if (reorderLinksBtn) reorderLinksBtn.style.display = 'block';
    if (currentTabName) currentTabName.textContent = tab.name;
    if (linksCounter) linksCounter.textContent = `${tab.links.length} Links`;
    
    linksGrid.innerHTML = '';
    
    if (!tab.links || tab.links.length === 0) {
        linksGrid.innerHTML = `
            <div class="no-links-message">
                <h3>No links yet</h3>
                <p>Add your first link to get started!</p>
            </div>
        `;
        return;
    }
    
    // Clear the container first
    linksGrid.innerHTML = '';
    
    if (currentViewType === 'list') {
        // List view
        const listContainer = document.createElement('div');
        listContainer.className = 'links-list-view';
        
        tab.links.forEach(link => {
            createListViewLink(link, listContainer);
        });
        
        linksGrid.appendChild(listContainer);
        
    } else if (currentViewType === 'table') {
        // Table view
        const tableContainer = document.createElement('div');
        tableContainer.className = 'links-table-view';
        tableContainer.innerHTML = `
            <table class="links-table">
                <thead>
                    <tr>
                        <th style="width: 30px;"></th> <!-- Checkbox column -->
                        <th>Title</th>
                        <th>URL</th>
                        <th style="width: 150px;">Actions</th>
                    </tr>
                </thead>
                <tbody id="links-table-body">
                    <!-- Table rows will be added here -->
                </tbody>
            </table>
        `;
        
        const tbody = tableContainer.querySelector('#links-table-body');
        tab.links.forEach(link => {
            createTableViewLink(link, tbody);
        });
        
        linksGrid.appendChild(tableContainer);
        
    } else {
        // Grid view - KEEP YOUR EXISTING GRID VIEW CODE
        linksGrid.style.display = 'grid';
        linksGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        linksGrid.style.gap = '20px';
        linksGrid.style.width = '100%';
        
        tab.links.forEach(link => {
            const card = createLinkCard(link);
            card.dataset.linkId = link.id;
            linksGrid.appendChild(card);
        });
    }

    // If we're in selection mode, add checkboxes to all views
    if (isSelectionMode) {
        addCheckboxesToAllViews();
    }
    
    console.log('Links rendered successfully');
}