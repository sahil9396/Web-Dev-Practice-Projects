class TodoList {
    constructor() {
        this._list = []
    }

    getList() {
        return this._list;
    }

    clearList() {
        this._list = [];
    }

    AddItem(itemobj) {
        this._list.push(itemobj);
    }

    RemoveItem(id) {
        let lsi = this._list;
        for (let i = 0; i < lsi.length; i++) {
            if (lsi[i]._id == id) {
                lsi.splice(i, 1);
                break;
            }
        }
    }
}

class ListItem {
    constructor() {
        this._id = null;
        this._item = null;
    }

    getItem() {
        return this._item;
    }
    getId() {
        return this._id;
    }

    setId(id) {
        this._id = id;
    }
    setItem(item) {
        this._item = item;
    }
}

let container = document.querySelector(".items_container");
let clear = document.querySelector("#ClearList");


const TOdolist = new TodoList();

// This is to check the state of the files loading in the browser
document.addEventListener("readystatechange", event => {
    // console.log(event.target.readyState , "hi");
    if (event.target.readyState == "complete") {
        initApp();
    }
})

const update_persistent_data = (listArray)=>{
    localStorage.setItem("TO_do_storage" , JSON.stringify(listArray))
}

const loadListObject = () =>{
    const list_from_local = localStorage.getItem("TO_do_storage");
    if(typeof(list_from_local) !== "string") return;
    const parsedItem = JSON.parse(list_from_local);
    parsedItem.forEach( (elee)=>{
        const newItem = createNewItem(elee._id ,elee._item);
        TOdolist.AddItem(newItem);
    } )

}

const initApp = () => {
    // Add event Listener
    let form_parent = document.querySelector("form");

    form_parent.addEventListener("submit", (efe) => {
        efe.preventDefault();
        processSubmission();
    })

    clear.addEventListener("click" , ()=>{
        TOdolist.clearList();

        // update persistent data
        update_persistent_data(TOdolist.getList());
        
        refreshThePage();
    })

    // procedural = when the site is loaded, the data should get loaded.
    // loading the data;
    loadListObject();
    refreshThePage();

}

// This function make sure the data is loaded
const refreshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItemEntry();
}

const clearListDisplay = () => {
    Array.from(container.children).forEach((ele, i) => {
        container.removeChild(ele);
    })
}

const renderList = () => {
    const list = TOdolist.getList();
    list.forEach(element => {
        buildListItem(element);
    });
}

const buildListItem = ele => {
    const div = document.createElement("div");
    div.classList.add("items");
    const inp = document.createElement("input");
    inp.setAttribute("type", "checkbox");
    inp.setAttribute("id", ele.getId());
    inp.setAttribute("tabIndex", "0");
    addClickListnerToCheck(inp);
    const label = document.createElement("label");
    inp.setAttribute("for", ele.getId());
    const taskname = document.createElement("p");
    taskname.innerHTML = ele._item;

    div.appendChild(inp);
    div.appendChild(label);
    div.appendChild(taskname);
    container.appendChild(div);
}

const addClickListnerToCheck = checkbox => {
    checkbox.addEventListener("click", (element) => {
        TOdolist.RemoveItem(checkbox.id);

        // Remove from persistent data;
        update_persistent_data(TOdolist.getList());

        setTimeout(() => {
            refreshThePage();
        }, 2000);
    })
}

const clearItemEntryField = () => {
    document.getElementById("Tasktaking").value = "";
}

const setFocusOnItemEntry = () => {
    document.getElementById("Tasktaking").focus();
}

const processSubmission  = ()=>{
    const newEntryText = document.getElementById("Tasktaking").value.trim();
    if (newEntryText.length === 0){
        return
    }
    const nxtItemId = calcNextItemId();
    const TodoItem= createNewItem(nxtItemId , newEntryText);
    TOdolist.AddItem(TodoItem);

    // update the persistent data;
    update_persistent_data(TOdolist.getList());


    refreshThePage();


}
const calcNextItemId = ()=>{
    let nxtItemId = 1;
    const list = TOdolist.getList();
    if (list.length > 0){
        nxtItemId = list[list.length-1].getId() +1;
    }
    return nxtItemId;
}
const createNewItem = (itemid, itemtxt)=>{
    const todo = new ListItem();
    todo.setId(itemid);
    todo.setItem(itemtxt);
    return todo;
}