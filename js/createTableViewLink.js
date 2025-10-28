// Helper function for table view links
function createTableViewLink(link, tbody) {
    const row = document.createElement('tr');
    row.className = 'table-row';
    row.dataset.linkId = link.id;
    
    // Determine icon based on link type
    let iconClass = 'fa-link';
    let linkText = link.url;
    
    if (link.isMultiLink) {
        iconClass = 'fa-layer-group';
        linkText = `Multiple links (${link.linkCount})`;
    } else if (link.isSearchLink) {
        iconClass = 'fa-search';
        linkText = link.url;
    }
    
    row.innerHTML = `
        <td style="text-align: center; padding: 12px 5px; width: 30px;">
            <!-- Checkbox will be added here when in selection mode -->
        </td>
        <td class="table-title" style="padding: 12px 8px;">
            <i class="fas ${iconClass}" style="color: #3498db; margin-right: 8px;"></i>
            ${link.title}
            ${link.isMultiLink ? `<span class="multi-link-count" style="margin-left: 8px;">${link.linkCount} links</span>` : ''}
        </td>
        <td class="table-url" style="padding: 12px 8px; color: #7f8c8d;" title="${linkText}">
            ${linkText}
        </td>
        <td class="table-actions" style="padding: 12px 8px; width: 150px;">
            <div style="display: flex; gap: 5px; justify-content: flex-start;">
                <button class="link-action-btn open-link" title="Open" style="padding: 6px 8px;">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="link-action-btn edit-link" title="Edit" style="padding: 6px 8px;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="link-action-btn move-link" title="Move" style="padding: 6px 8px;">
                    <i class="fas fa-arrows-alt"></i>
                </button>
                <button class="link-action-btn delete-link" title="Delete" style="padding: 6px 8px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    tbody.appendChild(row);
    attachLinkEventListeners(row, link);
}