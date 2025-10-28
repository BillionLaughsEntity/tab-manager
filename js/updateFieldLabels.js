// Update field labels after removal
function updateFieldLabels() {
    const fields = document.querySelectorAll('.multi-link-field');
    fields.forEach((field, index) => {
        field.querySelector('label').textContent = `Link ${index + 1}`;
    });
}