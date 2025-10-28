// Edit a link
function editLink(link, newTitle, newUrl) {
    link.title = newTitle;
    link.url = newUrl;
    saveWorkbooks();
    renderLinks(currentTab);
}