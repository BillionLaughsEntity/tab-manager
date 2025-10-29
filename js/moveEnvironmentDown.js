// Move environment down in the list
function moveEnvironmentDown(environmentId) {
    const currentProfile = getCurrentProfile();
    const index = currentProfile.environments.findIndex(env => env.id === environmentId);
    if (index < currentProfile.environments.length - 1) {
        // Swap with the next environment
        [currentProfile.environments[index], currentProfile.environments[index + 1]] = [currentProfile.environments[index + 1], currentProfile.environments[index]];
        saveWorkbooks();
        renderEnvironments();
    }
}