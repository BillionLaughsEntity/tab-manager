// Fix the performSearch function
function performSearch(searchTerm) {
    console.log('performSearch called with:', searchTerm);

    const searchTermLower = searchTerm.toLowerCase();
    clearSearch();
    
    let hasResults = false;
    const searchResults = {
        workbooks: new Set(),
        profiles: new Set(),
        environments: new Set(),
        tabs: new Set()
    };
    
    // Search through all data
    workbooks.forEach(workbook => {
        let workbookHasResults = false;
        
        // Check workbook name
        if (workbook.name.toLowerCase().includes(searchTermLower)) {
            workbookHasResults = true;
            hasResults = true;
            searchResults.workbooks.add(workbook.id);
        }
        
        workbook.profiles.forEach(profile => {
            let profileHasResults = false;
            
            // Check profile name
            if (profile.name.toLowerCase().includes(searchTermLower)) {
                profileHasResults = true;
                workbookHasResults = true;
                hasResults = true;
                searchResults.profiles.add(profile.id);
            }
            
            if (profile.environments) {
                profile.environments.forEach(environment => {
                    let environmentHasResults = false;
                    
                    // Check environment name
                    if (environment.name.toLowerCase().includes(searchTermLower)) {
                        environmentHasResults = true;
                        profileHasResults = true;
                        workbookHasResults = true;
                        hasResults = true;
                        searchResults.environments.add(environment.id);
                    }
                    
                    if (environment.tabs) {
                        environment.tabs.forEach(tab => {
                            let tabHasResults = false;
                            
                            // Check tab name
                            if (tab.name.toLowerCase().includes(searchTermLower)) {
                                tabHasResults = true;
                                environmentHasResults = true;
                                profileHasResults = true;
                                workbookHasResults = true;
                                hasResults = true;
                                searchResults.tabs.add(tab.id);
                            }
                            
                            // Search links
                            if (tab.links) {
                                const linkHasResults = tab.links.some(link => {
                                    const titleMatch = link.title.toLowerCase().includes(searchTermLower);
                                    const urlMatch = link.url && link.url.toLowerCase().includes(searchTermLower);
                                    const multiLinkMatch = link.urls && link.urls.some(url => url.toLowerCase().includes(searchTermLower));
                                    return titleMatch || urlMatch || multiLinkMatch;
                                });
                                
                                if (linkHasResults) {
                                    tabHasResults = true;
                                    environmentHasResults = true;
                                    profileHasResults = true;
                                    workbookHasResults = true;
                                    hasResults = true;
                                    searchResults.tabs.add(tab.id);
                                }
                            }
                        });
                    }
                    
                    // Mark environment if it has results
                    if (environmentHasResults) {
                        searchResults.environments.add(environment.id);
                    }
                });
            }
            
            // Mark profile if it has results
            if (profileHasResults) {
                searchResults.profiles.add(profile.id);
            }
        });
        
        // Mark workbook if it has results
        if (workbookHasResults) {
            searchResults.workbooks.add(workbook.id);
        }
    });
    
    applySearchHighlights(searchResults);
    window.currentSearchResults = searchResults;
    updateSearchResultsCount(searchResults); // Add this line
    
    if (!hasResults) {
        console.log('No search results found for:', searchTerm);
    }
}

// Clear search highlights
// Fix the clearSearch function to also clear the count badge
function clearSearch() {
    // Remove all search highlight classes
    document.querySelectorAll('.search-highlight-workbook').forEach(el => {
        el.classList.remove('search-highlight-workbook');
    });
    document.querySelectorAll('.search-highlight-profile').forEach(el => {
        el.classList.remove('search-highlight-profile');
    });
    document.querySelectorAll('.search-highlight-environment').forEach(el => {
        el.classList.remove('search-highlight-environment');
    });
    document.querySelectorAll('.search-highlight-environment-header').forEach(el => {
        el.classList.remove('search-highlight-environment-header');
    });
    document.querySelectorAll('.search-highlight-tab').forEach(el => {
        el.classList.remove('search-highlight-tab');
    });
    
    // Clear the search count badge
    const searchContainer = document.querySelector('.search-container');
    const countBadge = searchContainer.querySelector('.search-count-badge');
    if (countBadge) {
        countBadge.style.display = 'none';
        countBadge.textContent = '';
    }
    
    // Clear stored search results
    window.currentSearchResults = null;

    // Also hide suggestions if search is completely cleared
    if (!globalSearch.value.trim()) {
        hideSearchSuggestions();
    }
}

// Apply search highlights to UI elements
function applySearchHighlights(searchResults) {
    // Highlight workbooks
    searchResults.workbooks.forEach(workbookId => {
        const workbookTab = document.querySelector(`.workbook-tab[data-workbook-id="${workbookId}"]`);
        if (workbookTab) {
            workbookTab.classList.add('search-highlight-workbook');
        }
    });
    
    // Highlight profiles
    searchResults.profiles.forEach(profileId => {
        const profileTab = document.querySelector(`.profile-tab[data-profile-id="${profileId}"]`);
        if (profileTab) {
            profileTab.classList.add('search-highlight-profile');
        }
    });
    
    // Highlight environments
    searchResults.environments.forEach(environmentId => {
        const environmentElement = document.querySelector(`.environment[data-environment-id="${environmentId}"]`);
        if (environmentElement) {
            environmentElement.classList.add('search-highlight-environment');
            
            // Also highlight the environment header
            const environmentHeader = environmentElement.querySelector('.environment-header');
            if (environmentHeader) {
                environmentHeader.classList.add('search-highlight-environment-header');
            }
        }
    });
    
    // Highlight tabs
    searchResults.tabs.forEach(tabId => {
        const tabElement = document.querySelector(`.tab-item[data-tab-id="${tabId}"]`);
        if (tabElement) {
            tabElement.classList.add('search-highlight-tab');
        }
    });
}        