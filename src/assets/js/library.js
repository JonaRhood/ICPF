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


    let page = 1;
    let totalPages = 0;
    let limit = 24;
    let dataFetch = [];
    let dataBySearch = [];
    let dataByCategory = [];

    let isDataFetch = true;
    let isDataBySearch = false;
    let isDataByCategory = false;

    const fetchInitialData = async () => {
        try {
            const response = await fetch("https://icpf-api-production.up.railway.app/libros");
            const data = await response.json();

            console.log(data);
            dataFetch = data;
            createLibrary(dataFetch);
            createPagination(dataFetch);

        } catch (err) {
            console.log("Error fetching library data: ", err);
        }
    }
    fetchInitialData();

    inputSearchLibrary.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            isDataFetch = false;
            isDataBySearch = true;
            isDataByCategory = false;
            const searchWords = e.target.value.toLowerCase().split(" ").filter(word => word.length > 0);
            console.log(searchWords);

            page = 1

            dataBySearch = dataFetch.filter(Book => {
                const titleMatch = searchWords.every(word => Book.libro_titulo.toLowerCase().includes(word));
                const authorMatch = Book.autores.some(author =>
                    searchWords.every(word =>
                        author.nombre.toLowerCase().includes(word) ||
                        author.apellidos.toLowerCase().includes(word)
                    )
                );
                return titleMatch || authorMatch;
            });

            createLibrary(dataBySearch);
            createPagination(dataBySearch)
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

            console.log(data);
            if (response.ok) {
                categoriesDivScroller.forEach(div => {
                    const ul = document.createElement("ul");
                    ul.className = "ulCategoriesTagList scroller_inner";

                    data.forEach((category, i) => {
                        const li = document.createElement("li");
                        li.className = "liCategoriesLibrary";
                        li.setAttribute("data-id", `${category.id}`);
                        li.textContent = `${category.categoria.toUpperCase()}`;
                        li.style.backgroundColor = `${category.color}50`
                        ul.appendChild(li);
                    })

                    ul.addEventListener("click", (e) => {
                        if (e.target.classList.contains("liCategoriesLibrary")) {
                            divCategorySelected.querySelectorAll("span").forEach(span => span.remove());
                            isDataFetch = false;
                            isDataBySearch = false;
                            isDataByCategory = true;
                            dataByCategory = dataFetch.filter(Book =>
                                Book.categorias.some(categoria => categoria.id == e.target.dataset.id)
                            );
                            createLibrary(dataByCategory);
                            createPagination(dataByCategory);

                            const spanCategory = document.createElement("span");
                            spanCategory.className = "spanCategorySelected"
                            spanCategory.textContent = e.target.textContent;;

                            const spanCross = document.createElement("span");
                            spanCross.className = "crossCategoryLibrary";
                            spanCross.textContent = "-";

                            divCategorySelected.style.backgroundColor = e.target.style.backgroundColor;
                            divCategorySelected.appendChild(spanCategory);
                            divCategorySelected.appendChild(spanCross);

                            divCategorySelected.addEventListener("click", () => {
                                divCategorySelected.querySelectorAll("span").forEach(span => span.remove());
                                isDataFetch = true;
                                isDataBySearch = false;
                                isDataByCategory = false;
                                createLibrary(dataFetch);
                                createPagination(dataFetch);
                            })
                        }
                    });

                    div.appendChild(ul);
                })
            }

            if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                addScrollerAnimation();
            }

        } catch (err) {
            console.log("Error fetching categories: ", err)
        }
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

        data.slice(dataMin, dataMax).forEach(Book => {
            const div = document.createElement("div");
            div.className = "divBooks";

            // Image Div
            const divImage = document.createElement("div");
            divImage.className = "divImageBooks";

            const img = document.createElement("img");
            img.className = "imgBooks";
            img.src = `${Book.libro_imagen}`;

            divImage.appendChild(img);

            // Details Div
            const divDetails = document.createElement("div");
            divDetails.className = "divDetailsBooks";

            const divTitle = document.createElement("div");
            divTitle.className = "divTitleBooks";
            const title = document.createElement("span");
            title.className = "bookTitleSpan"
            title.textContent = `${Book.libro_titulo}`;

            divTitle.appendChild(title)
            divDetails.appendChild(divTitle);

            const authorsUl = document.createElement("ul");
            authorsUl.className = "authorsUlBooks"
            Book.autores.forEach((author, index) => {
                const authorLi = document.createElement("li");
                authorLi.className = "authorLiBooks"
                authorLi.id = `${author.id}`
                authorLi.textContent = `${author.nombre} ${author.apellidos}`
                if (Book.autores.length > 1) {
                    if (index < Book.autores.length - 1) {
                        authorLi.textContent += ",";
                    }
                }
                authorsUl.appendChild(authorLi);
            })

            divDetails.appendChild(authorsUl);

            const categoryUl = document.createElement("ul");
            categoryUl.className = "categoryUlBooks"
            Book.categorias.forEach(category => {
                if (category.id === null) {
                    return;
                }
                const categoryLi = document.createElement("li");
                categoryLi.className = "categoryLiBooks"
                categoryLi.id = `${category.id}`;
                categoryLi.textContent = `${category.categoria.toUpperCase()}`;
                categoryLi.style.backgroundColor = `${category.color}50`
                categoryUl.appendChild(categoryLi);
            })

            divDetails.appendChild(categoryUl);

            div.appendChild(divImage);
            div.appendChild(divDetails);
            insideDivLibrary.appendChild(div);
        })
    };

    const createPagination = (data) => {
        const existingPagination = divNumbersPagination.querySelector(".ulPaginationLibrary");
        if (existingPagination) existingPagination.remove();

        const ul = document.createElement("ul");
        ul.className = "ulPaginationLibrary"

        console.log(totalPages)

        for (let i = 0; i < totalPages; i++) {
            const li = document.createElement("li");
            li.dataset.id = i + 1;
            li.textContent = i + 1;
            if (page != i + 1) {
                li.className = "liPaginationLibrary";
                li.addEventListener("click", (e) => {
                    page = e.target.dataset.id;
                    createLibrary(data);
                    createPagination(data);
                    window.scrollTo({
                        top: 200,
                        behavior: "smooth"
                    })
                })
            }
            ul.appendChild(li);
        }

        divNumbersPagination.appendChild(ul);
    }

    arrowLeftPagination.addEventListener("click", () => {
        if (page !== 1) {
            page--;
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
    })

    arrowRightPagination.addEventListener("click", () => {
        if (page !== totalPages) {
            page++;
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
    })


    doubleArrowLeftPagination.addEventListener("click", () => {
        if (page !== 1) {
            page = 1;
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
    })

    doubleArrowRightPagination.addEventListener("click", () => {
        if (page !== totalPages) {
            page = totalPages;
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
    })

    iconSearchLibrary.addEventListener("click", () => inputSearchLibrary.focus());
};