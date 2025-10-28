// Add checkboxes to grid view
function addCheckboxesToGridView() {
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        if (!card.querySelector('.link-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'link-checkbox';
            checkbox.dataset.linkId = card.dataset.linkId;
            
            checkbox.addEventListener('change', (e) => {
                const linkId = e.target.dataset.linkId;
                if (e.target.checked) {
                    selectedLinks.add(linkId);
                    card.classList.add('selected');
                } else {
                    selectedLinks.delete(linkId);
                    card.classList.remove('selected');
                }
                updateBulkSelectionCount();
            });
            
            card.style.position = 'relative';
            card.insertBefore(checkbox, card.firstChild);
        }
    });
}