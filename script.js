const header = document.querySelector("header");
const main = document.querySelector("main");
const track = document.getElementById("image-track");
const workNav = document.querySelector(".workNav");
const loadNumber = document.querySelector(".loadNumber");
const loadSymbol = document.querySelector(".loadSymbol");
const load = document.querySelector(".load");

let count = 0;

// loader animatie afspelen of skippen als we al bezocht hebben //
if (loadNumber && loadSymbol && load) {
    if (sessionStorage.getItem("visited")) {
        header.classList.remove("loading");
        header.classList.add("header-min");
        if (main) main.classList.remove("work");
        console.log("Loading skipped (already visited)");
    } else {
        const intervalId = setInterval(() => {
            count++;
            loadNumber.textContent = `${count}`;

            if (count === 100) {
                clearInterval(intervalId);
                loadNumber.classList.add("textremove");
                loadSymbol.classList.add("textremove");

                setTimeout(() => {
                    loadNumber.classList.remove("textremove");
                    header.classList.remove("loading");
                    header.classList.add("header-min");
                    if (main) main.classList.remove("work");
                    sessionStorage.setItem("visited", "true");
                }, 800);

                console.log('Loading complete!');
            }
        }, 20);
    }
} else {
    // op andere pagina's meteen header-min tonen
    if (header) {
        header.classList.remove("loading");
        header.classList.add("header-min");
    }
}

// eventlistener voor work knop in nav // 
if (workNav && main) {
    workNav.addEventListener("click", (e) => {
        if (track) {
            e.preventDefault()

            // als de track verborgen is (project details open), ga terug naar gallery track met animatie
            if (track.classList.contains("hiddenClass")) {
                const activeProject = document.querySelector(".project:not(.hiddenClass)");
                if (activeProject) {
                    activeProject.classList.add("exiting");
                    setTimeout(() => {
                        document.querySelectorAll(".project").forEach(section => {
                            section.classList.add("hiddenClass");
                            section.classList.remove("exiting");
                        });
                        track.classList.remove("hiddenClass");
                        requestAnimationFrame(() => {
                            track.classList.remove("leaving");
                        });
                    }, 300);
                } else {
                    track.classList.remove("hiddenClass");
                    track.classList.remove("leaving");
                }
                return;
            }

            header.classList.remove("startup");
            header.classList.add("header-min");
            main.classList.remove("work");
        }
    })
}


//////////////////////// Work pagina setupshit //////////////////////

if (track) {
    // Initialize dataset values
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = "0";
    track.dataset.percentage = "0";

    window.onmousemove = e => {
        handleMovement(e.clientX);
    };

    window.ontouchmove = e => {
        handleMovement(e.touches[0].clientX);
    };

    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    };

    window.onmouseup = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
    };

    window.ontouchstart = e => {
        track.dataset.mouseDownAt = e.touches[0].clientX;
    };

    window.ontouchend = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
    };

    // trackpad en mousewheel scroll support //
    window.addEventListener("wheel", (e) => {
        if (track.classList.contains("hiddenClass")) return;

        // bereken nieuwe percentage op basis van scroll delta
        const scrollSpeed = 0.05;
        const delta = e.deltaY || e.deltaX;

        const currentPercentage = parseFloat(track.dataset.percentage) || 0;
        const nextPercentage = currentPercentage - delta * scrollSpeed;

        const minPercentage = -200; // Adjusted for 17 gallery cards
        const maxPercentage = 0; // Adjust this value as needed for the right boundary

        const clampedPercentage = Math.max(Math.min(nextPercentage, maxPercentage), minPercentage);

        track.dataset.percentage = clampedPercentage; // Update the percentage
        track.style.transform = `translate(${clampedPercentage}%, -50%)`;

        // Adjust the objectPosition of each image
        for (const image of track.getElementsByClassName("image")) {
            image.style.objectPosition = `${clampedPercentage + 100}% 50%`;
        }
    });

    const imageContainers = document.querySelectorAll(".image-container");

    function handleClick(event) {
        if (!track) return;

        const targetClass = event.currentTarget.classList[1];
        const sectionToShow = document.querySelector(`.${targetClass}-project`);

        // 1. Speel leaving animatie af op de horizontal image track
        track.classList.add("leaving");

        // 2. Na de leaving animatie, verberg track en toon het gekozen project
        setTimeout(() => {
            track.classList.add("hiddenClass");

            document.querySelectorAll(".project").forEach(section => {
                section.classList.add("hiddenClass");
                section.classList.remove("exiting");
            });

            if (sectionToShow) {
                sectionToShow.classList.remove("hiddenClass");
                sectionToShow.scrollTop = 0;
            }
        }, 250);

        console.log("Transitioning to project:", targetClass);
    }

    // Add event listeners for gallery cards
    imageContainers.forEach(container => {
        container.addEventListener("click", handleClick);
    });

    // Event listeners for "Other projects" cards at the bottom of case studies
    document.querySelectorAll(".other-card").forEach(card => {
        card.addEventListener("click", (e) => {
            const targetProjectKey = e.currentTarget.dataset.project;
            if (!targetProjectKey) return;

            const currentActive = document.querySelector(".project:not(.hiddenClass)");
            const sectionToShow = document.querySelector(`.${targetProjectKey}-project`);

            if (currentActive && sectionToShow && currentActive !== sectionToShow) {
                currentActive.classList.add("exiting");
                setTimeout(() => {
                    document.querySelectorAll(".project").forEach(sec => {
                        sec.classList.add("hiddenClass");
                        sec.classList.remove("exiting");
                    });
                    sectionToShow.classList.remove("hiddenClass");
                    sectionToShow.scrollTop = 0;
                }, 250);
            }
        });
    });
}

function handleMovement(clientX) {
    if (!track || track.dataset.mouseDownAt === "0") return;

    const mouseDelta = clientX - parseFloat(track.dataset.mouseDownAt);
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * 100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    const minPercentage = -200; // Adjusted for 17 gallery cards
    const maxPercentage = 0;

    const clampedPercentage = Math.max(Math.min(nextPercentage, maxPercentage), minPercentage);

    track.dataset.percentage = clampedPercentage;
    track.style.transform = `translate(${clampedPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${clampedPercentage + 100}% 50%`;
    }
}