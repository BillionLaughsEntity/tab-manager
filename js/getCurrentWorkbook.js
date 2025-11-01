// Get the current workbook based on currentWorkbookId
function getCurrentWorkbook() {
    if (!workbooks || workbooks.length === 0) return null;
    return workbooks.find(workbook => workbook.id === currentWorkbookId) || workbooks[0];
}