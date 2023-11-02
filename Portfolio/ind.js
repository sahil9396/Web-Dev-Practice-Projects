gsap.registerPlugin(ScrollTrigger);


// landing page
gsap.from("menu , menu i ,menu img , .name", {
    // trigger: "menu",
    stagger: 1,
    y: -100,
    opacity: 0,
    duration: 0.5,
    delay: 0.8,

})

// hovering on the menu icon 
document.querySelectorAll("menu li , .specialization img").forEach(element => {
    element.addEventListener("mouseenter", () => {
        gsap.to(element, {
            filter: "drop-shadow(0 0 5px black)",
            transform: `rotateZ(${Math.floor(Math.random() * 180)}deg) scale(${Math.random() * 1.5 + 1})`,
        })
    })
    element.addEventListener("mouseleave", () => {
        gsap.to(element, {
            filter: "none",
            transform: "rotateZ(0deg) scale(1)",
            duration:1
        })
    })
})

let profile_img = document.querySelector("menu img");

profile_img.addEventListener("mouseenter", () => {
    gsap.to(profile_img, {
        transform: `rotateZ(${Math.floor(Math.random() * 180)}deg) scale(${Math.random() * 1.5 + 1})`,
    })
})
profile_img.addEventListener("mouseleave", () => {
    gsap.to(profile_img, {
        transform: "rotateZ(0deg) scale(1)",
    })
})


// let cu = document.querySelector(".cursor");
let ain = document.querySelector("main");
let main_img = document.querySelector(".container img");

const condition_on_mouse = () => {
    // let cu = document.querySelector(".cursor");
    let ain = document.querySelector("main");
    // rotation on main image
    main_img.addEventListener("mouseenter", () => {
        gsap.to(main_img, {
            // transform: `rotateZ(${Math.floor(Math.random() * 180)}deg) scale(${Math.random() * 1.5})`,
            // filter: "blur(10px)",
            filter: "drop-shadow(0 0 10px black)",
        })
        // gsap.to(".intro", {
        //     duration: 1,
        //     opacity: 1,
        //     transform: `scale(${1.2})`
        // })
    })
    main_img.addEventListener("mouseleave", () => {
        gsap.to(main_img, {
            // transform: "rotateZ(0deg) scale(1)",
            filter: "none",
        })
        // gsap.to(".intro", {
        //     duration: 0.1,
        //     opacity: 0,
        //     transform: `scale(${0})`
        // })
    })
    main_img.addEventListener("click", (lee) => {
        gsap.to(main_img, {
            // transform: `${Math.random() *1.5}`,
            transform: "scale(1.85)",
            duration: 1,
            filter: "drop-shadow(0 0 5px black)",
            x: 100
        })
        gsap.to(".intro", {
            duration: 1,
            opacity: 1,
            transform: `scale(${1.2})`
        })
        setTimeout(() => {
            gsap.to(main_img, {
                transform: "scale(1)",
                duration: 1,
                filter: "none",
                x: 0
                // filter: "drop-shadow(0 0 10px black)",
            })
            // gsap.to(".intro", {
            //     duration: 1,
            //     opacity: 0,
            //     transform: `scale(${0})`
            // })
        }, 1000);
    })
    // window.addEventListener("mousemove", ele => {
    //     gsap.to(cu, {
    //         x: ele.clientX,
    //         y: ele.clientY,
    //     })
    // })
    // ain.addEventListener("mouseenter", () => {
    //     gsap.to(cu, {
    //         opacity: 1,
    //         transform: "scale(1)",
    //         duration: 1
    //     })
    // })
    // ain.addEventListener("mouseleave", () => {
    //     gsap.to(cu, {
    //         opacity: 0,
    //         duration: 1,
    //         transform: "scale(0)",
    //     })
    // })

}

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1000) {
        console.log("hi");
        condition_on_mouse();
    }
    else {
        gsap.to(".intro", {
            duration: 1,
            opacity: 1,
            transform: `scale(${1})`
        })
    }
})

if (window.innerWidth < 1000) {
    gsap.to(".intro , .name", {
        duration: 1,
        opacity: 1,
        transform: `scale(${1})`
    })
}
else {
    condition_on_mouse();
}


