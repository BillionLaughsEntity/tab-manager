// Delete a workbook
function deleteWorkbook(workbookId) {
    if (workbooks.length <= 1) {
        alert('You cannot delete the last workbook.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this workbook? All profiles, environments and links will be lost.')) {
        workbooks = workbooks.filter(workbook => workbook.id !== workbookId);
        saveWorkbooks();
        renderWorkbookTabs();
        
        // Switch to the first workbook if the current one was deleted
        if (currentWorkbookId === workbookId && workbooks.length > 0) {
            switchWorkbook(workbooks[0].id);
        }
    }
}