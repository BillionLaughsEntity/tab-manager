// Get the current workbook
function getCurrentWorkbook() {
    return workbooks.find(workbook => workbook.id === currentWorkbookId);
}