function findProfileById(profileId) {
    for (let workbook of workbooks) {
        for (let profile of workbook.profiles) {
            if (profile.id === profileId) {
                return profile;
            }
        }
    }
    return null;
}