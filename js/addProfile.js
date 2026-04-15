// addProfile.js
function addProfile(name, color = '#3498db') {
    console.log('Adding new profile:', name);
    
    // Check for duplicate profiles in the current workbook
    const currentWorkbook = getCurrentWorkbook();
    if (!currentWorkbook) {
        console.error('No workbook found');
        alert('No workbook selected. Please create a workbook first.');
        return;
    }
    
    const existing = currentWorkbook.profiles.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        alert('Profile with this name already exists in this workbook!');
        return;
    }
    
    // Create new profile (NOT a workbook)
    const newProfile = {
        id: 'profile-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
        name: name,
        color: color,
        environments: []
    };
    
    // Add to current workbook's profiles
    currentWorkbook.profiles.push(newProfile);
    
    // Save and refresh UI
    saveWorkbooks();
    renderProfileTabs();
    
    // Update counters if function exists
    if (typeof updateAllCounters === 'function') {
        updateAllCounters();
    } else if (typeof refreshCounters === 'function') {
        refreshCounters();
    }
    
    // Switch to the new profile
    if (typeof switchProfile === 'function') {
        switchProfile(newProfile.id);
    }
    
    console.log('✅ Profile created successfully:', newProfile);
    return newProfile;
}