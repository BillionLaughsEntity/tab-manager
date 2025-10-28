// Update addWorkbook to use selected color
function addWorkbook(name, color = '#9b59b6') {

    // Check for duplicates
    const existing = workbooks.find(w => w.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        alert('Workbook with this name already exists!');
        return;
    }

    const newWorkbook = {
        id: 'workbook-' + Date.now(),
        name: name,
        color: color,
        profiles: []
    };
    
    workbooks.push(newWorkbook);
    saveWorkbooks();
    renderWorkbookTabs();
    refreshCounters(); // ADD THIS LINE
    
    // Switch to the new workbook
    switchWorkbook(newWorkbook.id);

     // Your existing creation code...
    console.log('Creating new workbook:', name);
}