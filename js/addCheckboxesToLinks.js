// Add checkboxes to link cards
function addCheckboxesToLinks() {
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        // Don't add checkbox if it already exists
        if (!card.querySelector('.link-checkbox')) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'link-checkbox';
            checkbox.dataset.linkId = card.querySelector('.open-link').closest('.link-card').dataset.linkId;
            
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
            card.appendChild(checkbox);
        }
    });
}