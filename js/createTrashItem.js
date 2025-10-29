// In trash-bin-functions.js - Update createTrashItem function
function createTrashItem(item, type) {
    console.log('=== CREATE TRASH ITEM DEBUG ===');
    console.log('Item:', item);
    console.log('Type:', type);
    
    if (!item || !type) {
        console.error('Invalid parameters for createTrashItem');
        return null;
    }
    
    let trashData = {};
    
    switch (type) {
        case 'environment':
            trashData = {
                id: item.id,
                name: item.name,
                tabs: item.tabs || []
            };
            break;
            
        case 'tab':
            trashData = {
                id: item.id,
                name: item.name,
                links: item.links || [],
                environmentId: item.environmentId || (item.environment ? item.environment.id : null)
            };
            break;
            
        case 'link':
            trashData = {
                id: item.id,
                title: item.title,
                url: item.url,
                type: item.type || 'regular',
                links: item.links || [] // for multi-link cards
            };
            break;
            
        default:
            console.error('Unknown trash item type:', type);
            return null;
    }
    
    const trashItem = {
        id: 'trash-' + Date.now(),
        type: type,
        data: trashData,
        deletedAt: new Date().toISOString()
    };
    
    console.log('Created trash item:', trashItem);
    return trashItem;
}