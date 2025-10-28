function debugCurrentState() {
    console.log('=== Current State Debug ===');
    console.log('workbooks:', workbooks.length);
    console.log('currentWorkbookId:', currentWorkbookId);
    console.log('currentProfileId:', currentProfileId);
    console.log('currentEnvironment:', currentEnvironment);
    console.log('currentTab:', currentTab);
    
    const profile = getCurrentProfile();
    if (profile) {
        console.log('Current profile environments:', profile.environments?.length);
        if (currentEnvironment) {
            const env = profile.environments.find(e => e.id === currentEnvironment);
            console.log('Current environment tabs:', env?.tabs?.length);
        }
    }
    console.log('=== End Debug ===');
}