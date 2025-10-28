// Add new link field
function addLinkField() {
    const container = document.getElementById('multi-link-fields-container');
    const fieldCount = container.querySelectorAll('.multi-link-field').length + 1;
    
    const newField = document.createElement('div');
    newField.className = 'multi-link-field';
    newField.innerHTML = `
        <label>Link ${fieldCount}</label>
        <div class="link-input-with-action">
            <input type="text" class="multi-link-url" placeholder="https://example.com">
            <button type="button" class="remove-link-field-btn">
                <i class="fas fa-minus"></i>
            </button>
        </div>
    `;
    
    container.appendChild(newField);
    
    // Add event listener to remove button
    const removeBtn = newField.querySelector('.remove-link-field-btn');
    removeBtn.addEventListener('click', () => {
        newField.remove();
        updateFieldLabels();
    });
}