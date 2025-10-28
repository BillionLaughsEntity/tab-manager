// Add a new tab to an environment
function addTab(environment, name) {

    // Check for duplicates
    const existing = workbooks.find(w => w.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        alert('Workbook with this name already exists!');
        return;
    }


    const newTab = {
        id: 'tab-' + Date.now(),
        name: name,
        links: []
    };
    
    environment.tabs.push(newTab);
    saveWorkbooks(); // Changed from 
    renderEnvironments();
    refreshCounters(); // ADD THIS LINE
    selectTab(environment, newTab);

    // Your existing creation code...
    console.log('Creating new workbook:', name);
}