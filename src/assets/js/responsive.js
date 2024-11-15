// responsive.js

export const initResponsiveMenu = () => {
    const menuListButton = document.querySelector("#menuListButton")?.classList;
    const divMenuList = document.querySelector("#divMenuList")?.classList;

    document.querySelector("#menuListButton").addEventListener('click', () => {
        if (menuListButton.contains("open")) {
            // Close Menu Mobile
            document.querySelector(".line1").classList.toggle('rotate1');
            document.querySelector(".line2").classList.toggle('rotate2');
            document.querySelector(".line3").classList.toggle('rotate3');
            divMenuList.toggle("active");

            setTimeout(() => {
                menuListButton.toggle("open");
            }, 300);

            if (window.scrollY === 0) {
                setTimeout(() => {
                    document.querySelector("#headerFirstDiv").style.transition = "background-color .5s ease-in-out";
                    document.querySelector("#headerFirstDiv").style.backgroundColor = "transparent";
                }, 500);
                setTimeout(() => {
                    document.querySelector("#headerFirstDiv").style.transition = "none";
                }, 1000)
            }
        } else {
            // Open Menu Mobile
            divMenuList.toggle("active");
            menuListButton.toggle("open");
            document.querySelector("#headerFirstDiv").style.transition = "none";
            document.querySelector("#headerFirstDiv").style.backgroundColor = "#212121";

            setTimeout(() => {
                document.querySelector(".line1").classList.toggle('rotate1');
                document.querySelector(".line2").classList.toggle('rotate2');
                document.querySelector(".line3").classList.toggle('rotate3');
            }, 300);
        }
    });

    // document.querySelector(".hiddenNavBar").addEventListener('click', () => {
    //     divMenuList.remove("active");
    // })

    // Menu closing when clicking Church Logo
    document.querySelector("#logoChurchBanner").addEventListener('click', () => {
        if (menuListButton.contains("open")) {
            document.querySelector(".line1").classList.toggle('rotate1');
            document.querySelector(".line2").classList.toggle('rotate2');
            document.querySelector(".line3").classList.toggle('rotate3');
            divMenuList.toggle("active");

            setTimeout(() => {
                menuListButton.toggle("open");
            }, 300);
        }
    })

    // Menu closing when clicking logo name
    document.querySelector(".hiddenNavBar").addEventListener('click', () => {
        if (menuListButton.contains("open")) {
            document.querySelector(".line1").classList.toggle('rotate1');
            document.querySelector(".line2").classList.toggle('rotate2');
            document.querySelector(".line3").classList.toggle('rotate3');
            divMenuList.toggle("active");

            setTimeout(() => {
                menuListButton.toggle("open");
            }, 300);
        }
    })

    // Menu closing when clicking Main
    document.querySelector("main").addEventListener('click', () => {
        if (menuListButton.contains("open")) {
            document.querySelector(".line1").classList.toggle('rotate1');
            document.querySelector(".line2").classList.toggle('rotate2');
            document.querySelector(".line3").classList.toggle('rotate3');
            divMenuList.toggle("active");

            setTimeout(() => {
                menuListButton.toggle("open");
            }, 300);
        };
    })

    // Menu closing when scrolling
    window.addEventListener('scroll', () => {
        if (menuListButton.contains("open")) {
            document.querySelector(".line1").classList.remove('rotate1');
            document.querySelector(".line2").classList.remove('rotate2');
            document.querySelector(".line3").classList.remove('rotate3');
            divMenuList.remove("active");

            setTimeout(() => {
                menuListButton.remove("open");
            }, 300);
        };
    })

    // Menu closing when clicking a link menu
    const menuItems = document.querySelectorAll(".liHiddenMenu");

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (menuListButton.contains("open")) {
                document.querySelector(".line1").classList.remove('rotate1');
                document.querySelector(".line2").classList.remove('rotate2');
                document.querySelector(".line3").classList.remove('rotate3');
                divMenuList.remove("active");
    
                setTimeout(() => {
                    menuListButton.remove("open");
                }, 300);
            };
        });
    });
};

// initResponsiveMenu();


export const initSetViewportHeight = () => {
    const sectionBanner = document.querySelector('#sectionBanner');
    const divBanner = document.querySelector('#divBanner');

    if (sectionBanner && divBanner) {
        const heightAfterRendering = sectionBanner.getBoundingClientRect().height;

        sectionBanner.style.height = `${heightAfterRendering}px`;
        divBanner.style.height = `${heightAfterRendering}px`;
    }

};

initSetViewportHeight();