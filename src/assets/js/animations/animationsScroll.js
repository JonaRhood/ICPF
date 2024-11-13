import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export const animationScroll = () => {

    // Home Page
    const header = document.querySelector("header");
    const sectionNews = document.querySelector("#sectionNews");
    const divSectionNews = document.querySelector("#divSectionNews");
    const div1 = document.querySelector("#section2Slide1");
    const div2 = document.querySelector("#section2Slide2");
    const div3 = document.querySelector("#section2Slide3");
    

    // Sermon Page
    const sermonsH3 = document.querySelectorAll(".sermonsDivSermon h3")
    const sermons = document.querySelectorAll(".firstDivChildSermons")
    const nowPlaying = document.querySelector(".nowPlaying")

    gsap.registerPlugin(ScrollTrigger)

    if (header) {
        gsap.from(header, {
            scrollTrigger: {
                // trigger: header,
                scrub: true,
                start: "top -100px",
                end: "top -500px",
            },
            backgroundColor: "transparent",
            boxShadow: "none",
            duration: 1,
        })
    }

    if (!/Android|iPhone|iPad|Tablet/i.test(navigator.userAgent)) {
        if (div1) {
            gsap.from(div1, {
                scrollTrigger: {
                    trigger: sectionNews,
                    scrub: true,
                    end: "top 200px",
                },
                y: 50,
                duration: 1,
            })
        }
        if (div2) {
            gsap.from(div2, {
                scrollTrigger: {
                    trigger: sectionNews,
                    scrub: true,
                    end: "top 200px",
                },
                y: 100,  
                duration: 1,
            });
        }
        if (div3) {
            gsap.from(div3, {
                scrollTrigger: {
                    trigger: sectionNews,
                    scrub: true,
                    end: "top 200px",
                },
                y: 150, 
                duration: 1,
            });
        }   
    }

    if (!/Android|iPhone/i.test(navigator.userAgent)) {
        if (sermons) {
            gsap.from(sermonsH3, {
                scrollTrigger: {
                    trigger: sermons,
                    // scrub: true,
                    end: "top 200px",
                },
                x: 10, 
                duration: 1,
                ease: true,
                stagger: 0.1
            });
            gsap.from(sermons, {
                scrollTrigger: {
                    trigger: sermons,
                    // scrub: true,
                    end: "top 200px",
                },
                x: -500, 
                opacity: 0,
                duration: 0.3,
                ease: true,
                stagger: 0.1
            });
            gsap.from(nowPlaying, {
                scrollTrigger: {
                    trigger: sermons,
                    // scrub: true,
                    end: "top 200px",
                },
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: true,
                stagger: 0.1
            });
        }
    }
}