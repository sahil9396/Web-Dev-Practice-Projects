import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const app_setting = {
}

const app = initializeApp(app_setting);
const dataInDB = getDatabase(app);
// const List = ref(dataInDB , "Shoppinglist")
// const List = ref(dataInDB , "Books")
const List = ref(dataInDB, "first_time")
console.log(List);
onValue(List, function (snapshot) {
    if (snapshot.exists()) {
        let cone = Object.entries(snapshot.val());
        if (cone.length === 0) {
            alert("It is empty")
            return;
        }
        clear_content();
        cone.forEach(element => {
            add_new_con(element[0], element[1]);
        });

    } else {
        const div = document.createElement("li");
        div.className = "item";
        div.innerText = "No data is present";
        stored_data.appendChild(div);

    }
})

let fomr = document.querySelector(".give-info");
let stored_data = document.querySelector(".stored-data");
var val = 0;
fomr.addEventListener("submit", (event) => {
    event.preventDefault();
    val = document.querySelector(".Enter-value").value;
    if (val.trim() == "") {
        alert("Enter something")
    }
    else {
        // alert("You Enterd Something")
        push(List, val);
    }
    fomr.firstElementChild.value = "";
    fomr.firstElementChild.focus();
})

const add_new_con = (id, con) => {
    const div = document.createElement("li");
    div.className = "item";
    div.setAttribute("id", id);
    div.innerText = con;

    div.addEventListener("click", () => {
        const exact_location = ref(dataInDB, `first_time/${id}`)
        remove(exact_location);
    })
    stored_data.appendChild(div);
}

const clear_content = () => {
    Array.from(stored_data.children).forEach(ele => {
        stored_data.removeChild(ele);
    })
}


// this comment was for practice purpose
// import {initializeApp}  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import {getDatabase , ref , push}  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// const app_setting = {
// }
// const app = initializeApp(app_setting);
// const database = getDatabase(app);
// const add = ref(database , "first_time")
