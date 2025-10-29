// Rename a workbook
function renameWorkbook(workbook, newName) {
    workbook.name = newName;
    saveWorkbooks();
    renderWorkbookTabs();
}