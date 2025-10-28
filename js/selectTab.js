// Select a tab and display its links
function selectTab(environment, tab) {
    currentEnvironment = environment;
    currentTab = tab;
    
    // Update UI
    currentTabName.textContent = tab.name;
    noTabsMessage.style.display = 'none';
    linksGrid.style.display = 'grid';
    addLinkSection.style.display = 'block';
    reorderLinksBtn.style.display = 'block';
    document.getElementById('add-multi-link-card-btn').style.display = 'block';
    document.getElementById('create-search-link-btn').style.display = 'block';

        // Add this line to show the selection button
    document.getElementById('toggle-selection-mode-btn').style.display = 'block';
    
    // Highlight the selected tab
    document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-item').forEach(item => {
        if (item.querySelector('.tab-name').textContent === tab.name) {
            item.classList.add('active');
        }
    });
    
    // Render the links
    renderLinks(tab);
}