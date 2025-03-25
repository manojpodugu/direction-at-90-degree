function navigate() {
    let source = document.getElementById("source").value;
    let destination = document.getElementById("destination").value;
    
    // Redirect to map page with query parameters
    window.location.href = `map.html?source=${source}&destination=${destination}`;
}
