// Simple view type switcher
function switchViewType(viewType) {
    currentViewType = viewType;
    
    // Update the view type indicator in the tab header
    updateViewTypeIndicator(viewType);

    if (currentTab) {
        renderLinks(currentTab);
    }
}

function updateViewTypeIndicator(viewType) {
    const viewTypeToggle = document.getElementById('view-type-toggle');
    if (!viewTypeToggle) return;
    
    // Update the button text to include the current view
    const icon = viewTypeToggle.querySelector('.fas');
    const textSpan = viewTypeToggle.querySelector('span');
    
    if (textSpan) {
        textSpan.textContent = getViewTypeDisplayName(viewType);
    }
}

function getViewTypeDisplayName(viewType) {
    switch(viewType) {
        case 'grid': return 'Grid View';
        case 'list': return 'List View';
        case 'table': return 'Table View';
        default: return 'View';
    }
}