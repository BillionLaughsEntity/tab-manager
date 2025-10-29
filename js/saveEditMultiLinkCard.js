// Save edited Multi-Link Card
function saveEditMultiLinkCard() {
    const cardName = document.getElementById('edit-multi-link-card-name').value.trim();
    const linkInputs = document.querySelectorAll('#edit-multi-link-fields-container .multi-link-url');
    
    const links = [];
    let hasErrors = false;
    
    // Validate and collect links
    linkInputs.forEach((input, index) => {
        const url = input.value.trim();
        if (url) {
            const finalUrl = url.startsWith('http') ? url : 'https://' + url;
            if (isValidUrl(finalUrl)) {
                links.push(finalUrl);
            } else {
                alert(`Please enter a valid URL for Link ${index + 1}`);
                hasErrors = true;
                return;
            }
        }
    });
    
    if (hasErrors) return;
    
    if (!cardName) {
        alert('Please enter a card name');
        return;
    }
    
    if (links.length === 0) {
        alert('Please keep at least one link');
        return;
    }
    
    // Update the multi-link card
    multiLinkCardToEdit.title = cardName;
    multiLinkCardToEdit.urls = links;
    multiLinkCardToEdit.linkCount = links.length;
    
    saveWorkbooks();
    renderLinks(currentTab);
    
    document.getElementById('edit-multi-link-card-modal').style.display = 'none';
}