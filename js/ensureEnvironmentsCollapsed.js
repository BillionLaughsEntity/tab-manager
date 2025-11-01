// Ensure all environments start collapsed by default
function ensureEnvironmentsCollapsed() {
    if (!workbooks || workbooks.length === 0) return;
    
    console.log('Ensuring environments start collapsed...');
    
    let changesMade = false;
    
    workbooks.forEach(workbook => {
        if (workbook.profiles) {
            workbook.profiles.forEach(profile => {
                if (profile.environments) {
                    profile.environments.forEach(environment => {
                        // Set collapsed to true if not already defined
                        if (environment.collapsed === undefined) {
                            environment.collapsed = true;
                            changesMade = true;
                            console.log(`Set environment "${environment.name}" to collapsed`);
                        }
                    });
                }
            });
        }
    });
    
    // Save the state if any changes were made
    if (changesMade) {
        saveWorkbooks();
    }
}