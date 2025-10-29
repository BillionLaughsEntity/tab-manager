// Move workbook down in the list
function moveWorkbookDown(workbookId) {
    const index = workbooks.findIndex(workbook => workbook.id === workbookId);
    if (index < workbooks.length - 1) {
        // Swap with the next workbook
        [workbooks[index], workbooks[index + 1]] = [workbooks[index + 1], workbooks[index]];
        saveWorkbooks();
        renderWorkbookTabs();
    }
}