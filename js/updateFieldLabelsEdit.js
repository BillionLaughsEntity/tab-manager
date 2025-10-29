// Update field labels in edit mode
function updateFieldLabelsEdit() {
    const fields = document.querySelectorAll('#edit-multi-link-fields-container .multi-link-field');
    fields.forEach((field, index) => {
        field.querySelector('label').textContent = `Link ${index + 1}`;
    });
}