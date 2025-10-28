// Move environment up in the list
function moveEnvironmentUp(environmentId) {
    const currentProfile = getCurrentProfile();
    const index = currentProfile.environments.findIndex(env => env.id === environmentId);
    if (index > 0) {
        // Swap with the previous environment
        [currentProfile.environments[index - 1], currentProfile.environments[index]] = [currentProfile.environments[index], currentProfile.environments[index - 1]];
        saveWorkbooks();
        renderEnvironments();
    }
}