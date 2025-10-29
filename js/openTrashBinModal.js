function openTrashBinModal() {
    const trashBinItems = document.getElementById('trash-bin-items');
    const trashBinCount = document.getElementById('trash-bin-count');
    
    trashBinCount.textContent = `${trashBin.length} items in trash`;
    trashBinItems.innerHTML = '';
    
    if (trashBin.length === 0) {
        trashBinItems.innerHTML = `
            <div class="trash-bin-empty">
                <i class="fas fa-trash" style="font-size: 3rem; margin-bottom: 20px; color: #bdc3c7;"></i>
                <h3>Trash Bin is Empty</h3>
                <p>Deleted items will appear here</p>
            </div>
        `;
    } else {
        trashBin.forEach((item, index) => {
            const trashItem = document.createElement('div');
            trashItem.className = 'trash-bin-item';
            
            let itemContent = '';
            if (item.isMultiLink) {
                itemContent = `Multi-link card with ${item.linkCount} links`;
            } else if (item.isSearchLink) {
                itemContent = 'Search link';
            } else {
                itemContent = item.url;
            }
            
            trashItem.innerHTML = `
                <div class="trash-bin-item-icon">
                    <i class="fas ${item.isMultiLink ? 'fa-layer-group' : item.isSearchLink ? 'fa-search' : 'fa-link'}"></i>
                </div>
                <div class="trash-bin-item-content">
                    <div class="trash-bin-item-title">${item.title}</div>
                    <div class="trash-bin-item-url">${itemContent}</div>
                    <div class="trash-bin-item-origin">
                        Originally from: ${item.origin.workbookName} → ${item.origin.profileName} → ${item.origin.environmentName} → ${item.origin.tabName}
                    </div>
                    <div class="trash-bin-item-deleted">
                        Deleted: ${new Date(item.deletedAt).toLocaleString()}
                    </div>
                </div>
                <div class="trash-bin-item-actions">
                    <button class="trash-bin-action-btn trash-bin-restore-btn" data-index="${index}">
                        <i class="fas fa-undo"></i>Restore
                    </button>
                    <button class="trash-bin-action-btn trash-bin-permanently-delete-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>Delete
                    </button>
                </div>
            `;
            
            trashBinItems.appendChild(trashItem);
        });
        
        // Add event listeners for restore and delete buttons
        document.querySelectorAll('.trash-bin-restore-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('button').dataset.index);
                restoreFromTrash(index);
            });
        });
        
        document.querySelectorAll('.trash-bin-permanently-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('button').dataset.index);
                permanentlyDeleteFromTrash(index);
            });
        });
    }
    
    document.getElementById('trash-bin-modal').style.display = 'flex';
}