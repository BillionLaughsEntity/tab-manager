// Add openMoveProfileModal function
function openMoveProfileModal(profile) {
    profileToMove = profile;
    selectedDestinationWorkbook = null;
    
    const destinationsContainer = document.getElementById('move-profile-destinations');
    destinationsContainer.innerHTML = '';
    
    console.log('Opening move profile modal for:', profile.name);
    
    // Show all workbooks except the current one
    workbooks.forEach(workbook => {
        // Don't allow moving to the same workbook
        if (workbook.id === currentWorkbookId) {
            return;
        }
        
        const workbookElement = document.createElement('div');
        workbookElement.className = 'move-profile-workbook';
        workbookElement.dataset.workbookId = workbook.id;
        workbookElement.innerHTML = `
            <i class="fas fa-book" style="margin-right: 8px; color: ${workbook.color};"></i>
            ${workbook.name}
            <small style="margin-left: 8px; color: #7f8c8d;">(${workbook.profiles ? workbook.profiles.length : 0} profiles)</small>
        `;
        
        workbookElement.addEventListener('click', () => {
            // Deselect previously selected workbook
            document.querySelectorAll('.move-profile-workbook.selected').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Select this workbook
            workbookElement.classList.add('selected');
            selectedDestinationWorkbook = workbook;
        });
        
        destinationsContainer.appendChild(workbookElement);
    });
    
    // If no other workbooks exist, show message
    if (destinationsContainer.children.length === 0) {
        destinationsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #7f8c8d;">No other workbooks available for moving profiles</div>';
    }
    
    document.getElementById('move-profile-modal').style.display = 'flex';
}