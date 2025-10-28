// Workbook color selection functions
function openWorkbookColorModal(workbook) {
    workbookForColor = workbook;
    selectedColor = workbook.color || '#9b59b6';
    
    // Set the color picker to the current workbook color
    const colorPicker = document.getElementById('workbook-html5-color-picker');
    colorPicker.value = selectedColor;
    
    // Update the preview
    document.getElementById('workbook-selected-color-hex').textContent = selectedColor;
    document.getElementById('workbook-color-preview-box').style.backgroundColor = selectedColor;
    
    document.getElementById('workbook-color-modal').style.display = 'flex';
}