// js/createTableViewLink.js

function createTableViewLink(link, index) {
    const row = document.createElement('tr');
    row.className = 'table-link-row';
    row.setAttribute('data-link-id', link.id);
    
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
    
    // Create checkbox cell if selection mode is active
    const checkboxCell = isSelectionMode ? `
        <td class="selection-cell">
            <input type="checkbox" class="link-checkbox" data-link-id="${link.id}">
        </td>
    ` : '';
    
    row.innerHTML = `
        ${checkboxCell}
        <td class="link-title-cell">
            <i class="${typeIcon}" style="margin-right: 8px; color: #666;"></i>
            ${link.title || 'Untitled'}
        </td>
        <td class="link-url-cell">
            <a href="${link.url}" target="_blank" class="table-link-url" title="${link.url}">
                ${truncateUrl(link.url, 50)}
            </a>
        </td>
        <td class="link-type-cell">
            <span class="link-type-badge">${linkType}</span>
        </td>
        <td class="link-actions-cell">
            <button class="table-action-btn edit-link-btn" data-link-index="${index}" title="Edit Link">
                <i class="fas fa-edit"></i>
            </button>
            <button class="table-action-btn move-link-btn" data-link-index="${index}" title="Move Link">
                <i class="fas fa-arrows-alt"></i>
            </button>
            <button class="table-action-btn delete-link-btn" data-link-index="${index}" title="Delete Link">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    // Add event listeners
    const editBtn = row.querySelector('.edit-link-btn');
    const moveBtn = row.querySelector('.move-link-btn');
    const deleteBtn = row.querySelector('.delete-link-btn');
    
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
    
    // Add click event for the row (for selection mode)
    row.addEventListener('click', (e) => {
        if (isSelectionMode && !e.target.matches('input, button, a')) {
            const checkbox = row.querySelector('.link-checkbox');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        }
    });
    
    return row;
}

// Helper function to truncate long URLs for display
function truncateUrl(url, maxLength) {
    if (!url) return '';
    if (url.length <= maxLength) return url;
    
    return url.substring(0, maxLength) + '...';
}