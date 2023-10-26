
// const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3f34beb66fmsh24f5cf0e51aa28fp10c400jsn9c65b459f962',
// 		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
// 	}
// };

// fetch(url, options).then( (data)=>data.json() )
// .catch( (erorr)=>{
//     throw new Error("This is shit" , erorr);
// } ).then( (data)=>{
//     console.log(data);
//     localStorage.setItem("songs" , JSON.stringify(data));
// } ).catch( (erorr)=>{
//     console.log("This is shit" , erorr);
// } )


// remember that in local storage, the data is still stored
function show() {
    const lis = localStorage.getItem("songs");
    const li = JSON.parse(lis);
    return li.albums.items
}

const dta = show();
console.log(dta);

let container = document.querySelector(".songlist-down");
let pau = Array.from(document.getElementsByClassName("ri-pause-circle-fill"));
let pla = Array.from(document.getElementsByClassName("ri-play-circle-fill"));
let change = document.querySelector(".changer");
let main_button = document.querySelector(".play-pause-box");
// pau.forEach(ele => {
//     ele.addEventListener("click", () => {
//         ele.className = "ri-play-circle-fill";
//     })

// })

const changing_play_pause = (tag)=>{
    tag.addEventListener("click", (event)=>{
    console.log(event.target.className);
    if (event.target.className == "ri-pause-circle-fill"){
        event.target.className = "ri-play-circle-fill";
    }
    else{
        event.target.className = "ri-pause-circle-fill";
    }
})
}

changing_play_pause(main_button.firstElementChild);
changing_play_pause(change.children[1]);
const delete_all_content = (parents) => {
    Array.from(parents.children).forEach((ele, i) => {
        container.removeChild(ele);
    })
}

const show_display = (element) => {
    // Create the elements
    const ul = document.createElement('ul');
    ul.className = 'down-list';

    const li1 = document.createElement('li');
    li1.className = 'item';
    const pauseIcon = document.createElement('i');
    pauseIcon.className = 'ri-pause-fill';
    Click_listener(pauseIcon);
    li1.appendChild(pauseIcon);

    const li2 = document.createElement('li');
    li2.className = 'item';
    const imageContain = document.createElement('div');
    imageContain.className = 'image-contain';
    const img = document.createElement('img');
    img.src = `${element.data.coverArt.sources[0].url}`;
    img.alt = '';
    imageContain.appendChild(img);

    const moreDetails = document.createElement('div');
    moreDetails.className = 'more-details';
    const span1 = document.createElement('span');
    span1.className = 'SoneName';
    span1.textContent = `${element.data.name}`;
    const span2 = document.createElement('span');
    span2.textContent = `${element.data.artists.items[0].profile.name}`;
    moreDetails.appendChild(span1);
    moreDetails.appendChild(span2);
    li2.appendChild(imageContain);
    li2.appendChild(moreDetails);

    const li3 = document.createElement('li');
    li3.className = 'item';
    const span3 = document.createElement('span');
    span3.className = 'underline-just';
    span3.textContent = `${element.data.name}`;
    li3.appendChild(span3);

    const li4 = document.createElement('li');
    li4.className = 'item';
    const span4 = document.createElement('span');
    span4.textContent = `${element.data.date.year}`;
    li4.appendChild(span4);

    const li5 = document.createElement('li');
    li5.className = 'item';
    const heartIcon = document.createElement('i');
    heartIcon.className = 'ri-heart-fill just_heart';
    const span5 = document.createElement('span');
    span5.textContent = '2:03';
    li5.appendChild(heartIcon);
    li5.appendChild(span5);

    // Append elements to the parent
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);

    // Append the parent to a container element (e.g., body)
    container.appendChild(ul);

}

function againdi() {
    delete_all_content(container);
    dta.forEach((ele) => {
        show_display(ele);
    })
}

const Click_listener = (element) => {
    element.addEventListener("click", () => {
        if (element.className == "ri-play-fill") {

            element.className = "ri-pause-fill";
        }
        else {
            element.className = "ri-play-fill";
            // element.style.transform = "translate(50% , 50%);"
        }
    })
}

againdi();


// const msu = new Audio("spotify:artist:4lxfqrEsLX6N1N4OCSkILp");
// msu.pause();

// document.querySelector(".play-pause-box").addEventListener("click",()=>{
//     msu.play();
//     console.log("hi")
// })