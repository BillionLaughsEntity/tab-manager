// Open color selection modal
function openColorModal(profile) {
    profileForColor = profile;
    selectedColor = profile.color;
    
    // Set the color picker to the current profile color
    const colorPicker = document.getElementById('html5-color-picker');
    colorPicker.value = profile.color;
    
    // Update the preview
    document.getElementById('selected-color-hex').textContent = profile.color;
    document.getElementById('color-preview-box').style.backgroundColor = profile.color;
    
    document.getElementById('color-modal').style.display = 'flex';
}