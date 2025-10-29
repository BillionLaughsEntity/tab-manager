function highlightProfileTab(profileId) {
    const profileTab = document.querySelector(`.profile-tab[data-profile-id="${profileId}"]`);
    if (profileTab) profileTab.classList.add('search-result-environment');
}