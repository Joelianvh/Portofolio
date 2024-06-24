const track = document.getElementById("image-track");

// Initialize dataset values
track.dataset.mouseDownAt = "0";
track.dataset.prevPercentage = "0";
track.dataset.percentage = "0";

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = e.clientX - parseFloat(track.dataset.mouseDownAt);
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * 100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    // Clamp the nextPercentage to keep it between a specified min and max
    const minPercentage = -100; // Adjust this value as needed for the left boundary
    const maxPercentage =  0; // Adjust this value as needed for the right boundary

    const clampedPercentage = Math.max(Math.min(nextPercentage, maxPercentage), minPercentage);

    track.dataset.percentage = clampedPercentage; // Update the percentage
    track.style.transform = `translate(${clampedPercentage}%, -50%)`;

    for(const image of track.getElementByClassName("image")){
        image.style.objectPosition = `${clampedPercentage} 50%`
    }
};
