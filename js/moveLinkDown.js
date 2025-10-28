// Move a link down in the list
function moveLinkDown(linkId) {
    const index = currentTab.links.findIndex(link => link.id === linkId);
    if (index < currentTab.links.length - 1) {
        // Swap with the next link
        [currentTab.links[index], currentTab.links[index + 1]] = [currentTab.links[index + 1], currentTab.links[index]];
        saveWorkbooks();
    }
}