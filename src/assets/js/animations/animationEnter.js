import gsap from "gsap";

const animationEnter = (container) => {
    // Global Menu animations
    const span = container.querySelectorAll("span.is-active span")
    const aSpan = container.querySelectorAll("span.is-active")
    const overlayAnimation = container.querySelector("#overlayAnimation");

    // Global page transition
    const main = container.querySelector("main");
    const mainH1 = container.querySelector("#mainH1");
    const footer = container.querySelector("footer");
    const firstDivBanner = container.querySelector("#firstDivBanner")
    const bannerPages = container.querySelector("#pictureBannersPages");

    // Home animations
    const sectionBanner = document.querySelector("#sectionBanner");

    // About animations
    const aboutContainer = container.querySelector("#containerAbout")

    // Leaders animations
    const divLeaders = container.querySelectorAll("#divLeaders")
    const leaderPicture = container.querySelectorAll("#leaderPicture")
    const leaderName = container.querySelectorAll("#leaderName")
    const leaderMinistry = container.querySelectorAll("#leaderMinistry")

    // Gospel animations
    const divGospel = container.querySelector("#divGospelPage");
    const gospelFont1 = container.querySelectorAll(".gospelFontAnimateEnter1");
    const gospelFont2 = container.querySelectorAll(".gospelFontAnimateEnter2");
    const divGospelImg1 = container.querySelectorAll(".divGospelPageImgAnimate1");
    const divGospelImg2 = container.querySelectorAll(".divGospelPageImgAnimate2")

    // Sermons animations
    const sermonsLatestH2 = container.querySelector("#sermonsLatestH2")
    const sermonsLatestDiv = container.querySelector("#sermonsLatestDiv")
    const sermonsDivSermons = container.querySelector("#sermonsDivSermons")

    // Privacy animations
    const sectionPrivacy = container.querySelector("#sectionPrivacy");

    // Under construction animations
    const construction = container.querySelector(".underConstruction")

    const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome|CriOS/i.test(navigator.userAgent);



    const timeline = gsap.timeline({ defaults: { ease: `power1.out`, duration: 0.5 } });


    const animate = (target, props, position) => {
        try {
            if (target && target.length !== 0) {
                timeline.from(target, { ...props }, position);
            }
        } catch (error) {
            console.warn("It was impossible to animate element:", target, error);
        }
    };

    // Añadir animaciones
    // animate(main, { autoAlpha: 0, clearProps: 'all' }, "<");
    animate(mainH1, { opacity: 0 }, "<")
    animate(sectionBanner, { y: 0, duration: 0.3 }, "<");
    animate(footer, { autoAlpha: 0, clearProps: 'all' }, "<");
    if (!/Android|iPhone/i.test(navigator.userAgent)) {
            animate(firstDivBanner, { duration: 2, opacity: 0.5 }, "<");
            animate(overlayAnimation, { backgroundColor: "rgba(33, 33, 33, 1)" }, "<")
    }
    animate(bannerPages, { opacity: 0, duration: 1.5 }, "<");
    animate(span, { opacity: 0, scaleX: 0 }, "<");
    animate(aboutContainer, { opacity: 0, y: -10, duration: 1 }, "<");
    animate(construction, { opacity: 0, y: -10, duration: 1 }, "<");
    animate(divLeaders, { opacity: 0, y: -10, duration: 1 }, "<");
    animate(leaderPicture, { opacity: 0, duration: 1 }, "<");
    animate(leaderName, { opacity: 0, x: 30, duration: 1 }, "<");
    animate(leaderMinistry, { opacity: 0, x: 30, duration: 1.5 }, "<");
    animate(sermonsLatestH2, { opacity: 0, x: 30, duration: 1}, "<");
    animate(sermonsLatestDiv, { opacity: 0 }, "<");
    animate(sermonsDivSermons, { opacity: 0, duration: 1 }, "<")
    animate(gospelFont1, { opacity: 0, x: 30, duration: 1 }, "<");
    animate(gospelFont2, { opacity: 0, x: -30, duration: 1 }, "<");
    animate(divGospelImg1, { autoAlpha: 0, xPercent: -101, duration: 1 }, "<");
    animate(divGospelImg2, { autoAlpha: 0, xPercent: 101, duration: 1 }, "<");
    animate(sectionPrivacy, { opacity: 0 }, "<")
        

    return timeline;
}

export default animationEnter;
