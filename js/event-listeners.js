// Set up event listeners
function setupEventListeners() {
    try {
        console.log('Setting up event listeners for V18...');
        
        // Check for duplicate IDs
        const allElements = document.querySelectorAll('[id]');
        const idCounts = {};
        allElements.forEach(el => {
            idCounts[el.id] = (idCounts[el.id] || 0) + 1;
        });
        
        const duplicates = Object.entries(idCounts).filter(([id, count]) => count > 1);
        if (duplicates.length > 0) {
            console.error('Duplicate element IDs found:', duplicates);
        }

    // Add this function to handle search clear
    searchClear.addEventListener('click', () => {
        globalSearch.value = '';
        searchClear.style.display = 'none';
        hideSearchSuggestions();
        clearSearch();
        globalSearch.focus();
    });

    // S3 Sync Event Listeners
    // document.getElementById('s3-sync-btn')?.addEventListener('click', openS3SyncModal);
    // document.getElementById('configure-s3-btn')?.addEventListener('click', openS3ConfigModal);
    // document.getElementById('upload-to-s3-btn')?.addEventListener('click', uploadToS3);
    // document.getElementById('download-from-s3-btn')?.addEventListener('click', downloadFromS3);
    // document.getElementById('test-s3-connection-btn')?.addEventListener('click', testS3Connection);

    // S3 Config Modal
    // document.getElementById('save-s3-config-btn')?.addEventListener('click', function() {
     //    const config = {
    //         accessKeyId: document.getElementById('s3-access-key').value,
    //         secretAccessKey: document.getElementById('s3-secret-key').value,
    //         bucketName: document.getElementById('s3-bucket-name').value,
    //         region: document.getElementById('s3-region').value,
    //         filename: document.getElementById('s3-filename').value
    //     };
        
    //     saveS3Config(config);
    //     document.getElementById('s3-config-modal').style.display = 'none';
    //     updateSyncStatus('S3 configuration saved!', 'success');
    // });

    // Close modals
    // document.getElementById('close-s3-config-modal')?.addEventListener('click', function() {
    //     document.getElementById('s3-config-modal').style.display = 'none';
    // });

    // document.getElementById('close-s3-sync-modal')?.addEventListener('click', function() {
    //     document.getElementById('s3-sync-modal').style.display = 'none';
    // });
    
    document.getElementById('close-workbook-color-modal').addEventListener('click', () => {
        document.getElementById('workbook-color-modal').style.display = 'none';
    });

    document.getElementById('save-workbook-color-btn').addEventListener('click', () => {
        if (workbookForColor) {
            updateWorkbookColor(workbookForColor, selectedColor);
            document.getElementById('workbook-color-modal').style.display = 'none';
        }
    });

    document.getElementById('workbook-html5-color-picker').addEventListener('input', (e) => {
        selectedColor = e.target.value;
        document.getElementById('workbook-selected-color-hex').textContent = selectedColor;
        document.getElementById('workbook-color-preview-box').style.backgroundColor = selectedColor;
    });

    // Add to setupEventListeners function
    document.getElementById('close-move-profile-modal').addEventListener('click', () => {
        document.getElementById('move-profile-modal').style.display = 'none';
    });

    document.getElementById('save-move-profile-btn').addEventListener('click', () => {
        if (profileToMove && selectedDestinationWorkbook) {
            moveProfile(profileToMove, selectedDestinationWorkbook);
            document.getElementById('move-profile-modal').style.display = 'none';
        } else {
            alert('Please select a destination workbook');
        }
    });

    // Manual migration button
    document.getElementById('migrate-data-btn').addEventListener('click', forceMigrateOldData);
    // Add workbook button
    addWorkbookTabBtn.addEventListener('click', () => {
        document.getElementById('new-workbook-name').value = '';
        workbookModal.style.display = 'flex';
    });

    // Save workbook button
    document.getElementById('save-workbook-btn').addEventListener('click', () => {
        const name = document.getElementById('new-workbook-name').value.trim();
        if (name) {
            addWorkbook(name, selectedColor);
            workbookModal.style.display = 'none';
        }
    });

    // Close workbook modal
    document.getElementById('close-workbook-modal').addEventListener('click', () => {
        workbookModal.style.display = 'none';
    });

    // Save rename workbook
    document.getElementById('save-rename-workbook-btn').addEventListener('click', () => {
        const newName = document.getElementById('rename-workbook-input').value.trim();
        if (newName && workbookToRename) {
            renameWorkbook(workbookToRename, newName);
            renameWorkbookModal.style.display = 'none';
        }
    });

    // Close rename workbook modal
    document.getElementById('close-rename-workbook-modal').addEventListener('click', () => {
        renameWorkbookModal.style.display = 'none';
    });

    // Reorder workbooks button
    document.getElementById('reorder-workbooks-btn').addEventListener('click', () => {
        openReorderWorkbooksModal();
    });

    // Close reorder workbooks modal
    document.getElementById('close-reorder-workbooks-modal').addEventListener('click', () => {
        document.getElementById('reorder-workbooks-modal').style.display = 'none';
    });

    // Save reordered workbooks
    document.getElementById('save-reorder-workbooks-btn').addEventListener('click', () => {
        saveReorderedWorkbooks();
        document.getElementById('reorder-workbooks-modal').style.display = 'none';
    });
    
    // Add environment button
    addEnvironmentBtn.addEventListener('click', () => {
        document.getElementById('new-environment-name').value = '';
        environmentModal.style.display = 'flex';
    });

    // View type dropdown
    const viewTypeToggle = document.getElementById('view-type-toggle');
    const viewTypeMenu = document.getElementById('view-type-menu');

    viewTypeToggle.addEventListener('click', () => {
        viewTypeMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.view-type-dropdown')) {
            viewTypeMenu.classList.remove('show');
        }
    });

    // Handle view type selection
    document.querySelectorAll('.view-type-option').forEach(option => {
        option.addEventListener('click', () => {
            const viewType = option.dataset.viewType;
            switchViewType(viewType);
            viewTypeMenu.classList.remove('show');
        });
    });

    // Save environment button
    document.getElementById('save-environment-btn').addEventListener('click', () => {
        const name = document.getElementById('new-environment-name').value.trim();
        if (name) {
            addEnvironment(name);
            environmentModal.style.display = 'none';
        }
    });

    document.querySelector('#clone-to-tab-modal .close-modal').addEventListener('click', () => {
        document.getElementById('clone-to-tab-modal').style.display = 'none';
    });

    // Clone to tab modal event listeners
    document.getElementById('close-clone-to-tab-modal').addEventListener('click', () => {
        document.getElementById('clone-to-tab-modal').style.display = 'none';
    });

    document.getElementById('save-clone-to-tab-btn').addEventListener('click', saveCloneToTab);

    // Close clone modal when clicking outside
    document.getElementById('clone-to-tab-modal').addEventListener('click', (e) => {
        if (e.target.id === 'clone-to-tab-modal') {
            document.getElementById('clone-to-tab-modal').style.display = 'none';
        }
    });

    // Add this to your Bulk Clone function
    document.getElementById('bulk-clone-btn').addEventListener('click', cloneSelectedLinks);

    // Clone to tab Event listener
    document.getElementById('bulk-clone-to-tab-btn').addEventListener('click', openCloneToTabModal);

    // Add this to your setupEventListeners function
    document.getElementById('toggle-selection-mode-btn').addEventListener('click', toggleSelectionMode);

    // Add to setupEventListeners
    document.getElementById('close-move-environment-modal').addEventListener('click', () => {
        document.getElementById('move-environment-modal').style.display = 'none';
    });

    document.getElementById('save-move-environment-btn').addEventListener('click', () => {
        if (environmentToMove && selectedDestinationProfile) {
            moveEnvironment(environmentToMove, selectedDestinationProfile);
            document.getElementById('move-environment-modal').style.display = 'none';
        }
    });

    // Add tab button
    addTabBtn.addEventListener('click', () => {
        if (!currentEnvironment) {
            alert('Please select an environment first');
            return;
        }
        document.getElementById('new-tab-name').value = '';
        tabModal.style.display = 'flex';
    });

    // Save tab button
    document.getElementById('save-tab-btn').addEventListener('click', () => {
        const name = document.getElementById('new-tab-name').value.trim();
        if (name) {
            addTab(currentEnvironment, name);
            tabModal.style.display = 'none';
        }
    });

    // Add link button
    addLinkSubmitBtn.addEventListener('click', () => {
        const title = document.getElementById('link-title').value.trim();
        const url = document.getElementById('link-url').value.trim();
        
        if (title && url) {
            // Validate URL format
            if (!isValidUrl(url)) {
                alert('Please enter a valid URL (e.g., https://example.com)');
                return;
            }
            
            addLink(currentTab, title, url);
            document.getElementById('link-title').value = '';
            document.getElementById('link-url').value = '';
        }
    });

    // Export button
    exportBtn.addEventListener('click', () => {
        exportToXML();
    });

    // Import button
    importBtn.addEventListener('click', () => {
        importModal.style.display = 'flex';
    });

    // Import XML button
    document.getElementById('import-xml-btn').addEventListener('click', () => {
        const xmlContent = document.getElementById('import-xml-content').value.trim();
        if (xmlContent) {
            importFromXML(xmlContent);
        }
    });

    // Reorder links button
    reorderLinksBtn.addEventListener('click', () => {
        openReorderLinksModal();
    });

    // Close modals when clicking the X
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Close modals with cancel buttons
    document.getElementById('close-export-modal').addEventListener('click', () => {
        exportModal.style.display = 'none';
    });
    
    document.getElementById('close-import-modal').addEventListener('click', () => {
        importModal.style.display = 'none';
    });
    
    document.getElementById('close-environment-modal').addEventListener('click', () => {
        environmentModal.style.display = 'none';
    });
    
    document.getElementById('close-tab-modal').addEventListener('click', () => {
        tabModal.style.display = 'none';
    });
    
    document.getElementById('close-rename-environment-modal').addEventListener('click', () => {
        renameEnvironmentModal.style.display = 'none';
    });
    
    document.getElementById('close-rename-tab-modal').addEventListener('click', () => {
        renameTabModal.style.display = 'none';
    });
    
    document.getElementById('close-edit-link-modal').addEventListener('click', () => {
        editLinkModal.style.display = 'none';
    });
    
    document.getElementById('close-move-link-modal').addEventListener('click', () => {
        moveLinkModal.style.display = 'none';
    });
    
    document.getElementById('close-move-tab-modal').addEventListener('click', () => {
        moveTabModal.style.display = 'none';
    });
    
    document.getElementById('close-reorder-links-modal').addEventListener('click', () => {
        reorderLinksModal.style.display = 'none';
    });
    
    document.getElementById('close-profile-modal').addEventListener('click', () => {
        profileModal.style.display = 'none';
    });
    
    document.getElementById('close-rename-profile-modal').addEventListener('click', () => {
        renameProfileModal.style.display = 'none';
    });

    // Save rename environment
    document.getElementById('save-rename-environment-btn').addEventListener('click', () => {
        const newName = document.getElementById('rename-environment-input').value.trim();
        if (newName && environmentToRename) {
            renameEnvironment(environmentToRename, newName);
            renameEnvironmentModal.style.display = 'none';
        }
    });

    // Save rename tab
    document.getElementById('save-rename-tab-btn').addEventListener('click', () => {
        const newName = document.getElementById('rename-tab-input').value.trim();
        if (newName && tabToRename) {
            renameTab(tabToRename, newName);
            renameTabModal.style.display = 'none';
        }
    });

    // Save edit link
    document.getElementById('save-edit-link-btn').addEventListener('click', () => {
        const newTitle = document.getElementById('edit-link-title').value.trim();
        const newUrl = document.getElementById('edit-link-url').value.trim();
        
        if (newTitle && newUrl && linkToEdit) {
            if (!isValidUrl(newUrl)) {
                alert('Please enter a valid URL (e.g., https://example.com)');
                return;
            }
            
            editLink(linkToEdit, newTitle, newUrl);
            editLinkModal.style.display = 'none';
        }
    });

    // Update the save move button handler
    document.getElementById('save-move-link-btn').addEventListener('click', () => {
        if (window.bulkLinksToMove) {
            // Bulk move operation
            saveBulkMoveLinks();
        } else {
            // Single move operation (existing code)
            if (linkToMove && selectedDestinationTab) {
                moveLink(linkToMove, selectedDestinationTab);
                moveLinkModal.style.display = 'none';
            }
        }
    });

    // Save move tab
    document.getElementById('save-move-tab-btn').addEventListener('click', () => {
        if (tabToMove && selectedDestinationEnvironment) {
            moveTab(tabToMove, selectedDestinationEnvironment);
            moveTabModal.style.display = 'none';
        }
    });

    // Save reorder links
    document.getElementById('save-reorder-links-btn').addEventListener('click', () => {
        saveReorderedLinks();
        reorderLinksModal.style.display = 'none';
    });

    // Copy XML to clipboard
    document.getElementById('copy-xml-btn').addEventListener('click', () => {
        const xmlContent = document.getElementById('export-xml-content');
        xmlContent.select();
        document.execCommand('copy');
        alert('XML copied to clipboard!');
    });

    // Add profile tab button
    addProfileTabBtn.addEventListener('click', () => {
        document.getElementById('new-profile-name').value = '';
        profileModal.style.display = 'flex';
    });

    // Save profile button
    document.getElementById('save-profile-btn').addEventListener('click', () => {
        const name = document.getElementById('new-profile-name').value.trim();
        if (name) {
            addProfile(name, selectedColor);
            profileModal.style.display = 'none';
        }
    });

    // Save rename profile
    document.getElementById('save-rename-profile-btn').addEventListener('click', () => {
        const newName = document.getElementById('rename-profile-input').value.trim();
        if (newName && profileToRename) {
            renameProfile(profileToRename, newName);
            renameProfileModal.style.display = 'none';
        }
    });

    // Add event listener for the download button (add this to your setupEventListeners function)
    document.getElementById('download-xml-btn').addEventListener('click', () => {
        const xmlContent = document.getElementById('export-xml-content').value;
        const profileName = getCurrentProfile().name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filename = `tabmanager_${profileName}_${new Date().toISOString().split('T')[0]}.xml`;
        downloadXMLFile(xmlContent, filename);
    });

    // Update the global search event listener
    globalSearch.addEventListener('input', () => {
        const searchTerm = globalSearch.value.trim();
        
        if (searchTerm) {
            searchClear.style.display = 'block';
            showSearchSuggestions(searchTerm);
            performSearch(searchTerm);
        } else {
            searchClear.style.display = 'none';
            hideSearchSuggestions();
            clearSearch();
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSearchSuggestions();
        }
    });

    // Keyboard navigation for suggestions
    globalSearch.addEventListener('keydown', (e) => {
        const suggestionsContainer = document.getElementById('search-suggestions');
        const suggestions = document.querySelectorAll('.search-suggestion-item');
        
        if (suggestionsContainer.style.display === 'none' || suggestions.length === 0) {
            return;
        }
        
        const activeSuggestion = document.querySelector('.search-suggestion-item.active');
        let nextSuggestion = null;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!activeSuggestion) {
                    nextSuggestion = suggestions[0];
                } else {
                    nextSuggestion = activeSuggestion.nextElementSibling || suggestions[0];
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (!activeSuggestion) {
                    nextSuggestion = suggestions[suggestions.length - 1];
                } else {
                    nextSuggestion = activeSuggestion.previousElementSibling || suggestions[suggestions.length - 1];
                }
                break;
                
            case 'Enter':
                e.preventDefault();
                if (activeSuggestion) {
                    activeSuggestion.click();
                }
                break;
                
            case 'Escape':
                hideSearchSuggestions();
                globalSearch.blur();
                break;
        }
        
        // Update active suggestion
        if (activeSuggestion) {
            activeSuggestion.classList.remove('active');
        }
        if (nextSuggestion) {
            nextSuggestion.classList.add('active');
        }
    });

    // Reorder profiles button
    document.getElementById('reorder-profiles-btn').addEventListener('click', () => {
        openReorderProfilesModal();
    });

    // Reorder environments button
    document.getElementById('reorder-environments-btn').addEventListener('click', () => {
        openReorderEnvironmentsModal();
    });

    // Close modals for reorder functions
    document.getElementById('close-reorder-profiles-modal').addEventListener('click', () => {
        document.getElementById('reorder-profiles-modal').style.display = 'none';
    });

    document.getElementById('close-reorder-environments-modal').addEventListener('click', () => {
        document.getElementById('reorder-environments-modal').style.display = 'none';
    });

    document.getElementById('close-reorder-tabs-modal').addEventListener('click', () => {
        document.getElementById('reorder-tabs-modal').style.display = 'none';
    });

    // Save reorder actions
    document.getElementById('save-reorder-profiles-btn').addEventListener('click', () => {
        saveReorderedProfiles();
        document.getElementById('reorder-profiles-modal').style.display = 'none';
    });

    document.getElementById('save-reorder-environments-btn').addEventListener('click', () => {
        saveReorderedEnvironments();
        document.getElementById('reorder-environments-modal').style.display = 'none';
    });

    document.getElementById('save-reorder-tabs-btn').addEventListener('click', () => {
        saveReorderedTabs();
        document.getElementById('reorder-tabs-modal').style.display = 'none';
    });    

    // Add Multi-Link Card button
    document.getElementById('add-multi-link-card-btn').addEventListener('click', () => {
        openMultiLinkCardModal();
    });

    // Save Multi-Link Card button
    document.getElementById('save-multi-link-card-btn').addEventListener('click', () => {
        saveMultiLinkCard();
    });

    // Close Multi-Link Card modal
    document.getElementById('close-multi-link-card-modal').addEventListener('click', () => {
        document.getElementById('multi-link-card-modal').style.display = 'none';
    });

    // Save Edit Multi-Link Card button
    document.getElementById('save-edit-multi-link-card-btn').addEventListener('click', () => {
        saveEditMultiLinkCard();
    });

    // Close Edit Multi-Link Card modal
    document.getElementById('close-edit-multi-link-card-modal').addEventListener('click', () => {
        document.getElementById('edit-multi-link-card-modal').style.display = 'none';
    });

    // Add to setupEventListeners function
    document.getElementById('close-color-modal').addEventListener('click', () => {
        document.getElementById('color-modal').style.display = 'none';
    });

    document.getElementById('save-color-btn').addEventListener('click', () => {
        if (profileForColor) {
            updateProfileColor(profileForColor, selectedColor);
            document.getElementById('color-modal').style.display = 'none';
        }
    });

    // Color selection event listeners - use event delegation
    document.getElementById('html5-color-picker').addEventListener('input', (e) => {
        selectedColor = e.target.value;
        // Update the preview
        document.getElementById('selected-color-hex').textContent = selectedColor;
        document.getElementById('color-preview-box').style.backgroundColor = selectedColor;
    });

    // Create Search Link button
    document.getElementById('create-search-link-btn').addEventListener('click', () => {
        openCreateSearchLinkModal();
    });

    // Save Search Link button
    document.getElementById('save-search-link-btn').addEventListener('click', () => {
        saveSearchLink();
    });

    // Close Create Search Link modal
    document.getElementById('close-create-search-link-modal').addEventListener('click', () => {
        document.getElementById('create-search-link-modal').style.display = 'none';
    });

    // Close Search Value modal
    document.getElementById('close-search-value-modal').addEventListener('click', () => {
        document.getElementById('search-value-modal').style.display = 'none';
    });

    // Open Search Link button
    document.getElementById('open-search-link-btn').addEventListener('click', () => {
        openSearchLink();
    });

    // Update search link preview when URL changes
    document.getElementById('search-link-url').addEventListener('input', updateSearchLinkPreview);


    document.getElementById('bulk-move-btn').addEventListener('click', moveSelectedLinks);
    document.getElementById('bulk-delete-btn').addEventListener('click', deleteSelectedLinks);
    document.getElementById('bulk-cancel-btn').addEventListener('click', toggleSelectionMode);

    // Modify the existing move link save handler to handle bulk operations
    document.getElementById('save-move-link-btn').addEventListener('click', () => {
        if (window.bulkLinksToMove) {
            // Bulk move operation
            if (selectedDestinationTab) {
                saveBulkMoveLinks(selectedDestinationTab);
                moveLinkModal.style.display = 'none';
            }
        } else {
            // Single move operation (existing code)
            if (linkToMove && selectedDestinationTab) {
                moveLink(linkToMove, selectedDestinationTab);
                moveLinkModal.style.display = 'none';
            }
        }
    });

    // Add keyboard shortcut for selection mode (optional)
    // document.addEventListener('keydown', (e) => {
    //     if ((e.ctrlKey || e.metaKey) && e.key === 'a' && currentTab) {
    //         e.preventDefault();
    //         if (!isSelectionMode) {
    //             toggleSelectionMode();
    //         }
            // Select all links
    //         const allCheckboxes = document.querySelectorAll('.link-checkbox');
    //         allCheckboxes.forEach(checkbox => {
    //             checkbox.checked = true;
    //             const linkId = checkbox.dataset.linkId;
    //             selectedLinks.add(linkId);
    //             checkbox.closest('.link-card').classList.add('selected');
    //         });
    //         updateBulkSelectionCount();
    //     }
    // });

    // Add this to your setupEventListeners function
    document.getElementById('add-link-btn').addEventListener('click', () => {
        if (!currentTab) {
            alert('Please select a tab first');
            return;
        }
        
        // Show the add link section
        addLinkSection.style.display = 'block';
        
        // Focus on the title input
        document.getElementById('link-title').focus();
    });

    // Trash bin button
    document.getElementById('trash-bin-btn').addEventListener('click', openTrashBinModal);
    
    // Close trash bin modal
    document.getElementById('close-trash-bin-modal').addEventListener('click', () => {
        document.getElementById('trash-bin-modal').style.display = 'none';
    });
    
    // Clear trash bin button
    document.getElementById('clear-trash-bin-btn').addEventListener('click', clearTrashBin);
    
    // Close modal when clicking outside
    document.getElementById('trash-bin-modal').addEventListener('click', (e) => {
        if (e.target.id === 'trash-bin-modal') {
            document.getElementById('trash-bin-modal').style.display = 'none';
        }
    });

    console.log('Event listeners setup successfully');
        return true;
        
    } catch (error) {
        console.error('Failed to setup event listeners:', error);
        return false;
    }


}