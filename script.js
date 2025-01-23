


const header = document.querySelector("header");
const loadNumber = document.querySelector(".loadNumber");
const loadSymbol = document.querySelector(".loadSymbol")
const load = document.querySelector(".load")

function Startupanimation(){
    console.log("loaded")
    header.classList.remove("loading")
    
    
    header.classList.add("startup")

}
/* addEventListener("DOMContentLoaded", Startupanimation()); */


let count = 0;
const intervalId = setInterval(() => {
  count++;
  loadNumber.textContent = `${count}`; 

  if (count === 100) {
    clearInterval(intervalId); 
    loadNumber.classList.add("textremove")
    loadSymbol.classList.add("textremove")
    // Delay before removing and adding classes
    
    setTimeout(() => {
        loadNumber.classList.remove("textremove")
      header.classList.remove("loading");
      header.classList.add("startup");
    }, 1000);

    console.log('Loading complete!'); 
  }
}, 20); 

// eventlisterner voor work pagina // 

/* document.querySelectorAll("li").forEach() kijken of ik foreach beter kan gebruiken dan wat hier nu onder staat */
const workNav = document.querySelector(".workNav")
const main = document.querySelector("main")

workNav.addEventListener("click", () => {
    header.classList.add("hidden")
    main.classList.remove("work")

})


//////////////////////// Work pagina setupshit //////////////////////

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
    const maxPercentage = 0; // Adjust this value as needed for the right boundary

    const clampedPercentage = Math.max(Math.min(nextPercentage, maxPercentage), minPercentage);

    track.dataset.percentage = clampedPercentage; // Update the percentage
    track.style.transform = `translate(${clampedPercentage}%, -50%)`;

    // Adjust the objectPosition of each image
    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${clampedPercentage + 100}% 50%`;
    }
};


const images = document.querySelectorAll(".image");

function handleClick(event) {
    // Hide all sections first
    document.querySelectorAll(".project").forEach(section => {
        section.classList.add("hiddenClass");
    });

    // Show the corresponding section
    const sectionToShow = document.querySelector(`.${event.currentTarget.classList[1]}-project`);
    if (sectionToShow) {
        sectionToShow.classList.remove("hiddenClass");
    }

    // Hide the image track
    track.classList.add("hiddenClass");

    console.log("worky");
}

// Add event listeners
images.forEach(image => {
    image.addEventListener("click", handleClick);
});
//////////////////////// Work pagina setupshit //////////////////////