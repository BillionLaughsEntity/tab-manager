// Fix openMoveEnvironmentModal to show profiles across all workbooks
function openMoveEnvironmentModal(environment) {
    environmentToMove = environment;
    selectedDestinationProfile = null;
    
    const destinationsContainer = document.getElementById('move-environment-destinations');
    destinationsContainer.innerHTML = '';
    
    console.log('Opening move environment modal for:', environment.name);
    
    // Create a hierarchical view of workbooks -> profiles
    workbooks.forEach(workbook => {
        const workbookElement = document.createElement('div');
        workbookElement.className = 'move-environment-workbook';
        workbookElement.dataset.workbookId = workbook.id;
        
        // Check if this is the current workbook
        const isCurrentWorkbook = workbook.id === currentWorkbookId;
        const workbookBadge = isCurrentWorkbook ? '<span class="workbook-badge">Current</span>' : '';
        
        workbookElement.innerHTML = `
            <div class="move-environment-workbook-header ${isCurrentWorkbook ? 'current-workbook' : ''}">
                <span>${workbook.name} ${workbookBadge}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="move-environment-workbook-content">
                <!-- Profiles will be added here -->
            </div>
        `;
        
        destinationsContainer.appendChild(workbookElement);
        
        const workbookHeader = workbookElement.querySelector('.move-environment-workbook-header');
        const workbookContent = workbookElement.querySelector('.move-environment-workbook-content');
        
        workbookHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            workbookElement.classList.toggle('expanded');
            
            // If we're expanding and content is empty, populate it
            if (workbookElement.classList.contains('expanded') && workbookContent.innerHTML === '') {
                populateWorkbookProfiles(workbook, workbookContent);
            } else if (!workbookElement.classList.contains('expanded')) {
                // Clear content when collapsing to save memory
                workbookContent.innerHTML = '';
            }
        });
    });
    
    document.getElementById('move-environment-modal').style.display = 'flex';
}