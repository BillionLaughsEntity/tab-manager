// Edit a link
function editLink(link, newTitle, newUrl) {
    link.title = newTitle;
    link.url = newUrl;
    saveWorkbooks();
    
    // Refresh the links display if we're currently viewing this link's tab
    if (currentTab && currentTab.links.includes(link)) {
        renderLinks(currentTab);
    }
}