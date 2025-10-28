// Move a link up in the list
function moveLinkUp(linkId) {
    const index = currentTab.links.findIndex(link => link.id === linkId);
    if (index > 0) {
        // Swap with the previous link
        [currentTab.links[index - 1], currentTab.links[index]] = [currentTab.links[index], currentTab.links[index - 1]];
        saveWorkbooks();
    }
}