let form_parent = document.querySelector("form");
let container = document.querySelector(".items_container");
let clear = document.querySelector("#ClearList");
let tick = Array.from(document.querySelectorAll("#checking_things"));


let a = 0;
let done = false;

function clearfun() {
    Array.from(container.children).forEach((ele) => {
        container.removeChild(ele);
    })
}


clear.addEventListener("click", () => {
    clearfun();
})

form_parent.addEventListener("submit", (efe) => {
    efe.preventDefault();

    a = form_parent.children[1].value;
    const div = document.createElement("div");
    div.classList.add("items");
    const inp = document.createElement("input");
    inp.setAttribute("type", "checkbox");
    const taskname = document.createElement("p");
    taskname.innerHTML = a;

    div.appendChild(inp);
    div.appendChild(taskname);
    container.appendChild(div);
})

tick.forEach( (element)=>{
    console.log(container.children)
    element.addEventListener("click" , ()=>{
        if (element.nextElementSibling.style.textDecoration == "line-through") {
            element.nextElementSibling.style.textDecoration = "none";
        }
        else{
            element.nextElementSibling.style.textDecoration = "line-through";
        }
    })
} )

