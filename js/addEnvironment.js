// Add a new environment
function addEnvironment(name) {

    // Check for duplicates
    const existing = workbooks.find(w => w.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        alert('Workbook with this name already exists!');
        return;
    }


    const currentProfile = getCurrentProfile();
    if (!currentProfile) return;
    
    if (!currentProfile.environments) {
        currentProfile.environments = [];
    }
    
    // Create default tab with a sample link
    const defaultTab = {
        id: 'tab-' + Date.now(),
        name: 'General',
        links: [
            {
                id: 'link-' + Date.now(),
                title: 'Google',
                url: 'https://www.google.com'
            }
        ]
    };
    
    const newEnvironment = {
        id: 'env-' + Date.now(),
        name: name,
        tabs: [defaultTab], // Add the default tab
        collapsed: true // Add this line to start collapsed
    };
    
    currentProfile.environments.push(newEnvironment);
    saveWorkbooks(); // Changed from 
    renderEnvironments();
    refreshCounters(); // ADD THIS LINE
    
    // Automatically select the new tab
    selectTab(newEnvironment, defaultTab);

    // Your existing creation code...
    console.log('Creating new workbook:', name);
    
}