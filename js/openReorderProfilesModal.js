// Open reorder profiles modal
function openReorderProfilesModal() {
    const reorderProfilesList = document.getElementById('reorder-profiles-list');
    reorderProfilesList.innerHTML = '';
    
    // Get all profiles from current workbook only (since reordering is per workbook)
    const currentWorkbook = getCurrentWorkbook();
    if (!currentWorkbook || !currentWorkbook.profiles) return;
    
    currentWorkbook.profiles.forEach(((profile, index) => {
        const profileItem = document.createElement('div');
        profileItem.className = 'reorder-link-item';
        profileItem.dataset.profileId = profile.id;
        
        profileItem.innerHTML = `
            <i class="fas fa-grip-lines"></i>
            <div class="reorder-link-title">${profile.name}</div>
            <div class="reorder-link-url">Profile</div>
            <div class="reorder-actions">
                <button class="reorder-btn move-up-btn" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="reorder-btn move-down-btn" ${index === currentWorkbook.profiles.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
        `;
        
        reorderProfilesList.appendChild(profileItem);
        
        // Add event listeners for move up/down buttons
        const moveUpBtn = profileItem.querySelector('.move-up-btn');
        const moveDownBtn = profileItem.querySelector('.move-down-btn');
        
        moveUpBtn.addEventListener('click', () => {
            moveProfileUp(profile.id, currentWorkbook);  // ✅ Pass workbook context
            openReorderProfilesModal(); // Refresh the modal
        });
        
        moveDownBtn.addEventListener('click', () => {
            moveProfileDown(profile.id, currentWorkbook);  // ✅ Pass workbook context
            openReorderProfilesModal(); // Refresh the modal
        });
    }));
    
    document.getElementById('reorder-profiles-modal').style.display = 'flex';
}