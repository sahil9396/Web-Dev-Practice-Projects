gsap.registerPlugin(ScrollTrigger);

let songs = [
    { songname: "Warriyo - Mortals", filePath: "1.mp3", },
    { songname: "Cielo - Huma-Huma", filePath: "2.mp3", },
    { songname: "DEAF KEV - Invincible", filePath: "3.mp3", },
    { songname: "Different Heaven & EH!DE - My Heart", filePath: "4.mp3", },
    { songname: "Janji-Heroes-Tonight-feat", filePath: "5.mp3", },
    { songname: "Rabba - Salam-e-Ishq", filePath: "2.mp3", },
    { songname: "Sakhiyaan - Salam-e-Ishq", filePath: "2.mp3", },
    { songname: "Bhula Dena - Salam-e-Ishq", filePath: "2.mp3", },
    { songname: "Tumhari Kasam - Salam-e-Ishq", filePath: "2.mp3", },
    // {songname: "Na Jaana - Salam-e-Ishq", filePath: "4.mp3", },
];

let items = [];

// remember that in local storage, the data is still stored
function show() {
    const lis = localStorage.getItem("songs");
    const li = JSON.parse(lis);
    return li.albums.items
}

const dta = show();
console.log(dta);
var ongoing = 1;
let container = document.querySelector(".songlist-down");
let pau = Array.from(document.getElementsByClassName("ri-pause-circle-fill"));
let pla = Array.from(document.getElementsByClassName("ri-play-circle-fill"));
let skip = Array.from(document.getElementsByClassName("skio"));
let change = document.querySelector(".changer");
let main_button = document.querySelector(".play-pause-box");
let dur = document.querySelector(".timeline");
let vol = document.querySelector(".other-stuff .timeline");

// music configuration
let mus = new Audio(`${songs[ongoing - 1].filePath}`);
mus.pause();
mus.volume = vol.value/100;

skip.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        if ("ri-skip-left-fill" === e.target.classList[0]) {
            ongoing--;
            if (ongoing < 1) {
                ongoing = 1;
            }
        }
        else {
            ongoing++;
            if (ongoing > songs.length) {
                ongoing = 1;
            }
        }
        mus.setAttribute("src", `${songs[ongoing - 1].filePath}`);
        mus.play();
        pause_all();
        items[ongoing - 1].className = "ri-pause-fill";
        change.children[1].className = "ri-pause-circle-fill";
        main_button.firstElementChild.className = "ri-pause-circle-fill";
    })
})


document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        all_function();
    }
})

const all_function = () => {

    changing_play_pause(main_button.firstElementChild, change.children[1], items);
    changing_play_pause(change.children[1], main_button.firstElementChild, items);
    againdi();
}
const changing_play_pause = (tag, side_tag) => {
    tag.addEventListener("click", (event) => {
        if (event.target.className == "ri-pause-circle-fill") {
            mus.pause();
            side_tag.className = "ri-play-circle-fill";
            // to_change[ongoing-1].className = "ri-play-fill";
            event.target.className = "ri-play-circle-fill";
            items[ongoing - 1].className = "ri-play-fill";
        }
        else {
            mus.play();
            items[ongoing - 1].className = "ri-pause-fill";
            side_tag.className = "ri-pause-circle-fill";
            event.target.className = "ri-pause-circle-fill";
        }
    })
}

mus.addEventListener("timeupdate", (e) => {
    let tiem = parseInt((mus.currentTime / mus.duration) * 100);
    if (tiem === 100) {
        ongoing++;
        if (ongoing > songs.length) {
            ongoing = 1;
        }
        mus.src = songs[ongoing - 1].filePath;
        mus.play();
    }
    console.log(mus.volume);
    dur.value = tiem;
})

dur.addEventListener("change", (e) => {
    mus.currentTime = dur.value * mus.duration / 100;
})
vol.addEventListener("change", (e) => {
    mus.volume = vol.value/100;
})

const delete_all_content = (parents) => {
    Array.from(parents.children).forEach((ele, i) => {
        container.removeChild(ele);
    })
}

const show_display = (element, id) => {
    // Create the elements
    const ul = document.createElement('ul');
    ul.className = 'down-list';

    const li1 = document.createElement('li');
    li1.className = 'item';
    const pauseIcon = document.createElement('i');
    pauseIcon.className = 'ri-play-fill';
    pauseIcon.setAttribute("id", id);
    Click_listener(pauseIcon);
    li1.appendChild(pauseIcon);
    items.push(pauseIcon);

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

const pause_all = () => {
    items.forEach(lee => {
        lee.className = "ri-play-fill";
    })
}

const Click_listener = (element) => {
    element.addEventListener("click", (vev) => {
        if (element.className == "ri-play-fill") {
            // ongoing = parseInt(element.attributes[1].nodeValue) + 1;
            // mus.setAttribute("src", songs[ongoing - 1].filePath)
            mus.play();
            pause_all();
            element.className = "ri-pause-fill";
            main_button.firstElementChild.className = "ri-pause-circle-fill";
            change.children[1].className = "ri-pause-circle-fill";
            gsap.from(element, {
                duration: 0.5,
                delay: 0.8,
                color:"green",
                transform:"scale(2)"
            })
        }
        else {
            mus.pause();
            element.className = "ri-play-fill";
            main_button.firstElementChild.className = "ri-play-circle-fill"
            change.children[1].className = "ri-play-circle-fill"
        }
    })
}
function againdi() {
    delete_all_content(container);
    dta.forEach((ele, i) => {
        if (i <= songs.length - 1) {
            show_display(ele, i);
        }
    })
}