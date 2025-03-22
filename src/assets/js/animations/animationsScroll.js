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

    // Agenda Page
    const agendaImg1 = document.querySelector("#agendaImg1");
    const agendaImg2 = document.querySelector("#agendaImg2");
    const agendaImg3 = document.querySelector("#agendaImg3");
    const agendaImg4 = document.querySelector("#agendaImg4");
    const agendaImg5 = document.querySelector("#agendaImg5");
    const agendaImg6 = document.querySelector("#agendaImg6");
    const agendaImg7 = document.querySelector("#agendaImg7");

    const agendaFont1 = document.querySelectorAll(".gospelFontAnimateEnter1");
    const agendaFont2 = document.querySelectorAll(".gospelFontAnimateEnter2");
    const agendaFont3 = document.querySelectorAll(".gospelFontAnimateEnter3");
    const agendaFont4 = document.querySelectorAll(".gospelFontAnimateEnter4");
    const agendaFont5 = document.querySelectorAll(".gospelFontAnimateEnter5");
    const agendaFont6 = document.querySelectorAll(".gospelFontAnimateEnter6");
    const agendaFont7 = document.querySelectorAll(".gospelFontAnimateEnter7");

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
        if (span1) {
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
    if (cardItems.length) {
        gsap.from(cardItems, {
            scrollTrigger: {
                trigger: cardItems
            },
            opacity: 0,
            duration: 0.5,
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
        if (sermons.length) {
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
                stagger: 0.08
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
    // Agenda Page 

    if (agendaImg2) {
        gsap.from(agendaImg1, {
            scrollTrigger: {
                trigger: agendaImg1
            },
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)',
            duration: 0.8
        });
        gsap.from(agendaFont1, {
            scrollTrigger: {
                trigger: agendaImg1
            },
            opacity: 0,
            x: 30,
            duration: 1
        });

        gsap.from(agendaImg2, {
            scrollTrigger: {
                trigger: agendaImg2
            },
            opacity: 0,
            clipPath: 'inset(0 0 0 100%)',
            duration: 0.5
        });
        gsap.from(agendaFont2, {
            scrollTrigger: {
                trigger: agendaImg2
            },
            opacity: 0,
            x: -30,
            duration: 1
        });

        gsap.from(agendaImg3, {
            scrollTrigger: {
                trigger: agendaImg3
            },
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)',
            duration: 0.5
        });
        gsap.from(agendaFont3, {
            scrollTrigger: {
                trigger: agendaImg3
            },
            opacity: 0,
            x: 30,
            duration: 1
        });

        gsap.from(agendaImg4, {
            scrollTrigger: {
                trigger: agendaImg4
            },
            opacity: 0,
            clipPath: 'inset(0 0 0 100%)',
            duration: 0.5
        });
        gsap.from(agendaFont4, {
            scrollTrigger: {
                trigger: agendaImg4
            },
            opacity: 0,
            x: -30,
            duration: 1
        });

        gsap.from(agendaImg5, {
            scrollTrigger: {
                trigger: agendaImg5
            },
            opacity: 0,
            clipPath: 'inset(0 0 0 100%)',
            duration: 0.5
        });
        gsap.from(agendaFont5, {
            scrollTrigger: {
                trigger: agendaImg5
            },
            opacity: 0,
            x: -30,
            duration: 1
        });

        gsap.from(agendaImg6, {
            scrollTrigger: {
                trigger: agendaImg6
            },
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)',
            duration: 0.5
        });
        gsap.from(agendaFont6, {
            scrollTrigger: {
                trigger: agendaImg6
            },
            opacity: 0,
            x: 30,
            duration: 1
        });

        gsap.from(agendaImg7, {
            scrollTrigger: {
                trigger: agendaImg7
            },
            opacity: 0,
            clipPath: 'inset(0 0 0 100%)',
            duration: 0.5
        });
        gsap.from(agendaFont7, {
            scrollTrigger: {
                trigger: agendaImg7
            },
            opacity: 0,
            x: -30,
            duration: 1
        });

    }
}
