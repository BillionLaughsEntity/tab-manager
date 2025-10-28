// counters.js

function updateAllCounters() {
    updateWorkbooksCounter();
    updateProfilesCounter();
    updateTabsCounter();
    updateLinksCounter();
}

function updateWorkbooksCounter() {
    const count = workbooks.length;
    const counterElement = document.getElementById('workbooks-counter');
    if (counterElement) {
        counterElement.textContent = `${count} Workbook${count !== 1 ? 's' : ''}`;
    }
}

function updateProfilesCounter() {
    let totalProfiles = 0;
    workbooks.forEach(workbook => {
        totalProfiles += workbook.profiles.length;
    });
    const counterElement = document.getElementById('profiles-counter');
    if (counterElement) {
        counterElement.textContent = `${totalProfiles} Profile${totalProfiles !== 1 ? 's' : ''}`;
    }
}

function updateTabsCounter() {
    let totalTabs = 0;
    workbooks.forEach(workbook => {
        workbook.profiles.forEach(profile => {
            profile.environments.forEach(environment => {
                totalTabs += environment.tabs.length;
            });
        });
    });
    const counterElement = document.getElementById('tabs-counter');
    if (counterElement) {
        counterElement.textContent = `${totalTabs} Tab${totalTabs !== 1 ? 's' : ''}`;
    }
}

function updateLinksCounter() {
    let totalLinks = 0;
    workbooks.forEach(workbook => {
        workbook.profiles.forEach(profile => {
            profile.environments.forEach(environment => {
                environment.tabs.forEach(tab => {
                    totalLinks += tab.links.length;
                });
            });
        });
    });
    const counterElement = document.getElementById('links-counter');
    if (counterElement) {
        counterElement.textContent = `${totalLinks} Link${totalLinks !== 1 ? 's' : ''}`;
    }
}

// Call this whenever data changes
function refreshCounters() {
    updateAllCounters();
}