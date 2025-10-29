// Add link field in edit mode
function addLinkFieldEdit() {
    const container = document.getElementById('edit-multi-link-fields-container');
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
    
    // Update the first field's button to add
    const firstField = container.querySelector('.multi-link-field:first-child');
    const firstBtn = firstField.querySelector('button');
    firstBtn.innerHTML = '<i class="fas fa-plus"></i>';
    firstBtn.className = 'add-link-field-btn';
    firstBtn.addEventListener('click', addLinkFieldEdit);
    
    // Add event listener to new remove button
    const removeBtn = newField.querySelector('.remove-link-field-btn');
    removeBtn.addEventListener('click', () => {
        newField.remove();
        updateFieldLabelsEdit();
    });
    
    updateFieldLabelsEdit();
}