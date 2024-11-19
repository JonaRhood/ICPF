import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export const animationScroll = () => {

    // NavBar
    const header = document.querySelector("#headerFirstDiv");
    const span1 = document.querySelector("#headerSpan1");
    const span2 = document.querySelector("#headerSpan2");

    // Home Page
    const sectionNews = document.querySelector("#sectionNews");
    const divSectionNews = document.querySelector("#divSectionNews");
    const div1 = document.querySelector("#section2Slide1");
    const div2 = document.querySelector("#section2Slide2");
    const div3 = document.querySelector("#section2Slide3");
    const latestSermon = document.querySelector("#videoLatestSermon");
    const player2 = document.querySelector("#player2");
    const player3 = document.querySelector("#player3");
    const firstCard = document.querySelector(".item")
    const cardItems = document.querySelectorAll(".item");

    // Banner Pages
    const pathBanner75 = document.querySelector("#pathBanner75");
    const pathBanner50 = document.querySelector("#pathBanner50")
    

    // Sermon Page
    const sermonsH3 = document.querySelectorAll(".sermonsDivSermon h3")
    const sermons = document.querySelectorAll(".firstDivChildSermons")
    const nowPlaying = document.querySelector(".nowPlaying")

    // Footer
    const logoFooter = document.querySelector("#logoOutlineBackground");

    gsap.registerPlugin(ScrollTrigger)

    if (header) {
        gsap.to(header, {
            scrollTrigger: {
                // trigger: header,
                scrub: true,
                start: "top -10px",
                end: "top -200px",
            },
            backgroundColor: "#212121",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            duration: 1,
        })
        gsap.to(span1, {
            scrollTrigger: {
                // trigger: header,
                scrub: true,
                end: "top -200px",
            },
            background: "linear-gradient(to top, rgba(255, 255, 255, 0.1), transparent)",
            duration: 1,
        })
        gsap.to(span2, {
            scrollTrigger: {
                // trigger: header,
                scrub: true,
                start: "top -10px",
                end: "top -200px",
            },
            backgroundColor: "#F2F1E7",
            duration: 1,
        })
    }

    if (pathBanner50) {
        gsap.to(pathBanner50, {
            scrollTrigger: {
                // trigger: header,
                scrub: true,
            },
            y: 80,
            duration: 1,
        })
        gsap.to(pathBanner75, {
            scrollTrigger: {
                // trigger: header,
                scrub: true,
            },
            y: 50,
            duration: 1,
        })
    }

    if (latestSermon) {
        gsap.from(latestSermon, {
            scrollTrigger: {
                trigger: latestSermon,
                // scrub: true,
                end: "top 200px",
            },
            y: 30, 
            duration: 0.5,
            ease: true,
        });
        gsap.from(player2, {
            scrollTrigger: {
                trigger: latestSermon,
                // scrub: true,
                end: "top 200px",
            },
            y: 30, 
            delay: 0.2,
            duration: 0.5,
            ease: true,
        });
        gsap.from(player3, {
            scrollTrigger: {
                trigger: latestSermon,
                // scrub: true,
                end: "top 200px",
            },
            y: 30, 
            delay: 0.4,
            duration: 0.5,
            ease: true,
        });
    }
    
    // Animated Cards
        if (cardItems) {
            gsap.from(cardItems, {
                scrollTrigger: {
                    trigger: cardItems
                },
               opacity: 0,
               duration: 0.6,
              });
        }

    if (logoFooter) {
        gsap.from(logoFooter, {
            scrollTrigger: {
                trigger: logoFooter,
                scrub: true,
                // start: "top -100px",
                end: "bottom 600px",
            },
            x: -50,
            opacity: 0,
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