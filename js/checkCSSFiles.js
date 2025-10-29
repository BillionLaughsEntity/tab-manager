// Add this to check if CSS files exist
function checkCSSFiles() {
    console.log('=== CHECKING CSS FILES ===');
    const cssFiles = [
        'css/Responsive_design.css',
        'css/search-suggestion.css',
        'css/Move_shevron_rotation.css',
        'css/multylink_styles.css',
        'css/Color_Palette_Styles.css',
        'css/Search_count_badge.css',
        'css/Environments.css',
        'css/Links.css',
        'css/Reorder_links.css',
        'css/Tabs.css',
        'css/Profiles.css',
        'css/Modal_styles.css',
        'css/Rename_modal.css',
        'css/Move_link_modal.css',
        'css/Move_link_environment.css',
        'css/Move_tab_modal.css',
        'css/Search_container_styles.css',
        'css/Profile_tab_color_styling.css',
        'css/Color_picker.css',
        'css/Bulk_action.css',
        'css/Cross_profile_movement.css',
        'css/Selection_checkboxes.css',
        'css/Workbooks.css',
        'css/Trash_bin.css',
        'css/Table_view.css',
        'css/List_view.css',
        'css/Header-actions.css',
        'css/Grid_view.css',
        'css/Search_highlights.css',
        'css/logo.css',
        'css/panel-title.css',
        'css/side-panel.css',
        'css/profiles-container.css',
        'css/counters.css',
        'css/s3-sync.css',
        'css/email.css'
    ];
    
    cssFiles.forEach(file => {
        const link = document.querySelector(`link[href="${file}"]`);
        console.log(file, '- Found in HTML:', !!link);
    });
}