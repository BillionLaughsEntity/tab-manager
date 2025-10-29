// Rename an environment
function renameEnvironment(environment, newName) {
    environment.name = newName;
    saveWorkbooks();
    renderEnvironments();
}