export const initAnimatedCard = () => {

    const items = document.querySelectorAll(".custom-carousel .item");

    if (!items.length) {
        console.error("No se encontraron elementos .item en .custom-carousel");
        return;
    }

    items.forEach(item => {
        item.addEventListener("click", toggleActiveClass);
        item.addEventListener("touchstart", toggleActiveClass);
    });

    function toggleActiveClass(event) {
        items.forEach(i => {i.classList.remove("active")});
        event.currentTarget.classList.toggle("active");
    }
};
