// Move tab up in the list
function moveTabUp(tabId, environment) {
    const index = environment.tabs.findIndex(tab => tab.id === tabId);
    if (index > 0) {
        // Swap with the previous tab
        [environment.tabs[index - 1], environment.tabs[index]] = [environment.tabs[index], environment.tabs[index - 1]];
        saveWorkbooks();
        renderEnvironments();
    }
}