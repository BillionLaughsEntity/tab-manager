// Save Multi-Link Card
function saveMultiLinkCard() {
    const cardName = document.getElementById('multi-link-card-name').value.trim();
    const linkInputs = document.querySelectorAll('.multi-link-url');
    
    const links = [];
    let hasErrors = false;
    
    // Validate and collect links
    linkInputs.forEach((input, index) => {
        const url = input.value.trim();
        if (url) {
            if (!isValidUrl(url) && !url.startsWith('http')) {
                // Try to fix the URL
                const fixedUrl = 'https://' + url;
                if (isValidUrl(fixedUrl)) {
                    links.push(fixedUrl);
                } else {
                    alert(`Please enter a valid URL for Link ${index + 1}`);
                    hasErrors = true;
                    return;
                }
            } else {
                // Ensure URL has protocol
                const finalUrl = url.startsWith('http') ? url : 'https://' + url;
                if (isValidUrl(finalUrl)) {
                    links.push(finalUrl);
                } else {
                    alert(`Please enter a valid URL for Link ${index + 1}`);
                    hasErrors = true;
                    return;
                }
            }
        }
    });
    
    if (hasErrors) return;
    
    if (!cardName) {
        alert('Please enter a card name');
        return;
    }
    
    if (links.length === 0) {
        alert('Please add at least one link');
        return;
    }
    
    // Create the multi-link card
    const multiLinkCard = {
        id: 'multi-link-' + Date.now(),
        title: cardName,
        urls: links,
        isMultiLink: true,
        linkCount: links.length
    };
    
    // Add to current tab
    currentTab.links.push(multiLinkCard);
    saveWorkbooks();
    renderLinks(currentTab);
    
    document.getElementById('multi-link-card-modal').style.display = 'none';
}