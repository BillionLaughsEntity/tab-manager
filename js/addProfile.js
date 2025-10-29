// Add a new profile - to current workbook only
function addProfile(name, color = '#3498db') {

    // Check for duplicates
    const existing = workbooks.find(w => w.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        alert('Workbook with this name already exists!');
        return;
    }


    const currentWorkbook = getCurrentWorkbook();
    const newProfile = {
        id: 'profile-' + Date.now(),
        name: name,
        color: color,
        environments: []
    };
    
    currentWorkbook.profiles.push(newProfile);
    saveWorkbooks();
    renderProfileTabs();
    refreshCounters(); // ADD THIS LINE
    
    // Switch to the new profile
    switchProfile(newProfile.id);

    // Your existing creation code...
    console.log('Creating new workbook:', name);
}