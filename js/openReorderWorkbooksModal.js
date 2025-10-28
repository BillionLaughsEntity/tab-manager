// Open reorder workbooks modal
function openReorderWorkbooksModal() {
    const reorderWorkbooksList = document.getElementById('reorder-workbooks-list');
    reorderWorkbooksList.innerHTML = '';
    
    workbooks.forEach((workbook, index) => {
        const workbookItem = document.createElement('div');
        workbookItem.className = 'reorder-link-item';
        workbookItem.dataset.workbookId = workbook.id;
        
        workbookItem.innerHTML = `
            <i class="fas fa-grip-lines"></i>
            <div class="reorder-link-title">${workbook.name}</div>
            <div class="reorder-link-url">Workbook</div>
            <div class="reorder-actions">
                <button class="reorder-btn move-up-btn" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="reorder-btn move-down-btn" ${index === workbooks.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
        `;
        
        reorderWorkbooksList.appendChild(workbookItem);
        
        // Add event listeners for move up/down buttons
        const moveUpBtn = workbookItem.querySelector('.move-up-btn');
        const moveDownBtn = workbookItem.querySelector('.move-down-btn');
        
        moveUpBtn.addEventListener('click', () => {
            moveWorkbookUp(workbook.id);
            openReorderWorkbooksModal(); // Refresh the modal
        });
        
        moveDownBtn.addEventListener('click', () => {
            moveWorkbookDown(workbook.id);
            openReorderWorkbooksModal(); // Refresh the modal
        });
    });
    
    document.getElementById('reorder-workbooks-modal').style.display = 'flex';
}