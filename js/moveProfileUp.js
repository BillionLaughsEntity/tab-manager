function moveProfileUp(profileId, workbook = null) {
    const targetWorkbook = workbook || getCurrentWorkbook();
    if (!targetWorkbook || !targetWorkbook.profiles) return;
    
    const index = targetWorkbook.profiles.findIndex(profile => profile.id === profileId);
    if (index > 0) {
        // Swap with the previous profile
        [targetWorkbook.profiles[index - 1], targetWorkbook.profiles[index]] = 
        [targetWorkbook.profiles[index], targetWorkbook.profiles[index - 1]];
        saveWorkbooks();
        renderProfileTabs();
    }
}