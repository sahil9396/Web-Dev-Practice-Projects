class The_boss_list {
    constructor() {
        this._list = [];
    }

    getList() {
        return this._list;
    }
    AddItem(Itemobj) {
        (this._list).push(Itemobj);
    }
    clearList() {
        this._list = [];
    }
    RemoveItem(id) {
        const li = this._list;
        for (let i = 0; i < li.length; i++) {
            console.log(i);
            if (li[i]._id === id) {
                li.splice(i, 1);
                break;
            }
        }
    }
}

class ListItem {
    constructor() {
        this._id = null;
        this._item_txt = null;
        this._dust_display = "none";
    }

    getId() {
        return this._id;
    }
    getTxtId() {
        return this._item_txt;
    }
    getdisplay() {
        return this._dust_display;
    }
    setdisplay(dis) {
        this._dust_display = dis;
    }
    setId(id) {
        this._id = id;
    }
    setItemTxt(txt) {
        this._item_txt = txt;
    }
}

class newListItem extends ListItem{
    constructor(idf , txf , dif){
        super();
        this._id = idf;
        this._item_txt = txf;
        this._dust_display = dif;
    }
}

const ToDoList_here = new The_boss_list();
let form_parent = document.querySelector("form");
let container = document.querySelector(".items_container");
let clear = document.querySelector("#ClearList");
let delete_img = Array.from(document.querySelectorAll("i"));

const delete_all_content = (parents) => {
    Array.from(parents.children).forEach((ele, i) => {
        container.removeChild(ele);
    })
}

const update_the_local_storage = ToDoList_here => {
    localStorage.setItem("MY_Own_TodoApp", JSON.stringify(ToDoList_here));
}

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        dislay_previous_data();
        form_parent.addEventListener("submit", (efe) => {
            efe.preventDefault();

            const txt = form_parent.children[1].value.trim();
            if (txt === "") {
                alert("Enter task name");
                return;
            }
            update_the_list_and_display(txt);
            form_parent.children[1].value = "";
            form_parent.children[1].focus();
        })
        clear.addEventListener("click", () => {
            delete_all_content(container);
            ToDoList_here.clearList();
            update_the_local_storage(ToDoList_here);
        })
        
    }
})

const update_the_list_and_display = taskname => {

    // here, for Id, I am using the same logic but I am going to write here
    let itemId = 1;
    let length_of_here = ToDoList_here.getList().length;
    if (length_of_here !== 0) {

        itemId = (ToDoList_here.getList())[length_of_here - 1]._id + 1;
    }

    const New_list_item = new ListItem();
    New_list_item.setId(itemId);
    New_list_item.setItemTxt(taskname);

    // A new Updated Task with previous Task, So we need to remove all the task from the container parent, so we can add the new upadated child[new entry]
    ToDoList_here.AddItem(New_list_item);
    update_the_local_storage(ToDoList_here);
    
    // All Childern removal work is done.
    if ((container.childElementCount)) {
        delete_all_content(container);
    }
    
    
    show_display(ToDoList_here);
}

const show_display = (ListTOshow) => {

    // the new updated task list is now appended in the container.
    (ToDoList_here.getList()).forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("items");
        const inp = document.createElement("input");
        inp.setAttribute("type", "checkbox");
        inp.setAttribute("id", element._id);
        inp.setAttribute("tabIndex", "0");
        const taskname = document.createElement("p");
        taskname.innerHTML = element._item_txt;
        const delete_img = document.createElement("i");
        delete_img.setAttribute("class", "ri-delete-bin-line");
        if(element.getdisplay() === "block"){
            delete_img.style.display = "block";
            taskname.style.textDecoration = "line-through";
            taskname.style.color = "grey";
            taskname.style.opacity = "60%";
            inp.setAttribute("checked" , "true");
        }
        else{
            delete_img.style.display = "none";
        }

        // We are kindof attaching event of listener to the input;
        Check_box_event(inp , element);
        dustbin_fun(delete_img, element._id);


        div.appendChild(inp);
        div.appendChild(taskname);
        div.appendChild(delete_img);
        container.appendChild(div);
    });

}

const Check_box_event = (element , ids) => {
    element.addEventListener("click", () => {
        const nxtSib = element.nextElementSibling;
        const dustbin = nxtSib.nextElementSibling;
        if (nxtSib.style.textDecoration === "line-through") {
            nxtSib.style.textDecoration = "none";
            nxtSib.style.color = "black";
            nxtSib.style.opacity = "100%";
            dustbin.style.display = "none";
            ids._dust_display = "none";
        }
        else {
            element.nextElementSibling.style.textDecoration = "line-through";
            nxtSib.style.color = "grey";
            nxtSib.style.opacity = "60%";
            ids._dust_display = "block";
            dustbin.style.display = "block";
        }

        update_the_local_storage(ToDoList_here);
        
    })

}

const dustbin_fun = (element, id) => {
    element.addEventListener("click", () => {
        ToDoList_here.RemoveItem(id);
        update_the_local_storage(ToDoList_here);
        delete_all_content(container);
        show_display(ToDoList_here);
    })
}

const dislay_previous_data = ()=>{
    const prev_data = localStorage.getItem("MY_Own_TodoApp");
    if(typeof(prev_data) !== "string") return;
    const lists = JSON.parse(prev_data);
    lists._list.forEach( (ele)=>{
        ToDoList_here.AddItem(new newListItem(ele._id , ele._item_txt , ele._dust_display));
    } )
    show_display(lists);
}