// js/createLinkCard.js

function createLinkCard(link, index) {
    const card = document.createElement('div');
    card.className = 'link-card';
    card.setAttribute('data-link-id', link.id);
    
    // Determine link type and icon
    let linkType = 'Regular';
    let typeIcon = 'fas fa-link';
    
    if (link.isMultiLink) {
        linkType = 'Multi-Link';
        typeIcon = 'fas fa-layer-group';
    } else if (link.isSearchLink) {
        linkType = 'Search';
        typeIcon = 'fas fa-search';
    } else if (link.isEmailLink) {
        linkType = 'Email';
        typeIcon = 'fas fa-envelope';
    }
    
    // Create the card HTML structure
    if (link.isMultiLink) {
        card.innerHTML = `
            <div class="link-title">
                <i class="${typeIcon}"></i>
                ${link.title || 'Untitled Multi-Link'}
                <span class="multi-link-count">${link.links ? link.links.length : 0} links</span>
            </div>
            <div class="link-url">Multiple links card</div>
            <div class="link-actions">
                <button class="link-action-btn open-link" data-link-index="${index}" title="Open All Links">
                    <i class="fas fa-external-link-alt"></i>Open All
                </button>
                <button class="link-action-btn edit-link" data-link-index="${index}" title="Edit Multi-Link">
                    <i class="fas fa-edit"></i>Edit
                </button>
                <button class="link-action-btn move-link" data-link-index="${index}" title="Move Multi-Link">
                    <i class="fas fa-arrows-alt"></i>Move
                </button>
                <button class="link-action-btn delete-link" data-link-index="${index}" title="Delete Multi-Link">
                    <i class="fas fa-trash"></i>Delete
                </button>
            </div>
        `;
    } else if (link.isSearchLink) {
        card.innerHTML = `
            <div class="link-title">
                <i class="${typeIcon}"></i>
                ${link.title || 'Untitled Search Link'}
            </div>
            <div class="link-url">${link.url}</div>
            <div class="link-actions">
                <button class="link-action-btn open-link" data-link-index="${index}" title="Open with Search">
                    <i class="fas fa-external-link-alt"></i>Open with Search
                </button>
                <button class="link-action-btn edit-link" data-link-index="${index}" title="Edit Search Link">
                    <i class="fas fa-edit"></i>Edit
                </button>
                <button class="link-action-btn move-link" data-link-index="${index}" title="Move Search Link">
                    <i class="fas fa-arrows-alt"></i>Move
                </button>
                <button class="link-action-btn delete-link" data-link-index="${index}" title="Delete Search Link">
                    <i class="fas fa-trash"></i>Delete
                </button>
            </div>
        `;
    } else {
        card.innerHTML = `
            <div class="link-title">
                <i class="${typeIcon}"></i>
                ${link.title || 'Untitled Link'}
            </div>
            <a href="${link.url}" target="_blank" class="link-url">${link.url}</a>
            <div class="link-actions">
                <button class="link-action-btn open-link" data-link-index="${index}" title="Open Link">
                    <i class="fas fa-external-link-alt"></i>Open
                </button>
                <button class="link-action-btn edit-link" data-link-index="${index}" title="Edit Link">
                    <i class="fas fa-edit"></i>Edit
                </button>
                <button class="link-action-btn move-link" data-link-index="${index}" title="Move Link">
                    <i class="fas fa-arrows-alt"></i>Move
                </button>
                <button class="link-action-btn delete-link" data-link-index="${index}" title="Delete Link">
                    <i class="fas fa-trash"></i>Delete
                </button>
            </div>
        `;
    }
    
    // Add event listeners
    const openBtn = card.querySelector('.open-link');
    const editBtn = card.querySelector('.edit-link');
    const moveBtn = card.querySelector('.move-link');
    const deleteBtn = card.querySelector('.delete-link');
    
    // Open button event listener
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (link.isMultiLink) {
                if (typeof openMultiLinkCardLinks === 'function') {
                    openMultiLinkCardLinks(link);
                } else {
                    // Fallback
                    if (link.links && Array.isArray(link.links)) {
                        link.links.forEach(linkItem => {
                            if (linkItem.url) {
                                window.open(linkItem.url, '_blank');
                            }
                        });
                    }
                }
            } else if (link.isSearchLink) {
                if (typeof openSearchLinkModal === 'function') {
                    openSearchLinkModal(link);
                } else {
                    window.open(link.url, '_blank');
                }
            } else {
                window.open(link.url, '_blank');
            }
        });
    }
    
    // Edit button event listener
    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (link.isMultiLink) {
                if (typeof openEditMultiLinkCardModal === 'function') {
                    openEditMultiLinkCardModal(link, index);
                } else {
                    alert('Multi-link editing not available');
                }
            } else {
                if (typeof openEditLinkModal === 'function') {
                    openEditLinkModal(link, index);
                } else {
                    alert('Link editing not available');
                }
            }
        });
    }
    
    // Move button event listener
    if (moveBtn) {
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof openMoveLinkModal === 'function') {
                openMoveLinkModal(link);
            } else {
                alert('Link moving not available');
            }
        });
    }
    
    // Delete button event listener
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const linkTitle = link.title || 'Untitled Link';
            if (confirm(`Are you sure you want to delete the link "${linkTitle}"?`)) {
                if (typeof deleteLink === 'function') {
                    deleteLink(link, currentTab, currentEnvironment);
                } else {
                    alert('Link deletion not available');
                }
            }
        });
    }
    
    // Add click event for selection mode
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