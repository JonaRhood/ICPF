import gsap from "gsap";

const animationLeave = (container) => {
    const main = container.querySelector("main");
    const overlayAnimation = container.querySelector("#overlayAnimation");
    const footer = container.querySelector("footer");
    const sectionBanner = container.querySelector("#sectionBanner");
    const span = container.querySelectorAll("span.is-active span");

    const cookieDiv = container.querySelector("#cookieDiv");

    const pathBanner75 = document.querySelectorAll("#pathBanner75");
    const pathBanner50 = document.querySelectorAll("#pathBanner50")

    const timeline = gsap.timeline({ defaults: { duration: 0.5 } });

    const animate = (target, props, position) => {
        if (target && target.length !== 0) { 
            timeline.to(target, { ...props }, position);
        }
    };

    // Añadir animaciones
    // animate(main, { autoAlpha: 0, clearProps: 'all' });
    animate(overlayAnimation, { backgroundColor: "rgba(33, 33, 33, 1)" }, "<")
    animate(span, { opacity: 0 }, "<");
    // animate(pathBanner75, {y: 50, duration: 0.8 }, "<");
    // animate(pathBanner50, {y: 200, duration: 1}, "<");

    return timeline;
};

export default animationLeave;
