function openTrashBinModal() {
    const trashBinModal = document.getElementById('trash-bin-modal');
    const trashBinItems = document.getElementById('trash-bin-items');
    const trashBinCount = document.getElementById('trash-bin-count');
    
    // Update count
    trashBinCount.textContent = `${trashBin.length} item${trashBin.length !== 1 ? 's' : ''} in trash`;
    
    // Clear previous content
    trashBinItems.innerHTML = '';
    
    if (trashBin.length === 0) {
        trashBinItems.innerHTML = `
            <div class="trash-bin-empty">
                <i class="fas fa-trash" style="font-size: 3rem; margin-bottom: 20px; color: #bdc3c7;"></i>
                <h3>Trash Bin is Empty</h3>
                <p>Deleted items will appear here</p>
            </div>
        `;
    } else {
        // Sort by deletion date (newest first)
        const sortedTrash = [...trashBin].sort((a, b) => 
            new Date(b.deletedAt) - new Date(a.deletedAt)
        );
        
        console.log('=== OPENING TRASH BIN ===');
        console.log('Original trash bin:', trashBin.map((item, i) => ({index: i, id: item.id, title: item.data?.title})));
        console.log('Sorted trash bin:', sortedTrash.map(item => ({id: item.id, title: item.data?.title})));
        
        // Create a map from item ID to actual index
        const idToIndexMap = {};
        trashBin.forEach((item, index) => {
            idToIndexMap[item.id] = index;
        });
        
        sortedTrash.forEach((item) => {
            // FIX: Add safety checks for undefined properties
            const itemData = item.data || {};
            const itemTitle = itemData.title || 'Untitled Item';
            const itemUrl = itemData.url || '';
            
            // Determine content based on item type with safety checks
            let content = '';
            let iconClass = 'fa-link';
            
            if (itemData.isMultiLink) {
                iconClass = 'fa-layer-group';
                const urlCount = itemData.urls ? itemData.urls.length : 0;
                content = `Multi-link card with ${urlCount} links`;
            } else if (itemData.isSearchLink) {
                iconClass = 'fa-search';
                content = itemUrl || 'Search link';
            } else {
                content = itemUrl || 'Link';
            }
            
            const actualIndex = idToIndexMap[item.id];
            
            const trashItem = document.createElement('div');
            trashItem.className = 'trash-bin-item';
            
            trashItem.innerHTML = `
                <div class="trash-bin-item-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="trash-bin-item-content">
                    <div class="trash-bin-item-title">${itemTitle}</div>
                    <div class="trash-bin-item-url">${content}</div>
                    <div class="trash-bin-item-origin">
                        Originally from: ${item.parentWorkbook?.name || 'Unknown'} → 
                        ${item.parentProfile?.name || 'Unknown'} → 
                        ${item.parentEnvironment?.name || 'Unknown'} → 
                        ${item.parentTab?.name || 'Unknown'}
                    </div>
                    <div class="trash-bin-item-deleted">
                        Deleted: ${new Date(item.deletedAt).toLocaleString()}
                    </div>
                </div>
                <div class="trash-bin-item-actions">
                    <button class="trash-bin-action-btn trash-bin-restore-btn" data-index="${actualIndex}">
                        <i class="fas fa-undo"></i>Restore
                    </button>
                    <button class="trash-bin-action-btn trash-bin-permanently-delete-btn" data-index="${actualIndex}">
                        <i class="fas fa-trash"></i>Delete
                    </button>
                </div>
            `;

            // Add event listeners directly to these buttons
            const restoreBtn = trashItem.querySelector('.trash-bin-restore-btn');
            const deleteBtn = trashItem.querySelector('.trash-bin-permanently-delete-btn');
            
            restoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(e.currentTarget.dataset.index);
                console.log('=== RESTORE CLICKED ===');
                console.log('Actual index from map:', index);
                console.log('Item at that index:', trashBin[index]);
                restoreFromTrash(index);
            });
            
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(e.currentTarget.dataset.index);
                console.log('=== DELETE CLICKED ===');
                console.log('Actual index from map:', index);
                console.log('Item at that index:', trashBin[index]);
                permanentlyDeleteFromTrash(index);
            });
            
            trashBinItems.appendChild(trashItem);
        });
    }
    
    // Show the modal
    trashBinModal.style.display = 'flex';
}


// Fix clearTrashBin function
function clearTrashBin() {
    if (trashBin.length === 0) {
        alert('Trash bin is already empty');
        return;
    }
    
    if (confirm(`Are you sure you want to permanently delete all ${trashBin.length} items from the trash bin? This action cannot be undone.`)) {
        trashBin = [];
        saveTrashBin();
        
        // Refresh trash bin modal
        document.getElementById('trash-bin-modal').style.display = 'none';
        setTimeout(() => {
            openTrashBinModal();
        }, 100);
        
        alert('Trash bin emptied successfully');
    }
}



// Restore from trash - SIMPLIFIED VERSION
function restoreFromTrash(index) {
    console.log('=== RESTORE FUNCTION CALLED ===');
    console.log('Index received:', index);
    console.log('Trash bin length:', trashBin.length);

    if (index < 0 || index >= trashBin.length) {
        console.error('Invalid index!');
        return;
    }
    
    const item = trashBin[index];
    console.log('Item at index:', item);

    if (!item) {
        console.error('No item found at index!');
        return;
    }

    console.log('Item data:', item.data);
    console.log('Item title:', item.data?.title);
    
    // Find the destination (try original location first, then current)
    let destinationWorkbook = getCurrentWorkbook();
    let destinationProfile = getCurrentProfile();
    let destinationEnvironment = currentEnvironment;
    let destinationTab = currentTab;
    
    // Try to find original location
    if (item.parentWorkbook && item.parentProfile && item.parentEnvironment && item.parentTab) {
        const originalWorkbook = workbooks.find(w => w.id === item.parentWorkbook.id);
        if (originalWorkbook) {
            const originalProfile = originalWorkbook.profiles.find(p => p.id === item.parentProfile.id);
            if (originalProfile) {
                const originalEnvironment = originalProfile.environments.find(e => e.id === item.parentEnvironment.id);
                if (originalEnvironment) {
                    const originalTab = originalEnvironment.tabs.find(t => t.id === item.parentTab.id);
                    if (originalTab) {
                        destinationWorkbook = originalWorkbook;
                        destinationProfile = originalProfile;
                        destinationEnvironment = originalEnvironment;
                        destinationTab = originalTab;
                    }
                }
            }
        }
    }
    
    // Restore the link
    if (!destinationTab.links) {
        destinationTab.links = [];
    }
    
    // Check if link already exists to prevent duplicates
    const linkExists = destinationTab.links.some(link => link.id === item.data.id);
    if (!linkExists) {
        destinationTab.links.push(item.data);
    }
    
    // Remove from trash
    trashBin.splice(index, 1);
    
    // Save changes
    saveWorkbooks();
    saveTrashBin();
    
    // Refresh UI
    if (destinationWorkbook === getCurrentWorkbook()) {
        renderProfileTabs();
        renderEnvironments();
        if (destinationTab === currentTab) {
            renderLinks(currentTab);
        }
    }
    
    // Close and reopen modal
    document.getElementById('trash-bin-modal').style.display = 'none';
    setTimeout(() => {
        openTrashBinModal();
    }, 100);
    
    alert(`"${item.data.title}" restored successfully`);
}


// Permanently delete from trash - SIMPLIFIED VERSION
function permanentlyDeleteFromTrash(index) {
    if (index < 0 || index >= trashBin.length) return;
    
    const item = trashBin[index];
    if (!item) return;
    
    if (confirm(`Are you sure you want to permanently delete "${item.data.title}"? This cannot be undone.`)) {
        trashBin.splice(index, 1);
        saveTrashBin();
        
        // Refresh the modal
        document.getElementById('trash-bin-modal').style.display = 'none';
        setTimeout(() => {
            openTrashBinModal();
        }, 100);
    }
}


// Update the deleteLink function in trash-bin-functions.js:
function deleteLink(link, tab, environment) {
    // Handle different parameter formats
    if (arguments.length === 1) {
        // Called from createLinkCard.js with just link
        tab = currentTab;
        environment = currentEnvironment;
    } else if (arguments.length === 2 && typeof tab === 'number') {
        // Called with (index) - old format, handle gracefully
        const linkIndex = tab;
        if (currentTab && currentTab.links && currentTab.links[linkIndex]) {
            link = currentTab.links[linkIndex];
            tab = currentTab;
            environment = currentEnvironment;
        } else {
            console.error('Invalid deleteLink call with index:', linkIndex);
            return;
        }
    }
    
    if (!link || typeof link !== 'object') {
        console.error('Invalid link parameter:', link);
        alert('Error: Invalid link data');
        return;
    }
    
    const linkTitle = link.title || 'Untitled Link';
    const linkId = link.id;
    
    if (!linkId) {
        console.error('Link missing ID:', link);
        alert('Error: Link missing identifier');
        return;
    }
    
    if (!confirm(`Are you sure you want to move "${linkTitle}" to trash?`)) {
        return;
    }
    
    const targetTab = tab || currentTab;
    const targetEnvironment = environment || currentEnvironment;
    const targetProfile = getCurrentProfile();
    const targetWorkbook = getCurrentWorkbook();
    
    if (!targetTab) {
        console.error('No target tab found');
        alert('Error: No tab selected');
        return;
    }
    
    if (!targetTab.links) {
        targetTab.links = [];
    }
    
    // Create trash item
    const trashItem = {
        id: 'trash-' + Date.now(),
        type: 'link',
        originalId: linkId,
        data: link,
        parentTab: targetTab ? {
            id: targetTab.id,
            name: targetTab.name
        } : null,
        parentEnvironment: targetEnvironment ? {
            id: targetEnvironment.id,
            name: targetEnvironment.name
        } : null,
        parentProfile: targetProfile ? {
            id: targetProfile.id,
            name: targetProfile.name
        } : null,
        parentWorkbook: targetWorkbook ? {
            id: targetWorkbook.id,
            name: targetWorkbook.name
        } : null,
        deletedAt: new Date().toISOString()
    };
    
    // Add to trash bin
    trashBin.push(trashItem);
    saveTrashBin();
    
    // Remove from current tab
    const initialLength = targetTab.links.length;
    targetTab.links = targetTab.links.filter(l => l.id !== linkId);
    const finalLength = targetTab.links.length;
    
    if (initialLength === finalLength) {
        console.error('Link was not found in tab!');
        alert('Error: Could not find link in tab');
        return;
    }
    
    // Save and refresh
    saveWorkbooks();
    
    // Only re-render if this is the currently viewed tab
    if (targetTab === currentTab) {
        renderLinks(currentTab);
    }
    
    alert(`"${linkTitle}" moved to trash`);
}

// Helper function to import trash bin
function importTrashBin(trashBinElement) {
    const newTrashBin = [];
    const trashItemElements = trashBinElement.getElementsByTagName('trashItem');
    
    for (let i = 0; i < trashItemElements.length; i++) {
        const itemElement = trashItemElements[i];
        const trashedItem = createTrashItem(itemElement, i);
        
        if (trashedItem) {
            newTrashBin.push(trashedItem);
        }
    }
    
    return newTrashBin;
}

// Helper function to create trash item
function createTrashItem(itemElement, index) {
    const originElement = itemElement.getElementsByTagName('origin')[0];
    
    const trashedItem = {
        id: itemElement.getAttribute('id') || 'trash-' + Date.now() + index,
        title: itemElement.getElementsByTagName('title')[0]?.textContent || 'Deleted Item',
        url: itemElement.getElementsByTagName('url')[0]?.textContent || '#',
        deletedAt: itemElement.getAttribute('deletedAt') || new Date().toISOString(),
        origin: originElement ? {
            profileId: originElement.getElementsByTagName('profileId')[0]?.textContent || '',
            profileName: originElement.getElementsByTagName('profileName')[0]?.textContent || '',
            environmentId: originElement.getElementsByTagName('environmentId')[0]?.textContent || '',
            environmentName: originElement.getElementsByTagName('environmentName')[0]?.textContent || '',
            tabId: originElement.getElementsByTagName('tabId')[0]?.textContent || '',
            tabName: originElement.getElementsByTagName('tabName')[0]?.textContent || ''
        } : null
    };
    
    // Handle different link types
    const typeElement = itemElement.getElementsByTagName('type')[0];
    if (typeElement) {
        const type = typeElement.textContent;
        if (type === 'multi') {
            trashedItem.isMultiLink = true;
            processMultiLinkUrls(itemElement, trashedItem);
        } else if (type === 'search') {
            trashedItem.isSearchLink = true;
        }
    }
    
    // Check if it's a multi-link by presence of urls element (backward compatibility)
    const urlsElement = itemElement.getElementsByTagName('urls')[0];
    if (urlsElement && !trashedItem.isMultiLink) {
        trashedItem.isMultiLink = true;
        processMultiLinkUrls(itemElement, trashedItem);
    }
    
    return trashedItem;
}

function loadTrashBin() {
    try {
        const trashData = localStorage.getItem(`${APP_VERSION}_tabManagerTrashBin`);
        if (trashData) {
            trashBin = JSON.parse(trashData);
            console.log(`Trash bin loaded for ${APP_VERSION}`);
        }
    } catch (error) {
        console.error('Error loading trash bin:', error);
    }
}

// Version-aware trash bin functions
function saveTrashBin() {
    console.log('💾 Saving trash bin to localStorage:', trashBin);
    localStorage.setItem('tabManagerTrashBin', JSON.stringify(trashBin));
    
    try {
        localStorage.setItem(`${APP_VERSION}_tabManagerTrashBin`, JSON.stringify(trashBin));
        console.log(`Trash bin saved for ${APP_VERSION}`);
    } catch (error) {
        console.error('Error saving trash bin:', error);
    }
}

