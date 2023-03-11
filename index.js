let isMobile = /Mobile/.test(navigator.userAgent);
let mousePaint = false;
let currentColor = "red";
let pixelCount = 3000;

let title = document.createElement("div");
title.id = "title";
title.innerText = "Pixel Art Maker";
document.body.append(title);

/* ===== GRID / CANVAS =====  */
let grid = document.createElement("div")
grid.id = "container";
grid.classList.add("container");
grid.addEventListener("mousedown", function () {
    mousePaint = true;
});
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
grid.addEventListener("mouseup", function () {
    mousePaint = false;
});
grid.addEventListener("touchend", function (event) {
    event.preventDefault();
    mousePaint = false;
});
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
                event.target.style.border = "3px solid black";
            })
        } else {
            event.target.style.border = "3px solid black";
            colorSelected = true;
        }
    }
});
palette.addEventListener("touchstart", function (event) {
    event.preventDefault();
    mousePaint = true;
    let touch = event.changedTouches[0];
    let touchX = touch.clientX;
    let touchY = touch.clientY;
    let element = document.elementFromPoint(touchX, touchY);
    if (element.classList.contains("color-choice-mobile")) {
        currentColor = element.id;
		if (colorSelected === true) {
            let colors = document.querySelectorAll(".color-choice-mobile");
            colors.forEach(function (color) {
                color.style.border = "none";
                event.target.style.border = "2px solid black";
            })
		} else {
            event.target.style.border = "2px solid black";
            colorSelected = true;
		}
    } else if (element.id === "clear") {
        clearGrid();
    } else if (element.id === "save") {
        savePixelsState();
    } else if (element.id === "load") {
        loadPixelsState();
    }
});
document.body.append(palette);

/* ===== COLOR CHOICES =====  */
let colorArr = ["red", "orange", "yellow", "green", "blue", "purple", "brown", "gray", "black", "white"];
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
    pixel.addEventListener("mousemove", function () {
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

/* ===== LARGE SPACER =====  */
let spacerLG = document.createElement("div");
spacerLG.classList.add("spacer");
spacerLG.style.width = "30px";
palette.appendChild(spacerLG);

/* ===== COLOR PICKER =====  */
let colorPicker = document.createElement("input");
colorPicker.type = "color";
colorPicker.id = "colorPicker";
colorPicker.classList.add("#colorPicker");
colorPicker.addEventListener("input", function (event) {
    currentColor = event.target.value;
});
colorPicker.addEventListener("mouseover", function () {
    colorPicker.style.cursor = "pointer";
});
colorPicker.addEventListener("touchstart", function (event) {
    event.preventDefault();
    event.stopPropagation();
    colorPicker.click();
});
// if (isMobile) {
//     colorPicker.addEventListener("touchstart", function (event) {
//         event.preventDefault();
//         event.stopPropagation();
//         let input = document.getElementById("colorPicker");
//         input.click();
//     });
// } else {
//     colorPicker.addEventListener("click", function (event) {
//         event.preventDefault();
//         event.stopPropagation();
//         let input = document.getElementById("colorPicker");
//         input.click();
//     });
// }
palette.append(colorPicker);

/* ===== SMALL SPACER =====  */
let spacerSM = document.createElement("div");
spacerSM.classList.add("spacer");
palette.appendChild(spacerSM);

/* ===== CLEAR BUTTON =====  */
let clear = document.createElement("div");
clear.id = "clear";
clear.classList.add("tool");
clear.innerText = "Clear";
clear.addEventListener("mouseover", function () {
    clear.style.cursor = "pointer";
});
clear.addEventListener("click", clearGrid);
palette.appendChild(clear);

function clearGrid() {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach(function (pixel) {
            pixel.style.backgroundColor = "white";
    })
}

/* ===== 2ND SMALL SPACER =====  */
let spacerSM2 = document.createElement("div");
spacerSM2.classList.add("spacer");
palette.appendChild(spacerSM2);

/* ===== SAVE BUTTON =====  */
let save = document.createElement("div");
save.id = "save";
save.classList.add("tool");
save.innerText = "Save"
save.addEventListener("mouseover", function () {
    save.style.cursor = "pointer";
});
save.addEventListener("click", savePixelsState);
palette.appendChild(save);

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

/* ===== 3RD SMALL SPACER =====  */
let spacerSM3 = document.createElement("div");
spacerSM3.classList.add("spacer");
palette.appendChild(spacerSM3);

/* ===== LOAD BUTTON =====  */
let load = document.createElement("div");
load.id = "load";
load.classList.add("tool");
load.innerText = "Load"
load.addEventListener("mouseover", function () {
    load.style.cursor = "pointer";
});
load.addEventListener("click", loadPixelsState);
palette.appendChild(load);

function loadPixelsState () {
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
    palette.style.height = "50px";
    let spacers = document.querySelectorAll(".spacer");
    spacers.forEach(function(spacer) {
        spacer.remove();
    });
    let tools = document.querySelectorAll(".color-choice");
    tools.forEach(function(tool) {
        tool.classList.add("color-choice-mobile");
    });
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