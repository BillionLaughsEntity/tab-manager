// Open Edit Multi-Link Card modal
function openEditMultiLinkCardModal(card) {
    multiLinkCardToEdit = card;
    
    document.getElementById('edit-multi-link-card-name').value = card.title;
    
    const container = document.getElementById('edit-multi-link-fields-container');
    container.innerHTML = '';
    
    // Add existing links as fields
    card.urls.forEach((url, index) => {
        const field = document.createElement('div');
        field.className = 'multi-link-field';
        field.innerHTML = `
            <label>Link ${index + 1}</label>
            <div class="link-input-with-action">
                <input type="text" class="multi-link-url" value="${url}" placeholder="https://example.com">
                ${index > 0 ? '<button type="button" class="remove-link-field-btn"><i class="fas fa-minus"></i></button>' : '<button type="button" class="add-link-field-btn"><i class="fas fa-plus"></i></button>'}
            </div>
        `;
        
        container.appendChild(field);
        
        // Add event listeners
        const actionBtn = field.querySelector('button');
        if (index === 0) {
            actionBtn.addEventListener('click', addLinkFieldEdit);
        } else {
            actionBtn.addEventListener('click', () => {
                field.remove();
                updateFieldLabelsEdit();
            });
        }
    });
    
    document.getElementById('edit-multi-link-card-modal').style.display = 'flex';
}