// Open the reorder links modal
function openReorderLinksModal() {
    const reorderLinksList = document.getElementById('reorder-links-list');
    reorderLinksList.innerHTML = '';
    
    currentTab.links.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.className = 'reorder-link-item';
        linkItem.dataset.linkId = link.id;
        
        linkItem.innerHTML = `
            <i class="fas fa-grip-lines"></i>
            <div class="reorder-link-title">${link.title}</div>
            <div class="reorder-link-url">${link.url}</div>
            <div class="reorder-actions">
                <button class="reorder-btn move-up-btn" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="reorder-btn move-down-btn" ${index === currentTab.links.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
        `;
        
        reorderLinksList.appendChild(linkItem);
        
        // Add event listeners for move up/down buttons
        const moveUpBtn = linkItem.querySelector('.move-up-btn');
        const moveDownBtn = linkItem.querySelector('.move-down-btn');
        
        moveUpBtn.addEventListener('click', () => {
            moveLinkUp(link.id);
            openReorderLinksModal(); // Refresh the modal
        });
        
        moveDownBtn.addEventListener('click', () => {
            moveLinkDown(link.id);
            openReorderLinksModal(); // Refresh the modal
        });
    });
    
    reorderLinksModal.style.display = 'flex';
}