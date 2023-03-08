console.log("Linked!");

let mousePaint = false;
let currentColor = "red";

let title = document.createElement("div");
title.id = "title";
title.innerText = "Pixel Art Maker";
document.body.append(title);

/* ===== GRID / CANVAS =====  */
let grid = document.createElement("div")
grid.id = "container";
grid.addEventListener("mousedown", function () {
    mousePaint = true;
});
grid.addEventListener("mouseup", function () {
    mousePaint = false;
});
document.body.append(grid);

let colorSelected = false;

/* ===== PALETTE =====  */
let palette = document.createElement("div");
palette.id = "palette";
let colors = document.querySelectorAll(".color-choice");
palette.addEventListener("click", function (event) {
    if (event.target.classList.value === "color-choice") {
        currentColor = event.target.style.backgroundColor;
        if (colorSelected === true) {
            let colors = document.querySelectorAll('.color-choice');
            colors.forEach(function (color) {
                    color.style.border = "none";
            event.target.style.border = "2px solid black";
                })
        } else {
            event.target.style.border = "2px solid black";
            colorSelected = true;
        }
    }
})
document.body.append(palette);

/* ===== COLOR CHOICES =====  */
let colorArr = ["red", "orange", "yellow", "green", "blue", "purple", "brown", "gray", "black", "white"];
for (let i = 0; i < colorArr.length; i++) {
    let color = document.createElement("div");
    color.classList.add("color-choice");
    color.style.backgroundColor = colorArr[i];
    color.addEventListener("mouseover", function () {
        color.style.cursor = "pointer";
    });
    palette.appendChild(color);
}

/* ===== PIXELS =====  */
for (let i = 0; i < 3000; i++) {
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
colorPicker.classList.add("tool");
colorPicker.style.height = "25px"
colorPicker.addEventListener("input", function (event) {
    currentColor = event.target.value;
});
colorPicker.addEventListener("mouseover", function () {
    colorPicker.style.cursor = "pointer";
});
palette.append(colorPicker);

/* ===== SMALL SPACER =====  */
let spacerSM = document.createElement("div");
spacerSM.classList.add("spacer");
palette.appendChild(spacerSM);

/* ===== CLEAR BUTTON =====  */
let clear = document.createElement("div");
clear.id = "clear";
clear.classList.add("tool");
clear.innerText = "Clear"
clear.addEventListener("mouseover", function () {
    clear.style.cursor = "pointer";
});
clear.addEventListener("click", function () {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(function (pixel) {
            pixel.style.backgroundColor = "white";
    })
});
palette.appendChild(clear);

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
save.addEventListener("click", function () {
    let pixelState = {};
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(function (pixel) {
        let id = pixel.id;
        let color = pixel.style.backgroundColor;
        pixelState[id] = color;
    })
    let jsonData = JSON.stringify(pixelState);
    // let fileName = prompt("Enter File Name:");
    localStorage.setItem("pixel-state", jsonData);
    console.log(pixelState);
});
palette.appendChild(save);

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
load.addEventListener("click", function () {
    // let fileName = prompt("Select a file to load:", Object.keys(localStorage)[0]);
    // console.log(fileName);
    let jsonData = localStorage.getItem("pixel-state");
    if (jsonData) {
        let pixelState = JSON.parse(jsonData);
        let pixels = document.querySelectorAll(".pixel");
        pixels.forEach(function (pixel) {
            let id = pixel.id;
            pixel.style.backgroundColor = pixelState[id];
        })
    }
});
palette.appendChild(load);

//comment