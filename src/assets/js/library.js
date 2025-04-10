import gsap from "gsap";

export const library = () => {
    console.log("Library")
    const insideDivLibrary = document.querySelector("#insideDivLibrary");
    const divNumbersPagination = document.querySelector("#divNumbersPagination");
    const categoriesDivScroller = document.querySelectorAll(".categoriesDivScroller");
    const arrowLeftPagination = document.querySelector("#arrowLeftPagination");
    const arrowRightPagination = document.querySelector("#arrowRightPagination");
    const doubleArrowLeftPagination = document.querySelector("#doubleArrowLeftPagination");
    const doubleArrowRightPagination = document.querySelector("#doubleArrowRightPagination");
    const divCategorySelected = document.querySelector("#divCategorySelected");
    const iconSearchLibrary = document.querySelector("#iconSearchLibrary");
    const inputSearchLibrary = document.querySelector("#inputSearchLibrary");
    const iconXLibrary = document.querySelector("#iconXLibrary");
    const modalBook = document.querySelector("#modalBook");
    const iconXModalBook = document.querySelector("#iconXModalBook");
    const loaderLibrary = document.querySelector("#loaderLibrary");
    const loaderAuthors = document.querySelector("#loaderAuthors");


    // URL Logic
    const hash = window.location.search;
    const hashSplit = hash.split("/");
    const hashNumber = hashSplit[1];

    // Metadata and Flags
    let page = 1;
    let totalPages = 0;
    let limit = 24;
    let dataFetch = [];
    let dataBySearch = [];
    let dataByCategory = [];

    let isDataFetch = true;
    let isDataBySearch = false;
    let isDataByCategory = false;

    let controller = new AbortController();

    // Functions and Library Logic
    const fetchInitialData = async () => {
        try {
            const response = await fetch("https://icpf-api-production.up.railway.app/libros");
            const data = await response.json();

            // console.log(data);
            dataFetch = data;

            if (hash.includes("pagina")) {
                page = hashNumber;
                createLibrary(dataFetch);
                createPagination(dataFetch);
            } else {
                createLibrary(dataFetch);
                createPagination(dataFetch);
            }

            if (hash.includes("libro")) {
                dataFetch.filter(book => {
                    if (book.libro_id == hashNumber) {
                        createBookModal(null, book);
                    }
                })
            } else if (hash.includes("autor")) {
                createAuthorModal(null, hashNumber);
            }

        } catch (err) {
            console.log("Error fetching library data: ", err);
        }
    }
    fetchInitialData();

    inputSearchLibrary.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            divCategorySelected.querySelectorAll("span").forEach(span => span.remove());
            isDataFetch = false;
            isDataBySearch = true;
            isDataByCategory = false;
            const searchWords = e.target.value.toLowerCase().split(" ").filter(word => word.length > 0);

            page = 1

            dataBySearch = dataFetch.filter(book => {
                const titleMatch = searchWords.every(word => book.libro_titulo.toLowerCase().includes(word));
                const authorMatch = book.autores.some(author =>
                    searchWords.every(word =>
                        author.nombre.toLowerCase().includes(word) ||
                        author.apellidos.toLowerCase().includes(word)
                    )
                );
                return titleMatch || authorMatch;
            });

            createLibrary(dataBySearch);
            createPagination(dataBySearch)

            inputSearchLibrary.blur();
        }
    });

    iconXLibrary.addEventListener("click", () => {
        inputSearchLibrary.value = "";
        isDataFetch = true;
        isDataBySearch = false;
        isDataByCategory = false;
        createLibrary(dataFetch);
        createPagination(dataFetch);
    })


    const fetchCategories = async () => {
        try {
            const response = await fetch("https://icpf-api-production.up.railway.app/categorias");
            const data = await response.json();

            if (response.ok) {
                categoriesDivScroller.forEach(div => {
                    const ul = document.createElement("ul");
                    ul.className = "ulCategoriesTagList scroller_inner";
                    ul.style.display = "none";

                    data.forEach((category, i) => {
                        const li = document.createElement("li");
                        li.className = "liCategoriesLibrary";
                        li.setAttribute("data-id", `${category.id}`);
                        li.textContent = `${category.categoria}`;
                        li.style.backgroundColor = `#402e18`;
                        li.style.color = "white";
                        ul.appendChild(li);
                    })

                    ul.addEventListener("click", (e) => {
                        if (e.target.classList.contains("liCategoriesLibrary")) {
                            divCategorySelected.querySelectorAll("span").forEach(span => span.remove());
                            isDataFetch = false;
                            isDataBySearch = false;
                            isDataByCategory = true;
                            dataByCategory = dataFetch.filter(book =>
                                book.categorias.some(categoria => categoria.id == e.target.dataset.id)
                            );
                            page = 1;
                            createLibrary(dataByCategory);
                            createPagination(dataByCategory);

                            const spanCategory = document.createElement("span");
                            spanCategory.className = "spanCategorySelected"
                            spanCategory.textContent = e.target.textContent;

                            const spanCross = document.createElement("span");
                            spanCross.className = "crossCategoryLibrary";
                            spanCross.textContent = "-";

                            divCategorySelected.style.backgroundColor = e.target.style.backgroundColor;
                            divCategorySelected.appendChild(spanCategory);
                            divCategorySelected.appendChild(spanCross);

                            divCategorySelected.addEventListener("click", () => {
                                divCategorySelected.querySelectorAll("span").forEach(span => span.remove());
                                divCategorySelected.style.backgroundColor = "";
                                isDataFetch = true;
                                isDataBySearch = false;
                                isDataByCategory = false;
                                createLibrary(dataFetch);
                                createPagination(dataFetch);
                            })
                        }
                    });

                    div.appendChild(ul);

                    // If category animation is not working, deletes one of its divs
                    setTimeout(() => {
                        ul.style.display = "flex";

                        const el = document.querySelector('.ulCategoriesTagList');
                        if (!el) {
                            return;
                        }
                        
                        const style = getComputedStyle(el);
                        const transform = style.transform;

                        if (!transform || transform === 'none') {
                            const scroller = document.querySelector('.categoriesDivScroller:nth-child(3)');
                            if (scroller) {
                                scroller.remove();
                            }
                        }
                    }, 100);
                })
            }

            if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                addScrollerAnimation();
            }

        } catch (err) {
            console.log("Error fetching categories: ", err)
        }

        gsap.fromTo(
            document.querySelectorAll(".ulCategoriesTagList"),
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        )
    }
    fetchCategories();

    const addScrollerAnimation = () => {
        categoriesDivScroller.forEach(div => {
            div.setAttribute("data-animated", true);
            const scrollerInner = document.querySelectorAll(".scroller_inner");

            scrollerInner.forEach(scroller => {
                const scrollerContent = Array.from(scroller.children);

                scrollerContent.forEach(item => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scroller.appendChild(duplicatedItem);
                })
            })
        })
    }

    const createLibrary = (data) => {
        insideDivLibrary.querySelectorAll(".divBooks").forEach(div => div.remove());

        const dataMax = page * limit;
        const dataMin = dataMax - limit;

        totalPages = Math.ceil(data.length / limit);

        data.slice(dataMin, dataMax).forEach(book => {
            const div = document.createElement("div");
            div.className = "divBooks";

            // Image Div
            const divImage = document.createElement("div");
            divImage.className = "divImageBooks";
            divImage.setAttribute("book-id", book.libro_id);

            // book Modal
            divImage.addEventListener("click", (e) => createBookModal(e, book));


            const img = document.createElement("img");
            img.className = "imgBooks";
            img.loading = "lazy";
            img.src = `${book.libro_imagen}`;

            document.querySelectorAll("#insideDivLibrary .divImageBooks").forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
            });

            divImage.appendChild(img);

            // Details Div
            const divDetails = document.createElement("div");
            divDetails.className = "divDetailsBooks";

            const divTitle = document.createElement("div");
            divTitle.className = "divTitleBooks";
            divTitle.addEventListener("click", (e) => createBookModal(e, book));
            const title = document.createElement("span");
            title.className = "bookTitleSpan"
            title.textContent = `${book.libro_titulo}`;

            divTitle.appendChild(title)
            divDetails.appendChild(divTitle);

            const authorsUl = document.createElement("ul");
            authorsUl.className = "authorsUlBooks"
            book.autores.forEach((author, index) => {
                const authorLi = document.createElement("li");
                authorLi.className = "authorLiBooks"
                authorLi.id = `${author.id}`
                authorLi.textContent = `${author.nombre} ${author.apellidos}`
                if (book.autores.length > 1) {
                    if (index < book.autores.length - 1) {
                        authorLi.textContent += ",";
                    }
                }
                authorLi.addEventListener("click", (e) => createAuthorModal(e, author.id));
                authorsUl.appendChild(authorLi);
            })

            divDetails.appendChild(authorsUl);

            const divPrice = document.createElement("div");
            divPrice.className = "divPriceBooks";
            const spanPrice = document.createElement("span");
            spanPrice.className = "spanPriceBooks";
            spanPrice.textContent = `${book.libro_precio == null ? `-` : `${book.libro_precio.split('.')} €`}`;

            divPrice.appendChild(spanPrice);
            divDetails.appendChild(divPrice);

            const categoryUl = document.createElement("ul");
            categoryUl.className = "categoryUlBooks"
            book.categorias.forEach(category => {
                if (category.id === null) {
                    return;
                }
                const categoryLi = document.createElement("li");
                categoryLi.className = "categoryLiBooks"
                categoryLi.id = `${category.id}`;
                categoryLi.textContent = `${category.categoria}`;
                categoryLi.style.backgroundColor = `#402e18`;
                categoryLi.style.color = "white";
                categoryUl.appendChild(categoryLi);
            })

            divDetails.appendChild(categoryUl);

            div.appendChild(divImage);
            div.appendChild(divDetails);
            insideDivLibrary.appendChild(div);

            gsap.fromTo(
                insideDivLibrary.querySelectorAll(".divBooks"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power2.out" }
            );
            gsap.fromTo(
                insideDivLibrary.querySelectorAll(".imgBooks"),
                { filter: "blur(20px)" },
                { filter: "blur(0px)", duration: 1 }
            )


            loaderLibrary.style.display = "none";
        })
    };

    const createBookModal = (e, book) => {
        const divBookModalImg = document.querySelector("#divBookModalImg");
        const divBookModalDetails = document.querySelector("#divBookModalDetails");
        setTimeout(() => {
            divBookModalDetails.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 10);

        restoreScrollbar();
        fixScrollbarGap();

        loaderAuthors.style.display = "none";

        history.pushState({ page: 'libro' }, '', `?libro/${book.libro_id}`)

        modalBook.style.display = "flex";

        divBookModalImg.querySelectorAll("div").forEach(div => div.remove());
        divBookModalImg.querySelectorAll("img").forEach(div => div.remove());
        divBookModalDetails.querySelectorAll("div").forEach(div => div.remove());

        iconXModalBook.addEventListener("click", () => {
            history.pushState({ page: 'libreria' }, '', '/libreria/');
            restoreScrollbar();
            modalBook.style.display = "none"
            divBookModalImg.querySelectorAll("img").forEach(div => div.remove());
            divBookModalDetails.querySelectorAll("div").forEach(div => div.remove());
        });

        const img = document.createElement("img");
        img.loading = "lazy";
        img.id = "imgBookDesktopModal"
        img.className = "imgBooks";
        img.src = `${book.libro_imagen}`;


        divBookModalImg.appendChild(img);

        gsap.fromTo(
            divBookModalImg.querySelector(".imgBooks"),
            { filter: "blur(10px)" },
            { filter: "blur(0px", duration: 0.3 }
        )

        const div = document.createElement("div");
        div.id = "ModalBookDetailInfo";

        const h3 = document.createElement("h3");
        h3.textContent = book.libro_titulo;
        const p = document.createElement("p");
        const text = book.libro_descripcion;
        const parts = text.split('.');
        if (parts.length > 2) {
            const calc = Math.round(parts.length / 2);
            const firstHalf = parts.slice(0, calc).join('.') + ".";
            const secondHalf = parts.slice(calc).join('.');
            p.innerHTML = firstHalf + "<br><br>" + secondHalf;
        } else {
            p.textContent = text;
        }
        const spanPages = document.createElement("span");
        spanPages.id = "pagesBookModal";
        spanPages.textContent = book.libro_paginas;
        const spanPrice = document.createElement("span");
        spanPrice.id = "priceBookModal";
        spanPrice.textContent = `${book.libro_precio.split('.')} €`;

        const authorsUl = document.createElement("ul");
        authorsUl.className = "authorsUlBooksModal"
        book.autores.forEach((author, index) => {
            const authorLi = document.createElement("li");
            authorLi.className = "authorLiBooksModal"
            authorLi.id = `${author.id}`
            authorLi.textContent = `${author.nombre} ${author.apellidos}`
            if (book.autores.length > 1) {
                if (index < book.autores.length - 1) {
                    authorLi.textContent += ",";
                }
            }
            authorLi.addEventListener("click", (e) => createAuthorModal(e, author.id));
            authorsUl.appendChild(authorLi);
        })

        divBookModalDetails.appendChild(authorsUl);

        const categoryUl = document.createElement("ul");
        categoryUl.className = "categoryUlBooksModal"
        book.categorias.forEach(category => {
            if (category.id === null) {
                return;
            }
            const categoryLi = document.createElement("li");
            categoryLi.className = "categoryLiBooksModal"
            categoryLi.id = `${category.id}`;
            categoryLi.textContent = `${category.categoria}`;
            categoryLi.style.backgroundColor = `#402e18`;
            categoryLi.style.color = "white";
            categoryUl.appendChild(categoryLi);
        })

        const divImgClone = document.createElement("div");
        divImgClone.id = "divImgClone"

        const imgClone = img.cloneNode(true);
        imgClone.loading = "lazy";
        imgClone.id = "imgBookMobileModal"
        imgClone.style.display = "none";

        div.appendChild(h3);

        divImgClone.appendChild(imgClone)
        div.appendChild(divImgClone);
        div.appendChild(authorsUl);
        div.appendChild(spanPrice);
        div.appendChild(spanPages);
        div.appendChild(p);
        div.appendChild(categoryUl);
        divBookModalDetails.appendChild(div);

        gsap.fromTo(
            divImgClone.querySelector("#imgBookMobileModal"),
            { filter: "blur(10px)" },
            { filter: "blur(0px", duration: 0.3 }
        )
    }

    const createAuthorModal = async (e, authorId) => {
        const divBookModalImg = document.querySelector("#divBookModalImg");
        const divBookModalDetails = document.querySelector("#divBookModalDetails");

        history.pushState({ page: 'autor' }, '', `?autor/${authorId}`)

        loaderAuthors.style.display = "flex";

        restoreScrollbar();
        fixScrollbarGap();

        modalBook.style.display = "flex";
        divBookModalImg.querySelectorAll("div").forEach(div => div.remove());
        divBookModalImg.querySelectorAll("img").forEach(div => div.remove());
        divBookModalDetails.querySelectorAll("div").forEach(div => div.remove());

        iconXModalBook.addEventListener("click", () => {
            history.pushState({ page: 'libreria' }, '', '/libreria/');
            restoreScrollbar()
            modalBook.style.display = "none"
            divBookModalImg.querySelectorAll("div").forEach(div => div.remove());
            divBookModalDetails.querySelectorAll("div").forEach(div => div.remove());
        });

        controller.abort();

        controller = new AbortController();
        const signal = controller.signal;

        try {
            const response = await fetch(`https://icpf-api-production.up.railway.app/autores/${authorId}`, { signal });
            const result = await response.json();

            if (response.ok) {
                // console.log(result);
                const divImg = document.createElement("div");
                divImg.id = "divImgModalAuthor"

                const img = document.createElement("img");
                img.width = "500";
                img.height = "500";
                img.loading = "lazy";
                img.className = "imgAuthor";
                img.src = `${result[0].autor_imagen}`;

                divBookModalImg.appendChild(divImg);
                divImg.appendChild(img);

                gsap.fromTo(
                    divBookModalImg.querySelector(".imgAuthor"),
                    { filter: "blur(10px)" },
                    { filter: "blur(0px", duration: 0.3 }
                )

                const divDetails = document.createElement("div");
                divDetails.id = "ModalAuthorDetailInfo";

                const h3 = document.createElement("h3");
                h3.textContent = result[0].autor_nombre + ' ' + result[0].autor_apellidos;
                const divImgClone = document.createElement("div");
                divImgClone.id = "divImgClone"
                const imgClone = img.cloneNode(true);
                imgClone.id = "imgBookMobileModal"
                imgClone.width = "500";
                imgClone.height = "500";
                imgClone.loading = "lazy";
                imgClone.style.display = "none";
                const p = document.createElement("p");
                const text = result[0].autor_descripcion;
                const parts = text.split('.');
                if (parts.length > 2) {
                    const calc = Math.round(parts.length / 2);
                    const firstHalf = parts.slice(0, calc).join('.') + ".";
                    const secondHalf = parts.slice(calc).join('.');
                    p.innerHTML = firstHalf + "<br><br>" + secondHalf;
                } else {
                    p.textContent = text;
                }
                divDetails.appendChild(h3);
                divImgClone.appendChild(imgClone)
                divDetails.appendChild(divImgClone)
                divDetails.appendChild(p);
                divBookModalDetails.appendChild(divDetails);

                gsap.fromTo(
                    divImgClone.querySelector("#imgBookMobileModal"),
                    { filter: "blur(10px)" },
                    { filter: "blur(0px", duration: 0.3 }
                )

                const divBooks = document.createElement("div");
                divBooks.id = "divBooksAuthors";
                result[0].libros.forEach(book => {
                    const divEachBook = document.createElement("div");
                    divEachBook.className = "divEachBookAuthors";
                    const imgAuthorBook = document.createElement("img");
                    imgAuthorBook.className = "imgAuthorBook";
                    imgAuthorBook.loading = "lazy";
                    imgAuthorBook.src = `${book.imagen}`;
                    imgAuthorBook.addEventListener("click", (e) => {
                        dataFetch.filter(fetchedBook => {
                            if (fetchedBook.libro_id == book.id) {
                                createBookModal(e, fetchedBook);
                            }
                        })
                    })
                    const divTitleAuthorBook = document.createElement("div");
                    divTitleAuthorBook.className = "divTitleAuthorBook";
                    const titleAuthorBook = document.createElement("span");
                    titleAuthorBook.className = "titleAuthorBook";
                    titleAuthorBook.textContent = `${book.titulo}`;
                    titleAuthorBook.addEventListener("click", (e) => {
                        dataFetch.filter(fetchedBook => {
                            if (fetchedBook.libro_id == book.id) {
                                createBookModal(e, fetchedBook);
                            }
                        })
                    })
                    divTitleAuthorBook.appendChild(titleAuthorBook);

                    divEachBook.appendChild(imgAuthorBook);
                    divEachBook.appendChild(divTitleAuthorBook);
                    divBooks.appendChild(divEachBook);
                })

                loaderAuthors.style.display = "none";
                divBookModalDetails.appendChild(divBooks);
            }

            gsap.fromTo(
                divBookModalDetails.querySelectorAll(".divEachBookAuthors"),
                { opacity: 0, translateY: 20 },
                { opacity: 1, translateY: 0, duration: 0.3 }
            );

        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Solicitud Cancelada");
            } else {
                console.log("Error fetching author: ", err);
            }
        }
    };

    const createPagination = (data) => {
        const existingPagination = divNumbersPagination.querySelector(".ulPaginationLibrary");
        if (existingPagination) existingPagination.remove();

        const ul = document.createElement("ul");
        ul.className = "ulPaginationLibrary"

        for (let i = 0; i < totalPages; i++) {
            const li = document.createElement("li");
            li.dataset.id = i + 1;
            li.textContent = i + 1;
            if (page != i + 1) {
                li.className = "liPaginationLibrary";
                li.addEventListener("click", (e) => {
                    page = e.target.dataset.id;
                    history.pushState({ page: 'pagina' }, '', `?pagina/${e.target.dataset.id}`);
                    createLibrary(data);
                    createPagination(data);
                    window.scrollTo({
                        top: 200,
                        behavior: "smooth"
                    })
                })
            } else {
                li.className = "actualLiPagination";
            }
            ul.appendChild(li);
        }

        divNumbersPagination.appendChild(ul);
    }

    arrowLeftPagination.addEventListener("click", () => {
        if (page !== 1) {
            page--;
            paginationLogic();
        }
    })

    arrowRightPagination.addEventListener("click", () => {
        if (page !== totalPages) {
            page++;
            paginationLogic();
        }
    })


    doubleArrowLeftPagination.addEventListener("click", () => {
        if (page !== 1) {
            page = 1;
            paginationLogic();
        }
    })

    doubleArrowRightPagination.addEventListener("click", () => {
        if (page !== totalPages) {
            page = totalPages;
            paginationLogic();
        }
    })

    const paginationLogic = () => {
        if (isDataFetch) {
            createLibrary(dataFetch);
            createPagination(dataFetch);
        } else if (isDataByCategory) {
            createLibrary(dataByCategory);
            createPagination(dataByCategory);
        } else if (isDataBySearch) {
            createLibrary(dataBySearch);
            createPagination(dataBySearch);
        }
        window.scrollTo({
            top: 200,
            behavior: "smooth"
        })
    }

    // Keyboard "Escape" Logic
    document.addEventListener("keydown", (e) => {
        const divBookModalImg = document.querySelector("#divBookModalImg");
        const divBookModalDetails = document.querySelector("#divBookModalDetails");

        if (e.key == "Escape") {
            history.pushState({ page: 'libreria' }, '', '/libreria/');
            restoreScrollbar();
            modalBook.style.display = "none"
            divBookModalImg.querySelectorAll("div").forEach(div => div.remove());
            divBookModalDetails.querySelectorAll("div").forEach(div => div.remove());
        }
    })

    iconSearchLibrary.addEventListener("click", () => inputSearchLibrary.focus());

    // Back & Forward History Logic
    window.addEventListener("popstate", () => {
        const hashPop = window.location.search;
        const hashSplitPop = hashPop.split("/");
        const hashNumberPop = hashSplitPop[1];

        console.log(hashPop, hashNumberPop);
        if (hashPop == "") {
            modalBook.style.display = "none"
            history.pushState({ page: 'libreria' }, '', '/pagina/$');
            restoreScrollbar();
            divBookModalImg.querySelectorAll("div").forEach(div => div.remove());
            divBookModalDetails.querySelectorAll("div").forEach(div => div.remove());
        } else if (hashPop.includes("libro")) {
            dataFetch.filter(book => {
                if (book.libro_id == hashNumberPop) {
                    history.pushState({ page: 'libro' }, '', `?libro/${book.libro_id}`)
                    createBookModal(null, book);
                }
            })
        } else if (hashPop.includes("autor")) {
            history.pushState({ page: 'autor' }, '', `?autor/${hashNumberPop}`)
            createAuthorModal(null, hashNumberPop);
        }
    });

    // Scrollbar logic
    function fixScrollbarGap() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        document.querySelector("#firstNav").style.paddingRight = `${scrollbarWidth}px`;
    }

    function restoreScrollbar() {
        document.documentElement.style.overflow = "";
        document.documentElement.style.paddingRight = "";
        document.querySelector("#firstNav").style.paddingRight = "";
    }
};