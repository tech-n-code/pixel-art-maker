let isMobile = /Mobile/.test(navigator.userAgent);
let mousePaint = false;
let currentColor = "red";
let pixelCount = 3000;
let colorSelected = false;

let title = document.createElement("div");
title.id = "title";
title.innerText = "Pixel Art Maker";
document.body.append(title);

/* ===== GRID / CANVAS =====  */
let grid = document.createElement("div");
grid.id = "container";
grid.classList.add("container");
if (isMobile) {
    grid.addEventListener("touchstart", (event) => {
            event.preventDefault();
            mousePaint = true;
            let touch = event.touches[0];
            let touchX = touch.clientX;
            let touchY = touch.clientY;
            let element = document.elementFromPoint(touchX, touchY);
            if (element.classList.contains("pixel")) {
                element.style.backgroundColor = currentColor;
            }
        });
    grid.addEventListener("touchend", (event) => {
        event.preventDefault();
        mousePaint = false;
    });
} else {
    grid.addEventListener("mousedown", () => {
        mousePaint = true;
    });
    grid.addEventListener("mouseup", () => {
        mousePaint = false;
    });
}
document.body.append(grid);

/* ===== PIXELS =====  */
for (let i = 0; i < pixelCount; i++) {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.id = i + 1;
    if (isMobile) {
        pixel.addEventListener("touchmove", (event) => {
            event.preventDefault();
            let touch = event.touches[0];
            let touchX = touch.clientX;
            let touchY = touch.clientY;
            let element = document.elementFromPoint(touchX, touchY);
            if (element.classList.contains("pixel")) {
                element.style.backgroundColor = currentColor;
            }
        });
    } else {
        pixel.addEventListener("mouseover", () => {
            if (mousePaint === true) {
                pixel.style.backgroundColor = currentColor;
            }
        });
        pixel.addEventListener("click", () => {
            pixel.style.backgroundColor = currentColor;
        });
    }
    grid.append(pixel);
}

/* ===== COLOR PALETTE =====  */
let palette = document.createElement("div");
palette.id = "palette";
palette.classList.add("palette");
let colors = document.querySelectorAll(".color-choice");
if (isMobile) {
    palette.addEventListener("touchstart", (event) => {
        event.preventDefault();
        let touch = event.changedTouches[0];
        let touchX = touch.clientX;
        let touchY = touch.clientY;
        let element = document.elementFromPoint(touchX, touchY);
        if (element.classList.contains("color-choice")) {
            currentColor = element.id;
            if (colorSelected === true) {
                let colors = document.querySelectorAll(".color-choice");
                colors.forEach((color) => {
                    color.style.border = "none";
                    if (currentColor === "black") {
                        event.target.style.border = "2px solid white";
                    } else {
                        event.target.style.border = "2px solid black";
                    }
                })
            } else {
                if (currentColor === "black") {
                    event.target.style.border = "2px solid white";
                } else {
                    event.target.style.border = "2px solid black";
                }
                colorSelected = true;
            }
        }
    });
} else {
    palette.addEventListener("click", (event) => {
        if (event.target.classList.contains("color-choice")) {
            currentColor = event.target.style.backgroundColor;
            if (colorSelected === true) {
                let colors = document.querySelectorAll(".color-choice");
                colors.forEach((color) => {
                    color.style.border = "none";
                    if (currentColor === "black") {
                        event.target.style.border = "3px solid white";
                    } else {
                        event.target.style.border = "3px solid black";
                    }
                })
            } else {
                if (currentColor === "black") {
                    event.target.style.border = "3px solid white";
                } else {
                    event.target.style.border = "3px solid black";
                }
                colorSelected = true;
            }
        }
    });
}
document.body.append(palette);

/* ===== COLOR CHOICES =====  */
let colorArr = ["red", "orange", "yellow", "green", "blue", "turquoise", "darkviolet", "brown", "gray", "black", "white"];
for (let i = 0; i < colorArr.length; i++) {
    let color = document.createElement("div");
    color.id = colorArr[i];
    color.classList.add("color-choice");
    color.style.backgroundColor = colorArr[i];
    color.addEventListener("mouseover", () => {
            color.style.cursor = "pointer";
        });
    palette.appendChild(color);
}

/* ===== TOOLS PALETTE =====  */
let paletteTools = document.createElement("div");
paletteTools.id = "palette-tools";
paletteTools.classList.add("palette-tools");
paletteTools.addEventListener("touchstart", (event) => {
        let touch = event.changedTouches[0];
        let touchX = touch.clientX;
        let touchY = touch.clientY;
        let element = document.elementFromPoint(touchX, touchY);
        if (element.id === "colorPicker") {
            let input = document.getElementById("colorPicker");
            input.click();
        } else if (element.id === "clear") {
            clearGrid();
        } else if (element.id === "save") {
            savePixelsState();
        } else if (element.id === "load") {
            loadPixelsState();
        }
    });
document.body.append(paletteTools);

/* ===== COLOR PICKER =====  */
let colorPicker = document.createElement("input");
colorPicker.type = "color";
colorPicker.id = "colorPicker";
colorPicker.classList.add("#colorPicker");
colorPicker.addEventListener("input", (event) => {
        currentColor = event.target.value;
    });
colorPicker.addEventListener("mouseover", () => {
        colorPicker.style.cursor = "pointer";
    });
paletteTools.append(colorPicker);

/* ===== CLEAR BUTTON =====  */
let clear = document.createElement("div");
clear.id = "clear";
clear.classList.add("tool");
clear.innerText = "Clear";
clear.addEventListener("mouseover", () => {
        clear.style.cursor = "pointer";
    });
clear.addEventListener("click", clearGrid);
paletteTools.appendChild(clear);

function clearGrid() {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = "white";
    });
}

/* ===== SAVE BUTTON =====  */
let save = document.createElement("div");
save.id = "save";
save.classList.add("tool");
save.innerText = "Save"
save.addEventListener("mouseover", () => {
        save.style.cursor = "pointer";
    });
save.addEventListener("click", savePixelsState);
paletteTools.appendChild(save);

function savePixelsState() {
    let pixelState = {};
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        let id = pixel.id;
        let color = pixel.style.backgroundColor;
        pixelState[id] = color;
    });
    let jsonData = JSON.stringify(pixelState);
    localStorage.setItem("pixel-state", jsonData);
}

/* ===== LOAD BUTTON =====  */
let load = document.createElement("div");
load.id = "load";
load.classList.add("tool");
load.innerText = "Load";
load.addEventListener("mouseover", () => {
        load.style.cursor = "pointer";
    });
load.addEventListener("click", loadPixelsState);
paletteTools.appendChild(load);

function loadPixelsState() {
    let jsonData = localStorage.getItem("pixel-state");
    if (jsonData) {
        let pixelState = JSON.parse(jsonData);
        let pixels = document.querySelectorAll(".pixel");
        pixels.forEach((pixel) => {
            let id = pixel.id;
            pixel.style.backgroundColor = pixelState[id];
        });
    }
}

let credits = document.createElement("div");
credits.innerText = "By Will Franceschini \nA Galvanize bootcamp project";
credits.id = "credits";
document.body.append(credits);

let gitHubDiv = document.createElement("div");
let gitHubLogo = document.createElement("img");
gitHubLogo.src = "./github-mark.png";
gitHubLogo.style.display = "block";
gitHubLogo.style.width = "2rem";
gitHubLogo.style.margin = "0.5rem auto";
gitHubDiv.appendChild(gitHubLogo);
document.body.append(gitHubDiv);

gitHubLogo.addEventListener("click", () => {
        window.open("https://github.com/tech-n-code", "_blank");
    });
gitHubLogo.addEventListener("mouseover", () => {
        gitHubLogo.style.cursor = "pointer";
    });

let linkedInDiv = document.createElement("div");
let linkedInLogo = document.createElement("img");
linkedInLogo.src = "https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=Linkedin&logoColor=white";
linkedInLogo.style.display = "block";
linkedInLogo.style.margin = "0.5rem auto";
linkedInDiv.appendChild(linkedInLogo);
document.body.append(linkedInDiv);

linkedInLogo.addEventListener("click", () => {
        window.open("https://www.linkedin.com/in/will-franceschini/", "_blank");
    });
linkedInLogo.addEventListener("mouseover", () => {
        linkedInLogo.style.cursor = "pointer";
    });

/* ===== MOBILE SCREEN SIZE REFORMAT =====  */
if (isMobile) {
    title.style.width = "370px";
    grid.classList.add("container-mobile");
    palette.style.width = "370px";
    paletteTools.style.width = "370px";
    let pixelsWide = Math.floor(grid.offsetWidth / 10);
    let pixelsHigh = Math.floor(grid.offsetHeight / 10);
    let totalPixels = pixelsWide * pixelsHigh;
    pixelCount = totalPixels;
    pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
        let id = pixel.id;
        if (id > totalPixels) {
            pixel.remove();
        }
    });
};