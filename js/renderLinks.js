// Complete renderLinks function with view type support and proper checkbox handling
function renderLinks(tab) {

    // Add null check
    if (!tab) {
        console.warn('renderLinks called with null tab, clearing links display');
        linksGrid.innerHTML = '';
        document.getElementById('links-counter').textContent = '0 Links';
        return;
    }
    
    // Add links null check
    if (!tab.links) {
        console.warn('Tab has no links array:', tab);
        tab.links = [];
    }
    
    console.log(`Rendering ${tab.links.length} links for tab:`, tab.name);
    
    const linksGrid = document.getElementById('links-grid');
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
        // Grid view
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
}