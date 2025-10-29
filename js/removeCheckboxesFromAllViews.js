// Remove checkboxes from all views
function removeCheckboxesFromAllViews() {
    const checkboxes = document.querySelectorAll('.link-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.remove();
    });
    
    // Remove selected styling from all elements
    const selectedElements = document.querySelectorAll('.selected');
    selectedElements.forEach(element => {
        element.classList.remove('selected');
    });
}