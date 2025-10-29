// Open all links in a multi-link card
function openMultiLinkCardLinks(card) {
    card.urls.forEach((url, index) => {
        setTimeout(() => {
            window.open(url, '_blank');
        }, index * 300); // Small delay between opening tabs
    });
}