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
        
        sortedTrash.forEach((item, index) => {
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
                    <button class="trash-bin-action-btn trash-bin-restore-btn" data-index="${index}">
                        <i class="fas fa-undo"></i>Restore
                    </button>
                    <button class="trash-bin-action-btn trash-bin-permanently-delete-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>Delete
                    </button>
                </div>
            `;
            
            trashBinItems.appendChild(trashItem);
        });
        
        // Add event listeners for the buttons
        document.querySelectorAll('.trash-bin-restore-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                restoreFromTrash(index);
            });
        });
        
        document.querySelectorAll('.trash-bin-permanently-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                permanentlyDeleteFromTrash(index);
            });
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



// Fix restoreFromTrash function
function restoreFromTrash(index) {

    if (index < 0 || index >= trashBin.length) return;
    const item = trashBin[index];
    const itemData = item.data || {};

    
    if (!item) return;
    
    // Find the destination tab
    let destinationTab = null;
    let destinationEnvironment = null;
    let destinationProfile = null;
    let destinationWorkbook = null;
    
    // Try to find the original location
    workbooks.forEach(workbook => {
        if (workbook.id === item.origin.workbookId) {
            destinationWorkbook = workbook;
            workbook.profiles.forEach(profile => {
                if (profile.id === item.origin.profileId) {
                    destinationProfile = profile;
                    profile.environments.forEach(environment => {
                        if (environment.id === item.origin.environmentId) {
                            destinationEnvironment = environment;
                            environment.tabs.forEach(tab => {
                                if (tab.id === item.origin.tabId) {
                                    destinationTab = tab;
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
    // If original location not found, use current location
    if (!destinationTab) {
        destinationWorkbook = getCurrentWorkbook();
        destinationProfile = getCurrentProfile();
        destinationEnvironment = currentEnvironment;
        destinationTab = currentTab;
    }
    
    // Create the restored link
    const restoredLink = {
        id: 'link-' + Date.now(), // New ID since original is lost
        title: item.title,
        url: item.url,
        isMultiLink: item.isMultiLink,
        isSearchLink: item.isSearchLink,
        urls: item.urls || [],
        linkCount: item.linkCount || 1
    };
    
    // Add to destination tab
    if (!destinationTab.links) {
        destinationTab.links = [];
    }
    destinationTab.links.push(restoredLink);
    
    // Remove from trash
    trashBin.splice(index, 1);
    
    // Save changes
    saveWorkbooks();
    saveTrashBin();
    
    // Update UI
    renderEnvironments();
    if (currentTab === destinationTab) {
        renderLinks(currentTab);
    }
    
    // Close and reopen modal to refresh
    document.getElementById('trash-bin-modal').style.display = 'none';
    setTimeout(() => {
        openTrashBinModal();
    }, 100);
    
    alert(`"${item.title}" restored successfully`);
}


// Restore from trash
function restoreFromTrash(index) {
    if (index < 0 || index >= trashBin.length) return;
    
    const item = trashBin[index];
    
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
    destinationTab.links.push(item.data);
    
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


// Permanently delete from trash
function permanentlyDeleteFromTrash(index) {
    if (index < 0 || index >= trashBin.length) return;
    
    const item = trashBin[index];
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


// Add this function to your main script
function deleteLink(link) {
    if (!confirm(`Are you sure you want to move "${link.title}" to trash?`)) {
        return;
    }
    
    // Create trash item
    const trashItem = {
        id: 'trash-' + Date.now(),
        type: 'link',
        originalId: link.id,
        data: link,
        parentTab: {
            id: currentTab.id,
            name: currentTab.name
        },
        parentEnvironment: currentEnvironment ? {
            id: currentEnvironment.id,
            name: currentEnvironment.name
        } : null,
        parentProfile: getCurrentProfile() ? {
            id: getCurrentProfile().id,
            name: getCurrentProfile().name
        } : null,
        parentWorkbook: getCurrentWorkbook() ? {
            id: getCurrentWorkbook().id,
            name: getCurrentWorkbook().name
        } : null,
        deletedAt: new Date().toISOString()
    };
    
    // Add to trash bin
    trashBin.push(trashItem);
    saveTrashBin();
    
    // Remove from current tab
    currentTab.links = currentTab.links.filter(l => l.id !== link.id);
    
    // Save and refresh
    saveWorkbooks();
    renderLinks(currentTab);
    
    alert(`"${link.title}" moved to trash`);
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


// Add this function to render the trash bin modal
function renderTrashBinModal() {
    const trashBinItems = document.getElementById('trash-bin-items');
    const trashBinCount = document.getElementById('trash-bin-count');
    
    trashBinCount.textContent = `${trashBin.length} item${trashBin.length !== 1 ? 's' : ''} in trash`;
    
    if (trashBin.length === 0) {
        trashBinItems.innerHTML = `
            <div class="trash-bin-empty">
                <i class="fas fa-trash" style="font-size: 3rem; margin-bottom: 20px; color: #bdc3c7;"></i>
                <h3>Trash Bin is Empty</h3>
                <p>Deleted links will appear here</p>
            </div>
        `;
        return;
    }
    
    trashBinItems.innerHTML = '';
    
    // Sort by deletion date (newest first)
    const sortedTrash = [...trashBin].sort((a, b) => 
        new Date(b.deletedAt) - new Date(a.deletedAt)
    );
    
    sortedTrash.forEach(trashedLink => {
        const itemElement = document.createElement('div');
        itemElement.className = 'trash-bin-item';
        
        // Determine icon based on link type
        let iconClass = 'fa-link';
        let linkText = trashedLink.url;
        
        if (trashedLink.isMultiLink) {
            iconClass = 'fa-layer-group';
            linkText = 'Multiple links card';
        } else if (trashedLink.isSearchLink) {
            iconClass = 'fa-search';
            linkText = trashedLink.url;
        }
        
        itemElement.innerHTML = `
            <div class="trash-bin-item-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="trash-bin-item-content">
                <div class="trash-bin-item-title">${trashedLink.title}</div>
                <div class="trash-bin-item-url">${linkText}</div>
                <div class="trash-bin-item-origin">
                    Originally from: ${trashedLink.origin?.profileName || 'Unknown'} → 
                    ${trashedLink.origin?.environmentName || 'Unknown'} → 
                    ${trashedLink.origin?.tabName || 'Unknown'}
                </div>
            </div>
            <div class="trash-bin-item-actions">
                <button class="trash-bin-action-btn trash-bin-restore-btn" title="Restore to original location">
                    <i class="fas fa-undo"></i>Restore
                </button>
                <button class="trash-bin-action-btn trash-bin-permanently-delete-btn" title="Permanently delete">
                    <i class="fas fa-trash"></i>Delete
                </button>
            </div>
        `;
        
        trashBinItems.appendChild(itemElement);
        
        // Add event listeners
        const restoreBtn = itemElement.querySelector('.trash-bin-restore-btn');
        const deleteBtn = itemElement.querySelector('.trash-bin-permanently-delete-btn');
        
        restoreBtn.addEventListener('click', () => {
            restoreLink(trashedLink);
        });
        
        deleteBtn.addEventListener('click', () => {
            permanentlyDeleteLink(trashedLink);
        });
    });
}