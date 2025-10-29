function findDuplicateElements() {
    console.log('=== Finding Duplicate Elements ===');
    const allElements = document.querySelectorAll('[id]');
    const idCounts = {};
    
    allElements.forEach(el => {
        idCounts[el.id] = (idCounts[el.id] || 0) + 1;
    });
    
    const duplicates = Object.entries(idCounts).filter(([id, count]) => count > 1);
    
    duplicates.forEach(([id, count]) => {
        console.log(`❌ DUPLICATE: "${id}" appears ${count} times`);
        // Show where they are
        const elements = document.querySelectorAll(`#${id}`);
        elements.forEach((el, index) => {
            console.log(`  ${index + 1}.`, el.outerHTML.substring(0, 100) + '...');
        });
    });
    
    if (duplicates.length === 0) {
        console.log('✅ No duplicate elements found');
    }
    
    return duplicates;
}
