// Rename a tab
function renameTab(tab, newName) {
    tab.name = newName;
    saveWorkbooks();
    renderEnvironments();
    if (currentTab === tab) {
        currentTabName.textContent = tab.name;
    }
}