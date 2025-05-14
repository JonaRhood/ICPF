export const emailContactAnimation = () => {
    const divButton = document.querySelector("#divButtonContact");
    const divText = document.querySelector("#divSpanContact");
    const divMails = document.querySelector("#divMailsContact");
    const children = divMails.children;

    divButton.addEventListener("mouseover", () => {
        divButton.style.backgroundColor = 'rgb(59, 130, 246)';
        divButton.style.outlineColor = 'rgb(191, 219, 254)';
    })

    divButton.addEventListener('mouseout', () => {
        divButton.style.backgroundColor = 'rgb(37 99 235)';
        divButton.style.outlineColor = '#60a5fa';
    });

    // if (!/Android|iPhone|iPad|Tablet/i.test(navigator.userAgent)) {

        document.querySelector("#divButtonContact").addEventListener('click', (e) => {
            if (divButton.style.backgroundColor !== 'white') {
                divButton.addEventListener("mouseover", () => {
                    divButton.style.backgroundColor = 'white';
                    divButton.style.outlineColor = 'white';
                })
            
                divButton.addEventListener('mouseout', () => {
                    divButton.style.backgroundColor = 'white';
                    divButton.style.outlineColor = 'white';
                });
                divButton.style.backgroundColor = 'white';
                divButton.style.outlineColor = 'white';
                divButton.style.cursor = 'initial';
                divText.style.transform = 'translateY(-50px)'
                divMails.style.transform = 'translateY(0)'
                Array.from(children).forEach((child, index) => {
                    child.classList.add("toggleTransform")
                })
            } else {
                divButton.addEventListener("mouseover", () => {
                    divButton.style.backgroundColor = 'rgb(59, 130, 246)';
                    divButton.style.outlineColor = 'rgb(191, 219, 254)';
                })
            
                divButton.addEventListener('mouseout', () => {
                    divButton.style.backgroundColor = 'rgb(37 99 235)';
                    divButton.style.outlineColor = '#60a5fa';
                });
                Array.from(children).forEach((child, index) => {
                    child.classList.remove("toggleTransform")
                })
                divButton.style.backgroundColor = 'rgb(37 99 235)';
                divButton.style.outlineColor = '#60a5fa';
                divButton.style.cursor = 'pointer'
                divMails.style.transform = 'translateY(50px)'
                divText.style.transform = 'translateY(0px)'
            }
        })
    // }


};