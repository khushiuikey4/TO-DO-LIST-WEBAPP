let colorIndx = 0;

// if colorIndx is 0 then the colors will be { darkSeaGreen, seaGreen };
// if colorIndx is 0 then the colors will be {palevioletred 0.6, aliceblue };
// if colorIndx is 0 then the colors will be { lightblue, navajowhite };
// if colorIndx is 0 then the colors will be { rgb(255, 248, 222), darkKhaki };


//add task logic 
//if anyone press the taskAdder button then a task will be added according with color according to the colorIndx;
let inp = document.querySelector(".taskField");
let addButton = document.querySelector(".taskAdder");
let taskList = document.querySelector(".tasklist");
let setLocalStorage = () => {
    localStorage.setItem("data", taskList.innerHTML);
}
let getLocalStorage = () => {
    let data = localStorage.getItem("data");
    if (data) taskList.innerHTML = data;
}
getLocalStorage();

//adding event listeners on the element just fetched from the local storage
let boxes = Array.from(taskList.children);
boxes.forEach((box, indx) => {
    let crossButton = box.children[2];
    let checkBoxContainer = box.children[0];
    let checkBox = checkBoxContainer.children[0];
    let checked = checkBox.getAttribute("checked") !== null;
    checkBox.checked = checked;
    crossButton.addEventListener("click", () => {
        box.remove();
        setLocalStorage();
    })
    let task = box.children[1];
    if (checked) {
        task.style.textDecoration = "line-through";
        task.style.opacity = "0.6";
    } else {
        task.style.textDecoration = "none";
        task.style.opacity = "1";
    }
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            task.style.textDecoration = "line-through";
            task.style.opacity = "0.6";
            checkBox.setAttribute("checked", "checked");
        } else {
            task.style.textDecoration = "none";
            task.style.opacity = "1";
            checkBox.removeAttribute("checked");
        }
        setLocalStorage();
    });
})


let addTask = () => {
    let text = inp.value;
    if (text == "") return;

    let box = document.createElement("div");
    box.classList.add("addedTask");


    let checkBoxContainer = document.createElement("div");
    checkBoxContainer.classList.add("checkBoxContainer");

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");


    let task = document.createElement("div");
    task.classList.add("taskLog");

    task.innerText = text;

    box.appendChild(checkBoxContainer);
    box.appendChild(task);
    checkBoxContainer.appendChild(checkBox);
    taskList.appendChild(box);
    if (colorIndx === 0) {
        box.style.backgroundColor = "darkseagreen";
    } else if (colorIndx === 1) {
        box.style.backgroundColor = "rgb(216, 112, 147,0.6)";
    } else if (colorIndx === 2) {
        box.style.backgroundColor = "lightblue";
    } else if (colorIndx === 3) {
        box.style.backgroundColor = "rgb(255, 248, 222)";
    }
    colorIndx = (colorIndx + 1) % 4;

    //new code for remove button
    box.style.position = "relative";
    let crossButton = document.createElement("button");
    crossButton.classList.add("remove");
    crossButton.innerText = "x";
    crossButton.style.position = "absolute";
    crossButton.style.left = "528px"
    crossButton.style.top = "0px";
    box.appendChild(crossButton);

    crossButton.addEventListener("click", () => {
        box.remove();
        setLocalStorage();

    })

    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            task.style.textDecoration = "line-through";
            task.style.opacity = "0.6";
            checkBox.setAttribute("checked", "checked");
        } else {
            task.style.textDecoration = "none";
            task.style.opacity = "1";
            checkBox.removeAttribute("checked");
        }
        setLocalStorage();
    });
    inp.value = "";
    setLocalStorage();
}


addButton.addEventListener("click", addTask);






