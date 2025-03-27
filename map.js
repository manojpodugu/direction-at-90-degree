const predefinedPaths = {
    "Entrance-Office": [
        { x: 926, y: 322 },  // Entrance
       // { x: 300, y: 180 },  // 🔴 Fake location (Hidden waypoint)
        { x: 733, y: 323 },  // 🔴 Fake location (Hidden waypoint)
        { x: 730, y: 377 }   // Office
    ],
   /* "Entrance-Classroom": [
        { x: 200, y: 150 },  // Entrance
        { x: 400, y: 200 },  // 🔴 Fake location (Hidden waypoint)
        { x: 600, y: 220 },  // 🔴 Fake location (Hidden waypoint)
        { x: 850, y: 250 }   // Classroom
    ],
    "Office-Canteen": [
        { x: 700, y: 300 },  // Office
        { x: 600, y: 350 },  // 🔴 Fake location (Hidden waypoint)
        { x: 500, y: 450 }   // Canteen
    ],
    "Classroom-Playground": [
        { x: 850, y: 250 },  // Classroom
        { x: 880, y: 350 },  // 🔴 Fake location (Hidden waypoint)
        { x: 900, y: 500 }   // Playground
    ]*/
};

// Extract query parameters
const urlParams = new URLSearchParams(window.location.search);
const source = urlParams.get("source");
const destination = urlParams.get("destination");

// Ensure canvas size matches image
const canvas = document.getElementById("mapCanvas");
const mapImage = document.getElementById("mapImage");

mapImage.onload = function() {
    canvas.width = mapImage.clientWidth;
    canvas.height = mapImage.clientHeight;
    drawRoute(source, destination);
};

function getPath(source, destination) {
    const key1 = `${source}-${destination}`;
    //let key2 = `${destination}-${source}`;
    return predefinedPaths[key1] /*|| predefinedPaths[key2] || [];*/
}

function drawRoute(source, destination) {
    const waypoints = getPath(source, destination);
    if (waypoints.length === 0) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([5, 5]);  // Dotted line
    ctx.beginPath();

    waypoints.forEach((point, index) => {
        const x = (point.x / 1152) * canvas.width;
        const y = (point.y / 648) * canvas.height;

        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();
}
window.addEventListener("resize", drawRoute(source, destination));
window.onload = drawRoute(source, destination);

function goBack() {
    window.location.href = "index.html";
}
