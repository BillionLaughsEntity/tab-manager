function updateWorkbookColor(workbook, color) {
    workbook.color = color;
    saveWorkbooks();
    renderWorkbookTabs();
    // Note: This does NOT affect child profiles/environments/tabs
}

// Add event listeners for workbook color modal
document.getElementById('close-workbook-color-modal').addEventListener('click', () => {
    document.getElementById('workbook-color-modal').style.display = 'none';
});

document.getElementById('save-workbook-color-btn').addEventListener('click', () => {
    if (workbookForColor) {
        updateWorkbookColor(workbookForColor, selectedColor);
        document.getElementById('workbook-color-modal').style.display = 'none';
    }
});

// Workbook color picker event listener
document.getElementById('workbook-html5-color-picker').addEventListener('input', (e) => {
    selectedColor = e.target.value;
    document.getElementById('workbook-selected-color-hex').textContent = selectedColor;
    document.getElementById('workbook-color-preview-box').style.backgroundColor = selectedColor;
});