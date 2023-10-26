gsap.registerPlugin();

let bu = document.querySelector(".circle").parentElement;
bu.addEventListener("click", () => {
    bu.firstElementChild.classList.toggle("righty");
    document.body.classList.toggle("darkthethinng")
    // document.querySelector(".bar").style.left = "100%";
    // document.querySelector(".bar").classList.toggle("full")
    // document.querySelector(".bar").style.transform = "translate(-100% )"
    if (document.body.classList[document.body.classList.length- 1] == "darkthethinng") {

        gsap.to(".bar" , {
            trigger:".bar",
            x:"100%",
            duration:0.5,
            backgroundColor:"red"
        })
    }
    else{
        gsap.to(".bar" , {
            trigger:".bar",
            x:"0%",
            duration:0.5,
            backgroundColor:"green"
        })
    }
})