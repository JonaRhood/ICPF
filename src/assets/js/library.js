export const library = () => {
    console.log("Library")
    const insideDivLibrary = document.querySelector("#insideDivLibrary");

    let page = 1;
    let limit = 25;
    let dataFetch = [];

    const fetchInitialData = async() => {
        try {
            const response = await fetch("https://icpf-api-production.up.railway.app/libros");
            const data = await response.json();

            console.log(data);
            dataFetch = data;
            console.log(dataFetch);
            createLibrary(data.slice(0, limit));

        } catch(err) {
            console.log("Error fetching library data", err);
        }
    }
    fetchInitialData();

    const createLibrary = (data) => {
        data.forEach(Book => {
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

            const title = document.createElement("span");
            title.className = "bookTitleSpan"
            title.textContent = `${Book.libro_titulo}`;

            divDetails.appendChild(title);

            const authorsUl = document.createElement("ul");
            authorsUl.className = "authorsUlBooks"
            Book.autores.forEach(author => {
                const authorLi = document.createElement("li");
                authorLi.className = "authorLiBooks"
                authorLi.id = `${author.id}`
                authorLi.textContent = `${author.nombre} ${author.apellidos}`
                authorsUl.appendChild(authorLi);
            })

            divDetails.appendChild(authorsUl);

            const categoryUl = document.createElement("ul");
            categoryUl.className ="categoryUlBooks"
            Book.categorias.forEach(category => {
                const categoryLi = document.createElement("li");
                categoryLi.className = "categoryLiBooks"
                categoryLi.id = `${category.id}`;
                categoryLi.textContent = `${category.categoria.toUpperCase()}`;
                categoryUl.appendChild(categoryLi);
            })

            divDetails.appendChild(categoryUl);

            div.appendChild(divImage);
            div.appendChild(divDetails);
            insideDivLibrary.appendChild(div);
        })

    }
    

};