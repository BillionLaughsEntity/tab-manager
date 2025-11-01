function ensureEnvironmentsCollapsed() {
    workbooks.forEach(workbook => {
        workbook.profiles.forEach(profile => {
            if (profile.environments) {
                profile.environments.forEach(environment => {
                    if (environment.collapsed === undefined) {
                        environment.collapsed = true;
                    }
                });
            }
        });
    });
    saveWorkbooks();
}

