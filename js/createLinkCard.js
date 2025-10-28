// Your existing createLinkCard function - KEEP THIS EXACTLY AS IS
function createLinkCard(link) {
    const linkCard = document.createElement('div');
    linkCard.className = 'link-card';
    linkCard.dataset.linkId = link.id;
    
    if (link.isMultiLink) {
        linkCard.innerHTML = `
            <div class="link-title">
                <i class="fas fa-layer-group"></i>
                ${link.title}
                <span class="multi-link-count">${link.linkCount} links</span>
            </div>
            <div class="link-url">Multiple links card</div>
            <div class="link-actions">
                <button class="link-action-btn open-link">
                    <i class="fas fa-external-link-alt"></i>Open All
                </button>
                <button class="link-action-btn edit-link">
                    <i class="fas fa-edit"></i>Edit
                </button>
                <button class="link-action-btn move-link">
                    <i class="fas fa-arrows-alt"></i>Move
                </button>
                <button class="link-action-btn delete-link">
                    <i class="fas fa-trash"></i>Delete
                </button>
            </div>
        `;
    } else if (link.isSearchLink) {
        linkCard.innerHTML = `
            <div class="link-title">
                <i class="fas fa-search"></i>
                ${link.title}
            </div>
            <div class="link-url">${link.url}</div>
            <div class="link-actions">
                <button class="link-action-btn open-link">
                    <i class="fas fa-external-link-alt"></i>Open with Search
                </button>
                <button class="link-action-btn edit-link">
                    <i class="fas fa-edit"></i>Edit
                </button>
                <button class="link-action-btn move-link">
                    <i class="fas fa-arrows-alt"></i>Move
                </button>
                <button class="link-action-btn delete-link">
                    <i class="fas fa-trash"></i>Delete
                </button>
            </div>
        `;
    } else {
        linkCard.innerHTML = `
            <div class="link-title">
                <i class="fas fa-link"></i>
                ${link.title}
            </div>
            <a href="${link.url}" target="_blank" class="link-url">${link.url}</a>
            <div class="link-actions">
                <button class="link-action-btn open-link">
                    <i class="fas fa-external-link-alt"></i>Open
                </button>
                <button class="link-action-btn edit-link">
                    <i class="fas fa-edit"></i>Edit
                </button>
                <button class="link-action-btn move-link">
                    <i class="fas fa-arrows-alt"></i>Move
                </button>
                <button class="link-action-btn delete-link">
                    <i class="fas fa-trash"></i>Delete
                </button>
            </div>
        `;
    }
    
    // Your existing event listener attachment
    const openBtn = linkCard.querySelector('.open-link');
    const editBtn = linkCard.querySelector('.edit-link');
    const moveBtn = linkCard.querySelector('.move-link');
    const deleteBtn = linkCard.querySelector('.delete-link');
    
    openBtn.addEventListener('click', () => {
        if (link.isMultiLink) {
            openMultiLinkCardLinks(link);
        } else if (link.isSearchLink) {
            openSearchLinkModal(link);
        } else {
            window.open(link.url, '_blank');
        }
    });
    
    editBtn.addEventListener('click', () => {
        if (link.isMultiLink) {
            openEditMultiLinkCardModal(link);
        } else {
            linkToEdit = link;
            document.getElementById('edit-link-title').value = link.title;
            document.getElementById('edit-link-url').value = link.url;
            editLinkModal.style.display = 'flex';
        }
    });
    
    moveBtn.addEventListener('click', () => {
        openMoveLinkModal(link);
    });
    
    deleteBtn.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete the link "${link.title}"?`)) {
            deleteLink(link);
        }
    });
    
    return linkCard;
}