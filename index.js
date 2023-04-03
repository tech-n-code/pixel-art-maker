let isMobile = /Mobile/.test(navigator.userAgent);
let mousePaint = false;
let currentColor = "red";
let pixelCount = 3000;

let title = document.createElement("div");
title.id = "title";
title.innerText = "Pixel Art Maker";
document.body.append(title);

/* ===== GRID / CANVAS =====  */
let grid = document.createElement("div");
grid.id = "container";
grid.classList.add("container");
if (isMobile) {
    grid.addEventListener("touchstart", function (event) {
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
    grid.addEventListener("touchend", function (event) {
        event.preventDefault();
        mousePaint = false;
    });
} else {
    grid.addEventListener("mousedown", function () {
        mousePaint = true;
    });
    grid.addEventListener("mouseup", function () {
        mousePaint = false;
    });
}
document.body.append(grid);

let colorSelected = false;

/* ===== PALETTE =====  */
let palette = document.createElement("div");
palette.id = "palette";
palette.classList.add("palette");
let colors = document.querySelectorAll(".color-choice");
palette.addEventListener("click", function (event) {
    if (event.target.classList.contains("color-choice")) {
        currentColor = event.target.style.backgroundColor;
        if (colorSelected === true) {
            let colors = document.querySelectorAll(".color-choice");
            colors.forEach(function (color) {
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
palette.addEventListener("touchstart", function (event) {
    event.preventDefault();
    let touch = event.changedTouches[0];
    let touchX = touch.clientX;
    let touchY = touch.clientY;
    let element = document.elementFromPoint(touchX, touchY);
    if (element.classList.contains("color-choice")) {
        currentColor = element.id;
		if (colorSelected === true) {
            let colors = document.querySelectorAll(".color-choice");
            colors.forEach(function (color) {
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
document.body.append(palette);

let paletteBottom = document.createElement("div");
paletteBottom.id = "palette-bottom";
paletteBottom.classList.add("palette-bottom");
paletteBottom.addEventListener("touchstart", function (event) {
    event.preventDefault();
    let touch = event.changedTouches[0];
    let touchX = touch.clientX;
    let touchY = touch.clientY;
    let element = document.elementFromPoint(touchX, touchY);
    if (element.id === "colorPicker") {
        let input = document.getElementById("colorPicker");
        input.dispatchEvent(new MouseEvent("click"));
    } else if (element.id === "clear") {
        clearGrid();
    } else if (element.id === "save") {
        savePixelsState();
    } else if (element.id === "load") {
        loadPixelsState();
    }
});
document.body.append(paletteBottom);

/* ===== COLOR CHOICES =====  */
let colorArr = ["red", "orange", "yellow", "green", "blue", "turquoise", "darkviolet", "brown", "gray", "black", "white"];
for (let i = 0; i < colorArr.length; i++) {
    let color = document.createElement("div");
    color.id = colorArr[i];
    color.classList.add("color-choice");
    color.style.backgroundColor = colorArr[i];
    color.addEventListener("mouseover", function () {
        color.style.cursor = "pointer";
    });
    palette.appendChild(color);
}

/* ===== PIXELS =====  */
for (let i = 0; i < pixelCount; i++) {
    let pixel = document.createElement("div")
    pixel.classList.add("pixel");
    pixel.id = i + 1;
    pixel.addEventListener("mouseover", function () {
        if (mousePaint === true) {
            pixel.style.backgroundColor = currentColor;
        }
    });
    pixel.addEventListener("click", function () {
        pixel.style.backgroundColor = currentColor;
    });
    pixel.addEventListener("touchmove", function (event) {
        event.preventDefault();
        let touch = event.touches[0];
        let touchX = touch.clientX;
        let touchY = touch.clientY;
        let element = document.elementFromPoint(touchX, touchY);
        if (element.classList.contains("pixel")) {
            element.style.backgroundColor = currentColor;
        }
    });
    grid.append(pixel);
}

/* ===== COLOR PICKER =====  */
let colorPicker = document.createElement("input");
colorPicker.type = "color";
colorPicker.id = "colorPicker";
colorPicker.classList.add("#colorPicker");
colorPicker.addEventListener("click", function() {
    this.value = "#000000";
    colorPicker.click();
});
colorPicker.addEventListener("input", function(event) {
    currentColor = event.target.value;
});
colorPicker.addEventListener("mouseover", function () {
    colorPicker.style.cursor = "pointer";
});
paletteBottom.append(colorPicker);

/* ===== CLEAR BUTTON =====  */
let clear = document.createElement("div");
clear.id = "clear";
clear.classList.add("tool");
clear.innerText = "Clear";
clear.addEventListener("mouseover", function () {
    clear.style.cursor = "pointer";
});
clear.addEventListener("click", clearGrid);
paletteBottom.appendChild(clear);

function clearGrid() {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach(function (pixel) {
            pixel.style.backgroundColor = "white";
    })
}

/* ===== SAVE BUTTON =====  */
let save = document.createElement("div");
save.id = "save";
save.classList.add("tool");
save.innerText = "Save"
save.addEventListener("mouseover", function () {
    save.style.cursor = "pointer";
});
save.addEventListener("click", savePixelsState);
paletteBottom.appendChild(save);

function savePixelsState() {
    let pixelState = {};
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach(function (pixel) {
        let id = pixel.id;
        let color = pixel.style.backgroundColor;
        pixelState[id] = color;
    })
    let jsonData = JSON.stringify(pixelState);
    localStorage.setItem("pixel-state", jsonData);
}

/* ===== LOAD BUTTON =====  */
let load = document.createElement("div");
load.id = "load";
load.classList.add("tool");
load.innerText = "Load"
load.addEventListener("mouseover", function () {
    load.style.cursor = "pointer";
});
load.addEventListener("click", loadPixelsState);
paletteBottom.appendChild(load);

function loadPixelsState() {
    let jsonData = localStorage.getItem("pixel-state");
    if (jsonData) {
        let pixelState = JSON.parse(jsonData);
        let pixels = document.querySelectorAll(".pixel");
        pixels.forEach(function (pixel) {
            let id = pixel.id;
            pixel.style.backgroundColor = pixelState[id];
        })
    }
}

let credits = document.createElement("div");
credits.innerText = "By Will Franceschini \nA Galvanize bootcamp project";
credits.id = "credits";
document.body.append(credits);

/* ===== MOBILE SCREEN SIZE REFORMAT =====  */
if (isMobile) {
    title.style.width = "370px";
    grid.classList.add("container-mobile");
    palette.style.width = "370px";
    paletteBottom.style.width = "370px";
    let pixelsWide = Math.floor(grid.offsetWidth / 10);
    let pixelsHigh = Math.floor(grid.offsetHeight / 10);
    let totalPixels = pixelsWide * pixelsHigh;
    pixelCount = totalPixels;
    pixels = document.querySelectorAll(".pixel");
    pixels.forEach(function (pixel) {
        let id = pixel.id;
        if (id > totalPixels) {
            pixel.remove();
        }
    });
};