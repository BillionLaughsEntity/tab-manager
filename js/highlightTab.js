function highlightTab(tabId) {
    const tabElement = document.querySelector(`[data-tab-id="${tabId}"]`);
    if (tabElement) tabElement.classList.add('search-result-tab');
}