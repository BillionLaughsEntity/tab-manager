// js/createListViewLink.js

function createListViewLink(link, index) {
    const listItem = document.createElement('div');
    listItem.className = 'list-link-item';
    listItem.setAttribute('data-link-id', link.id);
    
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
    
    listItem.innerHTML = `
        <div class="list-link-content">
            <div class="list-link-main">
                <div class="list-link-header">
                    <i class="${typeIcon} list-link-icon ${typeClass}"></i>
                    <span class="list-link-title">${link.title || 'Untitled Link'}</span>
                    <span class="list-link-type">${linkType}</span>
                </div>
                <div class="list-link-url">
                    <a href="${link.url}" target="_blank" class="list-link-url-text">${link.url}</a>
                </div>
            </div>
            <div class="list-link-actions">
                <button class="list-action-btn edit-link-btn" data-link-index="${index}" title="Edit Link">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="list-action-btn move-link-btn" data-link-index="${index}" title="Move Link">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="list-action-btn delete-link-btn" data-link-index="${index}" title="Delete Link">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const editBtn = listItem.querySelector('.edit-link-btn');
    const moveBtn = listItem.querySelector('.move-link-btn');
    const deleteBtn = listItem.querySelector('.delete-link-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openEditLinkModal(link, index);
        });
    }
    
    if (moveBtn) {
        moveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMoveLinkModal(link);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteLink(index);
        });
    }
    
    return listItem;
}