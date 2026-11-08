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
            }
        }, 20);
    }
} else {
    if (header) {
        header.classList.remove("loading");
        header.classList.add("header-min");
    }
}

//////////////////////// Hamburger Menu & Project Overlay //////////////////////

function initHamburgerMenu() {
    if (!header) return;

    // Create Hamburger Button if not present
    if (!document.getElementById("hamburger-btn")) {
        const btn = document.createElement("button");
        btn.id = "hamburger-btn";
        btn.className = "hamburger-btn";
        btn.setAttribute("aria-label", "Toggle Projects Menu");
        btn.innerHTML = `<span class="bar"></span><span class="bar"></span><span class="bar"></span>`;
        header.appendChild(btn);
    }

    // Determine path prefix based on location
    const path = window.location.pathname;
    let prefix = "projects/";
    if (path.includes("/projects/")) {
        prefix = "";
    } else if (path.includes("/about/")) {
        prefix = "../projects/";
    }

    // Create Overlay Menu if not present
    if (!document.getElementById("project-menu-overlay")) {
        const overlay = document.createElement("div");
        overlay.id = "project-menu-overlay";
        overlay.className = "project-menu-overlay";
        overlay.innerHTML = `
            <div class="menu-container">
                <div class="menu-header">
                    <h2>All projects</h2>
                    <button class="close-menu-btn" id="close-menu-btn" aria-label="Close Menu">&times;</button>
                </div>
                <div class="menu-sections">
                    <div class="menu-group">
                        <h3>Featured</h3>
                        <ul>
                            <li><a href="${prefix}dome-project.html">Dome Project</a></li>
                            <li><a href="${prefix}akob-heart-project.html">Heartfall | AKOB x HVA</a></li>
                            <li><a href="${prefix}8-survivors-game.html">8 Survivors Game</a></li>
                            <li><a href="${prefix}immersive-escaperoom.html">Immersive Escaperoom</a></li>
                        </ul>
                    </div>
                    <div class="menu-group">
                        <h3>Immersive &amp; game design</h3>
                        <ul>
                            <li><a href="${prefix}projection-mapping.html">Projection Mapping</a></li>
                            <li><a href="${prefix}woodworking.html">Woodworking</a></li>
                            <li><a href="${prefix}ableton-sound-control.html">Ableton Sound Control</a></li>
                            <li><a href="${prefix}interactive-sound-and-pose.html">Interactive Sound & Pose</a></li>
                            <li><a href="${prefix}immersivelab-experience.html">Immersivelab Experience</a></li>
                            <li><a href="${prefix}last-gnome-standing.html">Last Gnome Standing</a></li>
                            <li><a href="${prefix}bootcamp-game.html">RocketJump</a></li>
                        </ul>
                    </div>
                    <div class="menu-group">
                        <h3>Earlier projects</h3>
                        <ul>
                            <li><a href="${prefix}ticking-time-trails.html">Ticking Time Trials</a></li>
                            <li><a href="${prefix}devious-dungeon-dabloons.html">Devious Dungeon Dabloons</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const btn = document.getElementById("hamburger-btn");
    const overlay = document.getElementById("project-menu-overlay");
    const closeBtn = document.getElementById("close-menu-btn");

    function toggleMenu() {
        btn.classList.toggle("active");
        overlay.classList.toggle("open");
    }

    if (btn) btn.onclick = toggleMenu;
    if (closeBtn) closeBtn.onclick = toggleMenu;

    overlay.onclick = (e) => {
        if (e.target === overlay) toggleMenu();
    };

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("open")) {
            toggleMenu();
        }
    });
}

initHamburgerMenu();

//////////////////////// Work Grid (vertical scroll) //////////////////////

if (track) {
    Array.from(track.children).forEach(container => {
        container.addEventListener("click", () => {
            const targetUrl = container.dataset.url;
            if (!targetUrl) return;
            track.classList.add("leaving");
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 250);
        });
    });
}

// Restore the grid when coming back via the browser's back button (bfcache)
window.addEventListener("pageshow", (e) => {
    if (e.persisted && track) track.classList.remove("leaving");
});

// "Other projects" cards at the bottom of case studies
document.querySelectorAll(".other-card").forEach(card => {
    card.addEventListener("click", (e) => {
        const targetUrl = e.currentTarget.dataset.url;
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });
});