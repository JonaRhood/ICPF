export const initAboutContainer = () => {
    document.querySelectorAll("[id^='liAbout-']").forEach(li => {
        li.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            const divId = li.getAttribute("id");

            if (divId === "liAbout-1") {
                history.pushState(null, '', '?iglesia');
                document.querySelector("#arrowBeliefs").classList.replace('flex', 'hidden');
            }
            if (divId === "liAbout-2") {
                history.pushState(null, '', '?mision');
                document.querySelector("#arrowBeliefs").classList.replace('flex', 'hidden');
            }
            if (divId === "liAbout-3") {
                history.pushState(null, '', '?creencia');
                document.querySelector("#arrowBeliefs").classList.replace("hidden", 'flex');
            }
            if (divId === "liAbout-4") {
                history.pushState(null, '', '?confesion');
                document.querySelector("#arrowBeliefs").classList.replace('flex', 'hidden');
            }
            if (divId === "liAbout-5") {
                history.pushState(null, '', '?horarios');
                document.querySelector("#arrowBeliefs").classList.replace('flex', 'hidden');
            }

            document.querySelectorAll("[id^='liAbout-']").forEach(li => {
                li.classList.replace("bg-gray-100", "bg-gray-200")
            });

            this.classList.replace("bg-gray-200", "bg-gray-100");


            const targetId = this.getAttribute('id').substring(8);

            document.querySelectorAll("[id^='divAbout-']").forEach(div => {
                if (div.getAttribute("id").endsWith(targetId)) {
                    div.classList.replace("invisible", "visible");
                    div.style.opacity = 1;
                } else {
                    div.style.opacity = 0;
                    div.classList.replace("visible", "invisible");
                }

            })

            if (this.getAttribute("id") === "liAbout-3") {
                document.querySelector(".scrollableDivJs").scrollTo(0,0);
            }
        });
    });
}

export const initAboutScrollAnchor = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            document.querySelector('.scrollableDivJs').scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
};

export const initAboutUrlCheck = () => {
    const hash = window.location.search;
    const search =  window.location.search;

    if (search === "") {
        document.querySelectorAll("[id^='liAbout-']").forEach(li => {
            li.classList.replace("bg-gray-100", "bg-gray-200");
            document.querySelector("#liAbout-1").classList.replace("bg-gray-200", "bg-gray-100");
        })
        document.querySelectorAll("[id^='divAbout-']").forEach(div => {
            div.style.opacity = 0;
            document.querySelector("#divAbout-1").classList.replace("invisible", "visible");
            document.querySelector("#divAbout-1").style.opacity = 1;
        })
    }
    if (search === "?iglesia") {
        document.querySelectorAll("[id^='liAbout-']").forEach(li => {
            li.classList.replace("bg-gray-100", "bg-gray-200");
            document.querySelector("#liAbout-1").classList.replace("bg-gray-200", "bg-gray-100");
        })
        document.querySelectorAll("[id^='divAbout-']").forEach(div => {
            div.style.opacity = 0;
            document.querySelector("#divAbout-1").classList.replace("invisible", "visible");
            document.querySelector("#divAbout-1").style.opacity = 1;
        })
    }
    if (search === "?mision") {
        document.querySelectorAll("[id^='liAbout-']").forEach(li => {
            li.classList.replace("bg-gray-100", "bg-gray-200");
            document.querySelector("#liAbout-2").classList.replace("bg-gray-200", "bg-gray-100");
        })
        document.querySelectorAll("[id^='divAbout-']").forEach(div => {
            div.style.opacity = 0;
            document.querySelector("#divAbout-2").classList.replace("invisible", "visible");
            document.querySelector("#divAbout-2").style.opacity = 1;
        })
    }
    if (search === "?creencia") {
        document.querySelectorAll("[id^='liAbout-']").forEach(li => {
            li.classList.replace("bg-gray-100", "bg-gray-200");
            document.querySelector("#liAbout-3").classList.replace("bg-gray-200", "bg-gray-100");
        })
        document.querySelectorAll("[id^='divAbout-']").forEach(div => {
            div.style.opacity = 0;
            document.querySelector("#divAbout-3").classList.replace("invisible", "visible");
            document.querySelector("#divAbout-3").style.opacity = 1;
        })
        document.querySelector(".scrollableDivJs").scrollTo(0,0);
        document.querySelector("#arrowBeliefs").classList.replace("hidden", 'flex');
    }
    if (search === "?confesion") {
        document.querySelectorAll("[id^='liAbout-']").forEach(li => {
            li.classList.replace("bg-gray-100", "bg-gray-200");
            document.querySelector("#liAbout-4").classList.replace("bg-gray-200", "bg-gray-100");
        })
        document.querySelectorAll("[id^='divAbout-']").forEach(div => {
            div.style.opacity = 0;
            document.querySelector("#divAbout-4").classList.replace("invisible", "visible");
            document.querySelector("#divAbout-4").style.opacity = 1;
        })
    }
    if (search === "?horarios") {
        document.querySelectorAll("[id^='liAbout-']").forEach(li => {
            li.classList.replace("bg-gray-100", "bg-gray-200");
            document.querySelector("#liAbout-5").classList.replace("bg-gray-200", "bg-gray-100");
        })
        document.querySelectorAll("[id^='divAbout-']").forEach(div => {
            div.style.opacity = 0;
            document.querySelector("#divAbout-5").classList.replace("invisible", "visible");
            document.querySelector("#divAbout-5").style.opacity = 1;
        })
    }
} 
