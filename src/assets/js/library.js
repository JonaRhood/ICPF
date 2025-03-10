export const library = () => {
    console.log("Library")
    const insideDivLibrary = document.querySelector("#insideDivLibrary");
    const divNumbersPagination = document.querySelector("#divNumbersPagination");

    let page = 1;
    let limit = 24;
    let dataFetch = [];

    const fetchInitialData = async () => {
        try {
            const response = await fetch("https://icpf-api-production.up.railway.app/libros");
            const data = await response.json();

            console.log(data);
            dataFetch = data;
            createLibrary();
            createPagination();

        } catch (err) {
            console.log("Error fetching library data", err);
        }
    }
    fetchInitialData();

    const createLibrary = () => {
        const dataMax = page * limit;
        console.log(dataMax);
        const dataMin = dataMax - limit;
        console.log(dataMin);

        dataFetch.slice(dataMin, dataMax).forEach(Book => {
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
                categoryLi.style.backgroundColor = ``
                categoryUl.appendChild(categoryLi);
            })

            divDetails.appendChild(categoryUl);

            div.appendChild(divImage);
            div.appendChild(divDetails);
            insideDivLibrary.appendChild(div);
        })
    };

    const createPagination = () => {
        const ul = document.createElement("ul");
        ul.className = "ulPaginationLibrary"

        console.log(dataFetch.length);

        const paginationQuantity = Math.ceil(dataFetch.length / limit) + 1;

        for (let i = 1; i < paginationQuantity; i++) {
            const li = document.createElement("li");
            li.dataset.id = i;
            li.textContent = i;
            if (page !== i) {
                li.className = "liPaginationLibrary";
                li.addEventListener("click", (e) => {
                    page = e.target.dataset.id;
                    createLibrary();
                })
            }
            ul.appendChild(li);
        }

        divNumbersPagination.appendChild(ul);
    }


};