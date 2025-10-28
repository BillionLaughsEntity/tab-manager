// Add checkboxes to list view
function addCheckboxesToListView() {
    const listItems = document.querySelectorAll('.link-list-item');
    listItems.forEach(item => {
        if (!item.querySelector('.link-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'link-checkbox';
            checkbox.dataset.linkId = item.dataset.linkId;
            
            checkbox.addEventListener('change', (e) => {
                const linkId = e.target.dataset.linkId;
                if (e.target.checked) {
                    selectedLinks.add(linkId);
                    item.classList.add('selected');
                } else {
                    selectedLinks.delete(linkId);
                    item.classList.remove('selected');
                }
                updateBulkSelectionCount();
            });
            
            // Insert checkbox at the beginning of the list item
            item.insertBefore(checkbox, item.firstChild);
        }
    });
}