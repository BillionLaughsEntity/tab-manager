// Remove checkboxes from link cards
function removeCheckboxesFromLinks() {
    const checkboxes = document.querySelectorAll('.link-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.remove();
    });
    
    // Remove selected styling
    const selectedCards = document.querySelectorAll('.link-card.selected');
    selectedCards.forEach(card => {
        card.classList.remove('selected');
    });
}