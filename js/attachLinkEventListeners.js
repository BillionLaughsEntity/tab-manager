// Make sure you have this function to attach event listeners for table and list views
function attachLinkEventListeners(element, link) {
    const openBtn = element.querySelector('.open-link');
    const editBtn = element.querySelector('.edit-link');
    const moveBtn = element.querySelector('.move-link');
    const deleteBtn = element.querySelector('.delete-link');
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteLink(link);
        });
    }
    
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            if (link.isMultiLink) {
                openMultiLinkCardLinks(link);
            } else if (link.isSearchLink) {
                openSearchLinkModal(link);
            } else {
                window.open(link.url, '_blank');
            }
        });
    }
    
    if (editBtn) {
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
    }
    
    if (moveBtn) {
        moveBtn.addEventListener('click', () => {
            openMoveLinkModal(link);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete the link "${link.title}"?`)) {
                deleteLink(link);
            }
        });
    }
}