function isProfileInCurrentWorkbook(profileId) {
    const currentWorkbook = getCurrentWorkbook();
    return currentWorkbook && currentWorkbook.profiles.some(p => p.id === profileId);
}