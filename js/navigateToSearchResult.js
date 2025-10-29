// Navigate to search result
function navigateToSearchResult(suggestion) {
    // Switch to the appropriate workbook
    if (suggestion.workbook && suggestion.workbook.id !== currentWorkbookId) {
        switchWorkbook(suggestion.workbook.id);
    }
    
    // Switch to the appropriate profile
    if (suggestion.profile && suggestion.profile.id !== currentProfileId) {
        switchProfile(suggestion.profile.id);
    }
    
    // Expand and select environment if applicable
    if (suggestion.environment) {
        // Ensure environment is expanded
        const environmentElement = document.querySelector(`.environment[data-environment-id="${suggestion.environment.id}"]`);
        if (environmentElement && !environmentElement.classList.contains('expanded')) {
            environmentElement.classList.add('expanded');
        }
        
        // Select tab if applicable
        if (suggestion.tab) {
            selectTab(suggestion.environment, suggestion.tab);
        } else {
            // Just ensure the environment is visible
            currentEnvironment = suggestion.environment;
            renderEnvironments();
        }
    }
    
    // Apply search highlighting to the target element
    performSearch(globalSearch.value);
    
    // Scroll the target element into view
    setTimeout(() => {
        let targetElement = null;
        
        switch (suggestion.type) {
            case 'workbook':
                targetElement = document.querySelector(`.workbook-tab[data-workbook-id="${suggestion.workbook.id}"]`);
                break;
            case 'profile':
                targetElement = document.querySelector(`.profile-tab[data-profile-id="${suggestion.profile.id}"]`);
                break;
            case 'environment':
                targetElement = document.querySelector(`.environment[data-environment-id="${suggestion.environment.id}"]`);
                break;
            case 'tab':
                targetElement = document.querySelector(`.tab-item[data-tab-id="${suggestion.tab.id}"]`);
                break;
            case 'link':
                targetElement = document.querySelector(`[data-link-id="${suggestion.link.id}"]`);
                break;
        }
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add a temporary highlight effect
            targetElement.style.transition = 'all 0.5s ease';
            targetElement.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.5)';
            setTimeout(() => {
                targetElement.style.boxShadow = '';
            }, 2000);
        }
    }, 100);
}