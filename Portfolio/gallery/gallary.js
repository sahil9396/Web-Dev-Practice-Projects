gsap.registerPlugin(ScrollTrigger);

function Locomotive_Animation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

Locomotive_Animation();

const Landing_Animation = (what) => {
    gsap.from(what, {
        trigger: what,
        y: 100,
        opacity: 0,
        duration: 0.5,
        delay: 0.51
    })
}
const Scroling_Animation = () => {
    // gsap.to(".grad" , {
    //     opacity:1,
    //     duration:0.5,
    //     scrollTrigger:{
    //         trigger:".entry",
    //         scroller:"main",
    //         start:"top 5%",
    //         end:"top -40%",
    //         markers:true,
    //         scrub:2
    //     }
    // })
    gsap.to(".lower", {
        opacity: 1,
        duration: 0.51,
        // delay: 1,
        scrollTrigger: {
            trigger: ".lower",
            scroller: "main",
            start: "top 80%",
            end: "top 0%",
            scrub: 2
        }
    })
}

Landing_Animation(".entry");
Landing_Animation("menu");
Scroling_Animation();