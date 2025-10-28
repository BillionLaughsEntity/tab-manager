// Update renderWorkbookTabs to use the new color picker
function renderWorkbookTabs() {
    workbookTabsContainer.innerHTML = '';
    
    workbooks.forEach(workbook => {
        const workbookTab = document.createElement('button');
        workbookTab.className = 'workbook-tab';
        if (workbook.id === currentWorkbookId) {
            workbookTab.classList.add('active');
        }
        workbookTab.dataset.workbookId = workbook.id;
        workbookTab.style.setProperty('--workbook-color', workbook.color || '#9b59b6');
        
        workbookTab.innerHTML = `
            <div class="workbook-tab-name">${workbook.name}</div>
            <div class="workbook-tab-color" style="background-color: ${workbook.color || '#9b59b6'}"></div>
            <div class="workbook-tab-actions">
                <button class="workbook-tab-action workbook-tab-edit" title="Rename Workbook">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="workbook-tab-action workbook-tab-color-picker" title="Change Color">
                    <i class="fas fa-palette"></i>
                </button>
                <button class="workbook-tab-action workbook-tab-close" title="Delete Workbook">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        workbookTabsContainer.appendChild(workbookTab);
        
        // Add event listener for switching workbooks
        workbookTab.addEventListener('click', (e) => {
            if (!e.target.closest('.workbook-tab-edit') && 
                !e.target.closest('.workbook-tab-close') &&
                !e.target.closest('.workbook-tab-color-picker')) {
                switchWorkbook(workbook.id);
            }
        });
        
        // Add event listener for renaming workbook
        const editBtn = workbookTab.querySelector('.workbook-tab-edit');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            workbookToRename = workbook;
            document.getElementById('rename-workbook-input').value = workbook.name;
            renameWorkbookModal.style.display = 'flex';
        });
        
        // Add event listener for color picker - UPDATED
        const colorBtn = workbookTab.querySelector('.workbook-tab-color-picker');
        colorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openWorkbookColorModal(workbook);
        });
        
        // Add event listener for deleting workbook
        const closeBtn = workbookTab.querySelector('.workbook-tab-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteWorkbook(workbook.id);
        });
    });
    
    // Add the "+" button at the end
    workbookTabsContainer.appendChild(addWorkbookTabBtn);
}