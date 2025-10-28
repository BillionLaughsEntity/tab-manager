// Move tab down in the list
function moveTabDown(tabId, environment) {
    const index = environment.tabs.findIndex(tab => tab.id === tabId);
    if (index < environment.tabs.length - 1) {
        // Swap with the next tab
        [environment.tabs[index], environment.tabs[index + 1]] = [environment.tabs[index + 1], environment.tabs[index]];
        saveWorkbooks();
        renderEnvironments();
    }
}