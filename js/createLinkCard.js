// js/createLinkCard.js

function createLinkCard(link, index) {
    const card = document.createElement('div');
    card.className = 'grid-link-card';
    card.setAttribute('data-link-id', link.id);
    
    // Determine link type and icon
    let linkType = 'Regular';
    let typeIcon = 'fas fa-link';
    let typeClass = 'regular-link';
    
    if (link.isMultiLink) {
        linkType = 'Multi-Link';
        typeIcon = 'fas fa-layer-group';
        typeClass = 'multi-link';
    } else if (link.isSearchLink) {
        linkType = 'Search';
        typeIcon = 'fas fa-search';
        typeClass = 'search-link';
    } else if (link.isEmailLink) {
        linkType = 'Email';
        typeIcon = 'fas fa-envelope';
        typeClass = 'email-link';
    }
    
    // Create the card HTML structure
    if (link.isMultiLink) {
        card.innerHTML = `
            <div class="grid-link-header">
                <i class="${typeIcon} grid-link-icon ${typeClass}"></i>
                <div class="grid-link-title">${link.title || 'Untitled Multi-Link'}</div>
            </div>
            <div class="grid-link-url">
                <span class="multi-link-count">${link.links ? link.links.length : 0} links</span>
            </div>
            <div class="grid-link-actions">
                <button class="grid-action-btn open-link-btn" data-link-index="${index}" title="Open All Links">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="grid-action-btn edit-link-btn" data-link-index="${index}" title="Edit Multi-Link">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="grid-action-btn move-link-btn" data-link-index="${index}" title="Move Multi-Link">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="grid-action-btn delete-link-btn" data-link-index="${index}" title="Delete Multi-Link">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    } else if (link.isSearchLink) {
        card.innerHTML = `
            <div class="grid-link-header">
                <i class="${typeIcon} grid-link-icon ${typeClass}"></i>
                <div class="grid-link-title">${link.title || 'Untitled Search Link'}</div>
            </div>
            <div class="grid-link-url">
                <a href="${link.url}" target="_blank" title="${link.url}">${link.url}</a>
            </div>
            <div class="grid-link-actions">
                <button class="grid-action-btn open-link-btn" data-link-index="${index}" title="Open with Search">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="grid-action-btn edit-link-btn" data-link-index="${index}" title="Edit Search Link">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="grid-action-btn move-link-btn" data-link-index="${index}" title="Move Search Link">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="grid-action-btn delete-link-btn" data-link-index="${index}" title="Delete Search Link">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    } else {
        card.innerHTML = `
            <div class="grid-link-header">
                <i class="${typeIcon} grid-link-icon ${typeClass}"></i>
                <div class="grid-link-title">${link.title || 'Untitled Link'}</div>
            </div>
            <div class="grid-link-url">
                <a href="${link.url}" target="_blank" title="${link.url}">${link.url}</a>
            </div>
            <div class="grid-link-actions">
                <button class="grid-action-btn open-link-btn" data-link-index="${index}" title="Open Link">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="grid-action-btn edit-link-btn" data-link-index="${index}" title="Edit Link">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="grid-action-btn move-link-btn" data-link-index="${index}" title="Move Link">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="grid-action-btn delete-link-btn" data-link-index="${index}" title="Delete Link">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }
    
    // Add event listeners - COMPLETE VERSION
    const openBtn = card.querySelector('.open-link-btn');
    const editBtn = card.querySelector('.edit-link-btn');
    const moveBtn = card.querySelector('.move-link-btn');
    const deleteBtn = card.querySelector('.delete-link-btn');
    
    // Open button event listener
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Open button clicked for link:', link.title);
            
            if (link.isMultiLink) {
                console.log('Opening multi-link card');
                if (typeof openMultiLinkCardLinks === 'function') {
                    openMultiLinkCardLinks(link);
                } else {
                    console.error('openMultiLinkCardLinks function not found');
                    // Fallback: open all links in the multi-link
                    if (link.links && Array.isArray(link.links)) {
                        link.links.forEach(linkItem => {
                            if (linkItem.url) {
                                window.open(linkItem.url, '_blank');
                            }
                        });
                    }
                }
            } else if (link.isSearchLink) {
                console.log('Opening search link');
                if (typeof openSearchLinkModal === 'function') {
                    openSearchLinkModal(link);
                } else {
                    console.error('openSearchLinkModal function not found');
                    // Fallback: open the URL directly
                    window.open(link.url, '_blank');
                }
            } else {
                console.log('Opening regular link');
                window.open(link.url, '_blank');
            }
        });
    }
    
    // Edit button event listener
    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Edit button clicked for link:', link.title);
            console.log('Link index:', index);
            
            if (link.isMultiLink) {
                console.log('Editing multi-link card');
                if (typeof openEditMultiLinkCardModal === 'function') {
                    openEditMultiLinkCardModal(link, index);
                } else {
                    console.error('openEditMultiLinkCardModal function not found');
                    alert('Multi-link editing not available');
                }
            } else {
                console.log('Editing regular/search link');
                if (typeof openEditLinkModal === 'function') {
                    openEditLinkModal(link, index);
                } else {
                    console.error('openEditLinkModal function not found');
                    // Fallback to window function
                    if (window.openEditLinkModal && typeof window.openEditLinkModal === 'function') {
                        window.openEditLinkModal(link, index);
                    } else {
                        alert('Link editing not available');
                    }
                }
            }
        });
    }
    
    // Move button event listener
    if (moveBtn) {
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Move button clicked for link:', link.title);
            
            if (typeof openMoveLinkModal === 'function') {
                openMoveLinkModal(link);
            } else {
                console.error('openMoveLinkModal function not found');
                // Fallback to window function
                if (window.openMoveLinkModal && typeof window.openMoveLinkModal === 'function') {
                    window.openMoveLinkModal(link);
                } else {
                    alert('Link moving not available');
                }
            }
        });
    }
    
    // Delete button event listener
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Delete button clicked for link:', link.title);
            
            const linkTitle = link.title || 'Untitled Link';
            if (confirm(`Are you sure you want to delete the link "${linkTitle}"?`)) {
                if (typeof deleteLink === 'function') {
                    deleteLink(index);
                } else {
                    console.error('deleteLink function not found');
                    // Fallback to window function
                    if (window.deleteLink && typeof window.deleteLink === 'function') {
                        window.deleteLink(index);
                    } else {
                        alert('Link deletion not available');
                    }
                }
            }
        });
    }
    
    // Add click event for the entire card (for selection mode)
    card.addEventListener('click', (e) => {
        if (isSelectionMode && !e.target.matches('button, a, input')) {
            const checkbox = card.querySelector('.link-checkbox');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        }
    });
    
    return card;
}