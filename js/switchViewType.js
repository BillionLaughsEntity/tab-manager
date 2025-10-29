// Simple view type switcher
function switchViewType(viewType) {
    currentViewType = viewType;
    if (currentTab) {
        renderLinks(currentTab);
    }
}