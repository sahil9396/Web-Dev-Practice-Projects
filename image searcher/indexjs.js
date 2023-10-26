const api_key = "pCWsv3rMOnW52LwGd85gwUamMpIlh2mNum7E7o2Xzo0";

const form_tag = document.querySelector("form");
const containter = document.querySelector(".container");
const showpeace = (document.getElementsByClassName("showpeace"));
const second_b = document.querySelector(".more");
let a = 0;
let page = 1;
let content = "";


function give_content(page_number) {
    a = form_tag.firstElementChild.value;
    // a = "cat";
    let api = `https://api.unsplash.com/search/photos?page=${page_number}&query=${a}&client_id=${api_key}`;
    try {
        fetch(api).then(data => data.json()).catch((eror) => {
            throw new Error("Some shitty problem is there")
        }).then((datas) => {

            for (let tx of datas.results) {
                const div = document.createElement("div");
                div.classList.add("showpeace");
                const images = document.createElement("img");
                images.setAttribute("src", tx.urls.small);
                images.setAttribute("alt", tx.alt_description);
                const a_link = document.createElement("a");
                a_link.setAttribute("href", tx.links.html);
                a_link.innerHTML = tx.alt_description;

                div.appendChild(images);
                div.appendChild(a_link);
                containter.appendChild(div);
            }
            if (a !== "") {
                second_b.parentElement.style.display = "block";
            }
            else{
                second_b.parentElement.style.display = "none";
            }
        })

    } catch (error) {
        alert(error);
    }
}


form_tag.addEventListener("submit", (ev) => {
    ev.preventDefault();
    // console.log(Array.from(showpeace));
    Array.from(showpeace).forEach( (ele, i )=>{
        // console.log(ele);
        // console.log(containter.children[i]);
        containter.removeChild(ele);
    } )
    // for 
    
    give_content(page);
})

second_b.addEventListener("click", () => {
    page += 1;
    give_content(page);

})

// for (let tx of cont){

//     content += `<div class="showpeace">
//             <img src="${tx.urls.full}" alt=">

//             <a  href="${tx.links.html}">${tx.alt_description}</a>
//         </div>`
// }


// content += `<div class="anothermethod">
//         <img src="${cont[0].urls.small}" alt=">cont[0]
//         <a  href="${cont[0].links.html}">${cont[0].alt_description}</a>
//     </div>\n`

// containter.innerHTML = content;