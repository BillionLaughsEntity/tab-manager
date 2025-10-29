// Helper function to get type abbreviation
function getTypeAbbreviation(type) {
    const abbreviations = {
        workbook: 'W',
        profile: 'P',
        environment: 'E',
        tab: 'T',
        link: 'L'
    };
    return abbreviations[type] || type.charAt(0).toUpperCase();
}