// Move workbook up in the list
function moveWorkbookUp(workbookId) {
    const index = workbooks.findIndex(workbook => workbook.id === workbookId);
    if (index > 0) {
        // Swap with the previous workbook
        [workbooks[index - 1], workbooks[index]] = [workbooks[index], workbooks[index - 1]];
        saveWorkbooks();
        renderWorkbookTabs();
    }
}