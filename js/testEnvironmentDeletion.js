// Temporary test function - run this in browser console
function testEnvironmentDeletion() {
    console.log('=== ENVIRONMENT DELETION TEST ===');
    const currentProfile = getCurrentProfile();
    console.log('Current profile:', currentProfile);
    console.log('Environments:', currentProfile.environments);
    
    if (currentProfile.environments.length > 0) {
        const firstEnv = currentProfile.environments[0];
        console.log('Testing deletion of:', firstEnv.name);
        deleteEnvironment(firstEnv);
    } else {
        console.log('No environments to test deletion');
    }
}