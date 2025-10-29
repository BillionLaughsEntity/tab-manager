// Add this function to open the Create Search Link modal
function openCreateSearchLinkModal() {
    isCreatingSearchLink = true;
    document.getElementById('search-link-title').value = '';
    document.getElementById('search-link-url').value = '';
    document.getElementById('search-link-preview-text').textContent = 'Enter URL to see preview';
    document.getElementById('create-search-link-modal').style.display = 'flex';
}