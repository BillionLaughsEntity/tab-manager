// Search Suggestions Functionality
function showSearchSuggestions(searchTerm) {

    console.log('showSearchSuggestions called with:', searchTerm);
    
    const suggestionsList = document.getElementById('search-suggestions-list');
    const suggestionsContainer = document.getElementById('search-suggestions');
    const resultsCount = document.getElementById('search-results-count');
    
    console.log('Found elements:', {
        suggestionsList,
        suggestionsContainer,
        resultsCount
    });

    if (!searchTerm.trim()) {
        console.log('Empty search term, hiding suggestions');
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    const suggestions = [];
    
    // Search through all data and collect suggestions
    workbooks.forEach(workbook => {
        // Search workbook names
        if (workbook.name.toLowerCase().includes(searchTermLower)) {
            suggestions.push({
                type: 'workbook',
                icon: 'workbook',
                title: workbook.name,
                path: 'Workbook',
                workbook: workbook,
                profile: null,
                environment: null,
                tab: null,
                link: null
            });
        }
        
        // Search profiles
        workbook.profiles.forEach(profile => {
            if (profile.name.toLowerCase().includes(searchTermLower)) {
                suggestions.push({
                    type: 'profile',
                    icon: 'profile',
                    title: profile.name,
                    path: `${workbook.name} → Profile`,
                    workbook: workbook,
                    profile: profile,
                    environment: null,
                    tab: null,
                    link: null
                });
            }
            
            // Search environments
            if (profile.environments) {
                profile.environments.forEach(environment => {
                    if (environment.name.toLowerCase().includes(searchTermLower)) {
                        suggestions.push({
                            type: 'environment',
                            icon: 'environment',
                            title: environment.name,
                            path: `${workbook.name} → ${profile.name} → Environment`,
                            workbook: workbook,
                            profile: profile,
                            environment: environment,
                            tab: null,
                            link: null
                        });
                    }
                    
                    // Search tabs
                    if (environment.tabs) {
                        environment.tabs.forEach(tab => {
                            if (tab.name.toLowerCase().includes(searchTermLower)) {
                                suggestions.push({
                                    type: 'tab',
                                    icon: 'tab',
                                    title: tab.name,
                                    path: `${workbook.name} → ${profile.name} → ${environment.name} → Tab`,
                                    workbook: workbook,
                                    profile: profile,
                                    environment: environment,
                                    tab: tab,
                                    link: null
                                });
                            }
                            
                            // Search links
                            if (tab.links) {
                                tab.links.forEach(link => {
                                    // Check if link exists and has required properties
                                    if (!link || typeof link !== 'object') {
                                        console.warn('Invalid link found:', link);
                                        return; // Skip this link
                                    }
                                    const titleMatch = link.title.toLowerCase().includes(searchTermLower);
                                    const urlMatch = link.url && link.url.toLowerCase().includes(searchTermLower);
                                    const multiLinkMatch = link.urls && link.urls.some(url => url.toLowerCase().includes(searchTermLower));
                                    
                                    if (titleMatch || urlMatch || multiLinkMatch) {
                                        suggestions.push({
                                            type: 'link',
                                            icon: 'link',
                                            title: link.title || 'Untitled Link',
                                            path: `${workbook.name} → ${profile.name} → ${environment.name} → ${tab.name}`,
                                            workbook: workbook,
                                            profile: profile,
                                            environment: environment,
                                            tab: tab,
                                            link: link
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
    
    // Update results count
    resultsCount.textContent = `${suggestions.length} result${suggestions.length !== 1 ? 's' : ''}`;
    
    // Clear previous suggestions
    suggestionsList.innerHTML = '';
    
    if (suggestions.length === 0) {
        suggestionsList.innerHTML = `
            <div class="search-suggestion-item">
                <div class="search-suggestion-content">
                    <div class="search-suggestion-title">No results found</div>
                    <div class="search-suggestion-path">Try different search terms</div>
                </div>
            </div>
        `;
    } else {
        // Add suggestions to the list
        suggestions.forEach(suggestion => {
            // Skip null or invalid suggestions
            if (!suggestion || !suggestion.title) {
                console.warn('Invalid suggestion skipped:', suggestion);
                return;
            }
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'search-suggestion-item';
            
            // Highlight matching text in title
            const highlightedTitle = highlightText(suggestion.title, searchTerm);
            
            suggestionItem.innerHTML = `
                <div class="search-suggestion-icon ${suggestion.icon}">
                    ${getTypeAbbreviation(suggestion.type)}
                </div>
                <div class="search-suggestion-content">
                    <div class="search-suggestion-title">
                        ${highlightedTitle}
                        <span class="search-suggestion-type">${suggestion.type}</span>
                    </div>
                    <div class="search-suggestion-path">${suggestion.path}</div>
                </div>
            `;
            
            // Add click event to navigate to the item
            suggestionItem.addEventListener('click', () => {
                if (typeof navigateToSearchResult === 'function') {
                    navigateToSearchResult(suggestion);
                }
                if (typeof hideSearchSuggestions === 'function') {
                    hideSearchSuggestions();
                }
            });
            
            suggestionsList.appendChild(suggestionItem);
        });
    }
    
    // Show suggestions
    suggestionsContainer.style.display = 'block';
}