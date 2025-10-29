function checkCSSLoading() {
    console.log('=== CHECKING CSS LOADING ===');
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    console.log('Total CSS files:', links.length);
    
    links.forEach(link => {
        console.log('CSS file:', link.href, '- Loaded:', link.sheet ? 'Yes' : 'No');
    });
}