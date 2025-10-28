function moveProfileDown(profileId, workbook = null) {
    const targetWorkbook = workbook || getCurrentWorkbook();
    if (!targetWorkbook || !targetWorkbook.profiles) return;
    
    const index = targetWorkbook.profiles.findIndex(profile => profile.id === profileId);
    if (index < targetWorkbook.profiles.length - 1) {
        // Swap with the next profile
        [targetWorkbook.profiles[index], targetWorkbook.profiles[index + 1]] = 
        [targetWorkbook.profiles[index + 1], targetWorkbook.profiles[index]];
        saveWorkbooks();
        renderProfileTabs();
    }
}