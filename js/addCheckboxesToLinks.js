// js/addCheckboxesToLinks.js

function addCheckboxesToLinks() {
    console.log('Adding checkboxes to links...');
    
    // Remove any existing checkboxes first
    removeCheckboxesFromLinks();
    
    // Add checkboxes to grid view
    const gridCards = document.querySelectorAll('.link-card');
    gridCards.forEach(card => {
        if (!card.querySelector('.link-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'link-checkbox';
            checkbox.dataset.linkId = card.dataset.linkId;
            
            checkbox.addEventListener('change', function() {
                const linkId = this.dataset.linkId;
                if (this.checked) {
                    selectedLinks.add(linkId);
                    card.classList.add('selected');
                } else {
                    selectedLinks.delete(linkId);
                    card.classList.remove('selected');
                }
                updateBulkSelectionCount();
            });
            
            card.appendChild(checkbox);
        }
    });
    
    // Add checkboxes to list view
    const listItems = document.querySelectorAll('.list-link-item');
    listItems.forEach(item => {
        if (!item.querySelector('.link-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'link-checkbox';
            checkbox.dataset.linkId = item.dataset.linkId;
            
            // Insert checkbox at the beginning of the list item
            item.insertBefore(checkbox, item.firstChild);
            
            checkbox.addEventListener('change', function() {
                const linkId = this.dataset.linkId;
                if (this.checked) {
                    selectedLinks.add(linkId);
                    item.classList.add('selected');
                } else {
                    selectedLinks.delete(linkId);
                    item.classList.remove('selected');
                }
                updateBulkSelectionCount();
            });
        }
    });
    
    // Add checkboxes to table view
    const tableRows = document.querySelectorAll('.table-link-row');
    tableRows.forEach(row => {
        if (!row.querySelector('.link-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'link-checkbox';
            checkbox.dataset.linkId = row.dataset.linkId;
            
            // Create or find the selection cell
            let selectionCell = row.querySelector('.selection-cell');
            if (!selectionCell) {
                selectionCell = document.createElement('td');
                selectionCell.className = 'selection-cell';
                row.insertBefore(selectionCell, row.firstChild);
            }
            
            selectionCell.appendChild(checkbox);
            
            checkbox.addEventListener('change', function() {
                const linkId = this.dataset.linkId;
                if (this.checked) {
                    selectedLinks.add(linkId);
                    row.classList.add('selected');
                } else {
                    selectedLinks.delete(linkId);
                    row.classList.remove('selected');
                }
                updateBulkSelectionCount();
            });
        }
    });
    
    console.log('Checkboxes added to all views');
}