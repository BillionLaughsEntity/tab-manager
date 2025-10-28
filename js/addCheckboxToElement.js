// Helper function to add checkbox to any element
function addCheckboxToElement(element, viewType = 'grid') {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'link-checkbox';
    
    // Get link ID based on view type
    let linkId;
    if (viewType === 'grid') {
        linkId = element.dataset.linkId;
    } else if (viewType === 'list') {
        const openBtn = element.querySelector('.open-link');
        if (openBtn) {
            const card = openBtn.closest('[data-link-id]');
            linkId = card ? card.dataset.linkId : null;
        }
    } else if (viewType === 'table') {
        const row = element;
        // We need to find the link ID from the row data
        // This assumes the row has a data attribute or we can find it another way
        const titleCell = row.querySelector('.table-title');
        if (titleCell) {
            // Find the link by title in current tab
            const linkTitle = titleCell.textContent.replace(/\(\d+ links\)/, '').trim();
            const link = currentTab.links.find(l => l.title === linkTitle);
            linkId = link ? link.id : null;
        }
    }
    
    if (linkId) {
        checkbox.dataset.linkId = linkId;
        
        checkbox.addEventListener('change', (e) => {
            const linkId = e.target.dataset.linkId;
            if (e.target.checked) {
                selectedLinks.add(linkId);
                element.classList.add('selected');
            } else {
                selectedLinks.delete(linkId);
                element.classList.remove('selected');
            }
            updateBulkSelectionCount();
        });
        
        // Position the checkbox based on view type
        if (viewType === 'grid') {
            element.style.position = 'relative';
            checkbox.style.position = 'absolute';
            checkbox.style.top = '10px';
            checkbox.style.right = '10px';
            checkbox.style.zIndex = '2';
            element.appendChild(checkbox);
        } else if (viewType === 'list') {
            checkbox.style.marginRight = '10px';
            element.insertBefore(checkbox, element.firstChild);
        } else if (viewType === 'table') {
            // Add checkbox to first cell
            const firstCell = element.querySelector('td:first-child');
            if (firstCell) {
                checkbox.style.marginRight = '5px';
                firstCell.insertBefore(checkbox, firstCell.firstChild);
            }
        }
    }
}