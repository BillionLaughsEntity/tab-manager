// Helper function for list view links
function createListViewLink(link, container) {
    const listItem = document.createElement('div');
    listItem.className = 'link-list-item';
    listItem.dataset.linkId = link.id;
    
    // Determine icon based on link type
    let iconClass = 'fa-link';
    let linkText = link.url;
    
    if (link.isMultiLink) {
        iconClass = 'fa-layer-group';
        linkText = 'Multiple links card';
    } else if (link.isSearchLink) {
        iconClass = 'fa-search';
        linkText = link.url;
    }
    
    listItem.innerHTML = `
        <!-- Checkbox will be inserted here when in selection mode -->
        <div class="link-list-icon">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="link-list-content">
            <div class="link-list-title">
                ${link.title}
                ${link.isMultiLink ? `<span class="multi-link-count">${link.linkCount} links</span>` : ''}
            </div>
            <div class="link-list-url">${linkText}</div>
        </div>
        <div class="link-list-actions">
            <button class="link-action-btn open-link" title="Open">
                <i class="fas fa-external-link-alt"></i>
            </button>
            <button class="link-action-btn edit-link" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="link-action-btn move-link" title="Move">
                <i class="fas fa-arrows-alt"></i>
            </button>
            <button class="link-action-btn delete-link" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    container.appendChild(listItem);
    attachLinkEventListeners(listItem, link);
}