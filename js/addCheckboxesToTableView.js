// Add checkboxes to table view
function addCheckboxesToTableView() {
    const tableRows = document.querySelectorAll('.links-table tbody tr');
    tableRows.forEach(row => {
        if (!row.querySelector('.link-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'link-checkbox';
            checkbox.dataset.linkId = row.dataset.linkId;
            
            checkbox.addEventListener('change', (e) => {
                const linkId = e.target.dataset.linkId;
                if (e.target.checked) {
                    selectedLinks.add(linkId);
                    row.classList.add('selected');
                } else {
                    selectedLinks.delete(linkId);
                    row.classList.remove('selected');
                }
                updateBulkSelectionCount();
            });
            
            // Insert checkbox in the first cell
            const firstCell = row.cells[0];
            firstCell.innerHTML = '';
            firstCell.appendChild(checkbox);
        }
    });
}