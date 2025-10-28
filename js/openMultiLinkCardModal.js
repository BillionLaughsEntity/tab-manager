// Open Multi-Link Card modal
function openMultiLinkCardModal() {
    document.getElementById('multi-link-card-name').value = '';
    document.getElementById('multi-link-fields-container').innerHTML = `
        <div class="multi-link-field">
            <label>Link 1</label>
            <div class="link-input-with-action">
                <input type="text" class="multi-link-url" placeholder="https://example.com">
                <button type="button" class="add-link-field-btn">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listener to the add button
    const addBtn = document.querySelector('.add-link-field-btn');
    addBtn.addEventListener('click', addLinkField);
    
    document.getElementById('multi-link-card-modal').style.display = 'flex';
}