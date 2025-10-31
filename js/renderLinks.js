// js/renderLinks.js

function renderLinks() {
    console.log('=== RENDER LINKS DEBUG ===');
    console.log('Current tab:', currentTab);
    
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    const currentTabName = document.getElementById('current-tab-name');
    const addLinkSection = document.getElementById('add-link-section');
    const toggleSelectionModeBtn = document.getElementById('toggle-selection-mode-btn');
    const reorderLinksBtn = document.getElementById('reorder-links-btn');
    const addMultiLinkCardBtn = document.getElementById('add-multi-link-card-btn');
    const createSearchLinkBtn = document.getElementById('create-search-link-btn');

    // Clear any existing checkboxes when re-rendering
    removeCheckboxesFromLinks();

    // Handle null/undefined currentTab case
    if (!currentTab) {
        console.log('No current tab selected, clearing links display');
        
        if (linksGrid) {
            linksGrid.innerHTML = '';
            linksGrid.style.display = 'none';
        }
        
        if (noTabsMessage) {
            noTabsMessage.style.display = 'flex';
        }
        
        if (currentTabName) {
            currentTabName.textContent = 'Select a tab to get started';
        }
        
        if (addLinkSection) {
            addLinkSection.style.display = 'none';
        }
        
        // Hide action buttons when no tab is selected
        if (toggleSelectionModeBtn) toggleSelectionModeBtn.style.display = 'none';
        if (reorderLinksBtn) reorderLinksBtn.style.display = 'none';
        if (addMultiLinkCardBtn) addMultiLinkCardBtn.style.display = 'none';
        if (createSearchLinkBtn) createSearchLinkBtn.style.display = 'none';
        
        console.log('Links display cleared - no tab selected');
        return;
    }

    // If we have a valid currentTab, proceed with normal rendering
    if (noTabsMessage) {
        noTabsMessage.style.display = 'none';
    }

    if (currentTabName) {
        currentTabName.textContent = currentTab.name;
    }

    if (addLinkSection) {
        addLinkSection.style.display = 'block';
    }

    // Show action buttons when a tab is selected
    if (toggleSelectionModeBtn) toggleSelectionModeBtn.style.display = 'inline-block';
    if (reorderLinksBtn) reorderLinksBtn.style.display = 'inline-block';
    if (addMultiLinkCardBtn) addMultiLinkCardBtn.style.display = 'inline-block';
    if (createSearchLinkBtn) createSearchLinkBtn.style.display = 'inline-block';

    if (!linksGrid) {
        console.error('Links grid container not found');
        return;
    }

    linksGrid.innerHTML = '';
    linksGrid.style.display = 'block';

    // Check if currentTab has links array
    if (!currentTab.links || !Array.isArray(currentTab.links)) {
        console.log('No links array found in current tab, initializing empty array');
        currentTab.links = [];
    }

    console.log(`Rendering ${currentTab.links.length} links for tab: ${currentTab.name}`);

    if (currentTab.links.length === 0) {
        const noLinksMessage = document.createElement('div');
        noLinksMessage.className = 'no-links-message';
        noLinksMessage.innerHTML = `
            <h3>No links in this tab yet</h3>
            <p>Click "Add Link" to create your first link</p>
        `;
        linksGrid.appendChild(noLinksMessage);
        console.log('No links to render, showing empty state');
        return;
    }

    // Render links based on current view type
    switch (currentViewType) {
        case 'grid':
            renderGridView(currentTab.links, linksGrid);
            break;
        case 'list':
            renderListView(currentTab.links, linksGrid);
            break;
        case 'table':
            renderTableView(currentTab.links, linksGrid);
            break;
        default:
            console.warn('Unknown view type:', currentViewType, 'defaulting to grid view');
            renderGridView(currentTab.links, linksGrid);
    }

    // Add checkboxes if selection mode is active
    if (isSelectionMode) {
        addCheckboxesToLinks();
    }

    console.log('Links rendered successfully');
}

// Helper function to render grid view
function renderGridView(links, container) {
    container.className = 'links-grid';
    
    links.forEach((link, index) => {
        const linkCard = createLinkCard(link, index);
        container.appendChild(linkCard);
    });
}

// Helper function to render list view
function renderListView(links, container) {
    container.className = 'links-list';
    
    links.forEach((link, index) => {
        const listItem = createListViewLink(link, index);
        container.appendChild(listItem);
    });
}

// Helper function to render table view
function renderTableView(links, container) {
    container.className = 'links-table';
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                ${isSelectionMode ? '<th></th>' : ''}
                <th>Title</th>
                <th>URL</th>
                <th>Type</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${links.map((link, index) => createTableViewLink(link, index)).join('')}
        </tbody>
    `;
    container.appendChild(table);
}