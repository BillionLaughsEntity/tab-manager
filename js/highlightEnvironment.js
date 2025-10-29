function highlightEnvironment(environmentId) {
    const envElement = document.querySelector(`[data-environment-id="${environmentId}"]`);
    if (envElement) envElement.classList.add('search-result-environment');
}